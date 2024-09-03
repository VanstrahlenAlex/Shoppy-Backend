/* eslint-disable prettier/prettier */

import { Controller, Get } from "@nestjs/common";

@Controller('api/products')
export class HealthController {
	@Get()
	health() {
		return true;
	}
}