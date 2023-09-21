<script lang="ts">
  export let src: string = undefined;
</script>

<div class="bg-black relative h-full w-full">
  {#if src}
    <img
      alt=""
      style="height: 100%; width: 100%; object-fit: cover; object-position: center center;"
      {src} />
  {/if}
  <div class="absolute flex inset-0 items-center justify-center">
    <i class="i-ic-baseline-play-arrow shadow-lg text-white" style="width: 100%; height: 60%;" />
  </div>
</div>
