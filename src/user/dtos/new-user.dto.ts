import { IsEmail, IsString } from "class-validator";

export class NewUserDto {

    @IsString()
    name: string;

    @IsEmail()
    email: string;
    
    password: string;
}