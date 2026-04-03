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
  fecha!: string;

  @IsString()
  @IsNotEmpty()
  tipo!: string;

  @IsNumber()
  @Min(0)
  monto!: number;
}
