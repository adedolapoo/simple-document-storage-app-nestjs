import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

// implement swagger docs later
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.enableCors();
  const configService = app.get(ConfigService);
  const port = configService.get('port');
  await app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

bootstrap();
