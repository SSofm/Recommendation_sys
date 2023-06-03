import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

// SRC
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

// CORE
import { ApiCreateOperation } from '@core/docs/swagger.decorator';

// SHARED
import { LoginAuthDto } from '@shared/dtos/users/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiCreateOperation({
    summary: 'Login',
  })
  async login(@Body() body: LoginAuthDto) {
    return this.authService.login(body);
  }

  @Post('register')
  @ApiCreateOperation({
    summary: 'Create new user',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto);
  }
}
