import { Body, Controller, Get, NotFoundException, Param, Post, UseGuards } from "@nestjs/common";
import { JwtGuard } from "src/auth/guards/jwt.guard";
import { CreateBookDto } from "../dtos/create-book.dto";
import { BookModel } from "../interfaces/book.interface";
import { BookService } from "../services/book.service";

@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService) {
    }

    @Get('')
    @UseGuards(JwtGuard)
    getAll() {
        return this.bookService.getAll();
    }

    @Post('')
    async create(@Body() book: CreateBookDto) {
        const createdBook = await this.bookService.create(book);

        if (!book) {
            throw new NotFoundException('not found bro');   
        }

        return createdBook;
    }

    @Get('/:id')
    getById(@Param('id') id: string): Promise<BookModel> {
        return this.bookService.getById(id);
    }

}