import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PRODUCTS_SERVICE } from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCTS_SERVICE)
    private readonly productsClient: ClientProxy,
  ) {}

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsClient.send({ cmd: 'create' }, createProductDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Get()
  getProducts(@Query() paginationDto: PaginationDto) {
    return this.productsClient.send({ cmd: 'find-all' }, paginationDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }



    
  @Get(':id')
  async getProduct(@Param('id') id: string) {
    return this.productsClient.send({ cmd: 'find-one' }, { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Patch(':id')
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsClient
      .send({ cmd: 'update' }, { id,  ...updateProductDto })
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productsClient.send({ cmd: 'delete' }, { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }
}
