import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  ParseUUIDPipe,
  Query,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { CreateOrderDto, OrderPaginationDto } from './dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { StatusDto } from './dto/status.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
// import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
// import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('orders')
@UseGuards(JwtGuard) //, RolesGuard)
export class OrdersController {
  constructor(
    @Inject(NATS_SERVICE)
    private client: ClientProxy,
  ) {}

  @Post()
  // @Roles('CONSUMER', 'ADMIN')
  async create(
    @Body() createOrderDto: CreateOrderDto, //, @CurrentUser() user: any
  ) {
    try {
      const order = await firstValueFrom(
        this.client.send('createOrder', { ...createOrderDto }), //, userId: user.id }),
      );
      return order;
    } catch (err) {
      throw new RpcException(err);
    }
  }

  @Get()
  // @Roles('ADMIN', 'WAITER', 'COOK')
  async findAll(@Query() paginationDto: OrderPaginationDto) {
    try {
      const orders = await firstValueFrom(
        this.client.send('findAllOrders', paginationDto),
      );
      return orders;
    } catch (err) {
      throw new RpcException(err);
    }
  }

  @Get('id/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const order = await firstValueFrom(
        this.client.send('findOneOrder', { id }),
      );
      return order;
    } catch (err) {
      throw new RpcException(err);
    }
  }
  @Get(':status')
  async findAllByStatus(
    @Param() statusDto: StatusDto,
    @Query() paginationDto: PaginationDto,
  ) {
    try {
      return this.client.send('findAllOrders', {
        ...paginationDto,
        status: statusDto.status,
      });
    } catch (err) {
      throw new RpcException(err);
    }
  }

  @Patch(':id')
  // @Roles('ADMIN', 'WAITER', 'COOK')
  changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDto: StatusDto,
  ) {
    try {
      return this.client.send('changeOrderStatus', { id, ...statusDto });
    } catch (err) {
      throw new RpcException(err);
    }
  }
}
