import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
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
    login(@Body() user: ExistingUserDto, @Res() res: Response): Promise<void> {
        return this.authService.login(user, res);
    }

    @Post('logout')
    logout(@Res() res: Response): Promise<Response> {
        return this.authService.logout(res);
    }
}
