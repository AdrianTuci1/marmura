<script lang="ts">
  import { router } from 'tinro';
  import { collections } from '../../../lib/data/collections';
  import { onMount, onDestroy } from 'svelte';
  import { slabBottomBar } from '../../../lib/stores/slabBottomBar';
  import gsap from 'gsap';
  import ScrollTrigger from 'gsap/ScrollTrigger';
  
  gsap.registerPlugin(ScrollTrigger);

  interface RouteParams {
    id: string;
    slabId: string;
  }
  
  // Find the collection and slab
  $: params = router.params() as unknown as RouteParams;
  $: collection = collections.find(c => c.id === params.id);
  $: slab = collection?.slabs.find(s => s.id === params.slabId);

  let slab3dRef: HTMLDivElement;
  let textureImages: HTMLImageElement[] = [];
  let texturesSection: HTMLDivElement;

  onMount(() => {
    if (slab && collection) {
      slabBottomBar.show(slab.name, collection.name);
    }

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
      <div class="textures-title">TEXTURI({slab.image.length})</div>
      <div class="textures-grid">
        {#each Array(4) as _, i}
          <div class="texture-item">
            <div class="texture-img-wrapper">
              <img 
                src={slab.image} 
                alt={`Textură ${i + 1}`} 
                bind:this={textureImages[i]}
              />
            </div>
          </div>
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
</style> 