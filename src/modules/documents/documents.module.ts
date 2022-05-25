import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { PrismaService } from 'src/providers/prisma.service';

@Module({
  imports: [],
  controllers: [DocumentsController],
  providers: [DocumentsService, PrismaService],
})
export class DocumentsModule {}
