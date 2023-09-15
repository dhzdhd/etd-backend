import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoogleController } from './google/google.controller';
import { GoogleService } from './google/google.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, GoogleController],
  providers: [AppService, GoogleService, PrismaService],
})
export class AppModule {}
