<script>
  export let id;
  export let name;
  export let image;
  export let category;
  export let slabs;
</script>

<a href="/colectii/{id}" class="collection-card">
  <div class="collection-image">
    <img src={image} alt={name} />
    <div class="category-chip">
      {category}
    </div>
    <div class="slabs-count">
      {slabs.length} plăci
    </div>
  </div>
  <div class="collection-info">
    <h3>{name}</h3>
  </div>
</a>

<style>
  .collection-card {
    text-decoration: none;
    color: inherit;
    overflow: hidden;
    transition: transform 0.3s ease;
    display: flex;
    flex-direction: column;
  }

  .collection-card:hover {
    cursor: pointer;
  }

  .collection-image {
    width: 100%;
    position: relative;
    padding-top: 133.33%; /* 4:3 aspect ratio */
  }

  .collection-image img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 12px;
    object-fit: cover;
  }

  .category-chip {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 500;
    backdrop-filter: blur(4px);
  }

  .slabs-count {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 500;
    backdrop-filter: blur(4px);
  }

  .collection-info {
    padding: 1.2rem 0.4rem;
  }

  .collection-info h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.2rem;
    font-weight: 600;
  }


</style> 