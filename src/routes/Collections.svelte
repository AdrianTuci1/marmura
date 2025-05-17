<script>
  import { fade } from 'svelte/transition';
  import CollectionCard from '../components/CollectionCard.svelte';
  import { showFilters, gridView, selectedCategory, searchQuery, toggleFilters, setCategory, setGridView } from '../lib/stores/collections';
  import { collections } from '../lib/data/collections';
  
  $: filteredCollections = collections.filter(collection => {
    const matchesCategory = $selectedCategory === 'all' || collection.category === $selectedCategory;
    const matchesSearch = collection.name.toLowerCase().includes($searchQuery.toLowerCase()) ||
                         collection.description.toLowerCase().includes($searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
</script>

<main>
  <div class="collections-container">
    <div class="collections-grid" class:box-view={$gridView === 'box'} class:icon-view={$gridView === 'icon'} transition:fade>
      {#each filteredCollections as collection}
        <CollectionCard {...collection} />
      {/each}
    </div>
  </div>

  {#if $showFilters}
    <div class="filters-overlay" transition:fade>
      <div class="filters-content">
        <button class="close-button" on:click={toggleFilters}>×</button>
        <div class="search-box">
          <input 
            type="text" 
            bind:value={$searchQuery} 
            placeholder="Caută colecții..."
            aria-label="Caută colecții"
          />
        </div>
        
        <div class="category-filters">
          <button 
            class:active={$selectedCategory === 'all'} 
            on:click={() => setCategory('all')}
          >
            Toate
          </button>
          <button 
            class:active={$selectedCategory === 'interior'} 
            on:click={() => setCategory('interior')}
          >
            Interior
          </button>
          <button 
            class:active={$selectedCategory === 'exterior'} 
            on:click={() => setCategory('exterior')}
          >
            Exterior
          </button>
        </div>
      </div>
    </div>
  {/if}
</main>

<style>
  main {
    padding-top: 100px;
    min-height: 100vh;
    background-color: #f5f5f5;
    position: relative;
  }

  .collections-container {
    margin: 0 auto;
    padding: 2rem 20px;
  }

  .collections-grid {
    display: grid;
    gap: 2rem;
  }

  .box-view {
    grid-template-columns: repeat(4, 1fr);
  }

  .icon-view {
    grid-template-columns: repeat(3, 1fr);
  }

  .filters-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .filters-content {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    width: 90%;
    max-width: 500px;
    position: relative;
  }

  .close-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #666;
  }

  .search-box {
    margin-bottom: 1.5rem;
  }

  .search-box input {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    font-family: 'Urbanist', sans-serif;
  }

  .category-filters {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .category-filters button {
    padding: 0.5rem 1rem;
    border: 1px solid #ddd;
    border-radius: 6px;
    background: white;
    cursor: pointer;
    font-family: 'Urbanist', sans-serif;
    transition: all 0.3s ease;
  }

  .category-filters button.active {
    background: #333;
    color: white;
    border-color: #333;
  }

  @media (max-width: 768px) {
    .collections-container {
      padding: 1rem;
    }

    .box-view {
      grid-template-columns: repeat(2, 1fr);
    }

    .icon-view {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style> 