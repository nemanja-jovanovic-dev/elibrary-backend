import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { ExistingUserDto } from 'src/user/dtos/existing-user.dto';
import { NewUserDto } from 'src/user/dtos/new-user.dto';
import { UserDetails } from 'src/user/user-details.interface';
import { UserService } from 'src/user/user.service';
import { SECRET_KEY } from '../utils/constants';

@Injectable()
export class AuthService {

    constructor(private userService: UserService, 
        private jwtService: JwtService) {}

    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 12);
    } 

    async register(user: Readonly<NewUserDto>): Promise<UserDetails | any> {
        const { name, email, password } = user;

        const existingUser = await this.userService.findByEmail(email);

        if (existingUser) {
            return 'Email taken!';
        }

        const hashedPassword = await this.hashPassword(password);

        const newUser = await this.userService.create(name, email, hashedPassword);

        return this.userService._getUserDetails(newUser);
    }

    async doesPasswordMatch(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }

    async validateUser(email: string, password: string): Promise<UserDetails | null> {
        const user = await this.userService.findByEmail(email);
        const doesUserExists = !!user;

        if (!doesUserExists) {
            //throw exception
            return null;
        }

        const doesPasswordMatch = await this.doesPasswordMatch(password, user.password);

        if (!doesPasswordMatch) {
            //throw exception
            return null;
        }

        return this.userService._getUserDetails(user);
    }

    async login(existingUser: ExistingUserDto, res: Response): Promise<{token: string} | null> {
        const {email, password} = existingUser;
        const user = await this.validateUser(email, password);

        if(!user) return null;

        const jwt = await this.jwtService.signAsync(user, {secret: SECRET_KEY});

        if (!jwt) throw new ForbiddenException();

        res.cookie('token', jwt, {httpOnly: true});
        
        res.status(200).send({token: jwt});

        return {token: jwt};
    }

    async logout(res: Response): Promise<Response> {
        res.clearCookie('token');
        return res.send('Logged out succesfully!');
    }

    async getUserDetails(token: string, res: Response): Promise<void> {
        const userDetails = await this.jwtService.decode(token);
        console.log(userDetails);

        res.status(200).send(userDetails);
    }
}
