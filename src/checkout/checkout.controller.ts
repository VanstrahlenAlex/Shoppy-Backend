/* eslint-disable prettier/prettier */
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { createSessionRequest } from './dto/create-session.request';
import { CheckoutService } from './checkout.service';

@Controller('checkout')
export class CheckoutController {
	constructor( private readonly checkoutService: CheckoutService){

	}
	@Post('session')
	@UseGuards(JwtAuthGuard)
	async createSession(
		@Body() request: createSessionRequest
	) {
		return this.checkoutService.createSession(request.productId);
	}

	@Post('webhook')
	async handleCheckoutWebhooks(@Body() event: any) {
		return this.checkoutService.handleCheckoutWebhooks(event)
	}
}
