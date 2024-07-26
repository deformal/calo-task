import { Module } from '@nestjs/common';
import { JobController } from './jobs.controller';
import { ServicesModule } from 'src/services/services.module';
import { JobsService } from '@calo-task/service';
import { HelperService } from 'src/helpers/helper.service';

@Module({
  imports: [ServicesModule],
  controllers: [JobController],
  providers: [JobsService, HelperService],
})
export class ControllerModule {}
