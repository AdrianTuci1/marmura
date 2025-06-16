<script>
  import { onMount, onDestroy } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import showroomImage from '../assets/showroom.webp';
  import Catalog from '../lib/components/Catalog.svelte';
  
  const isBrowser = typeof window !== 'undefined';
  
  if (isBrowser) {
    gsap.registerPlugin(ScrollTrigger);
  }

  let container;
  let image;
  let aboutSection;
  let scrollTriggers = [];

  onMount(() => {
    // Image parallax
    scrollTriggers.push(
      ScrollTrigger.create({
        trigger: aboutSection,
        start: "top top",
        end: "bottom top",
        onUpdate: (self) => {
          gsap.set(image.querySelector('img'), {
            y: 200 * self.progress
          });
        }
      })
    );
  });

  onDestroy(() => {
    // Clean up all triggers when component is destroyed
    scrollTriggers.forEach(trigger => trigger.kill());
  });
</script>

<div class="app-container" bind:this={container}>
  <div class="image-container" bind:this={image}>
    <img src="https://www.bosun.co.za/wp-content/uploads/2022/04/Bosun-Urban-Large-Paver.jpg" alt="About Background" />
    <div class="image-text-container">
      <span class="image-text">MARMURART - DIN 1986</span>
      <h2 class="image-text">COMPANIA NOASTRA</h2>
    </div>
  </div>
  <div class="about-section" bind:this={aboutSection}>
    <h1 class="about-title">Marmura de inalta calitate pentru interior si exterior</h1>
    <div class="about-container">
      <div class="content">
          <div class="first-row">
            <div class="left-column">
              <div class="image-container-small">
                <img src={showroomImage} alt="About Background" />
              </div>
            </div>
            <div class="right-column">
              <h3 class="subtitle">Fondat in 1986, MarmurArt este o companie de import si export de marmura de inalta calitate.</h3>
              <div class="paragraphs-container">
                <p class="paragraph">
                  Se distinge prin inovația tehnologică remarcabilă și un angajament profund față de mediu, având ca scop depășirea frumuseții intrinseci a materialelor naturale. Oferim soluții durabile și de înaltă calitate, care răspund nevoilor designului contemporan și cerințelor funcționale moderne. Misiunea noastră este fundamentată pe armonizarea tehnologiei avansate cu unicitatea naturii, creând produse eco-sustenabile ce impresionează atât prin estetică, cât și prin valoarea emoțională.
                </p>
                <p class="paragraph">
                  Îmbinăm armonios excelența tehnologică cu o viziune clară asupra responsabilității ecologice. Ne propunem să transcendem simpla frumusețe a materialelor naturale, oferind alternative superioare care satisfac cele mai exigente standarde de design și funcționalitate, fără a compromite sustenabilitatea. Suntem dedicați creării de soluții inovatoare, inspirate de natură, ce aduc un plus de rafinament și valoare durabilă oricărui spațiu, reflectând angajamentul nostru pentru un viitor mai verde.
                </p>
              </div>
            </div>
          </div>
       </div>

      <div class="catalog-container">
        <Catalog />
      </div>
    </div>
  </div>
</div>

<style>
  .app-container {
    position: relative;
    min-height: 100vh;
  }

  .image-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 90vh;
    z-index: 1;
    border-radius: 0 0 26px 26px;
    overflow: hidden;
  }

  .image-text-container {
    position: absolute;
    bottom: 5px;
    left: 20px;
    font-size: 1.8rem;
    color: #fff;
    opacity: 1;
    font-weight: 600;
    line-height: 0.5;
  }

  .image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 0px;
  }

  .about-section {
    position: relative;
    z-index: 2;
    min-height: 100vh;
    padding-top: 90vh;
  }

  .about-container {
    background: white;
    position: relative;
    z-index: 2;
    margin: 0 auto;
    padding: 4rem 2rem;
    border-radius: 8px;
  }


  .content {
    font-family: 'Urbanist', sans-serif;
    display: flex;
    flex-direction: column;
  }

  .about-title {
    padding-inline: 2rem;
  }

  .first-row {
    display: flex;
    gap: 2rem;
    margin-bottom: 2rem;
  }

  .left-column {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .right-column {
    flex: 1;
  }

  .image-container-small {
    width: 500px;
    aspect-ratio: 3/4;
    border-radius: 16px;
    overflow: hidden;
  }

  .image-container-small img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .subtitle {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    color: #333;
  }

  .paragraphs-container {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }

  .paragraph {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #666;
  }

  .catalog-container {
    display: flex;
    width: calc(100% + 60px);
    height: 100%;
    margin-inline: -30px;
    outline: 1px solid red;
  }


  @media (max-width: 768px) {
    .first-row {
      flex-direction: column;
    }

    .left-column,
    .right-column {
      width: 100%;
    }

    .image-container-small {
      margin-bottom: 2rem;
    }
  }

</style> 