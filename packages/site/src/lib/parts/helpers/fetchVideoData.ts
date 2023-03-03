// invalid ID for testing: 413420348
import type { IVimeoVideo } from '@hvsb/types';
const PUBLIC_VIMEO_UNAUTHENTICATED_ACCESS_TOKEN = 'e9ef80e65a1a6b16b33d9bf80a66c2e2';

export async function fetchVideoData(videoId: string): Promise<IVimeoVideo> {
  try {
    const url = `https://api.vimeo.com/videos/${videoId}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `bearer ${PUBLIC_VIMEO_UNAUTHENTICATED_ACCESS_TOKEN}`,
      },
    });
    const data = await response.json();
    if (data.error) {
      throw new Error(data.error);
    }
    return data;
  } catch (err) {
    throw new Error(err);
  }
}
