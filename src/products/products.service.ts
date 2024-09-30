import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('ProductsService');

  onModuleInit() {
    this.$connect();
    this.logger.log('Database connected');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('Database disconnected');
  }

  create(createProductDto: CreateProductDto) {
    return this.product.create({
      data: createProductDto
    });
  }

  async findAll(paginationDto: PaginationDto) {

    const { page, limit } = paginationDto;

    const totalProducts = await this.product.count({ where: { available: true } });
    const lastPage = Math.ceil(totalProducts / limit);
    const skip = (page - 1) * limit;

    const data = await this.product.findMany({
      take: limit,
      skip,
      where: { available: true },
    })

    return {
      data,
      meta: {
        total: totalProducts,
        page,
        lastPage,
        hasMore: page < lastPage
      }
    }
  }

  async findOne(id: number) {

    const product = await this.product.findFirst({
      where: { id, available: true },
    })

    if (!product) {

      throw new RpcException({
        message: `Product with id #${id} not found`,
        status: HttpStatus.BAD_REQUEST
      });
    }

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: __, ...data } = updateProductDto;

    await this.findOne(id);

    return this.product.update({
      where: { id },
      data: data,
    })
  }

  async remove(id: number) {

    await this.findOne(id);

    const product = await this.product.update({
      where: { id },
      data: { available: false },
    })

    return product;
  }

  async validateProducts(ids: number[]) {

    ids = Array.from( new Set(ids) );

    const products = await this.product.findMany({
      where: {
        id: {
          in: ids,
        }
      }
    })

    if ( products.length !== ids.length ) {
      throw new RpcException({
        message: 'some products were not found',
        status: HttpStatus.BAD_REQUEST,
      })
    }

    return products;
  }
}