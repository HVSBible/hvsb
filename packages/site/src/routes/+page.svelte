<script lang="ts">
  import { onMount } from 'svelte';
  // import { prefetch } from '$app/navigation';
  import { user, isSubscriber, admin } from '$lib/stores';
  import { bookName } from '@hvsb/parts';

  let currentVersion = 'WEB';
  let currentBook = 'MAT';
  let currentChapter = '1';

  onMount(() => {
    const storedVersion = localStorage.getItem('currentVersion');
    if (storedVersion) {
      currentVersion = storedVersion;
    }
    const storedBook = localStorage.getItem('currentBook');
    if (storedBook) {
      currentBook = storedBook;
    }
    const storedChapter = localStorage.getItem('currentChapter');
    if (storedChapter) {
      currentChapter = storedChapter;
    }
    // TODO: Causes error: Cannot read property 'load' of undefined (there is a preload in the layout but not the actual file)
    // prefetch(`/${currentVersion}/${currentBook}/${currentChapter}`);
  });

  import Header from '$lib/components/shell/Header.svelte';
  import Friend from '$lib/components/home/Friend.svelte';
  import Button from 'svelte-pieces/ui/Button.svelte';
  import ShowHide from 'svelte-pieces/functions/ShowHide.svelte';
</script>

<svelte:head>
  <title>House Visual Study Bible</title>
</svelte:head>

<Header home>
  <h5 class="font-semibold uppercase sm:text-2xl">House Visual Study Bible</h5>
</Header>

<div
  class="relative pt-16 pb-16 sm:pb-32 flex content-center items-center
        justify-center"
  style="min-height: 75vh;">
  <div class="absolute top-0 w-full h-full">
    <img
      src="https://res.cloudinary.com/hvsb/image/upload/w_1500,h_1200,c_fill/v1583535926/home/Jerash_Pano_8_v7myoz.jpg"
      alt=""
      style="width: 100%; height: 100%; object-fit: cover;" />
    <span class="w-full h-full absolute opacity-50 bg-primary-900 top-0" />
  </div>
  <div class="container relative mx-auto px-4 text-center">
    <h1 class="text-white font-semibold text-5xl">An Adventure in Bible Study</h1>
    <p class="mt-4 mb-10 text-lg text-gray-300">
      See the sites, artifacts, and cultures of the biblical world as you read each chapter of the
      Bible.
    </p>
    <a
      
      class="py-3 sm:py-4 px-4 sm:px-6 text-xl sm:text-3xl rounded bg-white
            text-gray-900 font-semibold inline-block hover:bg-gray-200"
      href={`/${currentVersion}/${currentBook}/${currentChapter}`}>
      {currentBook === 'MAT' && currentChapter == '1' ? 'Begin Reading' : 'Resume Reading'}
    </a>
    <div class="text-sm text-gray-300 my-2">
      ({bookName(currentBook)}
      {currentChapter})
    </div>
  </div>
</div>

