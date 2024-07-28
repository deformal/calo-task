import { Injectable, Logger } from '@nestjs/common';
import { JOB } from '@calo/types';
import { existsSync, readFileSync, writeFile } from 'fs';
import axios from 'axios';
import { UUID, randomInt } from 'crypto';

@Injectable()
export class HelperService {
  private jobsFilePath = 'data/jobs.json';
  private picturePath = 'data/pictures';
  private uplashUrl: string =
    process.env.UPLASH_URL ||
    'https://api.unsplash.com/photos/random?topics=xjPR4hlkBGA&count=30&client_id=mT7cPGLbbA49efXQZNrdsq86EUavMq2j-nCDFXQS_pU';

  async getJobList(): Promise<JOB[]> {
    const data = readFileSync(this.jobsFilePath, 'utf-8');
    const jobsArray: JOB[] = JSON.parse(data);
    return jobsArray;
  }

  private generateRandomSeconds(): number {
    const randomNumber: number = randomInt(5000, 300000);
    const seconds: number = Math.round(randomNumber / 5000) * 5000;
    return seconds;
  }

  async downloadRandomFoodPicture(id: UUID) {
    const data = await axios.get(this.uplashUrl, {
      data: { count: 30 },
    });
    const numberOfImages: number = data.data.length;
    const randomNumber: number = randomInt(0, numberOfImages - 1);
    const s3FileLink = data.data[randomNumber].urls.small_s3;
    const resData = await axios.get(s3FileLink, {
      responseType: 'arraybuffer',
    });
    const picPath = `${this.picturePath}/${id}.jpeg`;
    writeFile(picPath, resData.data, (err) => {
      if (err) Logger.error(err);
    });
  }

  async savePicture(id: UUID) {
    const seconds = this.generateRandomSeconds();
    console.log(seconds);
    setTimeout(() => this.downloadRandomFoodPicture(id), seconds);
    const newJobData: JOB = { id: id };
    const jobsArray: JOB[] = await this.getJobList();
    jobsArray.push(newJobData);
    writeFile(this.jobsFilePath, JSON.stringify(jobsArray), (err) => {
      if (err) Logger.error(err);
    });
  }

  checkForPictureWithId(id: UUID): string | null {
    const filePath = `${this.picturePath}/${id}.jpeg`;
    const isFileFound: string | null = existsSync(filePath) ? filePath : null;
    return isFileFound;
  }
}
