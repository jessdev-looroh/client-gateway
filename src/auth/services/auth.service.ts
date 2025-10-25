import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { NATS_SERVICE } from '../../config';
import { LoginUserDto, RegisterUserDto } from '../dto';
// import { DataMigrationService } from './data-migration.service';

/**
 * Authentication service for the client gateway
 * Handles communication with auth-ms for authentication operations
 */
@Injectable()
export class AuthService {
  constructor(
    @Inject(NATS_SERVICE)
    private readonly client: ClientProxy,
    // private readonly dataMigrationService: DataMigrationService,
  ) {}

  /**
   * Registers a new user
   * @param registerUserDto - User registration data
   * @returns User data with JWT tokens
   */
  async registerUser(registerUserDto: RegisterUserDto) {
    try {
      return await firstValueFrom(
        this.client.send('auth.register.user', registerUserDto),
      );
    } catch (error) {
      throw new UnauthorizedException('Registration failed');
    }
  }

  /**
   * Logs in a user
   * @param loginUserDto - User login credentials
   * @returns User data with JWT tokens
   */
  async loginUser(loginUserDto: LoginUserDto) {
    try {
      return await firstValueFrom(
        this.client.send('auth.login.user', loginUserDto),
      );
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  /**
   * Verifies a JWT token with the auth service
   * @param token - JWT token to verify
   * @returns User information from token
   */
  async verifyToken(token: string) {
    try {
      return await firstValueFrom(
        this.client.send('auth.verify.user', token),
      );
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  /**
   * Refreshes an access token
   * @param refreshToken - Valid refresh token
   * @returns New access token
   */
  async refreshToken(refreshToken: string) {
    try {
      return await firstValueFrom(
        this.client.send('auth.refresh.token', refreshToken),
      );
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  // /**
  //  * Generates an anonymous token for unregistered users
  //  * @returns Anonymous user data with temporary token
  //  */
  // async generateAnonymousToken() {
  //   try {
  //     return await firstValueFrom(
  //       this.client.send('auth.anonymous.token', {}),
  //     );
  //   } catch (error) {
  //     throw new UnauthorizedException('Failed to generate anonymous token');
  //   }
  // }

  // /**
  //  * Converts an anonymous user to a registered user
  //  * @param convertUserDto - Conversion data
  //  * @returns New user data with real tokens
  //  */
  // async convertAnonymousUser(convertUserDto: any) {
  //   try {
  //     // 1. Convert the user in auth-ms
  //     const conversionResult = await firstValueFrom(
  //       this.client.send('auth.convert.anonymous', convertUserDto),
  //     );

  //     // 2. Get the anonymous user ID for data migration
  //     const anonymousUserId = await this.getAnonymousUserId(convertUserDto.anonymousToken);

  //     // 3. Migrate user data across microservices
  //     if (anonymousUserId) {
  //       await this.dataMigrationService.migrateUserData(anonymousUserId, conversionResult.user.id);
  //     }

  //     return conversionResult;
  //   } catch (error) {
  //     throw new UnauthorizedException('Failed to convert anonymous user');
  //   }
  // }

  // /**
  //  * Validates if a token can be converted from anonymous to registered
  //  * @param token - Token to validate
  //  * @returns Boolean indicating if conversion is possible
  //  */
  // async canConvertToken(token: string) {
  //   try {
  //     return await firstValueFrom(
  //       this.client.send('auth.can.convert', token),
  //     );
  //   } catch (error) {
  //     return false;
  //   }
  // }

  // /**
  //  * Gets the anonymous user ID from a token
  //  * @param token - Anonymous token
  //  * @returns Anonymous user ID
  //  */
  // async getAnonymousUserId(token: string) {
  //   try {
  //     return await firstValueFrom(
  //       this.client.send('auth.get.anonymous.id', token),
  //     );
  //   } catch (error) {
  //     return null;
  //   }
  // }
}
