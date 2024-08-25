import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  // Create the HTTP API server
  const app = await NestFactory.create(AppModule);

  // Set the global prefix for the API
  app.setGlobalPrefix('api');

  // Connect the RabbitMQ microservice
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'main_queue',
      queueOptions: {
        durable: false
      },
    },
  });

  // Start both the HTTP server and the microservice
  await app.listen(process.env.SERVER_PORT);
  await app.startAllMicroservices();
}
bootstrap();
