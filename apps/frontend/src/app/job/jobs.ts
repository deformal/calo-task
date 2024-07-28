import axios, { Axios } from 'axios';
import { JOB } from '@calo/types';

export class JobsApi {
  url = 'http://localhost:3000/jobs';

  public async getListOfJobs(): Promise<JOB[]> {
    const jobs = await axios.get(this.url);
    return jobs.data;
  }

  public async geJob(id: string): Promise<string> {
    const jobUrl = `${this.url}/${id}`;
    const job = await axios.get(jobUrl);
    if (job.data === 'NOT_RESOLVED') return job.data;
    return jobUrl;
  }

  public async addJob(): Promise<string> {
    const res = await axios.post(this.url);
    return res.data.id;
  }
}
