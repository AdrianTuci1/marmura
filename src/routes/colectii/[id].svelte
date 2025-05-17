<script>
  import { router } from 'tinro';
  import { onMount, onDestroy } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import SlabCard from '../../components/SlabCard.svelte';
  import { collections } from '../../lib/data/collections';
  
  const isBrowser = typeof window !== 'undefined';
  
  if (isBrowser) {
    gsap.registerPlugin(ScrollTrigger);
  }
  
  $: collection = collections.find(c => c.id === router.params().id);
  
  let collectionImage;
  let collectionSection;
  let scrollTriggers = [];

  onMount(() => {
    // Imagine parallax
    scrollTriggers.push(
      ScrollTrigger.create({
        trigger: collectionSection,
        start: "top top",
        end: "bottom top",
        onUpdate: (self) => {
          gsap.set(collectionImage.querySelector('img'), {
            y: 200 * self.progress
          });
        }
      })
    );

    // Animație pentru titlu
    gsap.from('.collection-title', {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: '.collection-title',
        start: "top bottom-=100",
        toggleActions: "play none none reverse"
      }
    });

    // Animație pentru descriere
    gsap.from('.collection-description', {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: '.collection-description',
        start: "top center+=100",
        toggleActions: "play none none reverse"
      }
    });

    // Animație pentru grid-ul de plăci
    gsap.from('.slabs-grid', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: '.slabs-grid',
        start: "top center+=150",
        toggleActions: "play none none reverse"
      }
    });
  });

  onDestroy(() => {
    scrollTriggers.forEach(trigger => trigger.kill());
  });
</script>

<main>
  {#if collection}
    <div class="collection-header" bind:this={collectionSection}>
      <div class="collection-image" bind:this={collectionImage}>
        <img src={collection.image} alt={collection.name} />
        <div class="collection-title">
          <h1>{collection.name}</h1>
          <p class="category">{collection.category}</p>
        </div>
      </div>
    </div>

    <div class="collection-description">
      <p>{collection.longDescription}</p>
    </div>

    <div class="slabs-grid">
      {#each collection.slabs as slab}
        <SlabCard {...slab} collectionId={collection.id} />
      {/each}
    </div>
  {:else}
    <div class="not-found">
      <h1>Colecția nu a fost găsită</h1>
      <a href="/colectii" class="back-button">Înapoi la colecții</a>
    </div>
  {/if}
</main>

<style>
  main {
    padding-top: 0;
    min-height: 100vh;
    background-color: #f5f5f5;
  }

  .collection-header {
    position: relative;
    width: 100%;
    height: 90vh;
    overflow: hidden;
  }

  .collection-image {
    width: 100%;
    height: 100%;
    position: relative;
    border-radius: 24px;
    overflow: hidden;
  }

  .collection-image img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    will-change: transform;
    object-position: center -150px;
  }

  .collection-title {
    position: absolute;
    bottom: 4rem;
    left: 4rem;
    color: white;
    z-index: 2;
    max-width: 600px;
  }

  .collection-title h1 {
    margin: 0 0 1rem 0;
    font-size: 3.5rem;
    font-weight: 600;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }

  .category {
    display: inline-block;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 0.5rem 1.5rem;
    border-radius: 30px;
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  .collection-description {
    padding: 6rem 4rem;
    background: white;
    max-width: 800px;
    margin: 0 auto;
    font-size: 1.2rem;
    line-height: 1.8;
    color: #333;
  }

  .slabs-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(275px, 1fr));
    gap: 2rem;
    padding: 4rem;
    background: #f5f5f5;
  }

  .not-found {
    text-align: center;
    padding: 4rem 2rem;
  }

  .back-button {
    display: inline-block;
    background: #333;
    color: white;
    padding: 1rem 2rem;
    border-radius: 8px;
    text-decoration: none;
    margin-top: 2rem;
    transition: background 0.3s ease;
  }

  .back-button:hover {
    background: #444;
  }

  @media (max-width: 768px) {
    .collection-title {
      bottom: 2rem;
      left: 2rem;
      right: 2rem;
    }

    .collection-title h1 {
      font-size: 2.5rem;
    }

    .collection-description {
      padding: 4rem 2rem;
      font-size: 1.1rem;
    }

    .slabs-grid {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      padding: 2rem;
    }
  }
</style> 