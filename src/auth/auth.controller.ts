/* eslint-disable prettier/prettier */
import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from '@prisma/client';
import { CurrentUser } from './current-user.decorator';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
	constructor( private authService: AuthService){

	}
	@UseGuards(LocalAuthGuard)
	@Post('login')
	login(
		@CurrentUser() user: User,
		@Res({ passthrough: true}) response: Response
	){
		return this.authService.login(user, response);
	}
}
