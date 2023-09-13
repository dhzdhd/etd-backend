import { Controller, Get, Param } from '@nestjs/common';
import { GoogleService } from './google.service';
import { AudioResponse, ImageResponse } from './google.interface';

@Controller('google')
export class GoogleController {
  constructor(private readonly googleService: GoogleService) {}

  @Get('audio/:obj')
  async getAudio(@Param('obj') obj: string): Promise<AudioResponse> {
    const resp = await this.googleService.scrapeAudio(obj);

    return resp;
  }

  @Get('images/:obj')
  async getImage(@Param('obj') obj: string): Promise<ImageResponse> {
    const resp = await this.googleService.scrapeImage(obj);

    return resp;
  }
}
