import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { RegisterDto } from './dtos/register.dto';
@Injectable()
export class SsoService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(data: RegisterDto) {
    const { email, password } = data;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = this.userRepository.create({
      email,
      password: hashedPassword,
    });

    await this.userRepository.save(newUser);
    return { success: true, message: 'User created successfully' };
  }
}
