import * as functions from 'firebase-functions';
import { db } from './config';
import { IDocument, IUser, ITranslatedField } from '../../src/lib/interfaces';

export default async (data: ITranslatedField, context: functions.https.CallableContext) => {
  const user = await db
    .doc(`users/${context.auth.uid}`)
    .get()
    .then((doc) => doc.data() as IUser);
  if (user.roles.translator === data.language) {
    const mediaDocRef = db.doc(`media/${data.mediaId}`);
    if (data.field === 'title_translations' || data.field === 'description_translations') {
      const field = `${data.field}.${data.language}`;
      await mediaDocRef.update({
        [field]: data.translation, // "title_translations.es": 'Hola'
      });
    } else if (data.field === 'section') {
      await db.runTransaction(async (transaction) => {
        const mediaDoc = await transaction.get(mediaDocRef);
        if (!mediaDoc.exists) {
          throw 'Document does not exist';
        }
        const media = mediaDoc.data() as IDocument;
        const sections = media.sections;
        if (!sections[data.sectionIndex].text_translations) {
          sections[data.sectionIndex].text_translations = {};
        }
        sections[data.sectionIndex].text_translations[data.language] = data.translation;
        transaction.update(mediaDocRef, { sections });
      });
    }
    return true;
  } else {
    return true;
  }
};
