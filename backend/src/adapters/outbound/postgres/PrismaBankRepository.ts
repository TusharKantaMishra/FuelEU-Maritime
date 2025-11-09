import { PrismaClient } from '@prisma/client';
import { BankEntry } from '../../../core/domain/BankEntry';
import { BankRepository } from '../../../core/ports/outbound/BankRepository';

export class PrismaBankRepository implements BankRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findByShip(shipId: string, year?: number): Promise<BankEntry[]> {
    const entries = await this.prisma.bankEntry.findMany({
      where: {
        shipId,
        ...(year && { year }),
      },
      orderBy: { createdAt: 'desc' },
    });

    return entries.map(this.toDomain);
  }

  async getTotalBanked(shipId: string, year?: number): Promise<number> {
    const result = await this.prisma.bankEntry.aggregate({
      where: {
        shipId,
        ...(year && { year }),
      },
      _sum: {
        amountGco2eq: true,
      },
    });

    return result._sum.amountGco2eq || 0;
  }

  async create(entry: Omit<BankEntry, 'id' | 'createdAt'>): Promise<BankEntry> {
    const created = await this.prisma.bankEntry.create({
      data: {
        shipId: entry.shipId,
        year: entry.year,
        amountGco2eq: entry.amountGco2eq,
      },
    });

    return this.toDomain(created);
  }

  private toDomain(prismaEntry: any): BankEntry {
    return {
      id: prismaEntry.id,
      shipId: prismaEntry.shipId,
      year: prismaEntry.year,
      amountGco2eq: prismaEntry.amountGco2eq,
      createdAt: prismaEntry.createdAt,
    };
  }
}
