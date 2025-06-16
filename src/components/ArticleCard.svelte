<script>
  export let id;
  export let title;
  export let image;
  export let description;
</script>

<a href="/articole/{id}" class="article-card">
  <div class="article-image">
    <img src={image} alt={title} />
  </div>
  <div class="article-info">
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
</a>

<style>
  .article-card {
    text-decoration: none;
    color: inherit;
    overflow: hidden;
    transition: transform 0.3s ease;
    display: flex;
    flex-direction: column;
  }

  .article-card:hover {
    cursor: pointer;
  }

  .article-image {
    width: 100%;
    position: relative;
    padding-top: 133.33%; /* 3:4 aspect ratio */
  }

  .article-image img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 12px;
    object-fit: cover;
  }

  .article-info {
    padding: 1.2rem;
  }

  .article-info h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.2rem;
    font-weight: 600;
    font-family: 'Urbanist', sans-serif;
  }

  .article-info p {
    margin: 0;
    color: #666;
    font-size: 0.9rem;
    line-height: 1.4;
  }
</style> 