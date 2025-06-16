<script>
  import { onMount, mount } from 'svelte';
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
      description: 'Ce este la moda in domeniul marmureii in 2025'
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

  function splitTextIntoLines(text) {
    const words = text.split(' ');
    const firstLine = words.slice(0, 5).join(' ');
    const secondLine = words.slice(5).join(' ');
    return [firstLine, secondLine];
  }

  function updateSlides() {
    const nextIndex = (currentIndex + 1) % images.length;
    
    // Update current slide
    currentSlideElement.querySelector('img').src = images[currentIndex].src;
    const currentDescription = currentSlideElement.querySelector('.description');
    currentDescription.innerHTML = '';
    splitTextIntoLines(images[currentIndex].description.toUpperCase()).forEach((line, i) => {
      const textLine = document.createElement('div');
      textLine.className = 'text-line';
      currentDescription.appendChild(textLine);
      mount(RisingText, {
        target: textLine,
        props: {
          text: line,
          delay: i * 0.005,
          duration: 0.3,
          stagger: 0.02,
          fontSize: "3.5rem",
          finalColor: "white"
        }
      });
    });

    // Update next slide
    nextSlideElement.querySelector('img').src = images[nextIndex].src;
    const nextDescription = nextSlideElement.querySelector('.description');
    nextDescription.innerHTML = '';
    splitTextIntoLines(images[nextIndex].description.toUpperCase()).forEach((line, i) => {
      const textLine = document.createElement('div');
      textLine.className = 'text-line';
      nextDescription.appendChild(textLine);
      mount(RisingText, {
        target: textLine,
        props: {
          text: line,
          delay: i * 0.005,
          duration: 0.3,
          stagger: 0.5,
          fontSize: "3.5rem",
          finalColor: "white"
        }
      });
    });
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
        <div class="description">
          {#each splitTextIntoLines(images[currentIndex].description.toUpperCase()) as line, i}
            <div class="text-line">
              <RisingText 
                text={line} 
                duration={0.3}
                stagger={0.1}
                fontSize="3.5rem" 
                finalColor="white"
              />
            </div>
          {/each}
        </div>
      </div>
    </div>
    
    <div class="next-slide" bind:this={nextSlideElement}>
      <img src={images[(currentIndex + 1) % images.length].src} alt="Next" />
      <div class="overlay">
        <span class="title">NOUTATI</span>
        <div class="description">
          {#each splitTextIntoLines(images[(currentIndex + 1) % images.length].description.toUpperCase()) as line, i}
            <div class="text-line">
              <RisingText 
                text={line} 
                duration={0.3}
                stagger={0.1}
                fontSize="3.5rem" 
                finalColor="white"
              />
            </div>
          {/each}
        </div>
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
    min-height: 4.2rem;
  }

  .text-line {
    margin-bottom: 0.5rem;
  }

  .text-line:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 1024px) {
    .carousel-container {
      padding: 0;
    }
  }
</style> 