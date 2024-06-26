import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as domains from './domains';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const allowedOrigins = [
    /^https:\/\/.*\.ascrib\.xyz$/,
    /^https:\/\/.*\.staging\.ascrib\.xyz$/,
    'http://localhost:3000',
  ];
  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('The API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: (origin, callback) => {
      if (
        !origin ||
        allowedOrigins.some((allowedOrigin) =>
          typeof allowedOrigin === 'string'
            ? origin === allowedOrigin
            : origin.match(allowedOrigin),
        )
      ) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  // Use cookie parser middleware
  app.use(cookieParser());

  await app.listen(3000);
}
bootstrap();
