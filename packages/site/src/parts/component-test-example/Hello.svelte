<script lang="ts">
  export let name = 'world';
</script>

<h1>Hello {name}!</h1>

<style>
  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4rem;
    font-weight: 100;
    line-height: 1.1;
    margin: 4rem auto;
    max-width: 14rem;
  }

  @media (min-width: 480px) {
    h1 {
      max-width: none;
    }
  }

  /* h1 {
		@apply bg-red-200 mx-5 mt-10 text-[green] flex;
	}*/
</style>
