<script>
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
    import RisingText from './RisingText.svelte';

  gsap.registerPlugin(ScrollTrigger);
  
  let container;
  let currentIndex = 0;
  let currentSlideElement;
  let nextSlideElement;
  let isTransitioning = false;

  const images = [
    {
      src: 'https://www.marmomac.com/wp-content/uploads/2020/06/2.jpg',
      title: 'Nautați',
      description: 'Ce este la moda in domeniul marmurii in 2025'
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

  function updateSlides() {
    const nextIndex = (currentIndex + 1) % images.length;
    currentSlideElement.querySelector('img').src = images[currentIndex].src;
    currentSlideElement.querySelector('.description').textContent = images[currentIndex].description.toUpperCase();
    nextSlideElement.querySelector('img').src = images[nextIndex].src;
    nextSlideElement.querySelector('.description').textContent = images[nextIndex].description.toUpperCase();
  }

  async function handleNextSlide() {
    if (isTransitioning) return;
    isTransitioning = true;

    // Animate next slide over current slide
    await gsap.to(nextSlideElement, {
      x: '-100%',
      duration: 0.5,
      ease: 'power2.in'
    });

    // Update current index
    currentIndex = (currentIndex + 1) % images.length;
    
    // Reset next slide position
    gsap.set(nextSlideElement, { x: 0 });
    
    // Update slides content
    updateSlides();
    
    isTransitioning = false;
  }

  onMount(() => {
    // Set initial position for next slide
    gsap.set(nextSlideElement, { x: 0 });
  });
</script>

<section class="nautati" bind:this={container}>
  <div class="carousel-container">
    <div class="current-slide" bind:this={currentSlideElement}>
      <img src={images[currentIndex].src} alt="Nautati" />
      <div class="overlay">
        <span class="title">NOUTATI</span>
        <p class="description">{images[currentIndex].description.toUpperCase()}</p>
      </div>
    </div>
    
    <div class="next-slide" bind:this={nextSlideElement}>
      <img src={images[(currentIndex + 1) % images.length].src} alt="Next" />
      <div class="overlay">
        <span class="title">NOUTATI</span>
        <div class="description"><RisingText text={images[(currentIndex + 1) % images.length].description.toUpperCase()} delay={0.2} fontSize="3.5rem" finalColor="white"/></div>
      </div>
    </div>
    
    <button class="arrow" on:click={handleNextSlide} aria-label="Next">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
    </button>
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
    position: relative;
    height: 750px;
    overflow: hidden;
  }

  .current-slide {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 26px;
    overflow: hidden;
    z-index: 1;
  }

  .next-slide {
    position: absolute;
    top: 0;
    left: calc(100% - 150px);
    width: 100%;
    height: 100%;
    border-radius: 26px;
    overflow: hidden;
    z-index: 2;
  }

  .current-slide img, .next-slide img {
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
    width: 80px;
    height: 40px;
    border-radius: 7px;
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
    background: linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.8) 100%);
  }

  .title {
    font-family: 'Urbanist', sans-serif;
    font-size: 2.5rem;
    color: #c96218;
    font-weight: 700;
  }

  .description {
    color: white;
    margin: 0;
    max-width: 70%;
    font-size: 3.5rem;
    line-height: 1.2;
    padding-bottom: 3.7rem;
  }

  @media (max-width: 1024px) {
    .carousel-container {
      padding: 0;
    }
  }
</style> 