<section class="pb-20 bg-gray-300 -mt-10 md:-mt-24">
  <!-- <div class="container mx-auto text-center relative">
    <img alt="" src="laptopframe.png" />
    <div class="w-full lg:w-8/12 mx-auto px-3">
      <div class="bg-white mb-8 shadow-lg rounded-lg overflow-hidden">
        <img alt="" src="matthew1.jpg" />
      </div>
    </div>
  </div> -->
  <div class="container mx-auto px-4 max-w-6xl">
    <div class="flex flex-wrap">
      <div class="md:pt-6 w-full md:w-4/12 px-4 text-center">
        <div
          class="relative flex flex-col min-w-0 break-words bg-white w-full
              mb-8 shadow-lg rounded-lg">
          <div class="px-4 py-5 flex-auto">
            <div
              class="text-white p-3 text-center inline-flex items-center
                  justify-center w-12 h-12 mb-5 shadow-lg rounded-full
                  bg-red-400">
              <i class="fas fa-user" />
            </div>
            <h6 class="text-xl font-semibold">Biographies</h6>
            <p class="mt-2 mb-4 text-gray-600">
              Get to know important biblical figures on a deeper level through biographical studies.
            </p>
            <!-- /WEB/JHN/1/NgjmjbakKcfLL91E1WJ7 Andrew -->
          </div>
        </div>
      </div>
      <div class="md:pt-6 w-full md:w-4/12 px-4 text-center">
        <div
          class="relative flex flex-col min-w-0 break-words bg-white w-full
              mb-8 shadow-lg rounded-lg">
          <div class="px-4 py-5 flex-auto">
            <div
              class="text-white p-3 text-center inline-flex items-center
                  justify-center w-12 h-12 mb-5 shadow-lg rounded-full
                  bg-primary-400">
              <i class="far fa-handshake" />
            </div>
            <h6 class="text-xl font-semibold">Customs & Culture</h6>
            <p class="mt-2 mb-4 text-gray-600">
              See the flavor and richness behind specific actions and sayings by immersing yourself
              in the biblical world.
            </p>
          </div>
        </div>
      </div>
      <div class="md:pt-6 w-full md:w-4/12 px-4 text-center">
        <div
          class="relative flex flex-col min-w-0 break-words bg-white w-full
              mb-8 shadow-lg rounded-lg">
          <div class="px-4 py-5 flex-auto">
            <div
              class="text-white p-3 text-center inline-flex items-center
                  justify-center w-12 h-12 mb-5 shadow-lg rounded-full
                  bg-green-400">
              <i class="fas fa-question" />
            </div>
            <h6 class="text-xl font-semibold">Theological Issues</h6>
            <p class="mt-2 mb-4 text-gray-600">
              Understand theological and textual problems with the assistance of biblical scholars.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-wrap items-center mt-16 md:mt-24">
      <div class="w-full md:w-5/12 px-4 mr-auto ml-auto">
        <div
          class="text-gray-600 p-3 text-center inline-flex items-center
              justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-gray-100">
          <i class="fas fa-columns text-xl" />
        </div>
        <h3 class="text-3xl mb-2 font-semibold leading-normal">Parallel Learning</h3>
        <p class="text-lg font-light leading-relaxed mt-4 mb-4 text-gray-700">
          Find help on biblical passages, from the same page of the chapter you are reading.
        </p>
        <p class="text-lg font-light leading-relaxed mt-0 mb-4 text-gray-700">
          Keep the Biblical text in view while you learn.
        </p>
        <a  href={`/WEB/MAT/1`} class="font-bold text-gray-800 mt-8">
          View a sample chapter <i class="fas fa-chevron-right" />
        </a>
      </div>
      <div class="w-full md:w-4/12 px-4 mr-auto ml-auto">
        <div
          class="relative flex flex-col min-w-0 break-words w-full my-6
              shadow-lg rounded-lg bg-primary-600">
          <img
            src="https://res.cloudinary.com/hvsb/image/upload/w_800/v1584228078/home/side-by-side-matt1_wltivk.jpg"
            alt="View study resources beside the text"
            class="w-full align-middle rounded-t-lg" />
          <blockquote class="relative p-8 mb-4">
            <svg
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 583 95"
              class="absolute left-0 w-full block"
              style="height: 95px; top: -94px;">
              <polygon points="-30,95 583,95 583,65" class="text-primary-600 fill-current" />
            </svg>
            <h4 class="text-xl font-bold text-white">Side-by-side</h4>
            <p class="text-md font-light mt-2 text-white">
              Study resources are baked into the text.
            </p>
          </blockquote>
        </div>
      </div>
    </div>
    <div class="items-center flex flex-wrap md:flex-row-reverse mt-16">
      <div class="w-full md:w-5/12 ml-auto mr-auto px-4">
        <div class="md:pr-12">
          <h3 class="text-3xl font-semibold">Gain Understanding</h3>
          <p class="mt-4 text-lg leading-relaxed text-gray-600">
            Learn the significance of people, locations, and events in the Bible through
            high-quality media.
          </p>
          <ul class="list-none mt-6">
            <li class="py-2">
              <div class="flex items-center">
                <div>
                  <span
                    class="text-xs font-semibold inline-block py-1 px-2
                        uppercase rounded-full text-primary-600 shadow
                        bg-gray-100 mr-3">
                    <i class="fas fa-image" />
                  </span>
                </div>
                <div>
                  <h4 class="text-gray-600">Images</h4>
                </div>
              </div>
            </li>
            <li class="py-2">
              <div class="flex items-center">
                <div>
                  <span
                    class="text-xs font-semibold inline-block py-1 px-2
                        uppercase rounded-full text-primary-600 shadow
                        bg-gray-100 mr-3">
                    <i class="far fa-file-alt" />
                  </span>
                </div>
                <div>
                  <h4 class="text-gray-600">Articles</h4>
                </div>
              </div>
            </li>
            <li class="py-2">
              <div class="flex items-center">
                <div>
                  <span
                    class="text-xs font-semibold inline-block py-1 px-2
                        uppercase rounded-full text-primary-600 shadow
                        bg-gray-100 mr-3">
                    <i class="fas fa-table" />
                  </span>
                </div>
                <div>
                  <h4 class="text-gray-600">Charts</h4>
                </div>
              </div>
            </li>
            <li class="py-2">
              <div class="flex items-center">
                <div>
                  <span
                    class="text-xs font-semibold inline-block py-1 px-2
                        uppercase rounded-full text-primary-600 shadow
                        bg-gray-100 mr-3">
                    <i class="fas fa-globe-europe" />
                  </span>
                </div>
                <div>
                  <h4 class="text-gray-600">Maps</h4>
                </div>
              </div>
            </li>
            <li class="py-2">
              <div class="flex items-center">
                <div>
                  <span
                    class="text-xs font-semibold inline-block py-1 px-2
                        uppercase rounded-full text-primary-600 shadow
                        bg-gray-100 mr-3">
                    <i class="fas fa-play" />
                  </span>
                </div>
                <div>
                  <h4 class="text-gray-600">Videos</h4>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="w-full md:w-4/12 ml-auto mr-auto p-4 mb-2">
        <a  href={`/WEB/REV/1/VsIltc7VLDJDKzMCrR9r`}>
          <img
            alt="..."
            class="max-w-full rounded-lg shadow-lg"
            src="https://lh3.googleusercontent.com/jRHQT5wh91aMzyUxo9gbOsAjR6R6oZ4b2hRdgVXUdIBf1rzBHqp8zGOD2ClPk88MDSZQP3SNHdkABA7XYA53=s400-p" />
        </a>
      </div>
    </div>
  </div>
