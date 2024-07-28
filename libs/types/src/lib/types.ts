import { UUID } from 'crypto';

export enum JOB_STATUSES {
  NO_RESOLVED = 'NOT_RESOLVED',
  COMPLETED = 'COMPLETED',
}

export interface JOB {
  id: UUID;
}

export interface JobCreationResponse {
  id: string;
}

export interface GetSingleJobParam {
  id: string;
}
