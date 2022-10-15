import { IsString } from "class-validator";
import { CategoryTypeEnum } from "../enums/category.enum";

export class CreateBookDto {
    @IsString()
    title: string;

    @IsString()
    author: string;

    category: CategoryTypeEnum;

    addedBy: string;

    description: string;

    rating: string;

    numberOfPages: string;

    language: string;

    releaseDate: string;
}