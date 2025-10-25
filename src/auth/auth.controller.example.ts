// import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
// import { ClientProxy, RpcException } from '@nestjs/microservices';
// import { firstValueFrom } from 'rxjs';
// import { NATS_SERVICE } from 'src/config';
// import { LoginUserDto, RegisterUserDto, ConvertUserDto } from './dto';
// import { AuthService } from './services/auth.service';
// import { JwtGuard } from './guards/jwt.guard';
// import { Public } from './decorators/public.decorator';
// import { CurrentUser } from './decorators/current-user.decorator';
// import { AllowAnonymous } from './decorators/anonymous.decorator';

// /**
//  * Example controller showing the complete anonymous user flow
//  */
// @Controller('auth')
// @UseGuards(JwtGuard)
// export class AuthController {
//   constructor(
//     @Inject(NATS_SERVICE)
//     private readonly client: ClientProxy,
//     private readonly authService: AuthService,
//   ) {}

//   /**
//    * Step 1: Generate anonymous token for new users
//    * POST /auth/anonymous
//    * Body: {}
//    * Response: { user: {...}, accessToken: "...", expiresIn: 3600 }
//    */
//   @Post('anonymous')
//   @Public()
//   async generateAnonymousToken() {
//     return this.authService.generateAnonymousToken();
//   }

  // /**
  //  * Step 2: User can make purchases with anonymous token
  //  * All order endpoints will work with anonymous token
  //  */

  // /**
  //  * Step 3: Convert anonymous user to registered user
  //  * POST /auth/convert
  //  * Body: {
  //  *   "anonymousToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  //  *   "name": "John Doe",
  //  *   "email": "john@example.com",
  //  *   "password": "SecurePass123!"
  //  * }
  //  * Response: { user: {...}, accessToken: "...", refreshToken: "..." }
  //  */
  // @Post('convert')
  // @Public()
  // async convertAnonymousUser(@Body() convertUserDto: ConvertUserDto) {
  //   return this.authService.convertAnonymousUser(convertUserDto);
  // }

  // /**
  //  * Check if a token can be converted
  //  * GET /auth/can-convert
  //  * Body: { "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }
  //  * Response: true/false
  //  */
  // @Get('can-convert')
  // @Public()
  // async canConvertToken(@Body('token') token: string) {
  //   return this.authService.canConvertToken(token);
  // }

  // /**
  //  * Get anonymous user ID for data migration
  //  * GET /auth/anonymous-id
  //  * Body: { "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }
  //  * Response: "anon_123456789"
  //  */
  // @Get('anonymous-id')
  // @Public()
  // async getAnonymousUserId(@Body('token') token: string) {
  //   return this.authService.getAnonymousUserId(token);
  // }

  // /**
  //  * Regular login for registered users
  //  * POST /auth/login
  //  * Body: { "email": "user@example.com", "password": "password123" }
  //  */
  // @Post('login')
  // @Public()
  // async loginUser(@Body() loginUserDto: LoginUserDto) {
  //   return this.authService.loginUser(loginUserDto);
  // }

  // /**
  //  * Regular registration for new users
  //  * POST /auth/register
  //  * Body: { "name": "John Doe", "email": "john@example.com", "password": "SecurePass123!" }
  //  */
  // @Post('register')
  // @Public()
  // async registerUser(@Body() registerUserDto: RegisterUserDto) {
  //   return this.authService.registerUser(registerUserDto);
  // }

//   /**
//    * Get user profile (requires authentication)
//    * GET /auth/profile
//    * Headers: { "Authorization": "Bearer <token>" }
//    */
//   @Get('profile')
//   async getProfile(@CurrentUser() user: any) {
//     return {
//       user: {
//         id: user.id,
//         // email: user.email,
//         roles: user.roles,
//         provider: user.provider,
//         isAnonymous: user.isAnonymous || false,
//       },
//     };
//   }
// }
