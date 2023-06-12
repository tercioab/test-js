import {
  Module,
  NestModule,
  MiddlewareConsumer,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { TasksController } from './tasks/tasks.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/teste'),
    TasksModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(TasksController);
  }
}
