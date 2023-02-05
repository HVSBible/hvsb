<script lang="ts">
  export let gcs: string;
  export let size: number;
</script>

{#if typeof window !== 'undefined'}
  <img
    alt=""
    style="height: 100%; width: 100%; object-fit: cover;"
    src="https://lh3.googleusercontent.com/{gcs}=s{(size * window.devicePixelRatio).toFixed(
      0
    )}-p" />
{:else}
  <img
    alt=""
    style="height: 100%; width: 100%; object-fit: cover;"
    src="https://lh3.googleusercontent.com/{gcs}=s{size}-p" />
{/if}
