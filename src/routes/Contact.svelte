<script>
  import { onMount, onDestroy } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { ScrollSmoother } from 'gsap/ScrollSmoother';

  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

  let container;
  let image;
  let contactSection;
  let smoother;
  let scrollTrigger;

  let formData = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };

  function handleSubmit() {
    // Handle form submission
    console.log('Form submitted:', formData);
  }

  onMount(() => {
    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.8,
      effects: true
    });

    scrollTrigger = ScrollTrigger.create({
      trigger: contactSection,
      start: "top top",
      end: "bottom top",
      onUpdate: (self) => {
        gsap.set(image.querySelector('img'), {
          y: 200 * self.progress
        });
      }
    });
  });

  onDestroy(() => {
    if (smoother) smoother.kill();
    if (scrollTrigger) scrollTrigger.kill();
  });
</script>

<div class="app-container" bind:this={container}>
  <div id="smooth-wrapper">
    <div id="smooth-content">
      <div class="image-container" bind:this={image}>
        <img src="/image6.png" alt="Contact Background" />
      </div>
      <div class="contact-section" bind:this={contactSection}>
        <div class="contact-container">
          <h1>Contact</h1>
          
          <div class="contact-content">
            <div class="contact-info">
              <h2>Informații Contact</h2>
              <div class="info-item">
                <strong>Adresă:</strong>
                <p>Strada Exemplu, Nr. 123<br>București, România</p>
              </div>
              <div class="info-item">
                <strong>Telefon:</strong>
                <p>+40 123 456 789</p>
              </div>
              <div class="info-item">
                <strong>Email:</strong>
                <p>contact@marmurart.ro</p>
              </div>
            </div>

            <form class="contact-form" on:submit|preventDefault={handleSubmit}>
              <div class="form-group">
                <label for="name">Nume</label>
                <input type="text" id="name" bind:value={formData.name} required />
              </div>
              
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" bind:value={formData.email} required />
              </div>
              
              <div class="form-group">
                <label for="phone">Telefon</label>
                <input type="tel" id="phone" bind:value={formData.phone} />
              </div>
              
              <div class="form-group">
                <label for="message">Mesaj</label>
                <textarea id="message" bind:value={formData.message} rows="5" required></textarea>
              </div>
              
              <button type="submit">Trimite Mesaj</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .app-container {
    position: relative;
    min-height: 100vh;
    overflow: hidden;
  }

  #smooth-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    overflow: hidden;
  }

  #smooth-content {
    min-height: 100vh;
  }

  .image-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 90vh;
    z-index: 2;
    border-radius: 0 0 26px 26px;
    overflow: hidden;
  }

  .image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center -150px;
  }

  .contact-section {
    position: relative;
    z-index: 1;
    min-height: 100vh;
    padding-top: 100vh;
  }

  .contact-container {
    margin: 0 auto;
    padding: 4rem 2rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  h1 {
    font-family: 'Urbanist', sans-serif;
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }

  .contact-content {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 4rem;
  }

  .contact-info {
    background: #f5f5f5;
    padding: 2rem;
    border-radius: 8px;
  }

  .info-item {
    margin-bottom: 1.5rem;
  }

  .info-item strong {
    display: block;
    margin-bottom: 0.5rem;
    color: #333;
  }

  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  label {
    font-weight: 500;
    color: #333;
  }

  input, textarea {
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-family: inherit;
  }

  button {
    background: #333;
    color: white;
    padding: 1rem 2rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background: #444;
  }

  @media (max-width: 768px) {
    .contact-content {
      grid-template-columns: 1fr;
    }
  }
</style> 