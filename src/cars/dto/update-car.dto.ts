import { PartialType } from '@nestjs/mapped-types';
import { CreateCarDto } from './create-car.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateCarDto extends PartialType(CreateCarDto) {
  @IsString()
  @IsNotEmpty()
  brand?: string;

  @IsString()
  @IsNotEmpty()
  model?: string;

  @IsString()
  @IsNotEmpty()
  fuel?: string;

  @IsNumber()
  @IsNotEmpty()
  power?: number;

  @IsNumber()
  price?: number;
}
