import {
  Controller,
  UseGuards,
  Post,
  Body,
  Get,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { LoginResponseDto } from 'src/application/dtos/auth/login-response.dto';
import { LoginDto } from 'src/application/dtos/auth/login.dto';
import { JwtAuthGuard } from 'src/infrastructure/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/infrastructure/auth/guards/local-auth.guard';
import { LoginUseCase } from 'src/use-cases/auth/login.usecase';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @ApiOperation({ summary: 'User login' })
  @ApiResponse({
    status: 200,
    description: 'Returns JWT token',
    type: LoginResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return this.loginUseCase.execute(loginDto);
  }

  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, description: 'Returns user profile' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
