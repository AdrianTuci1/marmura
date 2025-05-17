<script>
  // Articles page component
</script>

<div class="articles-container">
  <h1>Articole</h1>
  <div class="articles-grid">
    <!-- Sample article cards - replace with dynamic content -->
    <div class="article-card">
      <div class="article-image">
        <img src="https://via.placeholder.com/300x200" alt="Article thumbnail" />
      </div>
      <div class="article-content">
        <h2>Titlu Articol</h2>
        <p>Descriere scurtă a articolului...</p>
        <a href="#" class="read-more">Citește mai mult</a>
      </div>
    </div>
  </div>
</div>

<style>
  .articles-container {
    max-width: 1200px;
    margin: 100px auto 0;
    padding: 2rem;
  }

  h1 {
    font-family: 'Urbanist', sans-serif;
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }

  .articles-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
  }

  .article-card {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    transition: transform 0.3s ease;
  }

  .article-card:hover {
    transform: translateY(-5px);
  }

  .article-image img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  .article-content {
    padding: 1.5rem;
  }

  h2 {
    font-family: 'Urbanist', sans-serif;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .read-more {
    display: inline-block;
    margin-top: 1rem;
    color: #333;
    text-decoration: none;
    font-weight: 500;
  }

  .read-more:hover {
    text-decoration: underline;
  }
</style> 