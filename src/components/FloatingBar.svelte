<script>
  export let gridView;
  export let onToggleFilters;
  export let onToggleGridView;
</script>

<div class="floating-bar">
  <button class="floating-button" on:click={onToggleFilters}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
    </svg>
    Filtre
  </button>
  <div class="view-options">
    <button 
      class:active={gridView === 'box'} 
      on:click={() => onToggleGridView('box')} 
      aria-label="Vezi colecțiile în modul box"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="3" width="7" height="7"/>
        <rect x="14" y="3" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/>
        <rect x="3" y="14" width="7" height="7"/>
      </svg>
    </button>
    <button 
      class:active={gridView === 'icon'} 
      on:click={() => onToggleGridView('icon')} 
      aria-label="Vezi colecțiile în modul icon"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="3" width="4" height="18"/>
        <rect x="10" y="3" width="4" height="18"/>
        <rect x="17" y="3" width="4" height="18"/>
      </svg>
    </button>
  </div>
</div>

<style>
  .floating-bar {
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    background: white;
    padding: 0.8rem 1.5rem;
    border-radius: 50px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    display: flex;
    gap: 1rem;
    align-items: center;
    z-index: 100;
  }

  .floating-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border: none;
    background: #333;
    color: white;
    border-radius: 25px;
    cursor: pointer;
    font-family: 'Urbanist', sans-serif;
    transition: all 0.3s ease;
  }

  .floating-button:hover {
    background: #444;
  }

  .view-options {
    display: flex;
    gap: 0.5rem;
  }

  .view-options button {
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    background: white;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .view-options button.active {
    background: #333;
    color: white;
    border-color: #333;
  }

  @media (max-width: 768px) {
    .floating-bar {
      bottom: 1rem;
      padding: 0.6rem 1rem;
    }
  }
</style> 