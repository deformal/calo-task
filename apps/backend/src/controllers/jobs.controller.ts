import { Controller, Get, Param, Post, Res } from '@nestjs/common';
import { JobsService } from '../services/jobs.service';
import { JOB, JOB_STATUSES, JobCreationResponse } from '@calo/types';
import { UUID } from 'crypto';
import { join } from 'path';
import { createReadStream } from 'fs';
import { Response } from 'express';

@Controller()
export class JobController {
  constructor(private readonly jobService: JobsService) {}

  @Post('/jobs')
  async create_new_job(): Promise<JobCreationResponse> {
    return await this.jobService.createJob();
  }

  @Get('/jobs')
  async get_jobs(): Promise<JOB[]> {
    return await this.jobService.getJobList();
  }

  @Get('/jobs/:id')
  async get_job(
    @Res() res: Response,
    @Param('id') id: UUID
  ): Promise<Response> {
    const job = await this.jobService.getJobById(id);
    if (!job) return res.send(JOB_STATUSES.NO_RESOLVED);
    const file = createReadStream(join(process.cwd(), job.toString()));
    file.pipe(res);
  }
}
