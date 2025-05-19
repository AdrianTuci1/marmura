<script>
  import { onMount, onDestroy } from 'svelte';
  import gsap from 'gsap';
  import { SplitText } from 'gsap/SplitText';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  
  export let text = '';
  export let delay = 0;
  export let duration = 0.4;
  export let stagger = 0.1;
  export let finalColor = 'white'; // 'white' or 'black'
  export let fontSize = '1em'; // can be any valid CSS font size value
  
  let container;
  let splitText;
  let animation;
  
  onMount(() => {
    // Register plugins
    gsap.registerPlugin(SplitText, ScrollTrigger);
    
    // Create split text
    splitText = new SplitText(container, { 
      type: "chars",
      charsClass: "char"
    });
    
    // Initial state
    gsap.set(splitText.chars, {
      clipPath: "inset(100% 0 0 0)",
      opacity: 1,
      display: 'inline-block'
    });
    
    // Create animation
    animation = gsap.to(splitText.chars, {
      clipPath: "inset(0% 0 0 0)",
      duration: duration,
      stagger: stagger,
      delay: delay,
      ease: "sine.inOut",
      scrollTrigger: {
        trigger: container,
        start: "top 100%",
        toggleActions: "play none none none",
        once: true,
      }
    });

    // Force a refresh of ScrollTrigger
    ScrollTrigger.refresh();
  });

  onDestroy(() => {
    if (animation) {
      animation.kill();
    }
    if (splitText) {
      splitText.revert();
    }
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  });
</script>

<div class="rising-text-container" style="font-size: {fontSize}" bind:this={container}>
  <div class="text-layer dark">{text}</div>
  <div class="text-layer light" style="color: {finalColor}">{text}</div>
</div>

<style>
  .rising-text-container {
    position: relative;
    display: inline-block;
    white-space: nowrap;
    line-height: 0;
    min-height: 1em;
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
    color: #1a1a1a;
    z-index: 1;
  }
  
  .text-layer.light {
    z-index: 2;
  }

  :global(.char) {
    display: inline-block;
    position: relative;
  }
</style> 