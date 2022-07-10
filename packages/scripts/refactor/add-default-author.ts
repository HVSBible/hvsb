export default function addDefaultAuthor(
  db: FirebaseFirestore.Firestore,
  environment: 'dev' | 'prod'
) {
  try {
    console.log(`Running on ${environment}`);
    db.collection('media')
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const data = doc.data();
          // if (data.type === 'document') {
          //     if (data.author) {
          //         console.log(doc.id, 'author is: ', data.author);
          //     } else {
          //         data.author = 'Hershel Wayne House';
          //         db.collection('media').doc(doc.id).set(data);
          //         console.log(`set author on ${doc.id}`);
          //     }
          // }
          // if (data.type === 'image') {
          //     if ((data.credit !== 'H. Wayne House') || data.photographer) {
          //         console.log(doc.id, ' cr/ph is: ', data.credit, data.photographer);
          //     } else {
          //         data.photographer = 'Hershel Wayne House';
          //         db.collection('media').doc(doc.id).set(data);
          //         console.log(`set photographer on ${doc.id}`);
          //     }
          // }
          if (data.type === 'image') {
            if (data.credit === 'Robert' || (data.credit === 'RD' && !data.photographer)) {
              console.log(doc.id, ' cr/ph is: ', data.credit, data.photographer);
              data.photographer = 'Robert Drouhard';
              db.collection('media').doc(doc.id).set(data);
              console.log(`set Robert on ${doc.id}`);
            }
          }
        });
      });
  } catch (error) {
    console.log('Refactor failed!', error);
  }
}
