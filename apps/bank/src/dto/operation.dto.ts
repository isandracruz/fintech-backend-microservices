import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsISO8601,
  Min,
  IsNotEmpty,
} from 'class-validator';

export class OperationDto {
  @ApiProperty({
    example: '2024-06-01T12:00:00Z',
    description:
      'The date and time when the operation was created (ISO 8601 format)',
  })
  @IsISO8601()
  @IsNotEmpty()
  createdAt?: string;

  @ApiProperty({
    example: 'DEPOSIT',
    description: 'The type of the operation',
  })
  @IsString()
  @IsNotEmpty()
  operationType!: string;

  @ApiProperty({
    example: 100.5,
    description: 'The amount of the operation',
  })
  @IsNumber()
  @Min(0)
  amount!: number;
}
