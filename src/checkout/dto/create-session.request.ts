/* eslint-disable prettier/prettier */

import { IsNumber } from "class-validator";

/* eslint-disable prettier/prettier */
export class createSessionRequest {
	@IsNumber()
	productId: number;
}