import { PrismaClient } from '@prisma/client';
import { ComplianceBalance } from '../../../core/domain/ComplianceBalance';
import { ComplianceRepository } from '../../../core/ports/outbound/ComplianceRepository';

export class PrismaComplianceRepository implements ComplianceRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findByShipAndYear(shipId: string, year: number): Promise<ComplianceBalance | null> {
    const record = await this.prisma.shipCompliance.findUnique({
      where: {
        shipId_year: { shipId, year },
      },
    });

    return record ? this.toDomain(record) : null;
  }

  async save(cb: ComplianceBalance): Promise<ComplianceBalance> {
    const created = await this.prisma.shipCompliance.create({
      data: {
        shipId: cb.shipId,
        year: cb.year,
        cbGco2eq: cb.cbGco2eq,
      },
    });

    return this.toDomain(created);
  }

  async update(shipId: string, year: number, cbGco2eq: number): Promise<ComplianceBalance> {
    const updated = await this.prisma.shipCompliance.update({
      where: {
        shipId_year: { shipId, year },
      },
      data: { cbGco2eq },
    });

    return this.toDomain(updated);
  }

  private toDomain(prismaRecord: any): ComplianceBalance {
    return {
      shipId: prismaRecord.shipId,
      year: prismaRecord.year,
      cbGco2eq: prismaRecord.cbGco2eq,
    };
  }
}
