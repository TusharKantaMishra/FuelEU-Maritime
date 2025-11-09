import { Pool, CreatePoolRequest } from '../../domain/Pool';

export interface CreatePoolUseCase {
  execute(request: CreatePoolRequest): Promise<Pool>;
}
