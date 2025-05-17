<script lang="ts">
  import { router } from 'tinro';
  import { collections } from '../../../lib/data/collections';
  
  interface RouteParams {
    id: string;
    slabId: string;
  }
  
  // Find the collection and slab
  $: params = router.params() as unknown as RouteParams;
  $: collection = collections.find(c => c.id === params.id);
  $: slab = collection?.slabs.find(s => s.id === params.slabId);
</script>

<main>
  {#if collection && slab}
    <div class="slab-header">
      <div class="slab-image">
        <img src={slab.image} alt={slab.name} />
      </div>
      <div class="slab-info">
        <div class="breadcrumb">
          <a href="/colectii">Colecții</a>
          <span class="separator">/</span>
          <a href="/colectii/{collection.id}">{collection.name}</a>
          <span class="separator">/</span>
          <span class="current">{slab.name}</span>
        </div>
        <h1>{slab.name}</h1>
        <p class="type">{slab.type}</p>
      </div>
    </div>
  {:else}
    <div class="not-found">
      <h1>Placa nu a fost găsită</h1>
      <a href="/colectii" class="back-button">Înapoi la colecții</a>
    </div>
  {/if}
</main>

<style>
  main {
    padding-top: 100px;
    min-height: 100vh;
    background-color: #f5f5f5;
  }

  .slab-header {
    background: white;
    padding: 2rem;
    margin-bottom: 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    align-items: start;
  }

  .slab-image {
    width: 100%;
    position: relative;
    padding-top: 100%;
    border-radius: 12px;
    overflow: hidden;
  }

  .slab-image img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .slab-info {
    padding: 1rem 0;
  }

  .breadcrumb {
    margin-bottom: 1.5rem;
    font-size: 0.9rem;
  }

  .breadcrumb a {
    color: #666;
    text-decoration: none;
    transition: color 0.3s ease;
  }

  .breadcrumb a:hover {
    color: #333;
  }

  .separator {
    margin: 0 0.5rem;
    color: #999;
  }

  .current {
    color: #333;
    font-weight: 500;
  }

  .slab-info h1 {
    margin: 0 0 1rem 0;
    font-size: 2rem;
    font-weight: 600;
  }

  .type {
    display: inline-block;
    background: #333;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }

  .not-found {
    text-align: center;
    padding: 4rem 2rem;
  }

  .back-button {
    display: inline-block;
    background: #333;
    color: white;
    padding: 1rem 2rem;
    border-radius: 8px;
    text-decoration: none;
    margin-top: 2rem;
    transition: background 0.3s ease;
  }

  .back-button:hover {
    background: #444;
  }

  @media (max-width: 768px) {
    .slab-header {
      grid-template-columns: 1fr;
    }

    .slab-image {
      padding-top: 100%;
    }
  }
</style> 