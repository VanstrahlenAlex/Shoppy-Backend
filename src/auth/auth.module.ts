/* eslint-disable prettier/prettier */
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy'; // Asegúrate de importar JwtStrategy
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
	imports: [
		ConfigModule,
		JwtModule.registerAsync({
		imports: [ConfigModule],
		useFactory: (configService: ConfigService) => ({
			secret: configService.getOrThrow('JWT_SECRET'),
			signOptions: {
			expiresIn: configService.getOrThrow('JWT_EXPIRATION'),
			},
		}),
		inject: [ConfigService],
		}),
		UsersModule,
	],
	controllers: [AuthController],
	providers: [AuthService, LocalStrategy, JwtStrategy], // Añade JwtStrategy a los providers
})
export class AuthModule {}
