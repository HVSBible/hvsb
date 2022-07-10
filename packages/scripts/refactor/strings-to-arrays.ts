export default function stringsToArrays(
  db: FirebaseFirestore.Firestore,
  environment: 'dev' | 'prod'
) {
  try {
    // let round = 1;
    console.log(`Running strings-to-arrys on ${environment}`);
    db.collection('media')
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          // if (round < 5) {
          const data = doc.data();
          // if (data.type === 'image') {
          if (data.location === null) {
            console.log('Converting location strings to array on', doc.id);
            console.log(data);
            delete data.location;
            db.collection('media').doc(doc.id).set(data);
            console.log(data);
          }
          // console.log(data.credit, data.photographer, doc.id);
          // }
          // }
          // round++;
        });
      });
  } catch (error) {
    console.log('Refactor failed!', error);
  }
}
