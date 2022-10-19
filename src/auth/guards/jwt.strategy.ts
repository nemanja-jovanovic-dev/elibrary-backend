import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";
import { SECRET_KEY } from "../../utils/constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => {
                    const token = request?.cookies['token'];
                    console.log('token in guard: ', token);
                    return token;
                }
            ]),
            ignoreExpiration: false,
            secretOrKey: SECRET_KEY,
        })
    }

    async validate(payload: any) {

        console.log('In validate!');

        // if (!payload) {
        //     return new UnauthorizedException();
        // }

        return {...payload.user};
    }
}