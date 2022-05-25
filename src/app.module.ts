import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';
import { AuthModue } from './modules/auth/auth.module';
import { DocumentsModule } from './modules/documents/documents.module';
import { PrismaService } from './providers/prisma.service';

@Module({
  imports: [
    AuthModue,
    DocumentsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
