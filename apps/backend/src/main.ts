import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { AllExceptionsFilter } from './exceptions/allExceptionFilter';
config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter(new HttpAdapterHost()));
  app.enableCors({ origin: '*' });
  await app.listen(3000);
}
bootstrap();
