<script lang="ts">
  export let slabName: string;
  export let collectionName: string;
</script>

<div class="slab-bottom-bar">
  <div class="slab-bottom-content">
    <div class="slab-bottom-name">
      {slabName.toUpperCase()} <span class="slab-bottom-collection">{collectionName.toUpperCase()}</span>
    </div>
    <div class="slab-bottom-actions">
      <button class="slab-save" aria-label="Salvează">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
        </svg>
      </button>
      <button class="slab-request-info">REQUEST INFO</button>

    </div>
  </div>
</div>

<style>
  .slab-bottom-bar {
    background: #181818;
    color: #fff;
    z-index: 9999;
    min-height: 60px;
    font-size: 1.2rem;
    box-shadow: 0 -2px 12px rgba(0,0,0,0.08);
    width: 100%;
    border-radius: 14px;
    display: flex;
    align-items: center;
  }
  .slab-bottom-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2rem;
    width: 100%;
  }
  .slab-bottom-name {
    font-weight: 600;
    font-size: 1.15rem;
    letter-spacing: 0.02em;
  }
  .slab-bottom-collection {
    font-weight: 400;
    font-size: 1rem;
    color: #bdbdbd;
    margin-left: 1.2rem;
  }
  .slab-bottom-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .slab-request-info {
    background: #fff;
    color: #181818;
    border: none;
    border-radius: 8px;
    padding: 0.7rem 2.2rem;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
  }
  .slab-request-info:hover {
    background: #222;
    color: #fff;
  }
  .slab-save {
    background: transparent;
    border: none;
    color: #fff;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 8px;
    transition: background 0.2s;
  }
  .slab-save:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  @media (max-width: 900px) {
    .slab-bottom-content {
      padding: 0.7rem 1rem;
    }
  }
  @media (max-width: 600px) {
    .slab-bottom-bar {
      font-size: 1rem;
    }
  }
</style> 