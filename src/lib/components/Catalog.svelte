<script>
  import { onMount, onDestroy } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  
  const isBrowser = typeof window !== 'undefined';
  
  if (isBrowser) {
    gsap.registerPlugin(ScrollTrigger);
  }

  let catalogContainer;
  let catalogPages;
  let scrollTriggers = [];

  onMount(() => {
    // Create scroll-based sliding animation
    scrollTriggers.push(
      ScrollTrigger.create({
        trigger: catalogContainer,
        start: "top top",
        end: "+=100%",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          gsap.to(catalogPages, {
            x: `${66.66 - (self.progress * 66.66)}%`,
            duration: 0.1,
            ease: "none"
          });
        }
      })
    );
  });

  onDestroy(() => {
    scrollTriggers.forEach(trigger => trigger.kill());
  });
</script>

<div class="catalog-container" bind:this={catalogContainer}>
  <div class="catalog">
    <div class="catalog-pages" bind:this={catalogPages}>
      <div class="catalog-page">
        <div class="page-title">
          <h2>Urban Collection</h2>
        </div>
        <div class="image-frame">
          <img src="https://www.bosun.co.za/wp-content/uploads/2022/04/Bosun-Urban-Large-Paver.jpg" alt="Catalog Image 1" />
        </div>
        <div class="text-columns">
          <div class="column">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          </div>
          <div class="column">
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
        </div>
      </div>
      <div class="catalog-page">
        <div class="page-title">
          <h2>Classic Series</h2>
        </div>
        <div class="image-frame">
          <img src="https://www.bosun.co.za/wp-content/uploads/2022/04/Bosun-Urban-Large-Paver.jpg" alt="Catalog Image 2" />
        </div>
        <div class="text-columns">
          <div class="column">
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
          </div>
          <div class="column">
            <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .catalog-container {
    height: 100vh;
    width: 100%;
    background: white;
    position: inherit;
    overflow: hidden;
  }

  .catalog {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: flex-end;
  }

  .catalog-pages {
    display: flex;
    width: 300%;
    position: relative;
    gap: 2rem;
    height: 100%;
    align-items: center;
    transform: translateX(66.66%);
  }

  .catalog-page {
    width: calc(33.33% - 1.33rem);
    height: 80vh;
    padding: 2rem;
    background: #f5f5f5;
    border-radius: 16px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    overflow-y: auto;
  }

  .page-title {
    text-align: center;
    margin-bottom: 0.5rem;
  }

  .page-title h2 {
    font-size: 1.8rem;
    color: #333;
    margin: 0;
    font-weight: 600;
  }

  .page-title p {
    font-size: 1rem;
    color: #666;
    margin: 0.5rem 0 0;
  }

  .image-frame {
    width: 50%;
    aspect-ratio: 16/9;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .image-frame img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .text-columns {
    display: flex;
    gap: 1.5rem;
    flex: 1;
  }

  .column {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .column h3 {
    font-size: 1.2rem;
    margin: 0;
    color: #333;
  }

  .column p {
    font-size: 0.9rem;
    line-height: 1.5;
    color: #666;
    margin: 0;
  }

  @media (max-width: 768px) {
    .catalog-container {
      height: auto;
      min-height: 90vh;
    }

    .catalog {
      padding: 0 1rem;
    }

    .catalog-pages {
      width: 100%;
      flex-direction: column;
      align-items: center;
      left: 0;
      transform: none;
      gap: 1rem;
    }

    .catalog-page {
      width: 100%;
      min-width: unset;
      max-width: 350px;
    }

    .image-frame {
      width: 100%;
    }

    .text-columns {
      flex-direction: column;
      gap: 1rem;
    }

    .column {
      width: 100%;
    }
  }
</style> 