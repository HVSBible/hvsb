export default function imageRefactor(db: FirebaseFirestore.Firestore) {
  try {
    db.collection('images')
      .get()
      .then((snapshot) => {
        snapshot.forEach((image) => {
          console.log('set ', image.id);
          const data = image.data();
          data.type = 'image';
          db.collection('media').doc(image.id).set(data);
        });
      });
  } catch (error) {
    console.log('Refactor failed!', error);
  }
}
