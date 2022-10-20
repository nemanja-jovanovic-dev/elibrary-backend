import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import * as fs from 'fs';
import * as morgan from 'morgan';

const logStream = fs.createWriteStream('api.log', {
	flags: 'a'
});

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.enableCors();

	app.setGlobalPrefix('api');

	app.use(cookieParser());

	app.useGlobalPipes(new ValidationPipe());

	app.use(morgan('combined', { stream: logStream }))

	await app.listen(3000);
}
bootstrap();
