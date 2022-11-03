import { CategoryTypeEnum } from "../enums/category.enum";

export interface BookModel {
    title: string;
    author: string;
    category: CategoryTypeEnum;
    addedBy: string;
    description?: string;
    rating?: number;
    numberOfPages?: string;
    language?: string;
    releaseDate?: string;
}