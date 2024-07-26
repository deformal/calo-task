import { Injectable } from '@nestjs/common';
import { JOB } from 'src/types/common';
import { readFileSync, writeFileSync } from 'fs';
import { createApi } from 'unsplash-js';
import axios from 'axios';
import { UUID } from 'crypto';

@Injectable()
export class HelperService {
  private jobsFilePath: string = 'data/jobs.json';
  private picturePath: string = 'data/pictures';
  private uplashUrl: string = process.env.UPLASH_URL;
  private uplashAccessKey = process.env.UPLASH_ACCESS_KEY;
  private uplashSecretKey = process.env.UPLASH_SECRET_KEY;
  private uplashAppId = process.env.UPLASH_APPLICATION_ID;
  private uplashClient = createApi({
    accessKey: this.uplashAccessKey,
    fetch: fetch,
  });

  async getJobList(): Promise<JOB[]> {
    const data = readFileSync(this.jobsFilePath, 'utf-8');
    const jobsArray: JOB[] = JSON.parse(data);
    return jobsArray;
  }

  async downloadRandomFoodPicture(id: UUID): Promise<string> {
    const data = await axios.get(this.uplashUrl, {
      data: { per_page: 1, count: 1 },
    });
    const s3 = data.data.results[0].urls.small_s3;
    const resData = await axios.get(s3, { responseType: 'arraybuffer' });
    const picPath = `${this.picturePath}/${id}.jpeg`;
    writeFileSync(picPath, resData.data);
    return picPath;
  }
}
