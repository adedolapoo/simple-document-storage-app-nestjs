import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class ApiKeyGaurd extends AuthGuard('api-key') {}
