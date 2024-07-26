import { Injectable, Logger } from '@nestjs/common';
import { JOB, JobCreationResponse } from 'src/types/common';
import { existsSync, mkdirSync, writeFileSync } from 'fs';

import { HelperService } from './helper.service';
import { UUID } from 'crypto';

@Injectable()
export class JobsService {
  private jobsFilePath: string = 'data/jobs.json';
  private picturePath: string = 'data/pictures';
  private dataPath: string = 'data';

  constructor(private readonly helperService: HelperService) {
    if (!existsSync(this.dataPath)) mkdirSync(this.dataPath);
    if (!existsSync(this.picturePath)) mkdirSync(this.picturePath);
    if (!existsSync(this.jobsFilePath))
      writeFileSync(this.jobsFilePath, JSON.stringify([]));
  }

  async createJob(): Promise<JobCreationResponse> {
    try {
      const newId = crypto.randomUUID();
      this.helperService.savePicture(newId);
      return {
        id: newId,
      };
    } catch (err) {
      Logger.error(err);
    }
  }

  async getJobList(): Promise<JOB[]> {
    return await this.helperService.getJobList();
  }

  async getJobById(id: UUID): Promise<string | boolean> {
    const isJobProcessed = await this.helperService.checkForPictureWithId(id);
    return isJobProcessed;
  }
}
