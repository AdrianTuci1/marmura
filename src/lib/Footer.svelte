<script>
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  
  const isBrowser = typeof window !== 'undefined';
  
  if (isBrowser) {
    gsap.registerPlugin(ScrollTrigger);
  }
  
  let footerContent;
  let footerBigtext;
  let footerColumns;

  onMount(() => {
    // Refresh ScrollTrigger when the component mounts
    ScrollTrigger.refresh();

    // Animate footer columns
    gsap.fromTo(footerColumns, 
      {
        y: -300,
        opacity: 1,
      },
      {
        y: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: ".footer",
          start: "top bottom",
          end: "bottom top",
          scrub: 0.1,
        }
      }
    );

    // Animate big text - coming from bottom
    gsap.fromTo(".footer-bigtext", {
      y: 200,
      opacity: 1,
    }, {
      y: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: ".footer",
        start: "top bottom",
        end: "bottom top",
        scrub: 0.1,
        markers: true
      }
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  });
</script>

<footer class="footer">
  <div class="footer-content-area" bind:this={footerContent}>
    <div class="footer-columns" bind:this={footerColumns}>
      <div>
        <h4>MARMURART</h4>
        <p>Str. Exemplu, Nr. 123<br />București, România</p>
        <p>contact@marmurart.ro<br />+40 XXX XXX XXX</p>
      </div>
      <div>
        <h4>NAVIGATIE</h4>
        <ul>
          <li><a href="#despre">Despre Noi</a></li>
          <li><a href="#proiecte">Proiecte</a></li>
          <li><a href="#categorii">Categorii</a></li>
          <li><a href="#showroom">Showroom</a></li>
        </ul>
      </div>
      <div>
        <h4>URMARESTE-NE</h4>
        <ul>
          <li><a href="#">Facebook</a></li>
          <li><a href="#">Instagram</a></li>
          <li><a href="#">YouTube</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bigtext-row">
      <div class="footer-bigtext">
        <span>m</span>
        <span>a</span>
        <span>r</span>
        <span>m</span>
        <span>u</span>
        <span>r</span>
        <span>a</span>
        <span>r</span>
        <span>t</span>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="footer-line"></div>
      <div class="footer-legal">
        <span>©{new Date().getFullYear()} MARMURART</span>
        <span>Legal – Privacy – Cookies</span>
      </div>
    </div>
  </div>
  <img class="footer-logo-svg" src="/logom.svg" alt="logo" />
</footer>

<style>
.footer {
  position: relative;
  background: #a13a22;
  color: #222;
  height: 100vh;
  min-height: 500px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.footer-content-area {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 4rem 2rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: flex-end;
  overflow: visible;
}
.footer-columns {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 0.5rem;
  position: relative;
  will-change: transform;
}
.footer-columns h4, .footer-columns a {
  color: #111;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 0.5rem;
}
.footer-columns ul, .footer-columns p {
  margin: 0.5rem 0 0 0;
  color: #222;
  font-size: 1rem;
  list-style: none;
  padding: 0;
}
.footer-columns ul li {
  margin-bottom: 0.3rem;
}
.footer-columns a {
  text-decoration: none;
  color: #111;
  transition: color 0.2s;
}
.footer-columns a:hover {
  color: #fff;
}
.footer-bottom {
  margin-top: 2rem;
  z-index: 2;
  position: relative;
}
.footer-line {
  border-top: 2px solid #222;
  margin-bottom: 1rem;
}
.footer-legal {
  display: flex;
  justify-content: space-between;
  font-size: 0.95rem;
  color: #222;
  flex-wrap: wrap;
  gap: 1rem;
}
.footer-bigtext-row {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-top: 0;
  margin-bottom: 1.5rem;
}
.footer-bigtext {
  font-size: 9vw;
  font-weight: 900;
  color: rgb(14, 14, 18);
  text-transform: lowercase;
  line-height: 1;
  text-align: center;
  user-select: none;
  white-space: nowrap;
  opacity: 1;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.footer-bigtext span {
  display: inline-block;
  text-align: center;
  flex: 1;
}
.footer-logo-svg {
  top: 0;
  position: absolute;
  right: 0;
  bottom: 0;
  width: 68vw;
  min-width: 300px;
  max-width: 1200px;
  height: auto;
  opacity: 0.18;
  z-index: 1;
  pointer-events: none;
}
@media (max-width: 900px) {
  .footer-content-area { padding: 2rem 1rem 1rem 1rem; }
  .footer-columns { flex-direction: column; gap: 1.5rem; }
  .footer-legal { flex-direction: column; gap: 0.5rem; align-items: flex-start; }
  .footer-bigtext { font-size: 15vw; }
  .footer-logo-svg { width: 80vw; min-width: 120px; }
}
</style> 