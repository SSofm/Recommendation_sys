import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

// SHARE
import {
  IResponseLogin,
  IUser,
} from '../../libs/share/src/interfaces/user/user.interface';
import { LoginAuthDto } from '../../libs/share/src/dtos/users/login.dto';
import { User } from '../users/entities/user.entity';
import { TokenService } from '../users/services/token.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private tokenService: TokenService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    return await this.usersService.validateUser(email, password);
  }
  async login(loginDto: LoginAuthDto) {
    const { email, password } = loginDto;
    const user = await this.usersService.checkUser(email);
    if (!user || !user.comparePassword(password))
      throw new UnauthorizedException('Invalid username or password');
    const isPasswordValid: boolean = await this.isPasswordValid(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new HttpException('Wrong password', HttpStatus.NOT_FOUND);
    }
    if (user && isPasswordValid) {
      return this.getToken(user);
    } else {
      throw new UnauthorizedException();
    }
  }

  async createUser(createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  async getToken(user: User): Promise<IResponseLogin> {
    const accessToken = this.jwtService.sign({
      userId: user.id,
      email: user.email,
    });
    return {
      tokenType: 'Bearer',
      accessToken,
      user: user,
    };
  }

  async isPasswordValid(password: string, userPassword: string) {
    return bcrypt.compareSync(password, userPassword);
  }
}
