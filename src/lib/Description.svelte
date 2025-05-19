<script>
  import { onMount, onDestroy } from 'svelte';
  import gsap from 'gsap';
  import { SplitText } from 'gsap/SplitText';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  let container;
  let splitText;
  let animation;

  onMount(() => {
    gsap.registerPlugin(SplitText, ScrollTrigger);
    
    splitText = new SplitText(container, { 
      type: "words,chars",
      charsClass: "char",
      wordsClass: "word"
    });
    
    gsap.set(splitText.chars, {
      color: "#666",
      opacity: 0.5,
      display: "inline-block"
    });

    // Find and set brown color for "PIETREI NATURALE"
    const brownText = container.querySelector('.brown-text');
    if (brownText) {
      const brownChars = brownText.querySelectorAll('.char');
      gsap.set(brownChars, {
        color: "#8B4513",
        opacity: 0.5
      });
    }
    
    animation = gsap.to(splitText.chars, {
      color: "#333",
      opacity: 1,
      duration: 3,
      stagger: 0.15,
      ease: "power2.in",
      scrollTrigger: {
        trigger: container,
        start: "top 100%",
        end: "bottom 80%",
        toggleActions: "play reverse play reverse",
        scrub: 1,
        markers: false
      }
    });

    // Animate brown text separately
    if (brownText) {
      const brownChars = brownText.querySelectorAll('.char');
      gsap.to(brownChars, {
        color: "#8B4513",
        opacity: 1,
        duration: 3,
        stagger: 0.15,
        ease: "power2.in",
        scrollTrigger: {
          trigger: container,
          start: "top 100%",
          end: "bottom 80%",
          toggleActions: "play reverse play reverse",
          scrub: 1
        }
      });
    }

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

<section class="description">
  <div class="content">
    <div class="container">
      <div class="text-content">
        <span class="despre">DESPRE:</span>
        <div class="text-content" bind:this={container}>
          Societatea noastră dispune de o vastă experiență în domeniu, fiind înființată în anul 1994. Încă de la început, scopul nostru principal a fost de a aduce clienților noștri materiale noi și inovative în domeniul <span class="brown-text">PIETREI NATURALE</span>. În acest scop, am dezvoltat de-a lungul timpului o rețea complexă de aprovizionare pentru piatra naturală, precum marmura, granitul, travertinul, reușind să aducem aceste materiale de pe mai multe continente.
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .description {
    position: relative;
    min-height: 100vh;
    overflow: hidden;
  }

  .content {
    position: relative;
    z-index: 2;
    background: rgb(255, 255, 255);
    padding: 75px 0 150px 0;
    margin-top: 90vh;
  }

  .container {
    margin: 0 50px 0 50px;
    padding: 0 2rem;
  }

  @media (max-width: 1024px) {
    .container {
      margin: 0 50px;
      padding: 0;
    }
  }

  .text-content {
    font-family: 'Urbanist', sans-serif;
    font-size: 2.8rem;
    line-height: 1.4;
    color: #333;
    margin-bottom: 1.5rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0;
    word-spacing: normal;
    white-space: normal;
  }

  .despre {
    font-size: 1.2rem;
    color: #8B4513;
    display: block;
    margin-bottom: 1rem;
  }

  .brown-text {
    color: #8B4513;
  }

  .text-content:last-child {
    margin-bottom: 0;
  }

  
  


  :global(.char) {
    display: inline-block;
    position: relative;
    white-space: nowrap;
  }

  :global(.word) {
    display: inline-block;
    position: relative;
    white-space: nowrap;
    margin-right: 0.25em;
  }
</style> 