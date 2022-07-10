// invalid ID for testing: 413420348
import type { IVimeoVideo } from '@hvsb/types';

export async function fetchVideoData(videoId: string): Promise<IVimeoVideo> {
  try {
    const url = `https://api.vimeo.com/videos/${videoId}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `bearer ${import.meta.env.VITE_vimeoUnauthenticatedAccessToken}`,
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
