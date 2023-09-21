<script lang="ts">
  export let file: File, verseNumber: number;
  import { user } from '$lib/stores';

  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  const progress = tweened(0, {
    duration: 2000,
    easing: cubicOut,
  });
  $: percentage = Math.floor($progress * 100);

  let error;
  let success: boolean;
  let previewURL: string;

  if (file) {
    previewURL = URL.createObjectURL(file);
    startUpload();
  }

  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  import { getStorage, ref, uploadBytesResumable } from 'firebase/storage';
  async function startUpload() {
    const fileSuffix = /\.[0-9a-z]+$/i;
    const fileTypeSuffix = file.name.match(fileSuffix)[0];
    const suffixRemoved = file.name.replace(fileSuffix, '');
    const filename = suffixRemoved.replace(/[^a-z0-9+]+/gi, '_');
    const storagePath = `images/${filename}_${new Date().getTime()}${fileTypeSuffix}`;

    const customMetadata = {
      uploadedBy: $user.displayName,
      originalFileName: file.name,
    };

    // https://firebase.google.com/docs/storage/web/upload-files
    const storage = getStorage();
    const uploadTask = uploadBytesResumable(ref(storage, storagePath), file, { customMetadata });

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progressAmount = snapshot.bytesTransferred / snapshot.totalBytes;
        progress.set(progressAmount);
      // switch (snapshot.state) {
        //   case firebase.storage.TaskState.PAUSED: // or 'paused'
        //     console.log("Upload is paused");
        //     break;
        //   case firebase.storage.TaskState.RUNNING: // or 'running'
        //     console.log("Upload is running");
        //     break;
        // }
      },
      (err) => {
        alert('Image Upload Failed');
        error = err;
      // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        // switch (error.code) {
        //     case 'storage/unauthorized':
        //         // User doesn't have permission to access the object
        //         break;

        //     case 'storage/canceled':
        //         // User canceled the upload
        //         break;

        //     case 'storage/unknown':
        //         // Unknown error occurred, inspect error.serverResponse
        //         break;
        // }
      },
      () => save_photo(storagePath)
    );
  }

  import type { IImage } from '@hvsb/types';
  import { addOnline } from 'sveltefirets';
  import { STORAGE_PATH_URL_PARAM } from '../../../../image_serving_url/constant';

  async function save_photo(storage_path: string) {
    try {
      const response = await fetch(`/image_serving_url?${STORAGE_PATH_URL_PARAM}=${storage_path}`);
      const gcs_path = await response.text();

      const image: IImage = {
        bookIds: [$page.params.bookId],
        chapterIds: [`${$page.params.bookId}.${$page.params.reference}`],
        verseIds: [`${$page.params.bookId}.${$page.params.reference}.${verseNumber}`],
        path: storage_path,
        gcs: gcs_path,
        genre: 'photograph',
        type: 'image',
      };

      const { id } = await addOnline<IImage>('media', image);
      goto(
        `/${$page.params.version}/${$page.params.bookId}/${$page.params.reference}/img/${id}/edit`
      );
    } catch (err) {
      error = err;
      alert(`Error Uploading Image. Please email Jacob the image name. ${err}`);
    }
  }
</script>

<div
  class="w-full h-full relative flex flex-col items-center justify-center
    overflow-hidden">
  {#if error}
    <div class="text-red-600 text-center">
      <i class="fas fa-times" />
      Error: {error}
    </div>
  {:else}
    {#if success}
      <div class="text-dark-shadow text-white z-10 text-center">
        <i class="fas fa-check fa-lg" />
      </div>
    {:else}
      <div
        class="text-dark-shadow text-white z-10 font-semibold text-center
          font-mono">
        {percentage}%
      </div>
    {/if}
    {#if previewURL}
      <img class="object-cover h-full w-full absolute inset-0" alt="" src={previewURL} />
    {/if}
    <div style="height:{100 - percentage}%" class="bg-gray-200 opacity-75 absolute top-0 w-full" />
  {/if}
</div>
