/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
	constructor(private readonly authService: AuthService) {
		super({ usernameFiled: 'email'})
	}
	async validate(username: string, password: string){
		return this.authService.verifyUser(username, password)
	}
}