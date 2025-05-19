<script lang="ts">
  import { router } from 'tinro';
  import { collections } from '../../../lib/data/collections';
  import { onMount, onDestroy } from 'svelte';
  import { slabBottomBar } from '../../../lib/stores/slabBottomBar';
  import gsap from 'gsap';
  import ScrollTrigger from 'gsap/ScrollTrigger';
  import Swiper from 'swiper';
  import { Pagination } from 'swiper/modules';
  import 'swiper/css';
  import 'swiper/css/pagination';
  import SlabCard from '../../../components/SlabCard.svelte';
  
  gsap.registerPlugin(ScrollTrigger);

  interface RouteParams {
    id: string;
    slabId: string;
  }

  interface GalleryImage {
    url: string;
    format: 'portrait' | 'landscape';
  }

  interface Texture {
    name: string;
    image: string;
    finish: string;
  }

  interface Slab {
    id: string;
    name: string;
    image: string;
    type: string;
    gallery: GalleryImage[];
    textures: Texture[];
    characteristics?: string;
  }

  interface Collection {
    id: string;
    name: string;
    image: string;
    category: string;
    description: string;
    longDescription: string;
    slabs: Slab[];
  }
  
  // Find the collection and slab
  $: params = router.params() as unknown as RouteParams;
  $: collection = collections.find(c => c.id === params.id) as Collection | undefined;
  $: slab = collection?.slabs.find(s => s.id === params.slabId) as Slab | undefined;

  let slab3dRef: HTMLDivElement;
  let textureImages: HTMLImageElement[] = [];
  let texturesSection: HTMLDivElement;
  let swiper;

  onMount(() => {
    if (slab && collection) {
      slabBottomBar.show(slab.name, collection.name);
    }

    // Initialize Swiper
    swiper = new Swiper('.gallery-swiper', {
      modules: [Pagination],
      slidesPerView: 'auto',
      spaceBetween: 24,
      grabCursor: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        640: {
          spaceBetween: 24,
        },
        768: {
          spaceBetween: 24,
        },
        1024: {
          spaceBetween: 24,
        },
      },
    });

    // Animate texture images with ScrollTrigger
    textureImages.forEach((img, index) => {
      gsap.fromTo(img, 
        { 
          scale: 1.2,
          opacity: 0
        },
        { 
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          delay: index * 0.1,
          scrollTrigger: {
            trigger: texturesSection,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = slab3dRef.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * 30;
      const rotateY = ((x - centerX) / centerX) * 30;
      const img = slab3dRef.querySelector('img');
      if (img) {
        img.style.transform = `translateZ(20px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
        img.classList.add('slab-3d-active');
      }
    };

    const handleMouseLeave = () => {
      const img = slab3dRef.querySelector('img');
      if (img) {
        img.style.transform = 'translateZ(50px)';
        img.classList.remove('slab-3d-active');
      }
    };

    slab3dRef.addEventListener('mousemove', handleMouseMove);
    slab3dRef.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      slab3dRef.removeEventListener('mousemove', handleMouseMove);
      slab3dRef.removeEventListener('mouseleave', handleMouseLeave);
    };
  });

  onDestroy(() => {
    slabBottomBar.hide();
  });
</script>

<main>
  {#if collection && slab}
    <div class="slab-main-layout">
      <div class="slab-image slab-3d" bind:this={slab3dRef}>
        <div class="slab-img-wrapper">
          <img src={slab.image} alt={slab.name} />
        </div>
      </div>
      <div class="slab-details">
        <div class="slab-section">
          <div class="slab-section-title">CARACTERISTICI</div>
          <div class="slab-section-content">
            {slab.characteristics || 'Labi reflectă echilibrul dintre rezistență și delicatețe inspirat de calcarul portughez. Versatilitatea sa o face perfectă pentru spații rezidențiale și comerciale cu trafic intens, oferind un ambient primitor și contemporan. Combinația de robustețe și armonie cromatică face ca Labi să fie ideală pentru crearea unor atmosfere sofisticate și confortabile.'}
          </div>
        </div>
        <div class="slab-section">
          <div class="slab-section-title">FORMATE</div>
          <div class="slab-section-content">
            <div class="slab-formats">
              <div>120x120</div><div>120x60</div><div>60x60</div><div>120x30</div><div>60x6,5</div>
            </div>
          </div>
        </div>
        <div class="slab-section">
          <div class="slab-section-title">FINISAJE</div>
          <div class="slab-section-content">
            <div>Natural Plus (R10)</div>
            <div>Flamed (R11)</div>
            <div>Strutturato (R11)</div>
          </div>
        </div>
        <div class="slab-section">
          <div class="slab-section-title">GROSIME</div>
          <div class="slab-section-content">10mm / 0.39"</div>
        </div>
      </div>
    </div>
  {:else}
    <div class="not-found">
      <h1>Placa nu a fost găsită</h1>
      <a href="/colectii" class="back-button">Înapoi la colecții</a>
    </div>
  {/if}

  {#if collection && slab}
    <div class="textures-section" bind:this={texturesSection}>
      <div class="textures-title">TEXTURI({slab.textures.length})</div>
      <div class="textures-grid">
        {#each slab.textures as texture}
          <div class="texture-item">
            <div class="texture-img-wrapper">
              <img 
                src={texture.image} 
                alt={texture.name} 
                bind:this={textureImages[textureImages.length]}
              />
            </div>
            <div class="texture-info">
              <div class="texture-name">{texture.name}</div>
              <div class="texture-finish">{texture.finish}</div>
            </div>
          </div>
        {/each}
      </div>
    </div>

    <div class="info-columns">
      <div class="info-column">
        <div class="info-title">📦 Livrare și montaj</div>
        <ul class="info-list">
          <li> Livrare rapidă în toată țara</li>
          <li> Servicii de montaj disponibile la cerere</li>
          <li> Mostre gratuite disponibile pentru testare înainte de comandă</li>
        </ul>
      </div>
      <div class="info-column">
        <div class="info-title">📈 De ce să alegi Marmur Art?</div>
        <ul class="info-list">
          <li> Experiență de peste 31 de ani în prelucrarea pietrei naturale</li>
          <li> Produse premium in stoc, direct la importator</li>
          <li> Garanția calității și suport dedicat pentru clienți</li>
        </ul>
      </div>
    </div>

    <div class="gallery-section">
      <div class="gallery-title">GALERIE</div>
      <div class="gallery-swiper swiper">
        <div class="swiper-wrapper">
          {#each slab.gallery as image}
            <div class="swiper-slide">
              <div class="gallery-image" class:landscape={image.format === 'landscape'}>
                <img src={image.url} alt='galerry' />
              </div>
            </div>
          {/each}
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>

    <div class="other-colors-section">
      <div class="other-colors-title">ALTE CULORI DIN ACEEAȘI COLECȚIE</div>
      <div class="other-colors-grid">
        {#each collection.slabs.filter(s => s.id !== slab.id) as otherSlab}
          <SlabCard
            id={otherSlab.id}
            name={otherSlab.name}
            image={otherSlab.image}
            collectionId={collection.id}
          />
        {/each}
      </div>
    </div>
  {/if}
</main>

<style>
  main {
    padding-top: 50px;
    min-height: 100vh;
    background-color: #f5f5f5;
    position: relative;
    padding-bottom: 80px;
  }
  .slab-main-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: stretch;
    height: 100vh;
    max-height: 100vh;
    padding: 0;
    margin: 0 auto 2rem auto;
    background: #f5f5f5;
  }
  .slab-image.slab-3d,
  .slab-details {
    height: 100%;
    max-height: 100vh;
  }
  .slab-details {
    padding: 0 2rem;
    background: #fff;
    box-shadow: 0 2px 12px rgba(0,0,0,0.04);
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1.5rem;
    font-size: 1.08rem;
    overflow: auto;
  }
  .slab-img-wrapper {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .slab-3d {
    background: #f8f8f8;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    perspective: 1000px;
  }
  .slab-3d img {
    max-width: 50%;
    max-height: 50%;
    aspect-ratio: 3/4;
    width: auto;
    height: auto;
    object-fit: cover;
    border-radius: 14px;
    box-shadow: 0 16px 48px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.10);
    transition: transform 0.18s cubic-bezier(.03,.98,.52,.99), box-shadow 0.18s cubic-bezier(.03,.98,.52,.99);
    will-change: transform;
    background: #e0e0e0;
    transform-style: preserve-3d;
    transform: translateZ(20px);
  }

  .slab-section {
    border-top: 1px solid #d6d6d6;
    padding-top: 1.2rem;
    margin-top: 1.2rem;
    justify-self: center;
  }
  .slab-section:first-child {
    border-top: none;
    padding-top: 0;
    margin-top: 0;
  }
  .slab-section-title {
    font-weight: 700;
    font-size: 1.05rem;
    letter-spacing: 0.04em;
    color: #222;
    margin-bottom: 0.7rem;
    text-transform: uppercase;
  }
  .slab-section-content {
    color: #444;
    line-height: 1.6;
  }
  .slab-formats {
    display: flex;
    flex-wrap: wrap;
    gap: 1.2rem 2.5rem;
    font-size: 1rem;
  }
  @media (max-width: 900px) {
    .slab-main-layout {
      grid-template-columns: 1fr;
      padding: 2rem 0.5rem 1rem 0.5rem;
    }
    .slab-details {
      padding: 2rem 1rem;
    }
  }
  @media (max-width: 600px) {
    .slab-main-layout {
      gap: 1.2rem;
    }
    .slab-details {
      font-size: 0.98rem;
    }
  }

  .textures-section {
    padding: 2rem;
    background: #fff;
    margin: 2rem auto;
    box-shadow: 0 2px 12px rgba(0,0,0,0.04);
  }

  .textures-title {
    font-weight: 700;
    font-size: 2.5rem;
    letter-spacing: 0.04em;
    color: #222;
    margin-bottom: 1.5rem;
    text-transform: uppercase;
  }

  .textures-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, 200px);
    gap: 2rem;
    justify-content: start;
  }

  .texture-item {
    width: 200px;
    aspect-ratio: 1/2;
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .texture-item:hover {
    box-shadow: 0 6px 16px rgba(0,0,0,0.12);
    cursor: pointer;
  }

  .texture-img-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .texture-img-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 900px) {
    .textures-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
    }
  }

  @media (max-width: 600px) {
    .textures-section {
      padding: 1.5rem;
    }
    .textures-grid {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
  }

  .info-columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    padding: 2rem;
    background: #fff;
    margin: 2rem auto;
    box-shadow: 0 2px 12px rgba(0,0,0,0.04);
  }

  .info-column {
    padding: 1.5rem;
    background: #f8f8f8;
    border-radius: 12px;
  }

  .info-title {
    font-weight: 700;
    font-size: 1.5rem;
    color: #222;
    margin-bottom: 1.2rem;
  }

  .info-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .info-list li {
    margin-bottom: 1rem;
    font-size: 1.1rem;
    color: #444;
    line-height: 1.5;
  }

  .info-list li:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 900px) {
    .info-columns {
      grid-template-columns: 1fr;
      gap: 1.5rem;
      padding: 1.5rem;
    }
  }

  @media (max-width: 600px) {
    .info-columns {
      padding: 1rem;
    }
    .info-title {
      font-size: 1.3rem;
    }
    .info-list li {
      font-size: 1rem;
    }
  }

  .gallery-section {
    padding: 0rem 0rem 2rem 0rem;
    background: #1a1a1a;
    margin: 2rem auto;
    color: white;
  }

  .gallery-title {
    font-weight: 700;
    font-size: 2.5rem;
    letter-spacing: 0.04em;
    color: white;
    padding-top: 2rem;
    padding-left: 20px;
    margin-bottom: 1.5rem;
    text-transform: uppercase;
  }

  .gallery-swiper {
    width: 100%;
    padding: 2rem 0;
  }

  .gallery-image {
    overflow: hidden;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    height: 600px;
    width: 400px;
    margin: 0 auto;
  }

  .gallery-image.landscape {
    width: 733px;
  }

  .gallery-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .gallery-image:hover img {
    cursor: pointer;
  }

  :global(.gallery-swiper) {
    cursor: grab;
  }

  :global(.gallery-swiper:active) {
    cursor: grabbing;
  }

  :global(.swiper-slide) {
    width: auto;
    display: flex;
    justify-content: center;
  }

  :global(.swiper-pagination-bullet) {
    background: rgba(255, 255, 255, 0.5);
  }

  :global(.swiper-pagination-bullet-active) {
    background: white;
  }

  @media (max-width: 900px) {
    .gallery-section {
      padding: 1.5rem;
    }
    .gallery-image {
      height: 350px;
      width: 262px;
    }
    .gallery-image.landscape {
      width: 467px;
    }
  }

  @media (max-width: 600px) {
    .gallery-section {
      padding: 1rem;
    }
    .gallery-title {
      font-size: 2rem;
    }
    .gallery-image {
      height: 300px;
      width: 225px;
    }
    .gallery-image.landscape {
      width: 400px;
    }
  }

  .texture-info {
    padding: 0.75rem 1rem;
    background: #f8f8f8;
    border-top: 1px solid #eee;
  }

  .texture-name {
    font-weight: 600;
    color: #222;
    margin-bottom: 0.25rem;
  }

  .texture-finish {
    font-size: 0.9rem;
    color: #666;
  }

  .other-colors-section {
    padding: 2rem;
    background: #fff;
    margin: 2rem auto;
    box-shadow: 0 2px 12px rgba(0,0,0,0.04);
  }

  .other-colors-title {
    font-weight: 700;
    font-size: 2.5rem;
    letter-spacing: 0.04em;
    color: #222;
    margin-bottom: 1.5rem;
    text-transform: uppercase;
  }

  .other-colors-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 2rem;
  }

  @media (max-width: 900px) {
    .other-colors-section {
      padding: 1.5rem;
    }
    .other-colors-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
    }
  }

  @media (max-width: 600px) {
    .other-colors-section {
      padding: 1rem;
    }
    .other-colors-title {
      font-size: 2rem;
    }
    .other-colors-grid {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
  }
</style> 