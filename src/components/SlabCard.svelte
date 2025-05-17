<script>
  export let id;
  export let name;
  export let image;
  export let collectionId;
</script>

<a href="/colectii/{collectionId}/{id}" class="slab-card">
  <div class="slab-image">
    <img src={image} alt={name} />
  </div>
  <div class="slab-info">
    <h3>{name.toUpperCase()}</h3>
  </div>
</a>

<style>
  .slab-card {
    text-decoration: none;
    color: inherit;
    overflow: hidden;
    display: block;
  }

  .slab-card:hover {
    cursor: pointer;
  }

  .slab-image {
    position: relative;
    padding-top: 133.33%; /* 1:1 aspect ratio */
  }

  .slab-image img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px;
  }

  .slab-info {
    padding: 1.2rem 0.4rem;
  }

  .slab-info h3 {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 600;
  }
</style> 