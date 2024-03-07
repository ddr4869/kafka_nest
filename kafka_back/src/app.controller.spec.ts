import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessageRepository } from '@db/message/message.repository';
import { DbModule } from '@db/db.module';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [DbModule],
      controllers: [AppController],
      providers: [AppService, MessageRepository]
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('root', () => {
    test('the data is peanut butter', async () => {
      const data = await appService.getMessages();
      expect(data).toBeDefined();
    });
    // it('should return "Hello World!"', () => {
    //   const data = await appService.getHello();
    //   expect(appService.getHello()).toBe('Hello World!');
    // });
  });
});
