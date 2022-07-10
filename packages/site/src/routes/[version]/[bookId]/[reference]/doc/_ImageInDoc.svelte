<script lang="ts">
  import type { IImage } from '@hvsb/types';
  import { Doc } from 'sveltefirets';
  export let imageId: string;
  let imageType: IImage;
</script>

<Doc path={`media/${imageId}`} startWith={imageType} let:data={image}>
  <!-- <a href="/{$page.params.version}/{$page.params.bookId}/{$page.params.reference}/{imageId}"> -->
  <!-- </a> -->
  <a href="https://lh3.googleusercontent.com/{image.gcs}=s0" target="_blank">
    <img alt="" class="img-sm-left" src="https://lh3.googleusercontent.com/{image.gcs}=s300" />
  </a>
  {#if image.title}
    <h3 class="mb-1 text-sm font-semibold">{image.title}</h3>
  {/if}
  {#if image.description}
    <div class="tw-prose max-w-none text-sm">
      {@html image.description}
    </div>
  {/if}
  <div style="clear: both;" />
</Doc>

<style>
  .img-sm-left {
    float: left;
    width: 150px;
    max-width: 100%;
    margin: 5px 20px 13px 0;
  }
</style>
