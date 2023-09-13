import { chromium, devices } from 'playwright';
import { Injectable } from '@nestjs/common';
import { AudioResponse } from './google.interface';

@Injectable()
export class GoogleService {
  private readonly google: null = null;

  async scrape(obj: string): Promise<AudioResponse> {
    const browser = await chromium.launch({
      headless: true,
      proxy: { server: 'http://115.144.153.1:10358' },
      timeout: 100000,
    });
    const context = await browser.newContext(devices['Desktop Chrome']);
    const page = await context.newPage();

    // await page.goto('https://oxylabs.io/resources/integrations/playwright');

    await page.goto(`https://www.google.com/search?q=${obj}+pronunciation/`);

    const img = page.getByAltText('visual mouth movement');
    const svgs = await img.evaluateAll((list) =>
      list.map((e) => e.getAttribute('data-src')),
    );

    const gimg = await page.$$('g-img');
    const durations: number[] = [];

    for (const i of gimg) {
      const duration = await i.getAttribute('data-viseme-duration');
      if (duration !== null) {
        durations.push(parseInt(duration));
      }
    }

    console.log(durations);
    console.log(svgs);

    await context.close();
    await browser.close();

    return {
      svgs,
      durations,
    } satisfies AudioResponse;
  }
}
