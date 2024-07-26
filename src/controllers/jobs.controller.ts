import { Controller, Get, Param, Post, Res } from '@nestjs/common';
import { JobsService } from '@calo-task/service';
import { JOB, JobCreationResponse } from 'src/types/common';
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
  async get_job(@Param('id') id: UUID, @Res() res: Response) {
    const job = await this.jobService.getJobById(id);
    const file = createReadStream(join(process.cwd(), job.filePath));
    file.pipe(res);
  }
}
