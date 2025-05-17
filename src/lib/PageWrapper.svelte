<script>
  import { onMount, onDestroy } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { ScrollSmoother } from 'gsap/ScrollSmoother';
  import FloatingBar from '../components/FloatingBar.svelte';
  import Footer from './Footer.svelte';
  import { gridView, toggleFilters, setGridView } from './stores/collections';

  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

  export let showFloatingBar = false;
  let smoother;

  onMount(() => {
    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.8,
      effects: true,
      normalizeScroll: true
    });
  });

  onDestroy(() => {
    if (smoother) smoother.kill();
  });
</script>

<div class="page-wrapper">
  <div id="smooth-wrapper">
    <div id="smooth-content">
      <main>
        <slot />
      </main>

      <div class="footer-container">
        <Footer />
      </div>
    </div>
  </div>

  {#if showFloatingBar}
    <div class="floating-bar-wrapper">
      <FloatingBar 
        {gridView}
        onToggleFilters={toggleFilters}
        onToggleGridView={setGridView}
      />
    </div>
  {/if}
</div>

<style>
  .page-wrapper {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
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
    position: relative;
  }

  main {
    flex: 1;
    position: relative;
    z-index: 2;
  }

  .footer-container {
    position: relative;
    z-index: 1;
  }

  .floating-bar-wrapper {
    position: fixed;
    bottom: 20px;
    left: 0;
    right: 0;
    z-index: 1000;
    pointer-events: none;
  }

  :global(.floating-bar) {
    pointer-events: auto;
  }
</style> 