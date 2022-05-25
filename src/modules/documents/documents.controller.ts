import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { DocumentsService } from './documents.service';
import LocalFilesInterceptor from 'src/providers/localFile/localFile.interceptor';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { getExtension } from 'src/utils/helpers/functions';
import { ApiKeyGaurd } from '../auth/api-key-auth.guard';
import { constants } from '../../utils';
import { ConfigService } from '@nestjs/config';

const { SUCCESS_RESPONSE } = constants;
@Controller('documents')
export class DocumentsController {
  constructor(
    private readonly configService: ConfigService,
    private readonly documentsService: DocumentsService,
  ) {}

  @UseGuards(ApiKeyGaurd)
  @Post('upload')
  @UseInterceptors(
    LocalFilesInterceptor({
      fieldName: 'file',
      fileFilter: (request, file, callback) => {
        const extension = getExtension(file.originalname);
        if (!extension) {
          return callback(
            new BadRequestException('Provide a valid file'),
            false,
          );
        }
        callback(null, true);
      },
      fileName: (request, file, cb) => {
        const uniqueSuffix = Date.now();
        cb(
          null,
          'nogic-storage' + '-' + uniqueSuffix + '-' + file.originalname,
        );
      },
      limits: {
        fileSize: Math.pow(1024, 5), //1MB
      },
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    // return this.documentsService.uploadFile({
    //   path: file.path,
    //   filename: file.originalname,
    //   mimetype: file.mimetype,
    // });
    return {
      message: SUCCESS_RESPONSE,
      name: file.filename,
    };
  }

  @UseGuards(ApiKeyGaurd)
  @Get(':filename')
  async getFileById(
    @Param() { reference }: any,
    @Res({
      passthrough: true,
    })
    response: Response,
  ) {
    // const file = await this.documentsService.getFileById(reference);
    const stream = createReadStream(
      join(
        process.cwd(),
        `${this.configService.get('FILE_DESTINATION')}/${reference}`,
      ),
    );
    response.set({
      'content-Disposition': `inline; filename="${reference}"`,
      // 'content-type': file.mimetype,
    });
    return new StreamableFile(stream);
  }
}
