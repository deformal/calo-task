import { UUID } from 'crypto';

export enum JOB_STATUSES {
  PENDING = 'PNDING',
  COMPLETED = 'COMPLETED',
}

export interface JOB {
  id: UUID;
  filePath: string;
}

export interface JobCreationResponse {
  id: string;
  job_status: JOB_STATUSES;
}

export interface GetSingleJobParam {
  id: string;
}
