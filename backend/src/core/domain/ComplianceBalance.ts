export interface ComplianceBalance {
  shipId: string;
  year: number;
  cbGco2eq: number;
}

export interface AdjustedComplianceBalance extends ComplianceBalance {
  bankedAmount: number;
  adjustedCb: number;
}
