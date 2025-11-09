/// <reference types="node" />
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await prisma.poolMember.deleteMany();
  await prisma.pool.deleteMany();
  await prisma.bankEntry.deleteMany();
  await prisma.shipCompliance.deleteMany();
  await prisma.route.deleteMany();

  // Seed routes with KPI dataset
  const routes = await Promise.all([
    prisma.route.create({
      data: {
        routeId: 'R001',
        vesselType: 'Container',
        fuelType: 'HFO',
        year: 2024,
        ghgIntensity: 91.0,
        fuelConsumption: 5000,
        distance: 12000,
        totalEmissions: 4500,
        isBaseline: true, // Set first route as baseline
      },
    }),
    prisma.route.create({
      data: {
        routeId: 'R002',
        vesselType: 'BulkCarrier',
        fuelType: 'LNG',
        year: 2024,
        ghgIntensity: 88.0,
        fuelConsumption: 4800,
        distance: 11500,
        totalEmissions: 4200,
        isBaseline: false,
      },
    }),
    prisma.route.create({
      data: {
        routeId: 'R003',
        vesselType: 'Tanker',
        fuelType: 'MGO',
        year: 2024,
        ghgIntensity: 93.5,
        fuelConsumption: 5100,
        distance: 12500,
        totalEmissions: 4700,
        isBaseline: false,
      },
    }),
    prisma.route.create({
      data: {
        routeId: 'R004',
        vesselType: 'RoRo',
        fuelType: 'HFO',
        year: 2025,
        ghgIntensity: 89.2,
        fuelConsumption: 4900,
        distance: 11800,
        totalEmissions: 4300,
        isBaseline: false,
      },
    }),
    prisma.route.create({
      data: {
        routeId: 'R005',
        vesselType: 'Container',
        fuelType: 'LNG',
        year: 2025,
        ghgIntensity: 90.5,
        fuelConsumption: 4950,
        distance: 11900,
        totalEmissions: 4400,
        isBaseline: false,
      },
    }),
  ]);

  console.log(`✅ Created ${routes.length} routes`);

  // Seed sample compliance balances
  const TARGET_INTENSITY = 89.3368;
  const ENERGY_CONVERSION = 41000;

  // Map ships to specific routes for testing
  const shipRouteMapping = [
    { shipId: 'SHIP-001', routeId: 'R001' }, // Deficit (91.0 > 89.34)
    { shipId: 'SHIP-002', routeId: 'R002' }, // Surplus (88.0 < 89.34)
    { shipId: 'SHIP-003', routeId: 'R003' }, // Deficit (93.5 > 89.34)
    { shipId: 'SHIP-004', routeId: 'R004' }, // Surplus (89.2 < 89.34)
  ];
  
  for (const mapping of shipRouteMapping) {
    const route = routes.find(r => r.routeId === mapping.routeId);
    if (route) {
      const energyInScope = route.fuelConsumption * ENERGY_CONVERSION;
      const cb = (TARGET_INTENSITY - route.ghgIntensity) * energyInScope;

      await prisma.shipCompliance.create({
        data: {
          shipId: mapping.shipId,
          year: 2024,
          cbGco2eq: cb,
        },
      });
    }
  }

  console.log(`✅ Created ${shipRouteMapping.length} ship compliance records`);

  console.log('🎉 Seeding completed!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
