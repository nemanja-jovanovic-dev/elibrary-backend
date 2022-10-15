import { Body, Controller, Get, NotFoundException, Post } from "@nestjs/common";
import { CreateBookDto } from "../dtos/create-book.dto";
import { BookService } from "../services/book.service";

@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService) {
    }

    @Get('')
    getAll() {
        return this.bookService.getAll();
    }

    @Post('')
    async create(@Body() book: CreateBookDto) {
        const ccreatedBook = await this.bookService.create(book);

        if (!book) {
            throw new NotFoundException('not found bro');   
        }

        return ccreatedBook;
    }

}