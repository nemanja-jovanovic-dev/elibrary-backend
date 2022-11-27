import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
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
            throw new NotFoundException();
        }

        const doesPasswordMatch = await this.doesPasswordMatch(password, user.password);

        if (!doesPasswordMatch) {
            //throw exception
            return null;
        }

        return this.userService._getUserDetails(user);
    }

    async login(existingUser: ExistingUserDto): Promise<any> {
        const {email, password} = existingUser;
        const user = await this.validateUser(email, password);

        if(!user) return null;

        const jwt = await this.jwtService.signAsync(user, {secret: SECRET_KEY});

        if (!jwt) throw new ForbiddenException();

        return {token: jwt};
    }

    async getUserByToken(token: string): Promise<UserDetails> {

        if (!token) {
            throw new NotFoundException();
        }

        const userFromToken = this.jwtService.decode(token, {json: true});
        
        return {
            id: userFromToken['id'],
            email:  userFromToken['email'],
            name:  userFromToken['name']
        };
    }

    async logout(): Promise<any> {
        return {logged: false};
    }
}
