<script>
  import { fade } from 'svelte/transition';
  
  const collections = [
    { 
      name: 'COLECTIA 1', 
      image: 'https://images.adsttc.com/media/images/5e1e/2a28/3312/fd58/9c00/0a75/newsletter/FI.jpg?1579035167',
      category: 'interior',
      description: 'Colecție modernă pentru interior'
    },
    { 
      name: 'COLECTIA 2', 
      image: 'https://www.granit.co.uk/wp-content/uploads/2016/12/ab_wandsworth_common_west_side_02.jpg',
      category: 'exterior',
      description: 'Colecție rezistentă pentru exterior'
    },
    { 
      name: 'COLECTIA 3', 
      image: 'https://a.storyblok.com/f/236904/497x350/798c895dd3/hashotel-hasselt.png/m/1080x0',
      category: 'interior',
      description: 'Colecție elegantă pentru spații comerciale'
    },
    { 
      name: 'COLECTIA 4', 
      image: 'https://static.dezeen.com/uploads/2020/01/vicostone-ultrathin-quartz-slab-collection-products-design-interiors-_dezeen_1704_hero.jpg',
      category: 'exterior',
      description: 'Colecție premium pentru proiecte de lux'
    }
  ];

  let selectedCategory = 'all';
  let searchQuery = '';

  $: filteredCollections = collections.filter(collection => {
    const matchesCategory = selectedCategory === 'all' || collection.category === selectedCategory;
    const matchesSearch = collection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         collection.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
</script>

<main>
  <div class="collections-container">
    <div class="filters">
      <div class="search-box">
        <input 
          type="text" 
          bind:value={searchQuery} 
          placeholder="Caută colecții..."
          aria-label="Caută colecții"
        />
      </div>
      
      <div class="category-filters">
        <button 
          class:active={selectedCategory === 'all'} 
          on:click={() => selectedCategory = 'all'}
        >
          Toate
        </button>
        <button 
          class:active={selectedCategory === 'interior'} 
          on:click={() => selectedCategory = 'interior'}
        >
          Interior
        </button>
        <button 
          class:active={selectedCategory === 'exterior'} 
          on:click={() => selectedCategory = 'exterior'}
        >
          Exterior
        </button>
      </div>
    </div>

    <div class="collections-grid" transition:fade>
      {#each filteredCollections as collection}
        <a href="/colectii/{collection.name.toLowerCase().replace(' ', '-')}" class="collection-card">
          <div class="collection-image">
            <img src={collection.image} alt={collection.name} />
          </div>
          <div class="collection-info">
            <h3>{collection.name}</h3>
            <p>{collection.description}</p>
          </div>
        </a>
      {/each}
    </div>
  </div>
</main>

<style>
  main {
    padding-top: 100px;
    min-height: 100vh;
    background-color: #f5f5f5;
  }

  .collections-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }

  .filters {
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .search-box {
    width: 100%;
    max-width: 400px;
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

  .collections-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2rem;
  }

  .collection-card {
    text-decoration: none;
    color: inherit;
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    transition: transform 0.3s ease;
  }

  .collection-card:hover {
    transform: translateY(-5px);
  }

  .collection-image {
    width: 100%;
    height: 200px;
    overflow: hidden;
  }

  .collection-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .collection-info {
    padding: 1.5rem;
  }

  .collection-info h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.2rem;
    font-weight: 600;
  }

  .collection-info p {
    margin: 0;
    color: #666;
    font-size: 0.9rem;
    line-height: 1.4;
  }

  @media (max-width: 768px) {
    .collections-container {
      padding: 1rem;
    }

    .collections-grid {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1rem;
    }
  }
</style> 