import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { NATS_SERVICE } from 'src/config';
import { LoginUserDto, RegisterUserDto } from './dto';
import { AuthService } from './services/auth.service';
import { JwtGuard } from './guards/jwt.guard';
import { Public } from './decorators/public.decorator';
// import { CurrentUser } from './decorators/current-user.decorator';
// import { AllowAnonymous } from './decorators/anonymous.decorator';

@Controller('auth')
@UseGuards(JwtGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Public()
  async registerUser(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.registerUser(registerUserDto);
  }

  @Post('login')
  @Public()
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto);
  }

  @Post('refresh')
  @Public()
  async refreshToken(@Body('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }

  // @Get('profile')
  // async getProfile(@CurrentUser() user: any) {
  //   return {
  //     user: {
  //       id: user.id,
  //       email: user.email,
  //       roles: user.roles,
  //       provider: user.provider,
  //     },
  //   };
  // }

  // @Post('anonymous')
  // @Public()
  // async generateAnonymousToken() {
  //   return this.authService.generateAnonymousToken();
  // }

  // @Post('convert')
  // @Public()
  // async convertAnonymousUser(@Body() convertUserDto: ConvertUserDto) {
  //   return this.authService.convertAnonymousUser(convertUserDto);
  // }

  // @Get('can-convert')
  // @Public()
  // async canConvertToken(@Body('token') token: string) {
  //   return this.authService.canConvertToken(token);
  // }

  // @Get('anonymous-id')
  // @Public()
  // async getAnonymousUserId(@Body('token') token: string) {
  //   return this.authService.getAnonymousUserId(token);
  // }
}
