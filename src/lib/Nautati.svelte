<script>
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  gsap.registerPlugin(ScrollTrigger);
  
  let container;
  let currentIndex = 0;

  const images = [
    {
      src: 'https://www.marmomac.com/wp-content/uploads/2020/06/2.jpg',
      title: 'Nautați',
      description: 'Descriere pentru prima imagine'
    },
    {
      src: 'https://images.adsttc.com/media/images/5e1b/c95b/3312/fd58/9c00/0143/large_jpg/_fi.jpg?1578879295',
      title: 'Nautați',
      description: 'Descriere pentru a doua imagine'
    },
    {
      src: 'https://images.prismic.io/luxdeco-dev/Njk0MWQwMzItZjUwYS00NmQ3LThmNzQtYzZhMjA4M2NiM2Nh_1552562646_kp-marble-copy.jpg?auto=compress,format&w=1200&q=100',
      title: 'Nautați',
      description: 'Descriere pentru a treia imagine'
    }
  ];

  function nextSlide() {
    currentIndex = (currentIndex + 1) % images.length;
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
  }
</script>

<section class="nautati" bind:this={container}>
  <div class="carousel-container">
    <div class="main-image">
      <img src={images[currentIndex].src} alt="Nautati" />
      <div class="overlay">
        <span class="title">Nautați</span>
        <p class="description">{images[currentIndex].description}</p>
      </div>
    </div>
    
    <div class="preview-container">
      <div class="preview">
        <img src={images[(currentIndex + 1) % images.length].src} alt="Next" />
      </div>
      <button class="arrow" on:click={nextSlide} aria-label="Next">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </button>
    </div>
  </div>
</section>

<style>
  .nautati {
    padding: 0;
    margin: 200px 0;
    background: #fff;
    position: relative;
    width: 100%;
  }

  .carousel-container {
    width: 100%;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    position: relative;
    height: 750px;
  }

  .main-image {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 26px;
    overflow: hidden;
  }

  .main-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .preview-container {
    position: absolute;
    right: 0;
    top: 0;
    width: 150px;
    height: 100%;
    z-index: 2;
  }

  .preview {
    width: 100%;
    height: 100%;
    border-radius: 26px 0px 0px 26px;
    overflow: hidden;
  }

  .preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .arrow {
    position: absolute;
    top: 25%;
    right: 150px;
    transform: translate(50%, -50%);
    background: white;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    z-index: 3;
  }

  .arrow:hover {
    background: #f5f5f5;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.5) 100%);
  }

  .title {
    font-family: 'Urbanist', sans-serif;
    font-size: 2rem;
    color: #8B4513;
    font-weight: 700;
  }

  .description {
    font-family: 'Urbanist', sans-serif;
    font-size: 1.2rem;
    color: white;
    margin: 0;
  }

  @media (max-width: 1024px) {
    .carousel-container {
      padding: 0;
    }
  }
</style> 