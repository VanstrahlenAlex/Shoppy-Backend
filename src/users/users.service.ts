/* eslint-disable prettier/prettier */
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserRequest } from './dto/create-user.request';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';


@Injectable()
export class UsersService {
	constructor(private readonly prismaService: PrismaService) { }
	async createUser(data: CreateUserRequest) {
		try {
			return await this.prismaService.user.create({
			data: {
                ...data,
				password: await bcrypt.hash(data.password, 10), // Hashing the password before storing it in the database.
            },
			select: {
				email: true,
				id: true,
			},
		});

		} catch (error) {
			
			if(error.code === 'P2002'){
				throw new UnprocessableEntityException('Email already exists.');
			}
			throw error;
			throw new Error('Error creating user');
				
		}
	}
	async getUser(filter: Prisma.UserWhereUniqueInput){
		return this.prismaService.user.findUniqueOrThrow({
			where: filter
		});
	}
}
