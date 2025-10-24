import { Body, Controller, Get, Inject, Post, Req, Res } from '@nestjs/common';
import { PaymentSessionDto } from './dto/payment-session.dto';
import { Request, Response } from 'express';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { firstValueFrom } from 'rxjs';
import { WebhookDataDto } from './dto/webhook-data.dto';

@Controller('payments')
export class PaymentsController {
  constructor(
    @Inject(NATS_SERVICE)
    private readonly client: ClientProxy,
  ) {}

  @Post('create-payment-session')
  async createPaymentSession(@Body() paymentSessionDto: PaymentSessionDto) {
    try {
      const resp = await firstValueFrom(
        this.client.send('create.payment.session', paymentSessionDto),
      );
      return resp;
    } catch (err) {
      throw new RpcException(err);
    }
  }

  @Get('success')
  async success() {
    try {
      const resp = await firstValueFrom(
        this.client.send('payments.success', {}),
      );
      return resp;
    } catch (err) {
      throw new RpcException(err);
    }
  }
  @Get('cancel')
  async cancel() {
    try {
      const resp = await firstValueFrom(
        this.client.send('payments.cancel', {}),
      );
      return resp;
    } catch (err) {
      throw new RpcException(err);
    }
  }

  @Post('webhook')
  async stripWebhook(@Req() req: Request, @Res() res: Response) {
    try {
      
      const rawBodyBuffer = req['rawBody'] as Buffer;
      const rawBodyBase64 = rawBodyBuffer.toString('base64');

      const webhookDataDto: WebhookDataDto = {
        rawBody: rawBodyBase64,
        stripeSignature: `${req.headers['stripe-signature']}`,
      };

      const resp = await firstValueFrom(
        this.client.send('payments.stripe.webhook', webhookDataDto),
      );

      return res.status(200).json(resp);
    } catch (err) {
      console.error('Error en webhook:', err);
      throw new RpcException(err);
    }
  }
}
