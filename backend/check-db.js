const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkDatabase() {
  console.log('\n📊 DATABASE CONTENTS:\n');
  
  // Check routes
  const routes = await prisma.route.findMany();
  console.log(`✅ ROUTES TABLE: ${routes.length} records`);
  routes.forEach(r => {
    console.log(`   - ${r.routeId}: ${r.vesselType}, ${r.fuelType}, ${r.year}, GHG: ${r.ghgIntensity}`);
  });
  
  // Check ship compliance
  const compliance = await prisma.shipCompliance.findMany();
  console.log(`\n✅ SHIP_COMPLIANCE TABLE: ${compliance.length} records`);
  compliance.forEach(c => {
    console.log(`   - ${c.shipId} (${c.year}): CB = ${c.cbGco2eq.toFixed(2)} gCO₂eq`);
  });
  
  // Check bank entries
  const banks = await prisma.bankEntry.findMany();
  console.log(`\n✅ BANK_ENTRIES TABLE: ${banks.length} records`);
  
  // Check pools
  const pools = await prisma.pool.findMany();
  console.log(`\n✅ POOLS TABLE: ${pools.length} records`);
  
  await prisma.$disconnect();
}

checkDatabase().catch(console.error);
