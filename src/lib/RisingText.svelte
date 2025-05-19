<script>
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { SplitText } from 'gsap/SplitText';
  
  export let text = '';
  export let delay = 0;
  export let duration = 2.5;
  export let stagger = 0.03;
  export let finalColor = 'white'; // 'white' or 'black'
  export let fontSize = '1em'; // can be any valid CSS font size value
  
  let container;
  let splitText;
  
  onMount(() => {
    gsap.registerPlugin(SplitText);
    
    // Create split text
    splitText = new SplitText(container, { type: "chars" });
    
    // Initial state
    gsap.set(splitText.chars, {
      clipPath: "inset(100% 0 0 0)",
      opacity: 1,
      display: 'inline-block'
    });
    
    // Animation
    gsap.to(splitText.chars, {
      clipPath: "inset(0% 0 0 0)",
      duration: duration,
      stagger: stagger,
      delay: delay,
      ease: "power2.inOut"
    });
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
</style> 