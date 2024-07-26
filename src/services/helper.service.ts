import { Injectable, Logger } from '@nestjs/common';
import { JOB } from 'src/types/common';
import { readFileSync, writeFile, writeFileSync } from 'fs';
import axios from 'axios';
import { UUID } from 'crypto';

@Injectable()
export class HelperService {
  private jobsFilePath: string = 'data/jobs.json';
  private picturePath: string = 'data/pictures';
  private uplashUrl: string = process.env.UPLASH_URL;

  async getJobList(): Promise<JOB[]> {
    const data = readFileSync(this.jobsFilePath, 'utf-8');
    const jobsArray: JOB[] = JSON.parse(data);
    return jobsArray;
  }

  async downloadRandomFoodPicture(id: UUID): Promise<string> {
    const data = await axios.get(this.uplashUrl, {
      data: { per_page: 1, count: 1 },
    });
    const s3FileLink = data.data.results[0].urls.small_s3;
    const resData = await axios.get(s3FileLink, {
      responseType: 'arraybuffer',
    });
    const picPath = `${this.picturePath}/${id}.jpeg`;
    writeFileSync(picPath, resData.data);
    return picPath;
  }

  async savePicture(id: UUID) {
    const getPicturePath = await this.downloadRandomFoodPicture(id);
    const newJobData: JOB = {
      id: id,
      filePath: getPicturePath,
    };
    const jobsArray: JOB[] = await this.getJobList();
    jobsArray.push(newJobData);
    writeFile(this.jobsFilePath, JSON.stringify(jobsArray), (err) => {
      if (err) Logger.error(err);
    });
  }
}
