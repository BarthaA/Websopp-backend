import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { PrismaService } from '../prisma.service';
import { Car } from './entities/car.entity';
import mysql from 'mysql2/promise';

@Injectable()
export class CarsService {
  conn: mysql.Pool;
  DB: PrismaService;
  private cart: Car[] = [];

  constructor(DB: PrismaService) {
    this.DB = DB;
  }

  async create(createCarDto: CreateCarDto) {
    return await this.DB.cars.create({ data: createCarDto });
  }

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const total = await this.DB.cars.count();
    const data = await this.DB.cars.findMany({ skip, take: limit });
    return { data, currentPage: page, totalPages: Math.ceil(total / limit) };
  }

  async findOne(id: number) {
    return await this.DB.cars.findUnique({ where: { id } });
  }

  async update(id: number, data: UpdateCarDto) {
    return await this.DB.cars.update({ where: { id }, data });
  }

  async remove(id: number) {
    try {
      await this.DB.cars.delete({ where: { id } });
      return { message: 'Car deleted successfully' };
    }
    catch {
      return { message: 'Car not found' };
    }
  }

  async addToCart(carId: number) {
      const car = await this.DB.cars.findUnique({ where: { id: carId } });
      if (!car) {
        throw new Error(`Car with ID ${carId} does not exist.`);
      }
      this.cart.push(car);
      return { message: `Car with ID ${carId} added to cart`, cart: this.cart };
    }

  getCart() {
    return this.cart;
  }

  async deleteFromCart(carId: number) {
    try {
      await this.cart.splice(carId)
    }
    catch {
      return { message: 'Valami nemjo...😢' };
    }
  }
}
