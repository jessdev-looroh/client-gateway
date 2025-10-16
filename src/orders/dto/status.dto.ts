import { IsEnum, IsOptional } from 'class-validator';
import { OrderStatus } from '../enum/order.enum';

export class StatusDto {
  @IsOptional()
  @IsEnum(OrderStatus, {
    message: 'Status must be a valid order status'
  })
  status: OrderStatus;
}
