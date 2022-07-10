<script lang="ts">
  export let href: string;
  export let title: string;
  export let src: string;
  export let description: string;
</script>

<div class="w-full md:w-4/12 my-8 px-4">
  <div class="px-6">
    <a {href} target="_blank">
      <img
        alt={title}
        {src}
        class="shadow-lg rounded-lg max-w-full mx-auto"
        style="max-height: 120px;" />
    </a>
    <div class="pt-6 text-center">
      <h5 class="text-xl font-bold">{title}</h5>
      <p class="mt-1 text-sm text-gray-500 uppercase font-semibold">
        {description}
      </p>
      <div class="mt-6">
        <a {href} class="text-gray-600 hover:text-gray-900" target="_blank">
          Visit Site <i class="fas fa-chevron-right" />
        </a>
      </div>
    </div>
  </div>
</div>
