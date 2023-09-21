import type { RequestHandler } from './$types';
import { error } from '@sveltejs/kit';
import { firebaseConfig } from 'sveltefirets';
import { PROCESS_IMAGE_URL } from '$env/static/private';
import { STORAGE_PATH_URL_PARAM } from './constant';

export const GET: RequestHandler = async ({ url }) => {
  const storage_path = url.searchParams.get(STORAGE_PATH_URL_PARAM);
  if (!storage_path)
    throw error(400, 'must include storage path of photo');

  const gcs_path = await get_image_serving_url(storage_path);
  return new Response(gcs_path);
};

async function get_image_serving_url(storagePath: string): Promise<string> {
  const image_processing_url = `${PROCESS_IMAGE_URL}/${firebaseConfig.storageBucket
  }/${storagePath}`;
  console.info({ image_processing_url })

  const response = await fetch(image_processing_url);
  const url = await response.text();
  return url.replace('http://lh3.googleusercontent.com/', '');
}
