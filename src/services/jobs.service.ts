import { Injectable, Logger } from '@nestjs/common';
import { JOB, JOB_STATUSES, JobCreationResponse } from 'src/types/common';
import { existsSync, mkdir, writeFile } from 'fs';

import { HelperService } from './helper.service';
import { UUID } from 'crypto';

@Injectable()
export class JobsService {
  private jobsFilePath: string = 'data/jobs.json';
  private picturePath: string = 'data/pictures';

  constructor(private readonly helperService: HelperService) {
    if (!existsSync(this.jobsFilePath)) {
      writeFile(this.jobsFilePath, JSON.stringify([]), (err) => {
        if (err) Logger.debug(err.message);
      });
    }

    mkdir(this.picturePath, { recursive: true }, (res) => {
      if (res instanceof Error) Logger.debug('data folder found');
    });
  }

  async createJob(): Promise<JobCreationResponse> {
    try {
      const newId = crypto.randomUUID();
      const getPicturePath =
        await this.helperService.downloadRandomFoodPicture(newId);
      const newJobData: JOB = {
        id: newId,
        filePath: getPicturePath,
      };
      const jobsArray: JOB[] = await this.helperService.getJobList();
      jobsArray.push(newJobData);
      writeFile(this.jobsFilePath, JSON.stringify(jobsArray), (err) => {
        if (err) Logger.error(err);
      });

      return {
        id: newId,
        job_status: JOB_STATUSES.PENDING,
      };
    } catch (err) {
      Logger.error(err);
    }
  }

  async getJobList(): Promise<JOB[]> {
    return await this.helperService.getJobList();
  }

  async getJobById(id: UUID): Promise<JOB> {
    const jobs: JOB[] = await this.helperService.getJobList();
    const job = jobs.find((job) => job.id === id);
    return job;
  }
}
