<script>
  import { fade } from 'svelte/transition';

  let isCollectionsOpen = false;
  const collections = [
    { name: 'COLECȚIA 1', image: 'https://images.adsttc.com/media/images/5e1e/2a28/3312/fd58/9c00/0a75/newsletter/FI.jpg?1579035167' },
    { name: 'COLECȚIA 2', image: 'https://www.granit.co.uk/wp-content/uploads/2016/12/ab_wandsworth_common_west_side_02.jpg' },  
    { name: 'COLECȚIA 3', image: 'https://a.storyblok.com/f/236904/497x350/798c895dd3/hashotel-hasselt.png/m/1080x0' },
    { name: 'COLECȚIA 4', image: 'https://static.dezeen.com/uploads/2020/01/vicostone-ultrathin-quartz-slab-collection-products-design-interiors-_dezeen_1704_hero.jpg' }
  ];
</script>

<nav>
  <div class="nav-container">
    <div class="left-section">
      <div class="logo">
        <a href="/">
          <img src="/logo.png" alt="MarmurArt Logo" />
        </a>
      </div>
      <div class="left-menu">
        <div class="collections-wrapper" 
             role="navigation"
             aria-label="Colecții"
             on:mouseenter={() => isCollectionsOpen = true}
             on:mouseleave={() => isCollectionsOpen = false}>
          <a href="/colectii" aria-label="Colecții">COLECTII</a>
          {#if isCollectionsOpen}
            <div class="collections-dropdown" transition:fade>
              <div class="navbar-transition-area" on:mouseenter={() => isCollectionsOpen = true} aria-hidden="true"></div>
              <div class="collections-grid">
                {#each collections as collection}
                  <a href="/colectii/{collection.name.toLowerCase().replace(' ', '-')}" class="collection-item">
                    <div class="collection-image">
                      <img src={collection.image} alt={collection.name} />
                    </div>
                    <span class="collection-name">{collection.name}</span>
                  </a>
                {/each}
              </div>
              <div class="mouse-exit-area" on:mouseenter={() => isCollectionsOpen = false} aria-hidden="true"></div>
            </div>
          {/if}
        </div>
        <a href="/proiecte">PROIECTE</a>
        <a href="/despre-noi">DESPRE NOI</a>
        <a href="/articole">ARTICOLE</a>
        <a href="/contact">CONTACT</a>
      </div>
    </div>
    
    <div class="right-menu">
      <button class="icon-button" aria-label="Caută">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </button>
      <button class="icon-button" aria-label="Salvează">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
        </svg>
      </button>
      <button class="icon-button" aria-label="Limbă">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
      </button>
    </div>
  </div>
</nav>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@400;500;600;700&display=swap');

  nav {
    width: 100%;
    background-color: rgb(236, 233, 233);
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    position: fixed;
    top: 0;
    border-radius: 0px 0px 14px 14px;
    z-index: 1000;
    font-family: 'Urbanist', sans-serif;
  }

  .nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .left-section {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .logo {
    display: flex;
    align-items: center;
  }

  .logo img {
    height: 40px;
    width: auto;
    display: block;
  }

  .left-menu {
    display: flex;
    gap: 1.5rem;
    margin-left: 0;
  }

  .left-menu a {
    text-decoration: none;
    color: #333;
    font-weight: 500;
    transition: color 0.3s ease;
  }

  .left-menu a:hover {
    color: #666;
  }

  .right-menu {
    display: flex;
    gap: 1rem;
  }

  .icon-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    color: #333;
    transition: color 0.3s ease;
  }

  .icon-button:hover {
    color: #666;
  }

  .icon-button svg {
    width: 20px;
    height: 20px;
  }

  .collections-wrapper {
    position: relative;
    z-index: 1001;
  }

  .collections-dropdown {
    position: fixed;
    top: 72px; /* Adjust this value based on your navbar height */
    left: 0;
    width: 100%;
    background: white;
    padding: 2rem 0;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    z-index: 1001;
  }

  .collections-grid {
    display: flex;
    flex-direction: row;
    gap: 20px;
    margin: 0;
    padding: 0 2rem;
    justify-content: start;
  }

  .collection-item {
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .collection-item:hover {
    cursor: pointer;
  }

  .collection-image {
    width: 200px;
    height: 200px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }

  .collection-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .collection-name {
    font-size: 0.9rem;
    font-weight: 500;
    text-align: left;
  }

  .mouse-exit-area {
    position: absolute;
    bottom: -100vh;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: -1;
  }

  .navbar-transition-area {
    position: absolute;
    top: -20px;
    left: 0;
    width: 100%;
    height: 20px;
    z-index: -1;
  }
</style> 