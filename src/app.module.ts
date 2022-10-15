import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { CatsModule } from './cat/cats.module';

@Module({
  // imports: [MongooseModule.forRoot('mongodb://localhost:27017/elibrary')],
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/elibrary'),
    CatsModule,
    BookModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
