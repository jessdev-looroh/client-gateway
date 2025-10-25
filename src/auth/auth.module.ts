import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
// import { DataMigrationService } from './services/data-migration.service';
import { NatsModule } from 'src/transports/nats.module';

import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtGuard } from './guards/jwt.guard';
// import { RolesGuard } from './guards/roles.guard';
import { envs } from 'src/config';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: envs.jwtAccessSecret,
      signOptions: {
        expiresIn: envs.jwtAccessExp,
      },
    }),
    NatsModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    // DataMigrationService,
    JwtStrategy,
    JwtGuard,
    // RolesGuard,
  ],
  // exports: [AuthService, JwtGuard, RolesGuard],
  
})
export class AuthModule {}
