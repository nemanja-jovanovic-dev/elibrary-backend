import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateBookDto } from "../dtos/create-book.dto";
import { BookDocument, Book } from "../schemas/book.schema";

@Injectable()
export class BookService {
    @InjectModel(Book.name) private model: Model<BookDocument>;

    getAll() {
        return this.model.find().exec();
    }

    create(book: CreateBookDto): Promise<any> {
        return this.model.create(book);
    }
}