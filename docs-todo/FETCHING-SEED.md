## Firestore Emulator

Learned to setup emulator from codelab: https://codelabs.developers.google.com/firebase-emulator#2
Prereq: Install Java: https://devwithus.com/install-java-windows-10/

Add Auth to firebase.json if ever desire:
// "auth": {
// "port": 9099
// },

### Pull Down Firestore Seed Data

https://dev.to/amammay/firestore-emulator-power-up-using-live-data-for-your-seed-44d

Setup:

1. create storage bucket `gsutil mb gs://hvsb-firestore-seed`
2. create folder structure and firebase-export-metadata.json file

Fetch Data to https://console.cloud.google.com/storage/browser/hvsb-firestore-seed?project=hvsb-prod

1. export firestore data into bucket `gcloud beta firestore export gs://hvsb-firestore-seed/export` (make sure to specify folder name if wanting to avoid the export being auto-named with a timestamp containing colons which Windows throws errors on)
2. copy down to seed folder `gsutil rsync -r gs://hvsb-firestore-seed/export seed/firestore_export/`
3. remove export from storage bucket to enable next export `gsutil -m rm -r gs://hvsb-firestore-seed/export` (or use a timestamp in a shell script?)
4. Run `firebase emulators:start --import=./seed`

### Auth

Learn more at https://firebase.google.com/docs/emulator-suite/connect_auth

---

Learned from https://github.com/firebase/firebase-tools/issues/1167#issuecomment-648580480 that Windows has issues with colons in filenames
gsutil mv gs://hvsb-firestore-backup/2020-11-10T00:26:46_64985 gs://hvsb-firestore-backup/seedData
gsutil mv gs://hvsb-firestore-backup/seedData/2020-11-10T00:26:46_64985.overall_export_metadata gs://hvsb-firestore-backup/seedData/myCollection
gsutil cp r gs://hvsb-firestore-backup/2020-11-10T00:26:46_64985 gs://hvsb-firestore-backup/seed
