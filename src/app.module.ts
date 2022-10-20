import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { CatsModule } from './cat/cats.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionsFilter } from './core/exeptions.filter';

@Module({
	imports: [
		MongooseModule.forRoot('mongodb://localhost:27017/elibrary'),
		CatsModule,
		BookModule,
		AuthModule,
		UserModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_FILTER,
			useClass: ExceptionsFilter,
		},
	],
})
export class AppModule {}
