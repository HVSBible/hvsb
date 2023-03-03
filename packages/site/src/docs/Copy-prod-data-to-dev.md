# Copy Production Data to Dev Nightly

The first steps are implemented in the [backup-firestore-nightly.yml](../.github/workflows/backup-firestore-nightly.yml) GitHub workflow.

## 1. SKIPPED: Erase Dev Firestore data

**Warning:** Though import/export operations do not trigger cloud functions, delete will

- `firebase firestore:delete --all-collections -P default`
- `"delete-dev-firestore-except-users": "firebase firestore:delete media -r -P default -y && firebase firestore:delete authors -r -P default -y && firebase firestore:delete friends -r -P default -y &&firebase firestore:delete intros -r -P default -y && firebase firestore:delete locations -r -P default -y && firebase firestore:delete media -r -P default -y && firebase firestore:delete photographers -r -P default -y && firebase firestore:delete subjects -r -P default -y"`
  THESE WILL PROMPT CONFIRMATION AND WILL USE ACTIVE PROJECT, add ` -y` to end for automatic use in CI w/o prompt (Warning!)

r = recursive

Caveat: Don't delete dev users because then we will only be able to test Stripe with user data from prod, which includes production stripeCustomerId - and Stripe will throw an error when trying to use production customer ids in test mode. **Main point: create unique dev only users for testing billing items.**

## 2. Export and Import Firestore data

- `gcloud config set project hvsb-prod`
- `gcloud firestore export gs://hvsb-firestore-backup/$CURRENT_DAY`
- `gcloud config set project hvsb-dev`
- `gcloud firestore import gs://hvsb-firestore-backup/$CURRENT_DAY/`

Can manually do an import and export from the console linked to in https://firebase.google.com/docs/firestore/manage-data/export-import

## 3. Copy User Authentication

This is needed so that users created on the dev project is wiped out daily in step 1. Without this step, it would be impossible to have an admins or established users on the dev database.

- `firebase auth:export ./users.json -P production`
- `firebase auth:import ./users.json -P default --hash-algo=scrypt --hash-key=<base64_signer_key> --salt-separator=<base64_salt_separator> --rounds=8 --mem-cost=14`

Docs: https://firebase.google.com/docs/cli/auth and https://stackoverflow.com/questions/45404874/how-to-set-hash-key-option-for-authimport-after-default-authexport-in-firebase

_Note that for testing Stripe, new user accounts on the dev project must be created so they have a Stripe Customer ID for use with the Stripe test key. Otherwise Stripe actions on dev will be met with the error "No such customer: 'cus_GD6oCKUc3dymqd'; a similar object exists in live mode, but a test mode key was used to make this request."_

## 4. Not doing: Copy Algolia media_prod index to media_dev index

If we are ever wanting to copy the prod index to dev then run the .copyIndex() functions at the bottom of the copyAlgoliaIndexSettings.js file. We are currently avoiding this and just using the media_prod index on dev also as creating a copy for dev will more quickly push us out of the free tier of 10,000 requests/records per month.

---

## 5. Export and Import Storage data

Set up an automatic daily transfer of storage from the `hvsb-prod.appspot.com` bucket to the `hvsb-dev.appspot.com` bucket on https://console.cloud.google.com/transfer/cloud?project=hvsb-dev&folder&organizationId, checking option to 'Delete object from destination if there is no version in source'.

This runs daily at midnight (12 AM) to try and mesh with the daily Firestore transfer.
