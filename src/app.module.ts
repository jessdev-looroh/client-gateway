import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { NatsModule } from './transports/nats.module';
import { PaymentsModule } from './payments/payments.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ProductsModule, 
    OrdersModule, 
    NatsModule, 
    PaymentsModule, 
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor() {
    console.log('AppModule constructor');
  }
}
