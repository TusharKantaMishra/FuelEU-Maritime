import { PrismaClient } from '@prisma/client';
import { Pool, PoolMember } from '../../../core/domain/Pool';
import { PoolRepository } from '../../../core/ports/outbound/PoolRepository';

export class PrismaPoolRepository implements PoolRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(year: number, members: PoolMember[]): Promise<Pool> {
    const pool = await this.prisma.pool.create({
      data: {
        year,
        members: {
          create: members.map(m => ({
            shipId: m.shipId,
            cbBefore: m.cbBefore,
            cbAfter: m.cbAfter,
          })),
        },
      },
      include: {
        members: true,
      },
    });

    return this.toDomain(pool);
  }

  async findById(id: number): Promise<Pool | null> {
    const pool = await this.prisma.pool.findUnique({
      where: { id },
      include: { members: true },
    });

    return pool ? this.toDomain(pool) : null;
  }

  async findByYear(year: number): Promise<Pool[]> {
    const pools = await this.prisma.pool.findMany({
      where: { year },
      include: { members: true },
    });

    return pools.map(this.toDomain);
  }

  private toDomain(prismaPool: any): Pool {
    return {
      id: prismaPool.id,
      year: prismaPool.year,
      createdAt: prismaPool.createdAt,
      members: prismaPool.members.map((m: any) => ({
        shipId: m.shipId,
        cbBefore: m.cbBefore,
        cbAfter: m.cbAfter,
      })),
    };
  }
}
