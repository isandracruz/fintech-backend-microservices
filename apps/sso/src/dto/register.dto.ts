import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email address of the user',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: 'SecurePassword123',
    description: 'The password of the user',
  })
  @IsString()
  @MinLength(6, { message: 'The password must be at least 6 characters long' })
  password!: string;
}
