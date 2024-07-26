import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { HelperModule } from 'src/helpers/helper.module';
import { HelperService } from 'src/helpers/helper.service';

@Module({
  imports: [HelperModule],
  providers: [JobsService, HelperService],
})
export class ServicesModule {}
