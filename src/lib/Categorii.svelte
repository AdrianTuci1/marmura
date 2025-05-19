<script>
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { Draggable } from 'gsap/Draggable';
  import RisingText from './RisingText.svelte';
  
  let container;
  let isDragging = false;
  let draggable;
  
  const categories = [
    {
      image: 'https://images.adsttc.com/media/images/5e1e/2a28/3312/fd58/9c00/0a75/newsletter/FI.jpg?1579035167',
      title: 'Categorie 1',
      ratio: 'square'
    },
    {
      image: 'https://www.granit.co.uk/wp-content/uploads/2016/12/ab_wandsworth_common_west_side_02.jpg',
      title: 'Categorie 2',
      ratio: 'square'
    },
    {
      image: 'https://a.storyblok.com/f/236904/497x350/798c895dd3/hashotel-hasselt.png/m/1080x0',
      title: 'Categorie 3',
      ratio: 'wide'
    },
    {
      image: 'https://static.dezeen.com/uploads/2020/01/vicostone-ultrathin-quartz-slab-collection-products-design-interiors-_dezeen_1704_hero.jpg',
      title: 'Categorie 4',
      ratio: 'square'
    }
  ];

  const infiniteCategories = [...categories, ...categories, ...categories];

  function scrollRight(e) {
    e.stopPropagation();
    const currentScroll = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;
    
    if (maxScroll - currentScroll < 100) {
      gsap.to(container, {
        scrollLeft: 0,
        duration: 0.8,
        ease: "power2.inOut"
      });
    } else {
      gsap.to(container, {
        scrollLeft: currentScroll + 1080,
        duration: 0.8,
        ease: "power2.inOut"
      });
    }
  }

  function handleScroll() {
    const scrollWidth = container.scrollWidth;
    const scrollLeft = container.scrollLeft;
    const clientWidth = container.clientWidth;

    if (scrollWidth - (scrollLeft + clientWidth) < 100) {
      gsap.to(container, {
        scrollLeft: 0,
        duration: 0.1
      });
    }
  }

  onMount(() => {
    gsap.registerPlugin(Draggable);
    
    draggable = Draggable.create(container, {
      type: "x",
      inertia: true,
      edgeResistance: 0.65,
      onDragStart: function() {
        isDragging = true;
        container.style.cursor = 'grabbing';
      },
      onDragEnd: function() {
        isDragging = false;
        container.style.cursor = 'grab';
      },
      allowEventDefault: true
    })[0];
  });
</script>

<div class="categories-container">
  <div class="header">
    <span>ALEGE DIN</span>
    <div class="collection-title"><RisingText text="COLECȚII" delay={0.2} fontSize="3.5rem" finalColor="black"/></div>
  </div>
  
  <div class="scroll-container">
    <div 
      class="categories-scroll"
      bind:this={container}
      on:scroll={handleScroll}
      role="region"
      aria-label="Categories carousel"
    >
      {#each infiniteCategories as category, i}
        <div class="category-item" style="margin-left: {i === 0 ? '20px' : '0'}">
          <div class="image-container" class:square={category.ratio === 'square'} class:wide={category.ratio === 'wide'}>
            <img src={category.image} alt={category.title} draggable="false" />
            <div class="title-container">
              <RisingText text={category.title.toUpperCase()} delay={0.2} fontSize="3.7rem" />
            </div>
          </div>
        </div>
      {/each}
    </div>
    <div 
      class="button-wrapper" 
      on:click|stopPropagation
      on:keydown|stopPropagation
      role="button"
      tabindex="0"
      aria-label="Scroll right"
    >
      <button class="scroll-button" on:click={scrollRight} aria-label="Scroll right">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </button>
    </div>
  </div>
</div>

<style>
  .categories-container {
    width: 100%;
    padding: 150px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .header {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px 20px;
    margin-bottom: 20px;
    width: 100%;
  }

  span{
    padding-left: 20px;
    font-size: 1.2rem;
    color: brown;
    font-weight: bold;
  }

  .collection-title {
    padding-left: 20px;
    padding-bottom: 3rem;
    font-weight: bold;
  }

  .scroll-container {
    position: relative;
    width: 100%;
    overflow: visible;
  }

  .button-wrapper {
    position: absolute;
    right: 50px;
    top: 15%;
    transform: translateY(-50%);
    z-index: 10;
  }

  .scroll-button {
    background: rgba(255, 255, 255, 0.9);
    border: none;
    cursor: pointer;
    padding: 12px;
    border-radius: 50%;
    transition: all 0.3s;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .scroll-button:hover {
    background: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .categories-scroll {
    display: flex;
    overflow-x: auto;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    -ms-overflow-style: none;
    gap: 20px;
    width: 100%;
    padding: 0;
    box-sizing: border-box;
    border-radius: 20px;
    touch-action: pan-x;
    user-select: none;
    -webkit-user-select: none;
    cursor: grab;
    min-width: min-content;
    pointer-events: auto;
  }

  .categories-scroll::-webkit-scrollbar {
    display: none;
  }

  .category-item {
    flex: 0 0 auto;
  }

  .image-container {
    overflow: hidden;
    border-radius: 20px;
    height: 600px;
    width: 700px;
    user-select: none;
    -webkit-user-select: none;
    position: relative;
  }

  .image-container.wide {
    width: 900px;
  }

  .image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
    user-select: none;
    -webkit-user-select: none;
  }

  .title-container {
    position: absolute;
    bottom: 60px;
    left: 30px;
    font-weight: 700;
    z-index: 10;
  }
</style> 