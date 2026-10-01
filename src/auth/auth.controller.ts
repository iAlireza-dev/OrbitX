import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { JwtAuthGuard } from './jwt-auth.guard.js';
import { RefreshTokenDto } from './dto/refresh-token.dto.js';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(ThrottlerGuard)
  @Throttle({
    default: {
      limit: 3,
      ttl: 60_000,
    },
  })
  @Post('register')
  register(@Body() data: RegisterDto) {
    return this.authService.register(data);
  }

  @UseGuards(ThrottlerGuard)
  @Throttle({
    default: {
      limit: 5,
      ttl: 60_000,
    },
  })
  @Post('login')
  login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }

  @UseGuards(ThrottlerGuard)
  @Throttle({
    default: {
      limit: 10,
      ttl: 60_000,
    },
  })
  @Post('refresh')
  refresh(@Body() data: RefreshTokenDto) {
    return this.authService.refresh(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Req() request: any) {
    return request.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@Req() request: any) {
    return this.authService.logout(request.user.userId);
  }
}
