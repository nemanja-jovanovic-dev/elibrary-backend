import { Module } from "@nestjs/common";
import { MongooseModule, Schema } from "@nestjs/mongoose";
import { title } from "process";
import { BookController } from "./controllers/book.controller";
import { Book, BookSchema } from "./schemas/book.schema";
import { BookService } from "./services/book.service";

@Module({
    imports: [MongooseModule.forFeature([{name: Book.name, schema: BookSchema}])],
    controllers: [BookController],
    providers: [BookService]
})
export class BookModule {}