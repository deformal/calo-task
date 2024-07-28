import { Injectable, Logger } from '@nestjs/common';
import { JOB, JobCreationResponse } from '@calo/types';
import { existsSync, mkdirSync, writeFileSync } from 'fs';

import { HelperService } from '../helpers/helper.service';
import { UUID } from 'crypto';

@Injectable()
export class JobsService {
  private jobsFilePath = 'data/jobs.json';
  private picturePath = 'data/pictures';
  private dataPath = 'data';

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
