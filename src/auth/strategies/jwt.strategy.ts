import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { envs } from '../../config';

/**
 * JWT authentication strategy for the client gateway
 * Validates JWT tokens from the Authorization header
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: envs.jwtAccessSecret,
    });
  }

  /**
   * Validates the JWT payload and returns user information
   * @param payload - Decoded JWT payload
   * @returns User object from the token payload
   */
  async validate(payload: any): Promise<any> {
    // The payload is already validated by Passport
    // We can add additional validation here if needed
    console.log('payload', payload);
    return {
      id: payload.sub,
      email: payload.email,
      roles: payload.roles,
      provider: payload.provider,
    };
  }
}
