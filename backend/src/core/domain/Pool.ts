export interface Pool {
  id: number;
  year: number;
  createdAt: Date;
  members: PoolMember[];
}

export interface PoolMember {
  shipId: string;
  cbBefore: number;
  cbAfter: number;
}

export interface CreatePoolRequest {
  year: number;
  members: {
    shipId: string;
    cbBefore: number;
  }[];
}

export interface PoolValidationResult {
  valid: boolean;
  errors: string[];
  allocatedMembers?: PoolMember[];
}
