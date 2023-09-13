import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoogleController } from './google/google.controller';
import { GoogleService } from './google/google.service';

@Module({
  imports: [],
  controllers: [AppController, GoogleController],
  providers: [AppService, GoogleService],
})
export class AppModule {}
