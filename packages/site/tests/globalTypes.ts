//@ts-ignore - playwright not installed yet
import type { Browser, Page } from 'playwright';

declare global {
  const page: Page;
  const browser: Browser;
  const browserName: string;
}
