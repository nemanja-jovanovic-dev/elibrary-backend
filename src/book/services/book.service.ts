import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBookDto } from '../dtos/create-book.dto';
import { BookModel } from '../interfaces/book.interface';
import { Book, BookDocument } from '../schemas/book.schema';

@Injectable()
export class BookService {
    @InjectModel(Book.name) private model: Model<BookDocument>;

    getAll() {
        return this.model.find().exec();
    }

    create(book: CreateBookDto): Promise<any> {
        return this.model.create(book);
    }

    async getById(id: string): Promise<BookModel> {
        let book: BookModel;

        try {
            book = await this.model.findById(id).exec();
        } catch (err) {
            if (!book) {
                throw new NotFoundException();
            }
        }

        return book;
    }
}