</section>

<section class="relative py-20">
  <div
    class="bottom-auto top-0 left-0 right-0 w-full absolute
        pointer-events-none overflow-hidden -mt-20"
    style="height: 80px; transform: translateZ(0px);">
    <svg
      class="absolute bottom-0 overflow-hidden"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      version="1.1"
      viewBox="0 0 2560 100"
      x="0"
      y="0">
      <polygon class="text-white fill-current" points="2560 0 2560 100 0 100" />
    </svg>
  </div>
  <div class="container mx-auto px-4">
    <div class="flex flex-wrap justify-center text-center mb-16 md:mb-24">
      <div class="w-full lg:w-8/12 px-4">
        <div class="text-center my-6">
          <a
            href="/dr-house"
            class="inline-block overflow-hidden rounded-full shadow-lg"
            style="width: 150px; height: 150px;">
            <img
              alt="Dr. H. Wayne House"
              src="https://www.socalsem.edu/wp-content/uploads/2016/07/h-wayne-house.jpg"
              style="transform: scale(1.2)" />
          </a>
        </div>
        <h2 class="text-4xl font-semibold">Author</h2>
        <p class="text-lg m-4 text-gray-600">
          <a href="/dr-house" class="font-bold hover:text-gray-900 underline">
            Dr. H. Wayne House
          </a> has taught biblical and theological studies at several universities and seminaries during
          a teaching career of over fifty years, and written forty books and 150 articles. He was also
          the New Testament editor of the Nelson NKJV Study Bible and Nelson New Illustrated Bible Commentary,
          and is the general editor of the Evangelical Exegetical Commentary series (44 vols), with Logos/Faithlife.
          It is the knowledge amassed from these experiences which serves, along with the assistance
          of biblical scholars at a variety of universities and seminaries throughout the world, to provide
          the information contained in the House Visual Study Bible.
        </p>
      </div>
    </div>
  </div>
