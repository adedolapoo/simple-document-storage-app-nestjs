import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Document } from '@prisma/client';
import { randomFixedInteger } from 'src/utils/helpers/functions';
import { PrismaService } from 'src/providers/prisma.service';
import { UploadFileResponse } from './interface/document.interface';

@Injectable()
export class DocumentsService {
  constructor(private prisma: PrismaService) {}

  async uploadFile(
    uploadData: Prisma.DocumentCreateInput,
  ): Promise<UploadFileResponse> {
    const reference = randomFixedInteger(4);
    const data = await this.prisma.document.create({
      data: { ...uploadData, reference },
    });
    return {
      success: 'File Uploaded Successfully',
      data,
    };
  }

  async getFileById({ reference }) {
    const file = await this.prisma.document.findFirst({
      where: {
        reference: reference,
      },
    });
    if (!file) {
      throw new NotFoundException();
    }
    return file;
  }
}
