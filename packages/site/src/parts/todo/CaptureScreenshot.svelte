<script lang="ts">
  import { onMount } from 'svelte';

  onMount(() => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/html2canvas@1.0.0-rc.7/dist/html2canvas.min.js';
    script.onload = () => {
      // to keep element from being added to screenshot, add: `data-html2canvas-ignore` to the element
      // @ts-ignore
      html2canvas(document.body).then((canvas) => {
        console.log(canvas.toDataURL());
        const link = document.createElement('a');
        link.download = 'filename.png';
        link.href = canvas.toDataURL();
        link.click();
        // document.body.appendChild(canvas);
        // if needing help saving image to database, look at `dataURLtoBlob(dataurl)` in athletic-app\src\app\_common\services\media-upload\media-upload.service.ts
      });
    };
    document.head.appendChild(script);
    return () => {
      script.parentNode.removeChild(script);
    };
  });
</script>

<!-- <button type="button" on:click={capture}>Capture</button> -->
