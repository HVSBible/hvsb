<script lang="ts">
  import type { IDocument, IImage, IVideo, IVimeoVideo } from '@hvsb/types';

  export let title = 'Biblical Study Item',
    description: string,
    shareImage: string,
    data: IDocument | IImage | (IVideo & IVimeoVideo); // refactor to medium
  import { admin, user } from '$lib/stores';
  import { page } from '$app/stores';
  import { translator } from '$lib/stores';

  $: url = `https://hvsb.app/${$page.params.version}/${$page.params.bookId}/${
    $page.params.reference
  }/${
    data.type === 'image'
      ? 'img'
      : data.type === 'document'
      ? 'doc'
      : data.type === 'video'
      ? 'vid'
      : ''
  }/${data.id}`;

  async function share() {
    let shareText = 'I want you to watch this video from the House Visual Study Bible:';
    if (data.type === 'document') {
      shareText = 'I want you to read this article on the House Visual Study Bible:';
    }
    if (data.type === 'image') {
      shareText = 'Check out this study image on the House Visual Study Bible:';
    }
    if (navigator.share) {
      const shareData = {
        title: `${data.type === 'video' ? 'Watch' : 'Learn'} on the House Visual Study Bible`,
        text: shareText + ' ' + title,
        url,
      };
      await navigator.share(shareData);
    } else {
      copy(`${shareText} ${title} at ${url}`);
    }
  }

  function copy(message) {
    try {
      const el = document.createElement('textarea');
      el.value = message;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      alert('Link copied to clipboard. Please paste into a message or post to share with others.');
    } catch (e) {
      alert(`Copy and share the following text: ${message}`);
    }
  }
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="title" content={title} />
  <meta name="description" content={description} />

  <!-- https://metatags.io/ && https://css-tricks.com/essential-meta-tags-social-media/ -->
  <!-- <meta property="og:type" content="website"> Defaults to website -->
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={shareImage} />
  <meta property="og:url" content={url} />
  <meta property="og:site_name" content="House Visual Study Bible" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content={url} />
  <meta property="twitter:title" content={title} />
  <meta property="twitter:description" content={description} />
  <meta property="twitter:image" content={shareImage} />
  <meta name="twitter:image:alt" content={title} />
</svelte:head>

<div class="md:px-1 lg:px-3">
  <div class="hidden md:flex justify-between items-center mb-1">
    <a
      class="font-medium px-3 py-2 hover:bg-gray-200 text-gray-700 rounded"
      href="/{$page.params.version}/{$page.params.bookId}/{$page.params.reference}">
      <i class="fas fa-arrow-left" />
      Back to List
    </a>

    {#if $admin > 1}
      {#await import('svelte-pieces/data/JSON.svelte') then { default: JSON }}
        <div class="ml-auto">
          <JSON obj={data} />
        </div>
      {/await}
    {/if}

    <button
      class="hover:bg-primary-500 text-primary-700 hover:text-white btn rounded
      px-4 py-2 font-bold hover:shadow text-sm focus:outline-none
      focus:border-primary-700 focus:ring-primary-500 uppercase leading-6"
      type="button"
      on:click={share}>
      <span class="hidden md:inline mr-1">Share</span>
      <i class="fas fa-share-alt" />
    </button>
  </div>
  <div class="flex md:hidden items-center pl-2 pr-1 py-2">
    <h2 class="font-xl font-semibold mr-auto">{title}</h2>
    <button
      class="hover:bg-primary-500 text-primary-700 hover:text-white btn rounded
      px-4 py-2 font-bold hover:shadow text-sm focus:outline-none
      focus:border-primary-700 focus:ring-primary-500 uppercase leading-6"
      type="button"
      on:click={share}>
      <i class="fas fa-share-alt" />
    </button>
    <a
      class="font-medium px-3 py-2 text-gray-700"
      href="/{$page.params.version}/{$page.params.bookId}/{$page.params.reference}"
      sveltekit:noscroll>
      <i class="fas fa-times" />
    </a>
  </div>

  <slot translator={$translator} />

  {#if $admin || (data && $user && data.createdBy === $user.uid)}
    <div class="p-2">
      <slot name="author" />
    </div>
  {/if}

  {#if $translator}
    <div class="p-2 flex flex-wrap">
      <slot name="translator" />
    </div>
  {/if}
</div>
