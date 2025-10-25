import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { AppError } from '../interfaces/app-error.interface';

@Catch(UnauthorizedException, ForbiddenException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const timestamp = new Date().toLocaleString('es-PE', {
      timeZone: 'America/Lima',
    });
    const statusCode = exception.getStatus();
    const error: AppError = {
      statusCode,
      ...this.getErrorMessage(exception.getStatus()),
      context: 'Gateway',
      timestamp,
    };

    return response.status(error.statusCode).json({
      success: false,
      error,
    });
  }

  getErrorMessage(statusCode: number) {
    switch (statusCode) {
      case HttpStatus.UNAUTHORIZED:
        return {
          code: 'UNAUTHORIZED',
          message:
            'Access denied. Authentication is required to access this resource.',
          details: ['The provided token is missing, invalid, or has expired.'],
        };

      case HttpStatus.FORBIDDEN:
        return {
          code: 'FORBIDDEN',
          message:
            'Access forbidden. You do not have permission to perform this action.',
          details: [
            'Your current role does not grant access to this resource.',
          ],
        };
      default:
        return {
          message: 'Status not handler, please contact with admin',
          details: [],
        };
    }
  }
}
