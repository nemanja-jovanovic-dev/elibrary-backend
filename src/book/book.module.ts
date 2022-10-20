import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from 'src/auth/guards/jwt.strategy';
import { BookController } from './controllers/book.controller';
import { Book, BookSchema } from './schemas/book.schema';
import { BookService } from './services/book.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
    ],
    controllers: [BookController],
    providers: [BookService, JwtStrategy],
})
export class BookModule {}
