import admin from 'firebase-admin';
export default function imageParentRefactor(db: FirebaseFirestore.Firestore) {
  try {
    db.collection('media')
      .get()
      .then((snapshot) => {
        snapshot.forEach((image) => {
          const imageData = image.data();
          if (imageData.type === 'image' && imageData.documentParentId) {
            db.doc(`media/${imageData.documentParentId}`)
              .get()
              .then((document) => {
                const documentData = document.data();

                const newParent = {
                  parentId: document.id,
                  chapterId: documentData.chapterIds[0],
                };
                console.log(
                  `${image.id} with parent ${imageData.documentParentId}, receiving: `,
                  newParent
                );
                db.doc(`media/${image.id}`)
                  .update({ parents: admin.firestore.FieldValue.arrayUnion(newParent) })
                  .then(() => {
                    db.doc(`media/${image.id}`).update({
                      documentParentId: admin.firestore.FieldValue.delete(),
                    });
                  });
              });
          }
        });
      });
  } catch (error) {
    console.log('Refactor failed!', error);
  }
}
