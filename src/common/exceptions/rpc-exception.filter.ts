import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

interface ExceptionObject {
  statusCode: number;
  message: string;
}

@Catch(RpcException, BadRequestException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    console.log('Custom Exception Filter');

    const rpcError = exception.getError() as ExceptionObject;
    const name = exception.name;
    const message = exception.message.substring(
      0,
      exception.message.indexOf('(') - 1,
    );
    console.log({ name, message });

    if (
      message.includes(
        'Empty response. There are no subscribers listening to that message',
      )
    ) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message,
      });
    }

    const statusCode = rpcError.statusCode;
    response.status(statusCode).json({
      statusCode,
      message: rpcError.message,
    });
  }
}
