// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Param,
//   Inject,
//   ParseUUIDPipe,
//   Query,
//   Patch,
//   UseGuards,
// } from '@nestjs/common';
// import { CreateOrderDto, OrderPaginationDto } from './dto';
// import { ClientProxy, RpcException } from '@nestjs/microservices';
// import { NATS_SERVICE } from 'src/config';
// import { firstValueFrom } from 'rxjs';
// import { StatusDto } from './dto/status.dto';
// import { FlexibleGuard } from '../auth/guards/flexible.guard';
// import { Roles } from '../auth/decorators/roles.decorator';
// import { AllowAnonymous } from '../auth/decorators/anonymous.decorator';
// import { CurrentUser } from '../auth/decorators/current-user.decorator';

// /**
//  * Example controller showing how to handle anonymous users in purchase flow
//  */
// @Controller('orders')
// @UseGuards(FlexibleGuard) // ← Allows both authenticated and anonymous users
// export class OrdersController {
//   constructor(
//     @Inject(NATS_SERVICE)
//     private client: ClientProxy,
//   ) {}

//   /**
//    * Create order - allows both registered and anonymous users
//    * Anonymous users get a temporary token for the purchase flow
//    */
//   @Post()
//   @AllowAnonymous() // ← Allows anonymous users
//   async create(
//     @Body() createOrderDto: CreateOrderDto, 
//     @CurrentUser() user: any
//   ) {
//     try {
//       const order = await firstValueFrom(
//         this.client.send('createOrder', { 
//           ...createOrderDto, 
//           userId: user.id,
//           isAnonymous: user.isAnonymous || false,
//           userEmail: user.email || null,
//         }),
//       );
//       return order;
//     } catch (err) {
//       throw new RpcException(err);
//     }
//   }

//   /**
//    * Get user's orders - works for both registered and anonymous users
//    * Anonymous users can only see their current session orders
//    */
//   @Get('my-orders')
//   @AllowAnonymous() // ← Allows anonymous users
//   async findMyOrders(
//     @CurrentUser() user: any,
//     @Query() paginationDto: OrderPaginationDto
//   ) {
//     try {
//       const orders = await firstValueFrom(
//         this.client.send('findOrdersByUser', { 
//           userId: user.id,
//           isAnonymous: user.isAnonymous || false,
//           ...paginationDto 
//         }),
//       );
//       return orders;
//     } catch (err) {
//       throw new RpcException(err);
//     }
//   }

//   /**
//    * Get all orders - only for staff (requires authentication)
//    */
//   @Get()
//   @Roles('ADMIN', 'WAITER', 'COOK') // ← Requires authentication
//   async findAll(@Query() paginationDto: OrderPaginationDto) {
//     try {
//       const orders = await firstValueFrom(
//         this.client.send('findAllOrders', paginationDto),
//       );
//       return orders;
//     } catch (err) {
//       throw new RpcException(err);
//     }
//   }

//   /**
//    * Update order status - only for staff
//    */
//   @Patch(':id')
//   @Roles('ADMIN', 'WAITER', 'COOK') // ← Requires authentication
//   changeStatus(
//     @Param('id', ParseUUIDPipe) id: string,
//     @Body() statusDto: StatusDto,
//   ) {
//     try {
//       return this.client.send('changeOrderStatus', { id, ...statusDto });
//     } catch (err) {
//       throw new RpcException(err);
//     }
//   }
// }
