/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProductsGateway } from './products.gateway';
import { AuthModule } from 'src/auth/auth.module';

@Module({
	imports: [PrismaModule, AuthModule],
	controllers: [ProductsController],
	providers: [ProductsService, ProductsGateway],
	exports: [ProductsService]
})
export class ProductsModule {}
