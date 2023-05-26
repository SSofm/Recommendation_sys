import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(User)
    protected readonly repositoryUser: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
}
