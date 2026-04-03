import {
  IsString,
  IsNumber,
  IsISO8601,
  Min,
  IsNotEmpty,
} from 'class-validator';

export class OperationDto {
  @IsISO8601()
  @IsNotEmpty()
  createdAt?: string;

  @IsString()
  @IsNotEmpty()
  operationType!: string;

  @IsNumber()
  @Min(0)
  amount!: number;
}
