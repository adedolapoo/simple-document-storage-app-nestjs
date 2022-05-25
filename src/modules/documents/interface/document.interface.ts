import { Document } from '@prisma/client';

export interface UploadFileResponse {
  success: string;
  data: Document;
}
