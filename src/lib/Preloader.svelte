<script>
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { SplitText } from 'gsap/SplitText';
  
  // Register GSAP plugins
  gsap.registerPlugin(SplitText);
  
  export let type = 'initial';
  export let show = false;

  const text = 'MarmurArt';
  let container;
  let splitText;
  let preloader;

  onMount(() => {
    if (type === 'initial' && container) {
      // Create split text
      splitText = new SplitText(container, { 
        type: "chars",
        charsClass: "char"
      });

      // Create animation timeline
      const tl = gsap.timeline();

      // Animate gray text first with reveal effect
      tl.fromTo('.text-layer.dark .char', 
        {
          clipPath: 'inset(0 0 100% 0)',
          y: 30
        },
        {
          clipPath: 'inset(0 0 0 0)',
          y: 0,
          duration: 1.5,
          stagger: 0.15,
          ease: "power2.out"
        }
      );

      // Wait a bit
      tl.to({}, { duration: 0.5 });

      // Fade out black text with reveal effect
      tl.to('.text-layer.light .char', {
        clipPath: 'inset(0 0 0 100%)',
        duration: 1.5,
        stagger: 0.15,
        ease: "power2.in"
      });

      // Animate the preloader background up
      tl.to(preloader, {
        yPercent: -100,
        duration: 1.8,
        ease: "power3.inOut"
      });
    }
  });
</script>

{#if show}
  <div class="preloader" class:initial={type === 'initial'} class:page={type === 'page'} bind:this={preloader}>
    {#if type === 'initial'}
      <div class="text-container">
        <div class="rising-text-container" bind:this={container}>
          <div class="text-layer dark">{text}</div>
          <div class="text-layer light">{text}</div>
        </div>
      </div>
    {/if}
  </div>
{/if}

<style>
  @import url('https://fonts.googleapis.com/css2?family=Puppies+Play&display=swap');

  .preloader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(255, 255, 255, 0.9);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    will-change: transform;
  }

  .initial {
    background: #fff;
  }

  .page {
    background: rgba(255, 255, 255, 0.9);
  }

  .text-container {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: -20vh;
  }

  .rising-text-container {
    position: relative;
    display: inline-block;
    white-space: nowrap;
    line-height: 0;
    font-family: 'Puppies Play', cursive;
    font-size: 10rem;
    text-align: center;
    width: 100%;
  }

  .text-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    white-space: nowrap;
    line-height: 1;
  }

  .text-layer.dark {
    color: #666;
    z-index: 1;
  }

  .text-layer.light {
    color: #333;
    z-index: 2;
  }

  :global(.char) {
    display: inline-block;
    position: relative;
  }

  @media (max-width: 768px) {
    .rising-text-container {
      font-size: 6rem;
    }
  }
</style> 