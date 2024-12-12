import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCarDto {
  @IsString()
  @IsNotEmpty()
  brand: string;
  
  @IsString()
  @IsNotEmpty()
  model: string;

  @IsString()
  @IsNotEmpty()
  fuel: string;

  @IsNumber()
  @IsNotEmpty()
  power: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
