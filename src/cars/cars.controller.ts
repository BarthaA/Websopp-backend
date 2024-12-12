import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  create(@Body() createCarDto: CreateCarDto) {
    return this.carsService.create(createCarDto);
  }

  @Get()
  async findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return await this.carsService.findAll(+page, +limit);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const car = await this.carsService.findOne(+id);
    if (!car) throw new HttpException('Car not found', HttpStatus.NOT_FOUND);
    return car;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return await this.carsService.update(+id, updateCarDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const success = await this.carsService.remove(+id);
    if (!success) throw new HttpException('Car not found', HttpStatus.NOT_FOUND);
    return { message: 'Car successfully removed' };
  }

  @Post('/cart/:id')
  addToCart(@Param('id') id: string) {
    return this.carsService.addToCart(+id);
  }

  @Get('/cart')
  getCart() {
    return this.carsService.getCart();
  }
}
