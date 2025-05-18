<script lang="ts">
  export let slabName: string;
  export let collectionName: string;
</script>

<div class="slab-bottom-bar">
  <div class="slab-bottom-name">
    {slabName} <span class="slab-bottom-collection">{collectionName}</span>
  </div>
  <button class="slab-request-info">REQUEST INFO</button>
</div>

<style>
  .slab-bottom-bar {
    display: flex;
    background: #181818;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 9999;
    min-height: 60px;
    font-size: 1.2rem;
    box-shadow: 0 -2px 12px rgba(0,0,0,0.08);
    width: 100%;
    border-radius: 14px;
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
  @media (max-width: 900px) {
    .slab-bottom-bar {
      padding: 0.7rem 1rem;
    }
  }
  @media (max-width: 600px) {
    .slab-bottom-bar {
      font-size: 1rem;
    }
  }
</style> 