<script>
  import { fade } from 'svelte/transition';
  import { gsap } from 'gsap';
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
        <a href="/colectii">Colecții</a>
        <a href="/proiecte">Proiecte</a>
        <a href="/despre-noi">Despre Noi</a>
        <a href="/articole">Articole</a>
        <a href="/contact">Contact</a>
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
  nav {
    width: 100%;
    background-color: rgb(236, 233, 233);
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    position: fixed;
    top: 0;
    border-radius: 0px 0px 14px 14px;
    z-index: 1000;
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
</style> 