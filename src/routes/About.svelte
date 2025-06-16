<script>
  import { onMount, onDestroy } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { images, imageCollections } from '../lib/data/images.js';
  import Catalog from '../lib/components/Catalog.svelte';
  
  const isBrowser = typeof window !== 'undefined';

  
  if (isBrowser) {
    gsap.registerPlugin(ScrollTrigger);
  }

  let container;
  let image;
  let aboutSection;
  let scrollTriggers = [];
  let currentImageIndex = 0;
  const slideshowImages = imageCollections.slideshow;

  // Debug log to check if images are loaded
  console.log('Images loaded:', { images, imageCollections, slideshowImages });

  function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % slideshowImages.length;
    console.log('Next image:', slideshowImages[currentImageIndex]);
  }

  function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + slideshowImages.length) % slideshowImages.length;
    console.log('Previous image:', slideshowImages[currentImageIndex]);
  }

  onMount(() => {
    console.log('Initial slideshow images:', slideshowImages);
    console.log('Current image:', slideshowImages[currentImageIndex]);
    
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
    <img src={images.cover} alt="cover" />
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
                <img src={images.showroom} alt="Showroom" />
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

      <div class="content-after-catalog">
        <div class="quote">
          <p class="quote-text">
            "MarmurArt este o companie de import si export de marmura de inalta calitate."
          </p>
        </div>

        <div class="another-content">
          <div class="image-container-wide">
            <img src={images.interior} alt="interior marble" />
          </div>
          <h2>Angajamentul nostru față de excelență și sustenabilitate este recunoscut prin numeroase certificări. Acestea atestă calitatea, siguranța și impactul redus asupra mediului al materialelor noastre.</h2>
          <div class="two-columns">
            <div class="column">
              <h3>Certificări</h3>
            </div>
            <div class="column">
              <p>Aceste recunoasteri sunt rezultatul unor controale riguroase la cel mai inalt standard care reflecta atentia companiei pentru solutii de calitate superioara.</p>
            </div>
          </div>

        </div>

        <div class="another-content">
          <div class="two-columns">
            <div class="column">
              <div class="image-container">
                {#if slideshowImages && slideshowImages[currentImageIndex]}
                  <img 
                    src={slideshowImages[currentImageIndex].image} 
                    alt="slide-images"
                    style="width: 100%; height: auto;"
                  />
                {/if}
              </div>
            </div>
            <div class="column">
              <div class="arrow-container">
                <button class="arrow-button" on:click={prevImage}>←</button>
                <button class="arrow-button" on:click={nextImage}>→</button>
              </div>
              {#if slideshowImages && slideshowImages[currentImageIndex]}
                <p>{slideshowImages[currentImageIndex].description}</p>
              {/if}
            </div>
          </div>
        </div>

        <div class="another-content">
          <h1>MEDIU</h1>
          <h2>MarmurArt colaboreaza cu echipe internationale care incurajeaza un viitor sustenabil, punand oamenii si planeta la centru.</h2>
          <div class="two-columns">
            <div class="column">
              <h3>SUSTENABILITATE</h3>
            </div>
            <div class="column">
              <h3> GRUPUL ESTE CONSTANT DEDICAT PENTRU A CREA SOLUTII SUSTENABILE </h3>
              <div class="two-columns-paragraphs">
                <p>MarmurArt este angajat in sustenabilitate, investind in tehnologii ecologice si materiale reciclabile.</p>
                <p>MarmurArt este angajat in sustenabilitate, investind in tehnologii ecologice si materiale reciclabile.</p>
              </div>


            <div class="accordion-group">
              <details class="accordion">
                <summary>
                  <h3>ISO</h3>
                  <span class="accordion-icon">+</span>
                </summary>
                <div class="accordion-content">
                  <p>Aceste recunoasteri sunt rezultatul unor controale riguroase la cel mai inalt standard care reflecta atentia companiei pentru solutii de calitate superioara.</p>
                </div>
              </details>

              <details class="accordion">
                <summary>
                  <h3>Certificări</h3>
                  <span class="accordion-icon">+</span>
                </summary>
                <div class="accordion-content">
                  <p>Aceste recunoasteri sunt rezultatul unor controale riguroase la cel mai inalt standard care reflecta atentia companiei pentru solutii de calitate superioara.</p>
                </div>
              </details>
            </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
</div>

<style>
  @import './About.css';
</style> 