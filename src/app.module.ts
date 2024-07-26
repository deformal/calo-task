import { Module } from '@nestjs/common';
import { JobController } from './controllers/jobs.controller';
import { JobsService } from '@calo-task/service';
import { HelperService } from './helpers/helper.service';

@Module({
  imports: [],
  controllers: [JobController],
  providers: [JobsService, HelperService],
})
export class AppModule {}
