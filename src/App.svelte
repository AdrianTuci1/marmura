<script>
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { ScrollSmoother } from 'gsap/ScrollSmoother';
  import Navbar from './lib/Navbar.svelte';
  import Description from './lib/Description.svelte';
  import Nautati from './lib/Nautati.svelte';
  import Projects from './lib/Projects.svelte';
  import Categorii from './lib/Categorii.svelte';
  import Showroom from './lib/Showroom.svelte';
  import Footer from './lib/Footer.svelte';

  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
  
  let container;
  let image;
  let descriptionSection;

  onMount(() => {
    ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.8,
      effects: true
    });

    ScrollTrigger.create({
      trigger: descriptionSection,
      start: "top top",
      end: "bottom top",
      onUpdate: (self) => {
        gsap.set(image, {
          y: 100 * self.progress
        });
      }
    });
  });
</script>

<div class="app-container" bind:this={container}>
  <div id="smooth-wrapper">
    <div id="smooth-content">
      <div class="image-container" bind:this={image}>
        <img src="/landing.png" alt="MarmurArt Landing" />
      </div>
      <Navbar />
      <div bind:this={descriptionSection}>
        <Description />
      </div>
      <Nautati />
      <Projects />
      <Categorii />
      <Showroom />
      <Footer />
    </div>
  </div>
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }

  :global(#app) {
    margin: 0;
    padding: 0;
    width: 100%;
    overflow-x: hidden;
  }

  .app-container {
    position: relative;
    min-height: 100vh;
    overflow: hidden;
  }

  #smooth-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    overflow: hidden;
  }

  #smooth-content {
    min-height: 100vh;
  }

  .image-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 1;
    border-radius: 0 0 26px 26px;
    overflow: hidden;
  }

  .image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center -100px;
  }
</style>
