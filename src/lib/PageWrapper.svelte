<script>
  import { onMount, onDestroy } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { ScrollSmoother } from 'gsap/ScrollSmoother';
  import FloatingBar from '../components/FloatingBar.svelte';
  import SlabBottomBar from '../components/SlabBottomBar.svelte';
  import Footer from './Footer.svelte';
  import { gridView, toggleFilters, setGridView } from './stores/collections';
  import { slabBottomBar } from './stores/slabBottomBar';

  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

  export let showFloatingBar = false;
  export let disableSmoothScroll = false;
  let smoother;

  onMount(() => {
    if (!disableSmoothScroll) {
      smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 2.5,
        effects: true,
        normalizeScroll: true
      });
    }
  });

  onDestroy(() => {
    if (smoother) smoother.kill();
  });
</script>

<div class="page-wrapper">
  {#if disableSmoothScroll}
    <main>
      <slot />
    </main>

    <div class="footer-container">
      <Footer />
    </div>
  {:else}
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
  {/if}

  {#if showFloatingBar}
    <div class="floating-bar-wrapper">
      <FloatingBar 
        {gridView}
        onToggleFilters={toggleFilters}
        onToggleGridView={setGridView}
      />
    </div>
  {/if}

  {#if $slabBottomBar.show}
    <div class="slab-bottom-bar-wrapper">
      <SlabBottomBar 
        slabName={$slabBottomBar.slabName} 
        collectionName={$slabBottomBar.collectionName} 
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

  .slab-bottom-bar-wrapper {
    position: fixed;
    padding: 20px;
    bottom: 5px;
    left: 0;
    right: 0;
    z-index: 1000;
    pointer-events: none;
  }

  :global(.floating-bar),
  :global(.slab-bottom-bar) {
    pointer-events: auto;
  }
</style> 