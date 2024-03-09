import { NestFactory } from '@nestjs/core';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api'); // prefix 설정
  //소켓 어뎁터로 연결 합니다.
  app.useWebSocketAdapter(new IoAdapter(app))
  await app.listen(8080);
}
bootstrap();