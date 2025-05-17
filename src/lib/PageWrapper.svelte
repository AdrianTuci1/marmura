<script>
  import FloatingBar from '../components/FloatingBar.svelte';
  import Footer from './Footer.svelte';
  import { gridView, toggleFilters, setGridView } from './stores/collections';

  export let showFloatingBar = false;
</script>

<div class="page-wrapper">
  <main>
    <slot />
  </main>

  {#if showFloatingBar}
    <FloatingBar 
      {gridView}
      onToggleFilters={toggleFilters}
      onToggleGridView={setGridView}
    />
  {/if}

  <div class="footer-container">
  <Footer />
</div>
</div>

<style>
  .page-wrapper {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  main {
    flex: 1;
    z-index: 1;
  }

  .footer-container {
    z-index: 0;
  }

</style> 