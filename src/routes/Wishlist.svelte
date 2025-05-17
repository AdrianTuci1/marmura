<script>
  import { wishlist, removeFromWishlist } from '../lib/stores/wishlist.js';
</script>

<div class="wishlist-container">
  <h1>Lista de Favorite</h1>
  
  {#if $wishlist.length === 0}
    <div class="empty-state">
      <p>Nu aveți produse salvate în lista de favorite.</p>
    </div>
  {:else}
    <div class="wishlist-grid">
      {#each $wishlist as item}
        <div class="wishlist-item">
          <div class="item-image">
            <img src={item.image} alt={item.name} />
          </div>
          <div class="item-content">
            <h2>{item.name}</h2>
            <button 
              class="remove-button" 
              on:click={() => removeFromWishlist(item.id)}
              aria-label="Șterge din favorite"
            >
              Șterge din favorite
            </button>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .wishlist-container {
    max-width: 1200px;
    margin: 100px auto 0;
    padding: 2rem;
  }

  h1 {
    font-family: 'Urbanist', sans-serif;
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }

  .empty-state {
    text-align: center;
    padding: 3rem;
    background: #f5f5f5;
    border-radius: 8px;
  }

  .wishlist-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
  }

  .wishlist-item {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }

  .item-image {
    width: 100%;
    height: 200px;
  }

  .item-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .item-content {
    padding: 1.5rem;
  }

  h2 {
    font-family: 'Urbanist', sans-serif;
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }

  .remove-button {
    background: #ff4444;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.3s ease;
  }

  .remove-button:hover {
    background: #ff0000;
  }
</style> 