</section>

<section class="pt-8 pb-20 md:pb-48">
  <div class="container mx-auto px-4">
    <div class="flex flex-wrap justify-center text-center mb-16">
      <div class="w-full lg:w-6/12 px-4">
        <h2 class="text-4xl font-semibold">Friends & Associates</h2>
        <p class="text-lg leading-relaxed m-4 text-gray-600">
          Organizations and ministries that closely support our work in building a high-quality
          study resource for believers.
        </p>
      </div>
    </div>
    <div class="flex flex-wrap justify-center">
      <Friend
        href="https://faithseminary.edu/"
        title="Faith International University"
        src="https://lh3.googleusercontent.com/pMODLDqHF-q9aN2BySdjYlW82HYwDfp8AXgcns8mq-yCmzHKSmQHWgYHUyEcLJ9mwBhtCSLvKIjVlAHBzV2KiCB614ANwtVAXFg=h240"
        description="Committed to the historic Christian faith and the inspiration and inerrancy of the Bible" />
      <Friend
        href="https://www.bibleplaces.com/"
        title="Bible Places"
        src="https://lh3.googleusercontent.com/9x2asq8KOUEuZHaI6jXg_nO4hOpQRJNF7ef80M8SgWllfJl5YAdVWPup67LS1Nr1-V31r3DwdpLDDgojuaIi=h240"
        description="Superb photos of Bible sites and artifacts" />
      <Friend
        href="https://www.accordancebible.com/"
        title="Accordance Bible Software"
        src="https://lh3.googleusercontent.com/xWQKy19tdEa_Ee591Xovb0jDzUqrr0NG7pwiwfG2QtD6l5qLNh7RYJQqeB_Lg3i8gkfdze4mzVXMZKAk8EeMyg=h240"
        description=" Excellent research program for the serious student of Scripture, particularly in the original languages" />
      <Friend
        href="https://deanbibleministries.org/"
        title="Dean Bible Ministries"
        src="https://lh3.googleusercontent.com/hHYZU9ZPFeP0A6VvJv22wxf8I5RAq7QpRgO8ybWb6_LX-jmqiV-3HmvOj8zfl2HTz28AvCUwUySvc6MnYQgvXQ=h240"
        description="Expositional Teaching of the Bible" />
      <Friend
        href="https://www.worldofthebible.com/"
        title="World of the Bible"
        src="https://res.cloudinary.com/hvsb/image/upload/h_240/v1591303089/friends/WBM_Logo_best_nf9vny.jpg"
        description="A look at the Jewish temple in ancient and modern Jerusalem like you have never seen before" />
      <Friend
        href="https://viu.ves.edu/viu-school-of-archaeology/"
        title="Veritas International University"
        src="https://res.cloudinary.com/hvsb/image/upload/h_240/v1596552719/friends/VIU2_300dpi_aupwuo.jpg"
        description="Evangelical university committed to the study of Scripture, apologetics, and
        biblical archaeology" />
      <Friend
        href="https://tutkutours.com/"
        title="Tutku Tours"
        src="https://res.cloudinary.com/hvsb/image/upload/h_240/v1620767844/friends/TutkuTours_sxrsfx.png"
        description="Offering numerous tour packages in Turkey, Europe, and the Eastern Mediterranean." />
    </div>
  </div>
</section>

