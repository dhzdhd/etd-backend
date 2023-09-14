import { chromium } from 'playwright';
import { Injectable } from '@nestjs/common';
import { AudioResponse, ImageResponse } from './google.interface';
import { PhotosWithTotalResults, createClient } from 'pexels';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleService {
  client = createClient(this.configService.get<string>('PEXEL_API_KEY')!);
  browser = (async () =>
    await chromium.launch({
      headless: true,
      //   proxy: { server: 'per-context' },
      timeout: 100000,
    }))();

  constructor(private configService: ConfigService) {}

  async scrapeAudio(obj: string): Promise<AudioResponse> {
    const context = await (await this.browser).newContext({
      // proxy: { server: 'http://47.253.214.60:4433' },
    });
    const page = await context.newPage();

    const resp = await Promise.all([
      page.waitForResponse(
        (resp) => resp.status() === 206 && resp.url().includes('.mp3'),
      ),
      page.goto(`https://www.google.com/search?q=${obj}+pronunciation/`),
    ]);

    const img = page.getByAltText('visual mouth movement');
    const svgs = await img.evaluateAll((list) =>
      list.map((e) => `https:${e.getAttribute('data-src')}`),
    );

    const gimg = await page.$$('g-img');
    const durations: number[] = [];

    for (const i of gimg) {
      const duration = await i.getAttribute('data-viseme-duration');
      if (duration !== null) {
        durations.push(parseInt(duration));
      }
    }

    await context.close();

    return {
      svgs,
      durations,
      url: resp[0].url(),
    } satisfies AudioResponse;
  }

  async scrapeImage(obj: string): Promise<ImageResponse> {
    // Segregate through status
    const resp = (await this.client.photos.search({
      query: obj,
      per_page: 1,
    })) as PhotosWithTotalResults;

    return {
      url: resp.photos[0].src.original,
    } satisfies ImageResponse;
  }
}
