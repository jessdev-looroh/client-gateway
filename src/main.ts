import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { RpcCustomExceptionFilter } from './common';
import { RpcExceptionInterceptor } from './common/interceptors/rpc-exception.interceptor';
import { UnauthorizedExceptionFilter } from './common/filters/unauthorized-exception.filter';

async function bootstrap() {
  const logger = new Logger('Main-Gateway');
  console.log('Main-Gateway constructor');
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
  });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(
    new RpcCustomExceptionFilter(),
    new UnauthorizedExceptionFilter(),
  );
  app.useGlobalInterceptors(new RpcExceptionInterceptor());
  await app.listen(envs.port);
  logger.log(`Gateway is running on port: ${envs.port}`);
}
bootstrap();