<section class="pb-20 relative block bg-gray-900">
  <div
    class="bottom-auto top-0 left-0 right-0 w-full absolute
        pointer-events-none overflow-hidden -mt-20"
    style="height: 80px; transform: translateZ(0px);">
    <svg
      class="absolute bottom-0 overflow-hidden"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      version="1.1"
      viewBox="0 0 2560 100"
      x="0"
      y="0">
      <polygon class="text-gray-900 fill-current" points="2560 0 2560 100 0 100" />
    </svg>
  </div>
  <div class="container mx-auto px-4 pt-16 pb-8 sm:pb-16">
    <div class="flex flex-wrap text-center justify-center">
      <div class="w-full lg:w-6/12 px-4">
        <h2 class="text-4xl font-semibold text-white">Pricing</h2>
        <p class="text-lg leading-relaxed mt-4 mb-4 text-gray-500">
          The first chapter of every book is free so you can understand how the tool works before
          subscribing. Subscriptions are <b>$5 per month</b>
          or <b>$50 per year</b> and start with a two-week trial period.
        </p>
        {#if !$user}
          <ShowHide let:show let:toggle>
            <Button onclick={toggle} color="white" form="filled" size="lg">Sign Up</Button>
            {#if show}
              {#await import('$lib/components/modals/Auth.svelte') then { default: Auth }}
                <Auth on:close={toggle} />
              {/await}
            {/if}
          </ShowHide>
        {:else if !isSubscriber($user)}
          <ShowHide let:show let:toggle>
            <Button onclick={toggle} color="white" form="filled" size="lg">Subscribe</Button>
            {#if show}
              {#await import('$lib/components/modals/Subscribe.svelte') then { default: Subscribe }}
                <Subscribe on:close={toggle} />
              {/await}
            {/if}
          </ShowHide>
        {/if}
      </div>
    </div>
  </div>
</section>

<footer class="relative bg-gray-300 pt-8 pb-6">
  <div
    class="bottom-auto top-0 left-0 right-0 w-full absolute
        pointer-events-none overflow-hidden -mt-20"
    style="height: 80px; transform: translateZ(0px);">
    <svg
      class="absolute bottom-0 overflow-hidden"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      version="1.1"
      viewBox="0 0 2560 100"
      x="0"
      y="0">
      <polygon class="text-gray-300 fill-current" points="2560 0 2560 100 0 100" />
    </svg>
  </div>
  <div class="container mx-auto px-4">
    <div class="flex flex-wrap text-center justify-center">
      <div class="w-full lg:w-6/12 px-4">
        <h4 class="text-3xl font-semibold">A work in progress</h4>
        <h5 class="text-lg mt-0 mb-6 text-gray-700">
          We are currently in the process of adding content to the New Testament, after which will
          come the Old Testament. After completely publishing study resources for the whole Bible,
          regular updates will continue to provide the latest biblical scholarship and additional
          articles and images. Not only will the HVSB be a valuable tool for all of our friends in
          America, but we will also be looking to have the study Bible translated into many other
          languages. So many people around the world could greatly benefit from this tool, and we
          are so excited about this expansion. God has truly opened doors to spread His Word to
          many, many more people through the HVSB. 
          <!-- If you would like to help us accomplish this
          goal, please consider making a donation. Thank you and God bless! -->
        </h5>
      </div>
    </div>
    <hr class="my-6 border-gray-400" />
    <div class="text-center">
      <div class="text-sm text-gray-600 font-semibold py-1">
        All content copyright
        <!-- <a
          href="https://hvsb.app/about/copyright"
          class="text-gray-600 hover:text-gray-900 underline">
          copyright
        </a> -->
        of
        <a href="/dr-house" class="text-gray-600 hover:text-gray-900 underline">
          Dr. H. Wayne House
        </a>
        - © 2019 | Last updated: {new Date().getFullYear()}
        {#if $admin}
          <br />
          <a
            href="https://hvsb-parts.vercel.app/privacy-policy"
            class="text-gray-600 hover:text-gray-900 underline">
            Privacy Policy
          </a>
          •
          <a
            href="https://hvsb-parts.vercel.app/terms-of-service"
            class="text-gray-600 hover:text-gray-900 underline">
            Terms of Service
          </a>
        {/if}
      </div>
    </div>
  </div>
</footer>

<!-- srcset="
        https://res.cloudinary.com/hvsb/image/upload/w_2000,h_1600,c_fill/v1581986226/home/shepherds_ydlife.jpg
        2000w,
        https://res.cloudinary.com/hvsb/image/upload/w_1500,h_1200,c_fill/v1581986226/home/shepherds_ydlife.jpg
        1500w,
        https://res.cloudinary.com/hvsb/image/upload/w_1000,h_800,c_fill/v1581986226/home/shepherds_ydlife.jpg
        1000w,
        https://res.cloudinary.com/hvsb/image/upload/w_600,h_800,c_fill/v1581986226/home/shepherds_ydlife.jpg, 600w
        "
        sizes="100vw" -->
