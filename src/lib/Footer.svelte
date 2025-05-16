<script>
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  
  gsap.registerPlugin(ScrollTrigger);
  
  let footerColumns;
  let footerBigtext;

  onMount(() => {
    // Animate columns - following scroll
    gsap.fromTo(footerColumns, 
      {
        y: -500,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "none",
        scrollTrigger: {
          trigger: footerColumns,
          start: "top bottom",
          end: "top center",
          scrub: true,
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animate big text - coming from bottom
    gsap.from(footerBigtext, {
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: footerBigtext,
        start: "top bottom-=100",
        toggleActions: "play none none reverse"
      }
    });
  });
</script>

<footer class="footer">
  <div class="footer-content-area">
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
      <span class="footer-bigtext" bind:this={footerBigtext}>marmurart</span>
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
}
.footer-columns {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 0.5rem;
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
  letter-spacing: 0.3em;
  text-transform: lowercase;
  line-height: 1;
  text-align: center;
  user-select: none;
  white-space: wrap;
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