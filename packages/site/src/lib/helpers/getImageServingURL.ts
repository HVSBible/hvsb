import { firebaseConfig } from '$lib/firebaseConfig';

export async function getImageServingURL(storagePath: string): Promise<string> {
  const imageProcessingUrl = `${import.meta.env.VITE_ProcessImageUrl}/${
    firebaseConfig.storageBucket
  }/${storagePath}`;

  const result = await fetch(imageProcessingUrl);
  const url = await result.text();
  return url.replace('http://lh3.googleusercontent.com/', '');
}
