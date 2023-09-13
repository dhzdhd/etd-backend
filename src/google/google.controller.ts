import { Controller, Get, Param } from '@nestjs/common';
import { GoogleService } from './google.service';
import { AudioResponse } from './google.interface';

@Controller('google')
export class GoogleController {
  constructor(private readonly googleService: GoogleService) {}

  @Get('audio/:obj')
  async getAudio(@Param('obj') obj: string): Promise<AudioResponse> {
    const resp = await this.googleService.scrape(obj);

    return resp;
  }

  @Get('images/:obj')
  getImages(): string {
    return '';
  }
}
