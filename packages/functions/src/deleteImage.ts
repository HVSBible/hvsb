import * as functions from 'firebase-functions';
import { storage } from './config';

export const deleteImage = async (
  snapshot: functions.firestore.DocumentSnapshot,
  context: functions.EventContext
) => {
  const { mediaId } = context.params;
  const bucket = storage.bucket();

  const data = snapshot.data();
  console.log(`Deleted image from media: ${mediaId}`);
  if (data && data.type === 'image') {
    return bucket.file(data.path).delete();
  } else {
    return true; // was a document or video and not image media file
  }
};

// https://medium.com/google-developer-experts/automatically-delete-your-firebase-storage-files-from-firestore-with-cloud-functions-for-firebase-36542c39ba0d
