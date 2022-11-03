import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import * as fs from 'fs';
import * as morgan from 'morgan';
import { SECRET_KEY } from './utils/constants';

const logStream = fs.createWriteStream('api.log', {
	flags: 'a'
});

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.enableCors({credentials: true});

	app.setGlobalPrefix('api');

	app.use(cookieParser());

	app.useGlobalPipes(new ValidationPipe());

	app.use(morgan('combined', { stream: logStream }));

	app.use(function(req, res, next) {
		res.header('Access-Control-Allow-Credentials', true);
		res.header('Access-Control-Allow-Origin', req.headers.origin);
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
		res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
		next();
	  });

	await app.listen(3000);
}
bootstrap();
