/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CheckoutModule } from './checkout/checkout.module';
import { HealthController } from './health-controller';



@Module({
	imports: [LoggerModule.forRootAsync({
		imports: [ConfigModule.forRoot()],
		useFactory: (configService: ConfigService) => {
			const isProduction = configService.get('NODE_ENV') === 'production';
			return {
				pinoHttp: {
					transport: isProduction ? undefined : {
						target: 'pino-pretty',
						options: {
							singleLine: true
						}
					},
					level: isProduction ? 'info' : 'debug',
				}
			}
		},
		inject: [ConfigService],
	}), 
		ServeStaticModule.forRoot({
			rootPath: join(__dirname,'..', 'public')
		}),
		ConfigModule.forRoot(), 
		UsersModule, 
		AuthModule, 
		ProductsModule, CheckoutModule],
	controllers: [HealthController],
	providers: [],
})
export class AppModule {
	constructor(configService: ConfigService) {
		console.log(configService.get('JWT_SECRET')); // Debe imprimir la clave secreta
	}
}
