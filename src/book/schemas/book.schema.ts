import { SchemaFactory, Schema, Prop } from "@nestjs/mongoose";
import { CategoryTypeEnum } from "../enums/category.enum";

export type BookDocument = Book & Document;

@Schema({ timestamps: true })
export class Book {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    author: string;

    @Prop({ required: true })
    category: CategoryTypeEnum;

    @Prop({ required: true, type: String })
    addedBy: string;

    @Prop()
    description: string;

    @Prop()
    rating: number;

    @Prop()
    numberOfPages: string;

    @Prop()
    language: string;

    @Prop()
    releaseDate: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);