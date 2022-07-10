import { dev } from '$app/env';
import { processImageUrl } from './processImageUrl';

export async function getImageServingURL(storagePath: string): Promise<string> {
  const imageProcessingUrl = `${processImageUrl}/hvsb-${
    dev ? 'dev' : 'prod'
  }.appspot.com/${storagePath}`;

  const result = await fetch(imageProcessingUrl);
  const url = await result.text();
  return url.replace('http://lh3.googleusercontent.com/', '');
}
