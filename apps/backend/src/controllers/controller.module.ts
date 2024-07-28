import { Module } from '@nestjs/common';
import { JobController } from './jobs.controller';
import { ServicesModule } from '../services/services.module';
import { JobsService } from '../services/jobs.service';
import { HelperService } from '../helpers/helper.service';

@Module({
  imports: [ServicesModule],
  controllers: [JobController],
  providers: [JobsService, HelperService],
})
export class ControllerModule {}
