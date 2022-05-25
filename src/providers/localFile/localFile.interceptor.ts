import { Injectable, mixin, NestInterceptor, Type } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';

interface LocalFilesInterceptorOptions {
  fieldName: string;
  fileName: any;
  path?: string;
  fileFilter?: MulterOptions['fileFilter'];
  limits?: MulterOptions['limits'];
}

function LocalFilesInterceptor(
  options: LocalFilesInterceptorOptions,
): Type<NestInterceptor> {
  @Injectable()
  class Interceptor implements NestInterceptor {
    fileInterceptor: NestInterceptor;
    constructor(configService: ConfigService) {
      const filesDestination = configService.get('UPLOADED_FILE_DESTINATION');
      const destination = `${filesDestination}`;
      const multerOptions: MulterOptions = {
        storage: diskStorage({
          destination,
          filename: options.fileName,
        }),
        fileFilter: options.fileFilter,
        limits: options.limits,
      };
      this.fileInterceptor = new (FileInterceptor(
        options.fieldName,
        multerOptions,
      ))();
    }
    intercept(...args: Parameters<NestInterceptor['intercept']>) {
      return this.fileInterceptor.intercept(...args);
    }
  }
  return mixin(Interceptor);
}

export default LocalFilesInterceptor;
