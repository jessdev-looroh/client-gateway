import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { AppError } from '../interfaces/app-error.interface';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    console.error('[Client-Gateway-Exception-Filter]', exception);
    const error = this.parseRpcError(exception);
    return this.sendErrorResponse(response, error);
  }

  private parseRpcError(exception: RpcException): AppError {
    const rawError = exception.getError();
    console.log('ParseRpcError');
    console.log(exception);
    const timestamp = new Date().toLocaleString('es-PE', {
      timeZone: 'America/Lima',
    });
    if (
      exception.message.includes('Empty response. There are no subscribers')
    ) {
      return {
        statusCode: HttpStatus.SERVICE_UNAVAILABLE,
        code: 'SERVICE_UNAVAILABLE',
        message: 'El servicio no está disponible temporalmente',
        timestamp,
        context: 'Gateway',
      };
    }

    
    if (typeof rawError === 'object' && rawError !== null)
      return rawError as AppError;

    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      code: 'RPC_UNKNOWN_ERROR',
      message:
        typeof rawError === 'string' ? rawError : 'Error RPC desconocido',
      timestamp,
      context: 'Gateway',
    };
  }

  private sendErrorResponse(res: any, error: AppError) {
    return res.status(error.statusCode).json({
      success: false,
      error,
    });
  }
}
