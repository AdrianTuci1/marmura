<script>
  import { router } from 'tinro';
  import SlabCard from '../../components/SlabCard.svelte';
  import { collections } from '../../lib/data/collections';
  
  $: collection = collections.find(c => c.id === router.params().id);
</script>

<main>
  {#if collection}
    <div class="collection-header">
      <div class="collection-image">
        <img src={collection.image} alt={collection.name} />
      </div>
      <div class="collection-info">
        <h1>{collection.name}</h1>
        <p class="category">{collection.category}</p>
        <p class="description">{collection.longDescription}</p>
      </div>
    </div>

    <div class="slabs-grid">
      {#each collection.slabs as slab}
        <SlabCard {...slab} collectionId={collection.id} />
      {/each}
    </div>
  {:else}
    <div class="not-found">
      <h1>Colecția nu a fost găsită</h1>
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

  .collection-header {
    background: white;
    padding: 2rem;
    margin-bottom: 2rem;
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 2rem;
    align-items: start;
  }

  .collection-image {
    width: 100%;
    position: relative;
    padding-top: 75%;
    border-radius: 12px;
    overflow: hidden;
  }

  .collection-image img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .collection-info {
    padding: 1rem 0;
  }

  .collection-info h1 {
    margin: 0 0 1rem 0;
    font-size: 2rem;
    font-weight: 600;
  }

  .category {
    display: inline-block;
    background: #333;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }

  .description {
    color: #666;
    line-height: 1.6;
    font-size: 1.1rem;
  }

  .slabs-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(275px, 1fr));
    gap: 2rem;
    padding: 2rem;
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
    .collection-header {
      grid-template-columns: 1fr;
    }

    .collection-image {
      padding-top: 56.25%;
    }

    .slabs-grid {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      padding: 1rem;
    }
  }
</style> 