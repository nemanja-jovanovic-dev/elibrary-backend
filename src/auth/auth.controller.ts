import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { ExistingUserDto } from 'src/user/dtos/existing-user.dto';
import { NewUserDto } from 'src/user/dtos/new-user.dto';
import { UserDetails } from 'src/user/user-details.interface';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    register(@Body() user: NewUserDto): Promise<UserDetails | null> {
        return this.authService.register(user);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Body() user: ExistingUserDto): Promise<any> {
        return this.authService.login(user);
    }

    @Get(':token')
    @HttpCode(HttpStatus.OK)
    getUserByToken(@Param('token') token: string): Promise<UserDetails> {
        return this.authService.getUserByToken(token);
    }

    @Post('logout')
    logout(): Promise<any> {
        return this.authService.logout();
    }
}
