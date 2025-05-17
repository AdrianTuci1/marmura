<script>
  import { onMount, onDestroy } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  const isBrowser = typeof window !== 'undefined';
  
  if (isBrowser) {
    gsap.registerPlugin(ScrollTrigger);
  }

  let container;
  let image;
  let contactSection;
  let contactContent;
  let formSection;
  let scrollTriggers = [];

  let formData = {
    name: '',
    email: '',
    phone: '',
    message: '',
    surname: '',
    profession: '',
    city: '',
    cap: '',
    nation: '',
    reason: ''
  };

  function handleSubmit() {
    console.log('Form submitted:', formData);
  }

  onMount(() => {
    // Imagine parallax
    scrollTriggers.push(
      ScrollTrigger.create({
        trigger: contactSection,
        start: "top top",
        end: "bottom top",
        onUpdate: (self) => {
          gsap.set(image.querySelector('img'), {
            y: 200 * self.progress // redus la 100 pentru un efect mai subtil
          });
        }
      })
    );

    // Animație pentru conținutul de contact
    const contentElements = contactContent.children;
    gsap.from(contentElements, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: contactContent,
        start: "top center+=100",
        toggleActions: "play none none reverse"
      }
    });

    // Animație pentru formular
    const formGroups = formSection.querySelectorAll('.form-group');
    gsap.from(formGroups, {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: formSection,
        start: "top center+=150",
        toggleActions: "play none none reverse"
      }
    });
  });

  onDestroy(() => {
    // Curățăm toate trigger-urile la distrugerea componentei
    scrollTriggers.forEach(trigger => trigger.kill());
  });
</script>

  <div class="app-container" bind:this={container}>
    <div class="image-container" bind:this={image}>
      <img src="/image6.png" alt="Contact Background" />
    </div>
    <div class="contact-section" bind:this={contactSection}>
      <div class="contact-container">
        <h1>Contact</h1>
        
        <div class="contact-content" bind:this={contactContent}>
          <div class="contact-info">
            <h2>MarmurArt</h2>
            <div class="info-item">
              <strong>Adresă:</strong>
              <p>Strada Exemplu, Nr. 123<br>București, România</p>
            </div>
            <div class="info-item">
              <strong>Telefon:</strong>
              <p>+40 123 456 789</p>
            </div>
          </div>

          <div class="separator"></div>

          <div class="social-info">
            <h2>Social</h2>
            <div class="social-links">
              <a href="#" class="social-link">
                <span class="platform">Instagram</span>
                <span class="handle">@marmurart</span>
              </a>
              <a href="#" class="social-link">
                <span class="platform">Facebook</span>
                <span class="handle">MarmurArt</span>
              </a>
            </div>
          </div>

          <div class="message-section">
            <p class="intro-message">
              Spune-ne de ce ai nevoie, suntem fericiti sa te ascultam si sa iti oferim solutiile perfecte pentru spatiul tau.
            </p>
          </div>

          <form class="contact-form" on:submit|preventDefault={handleSubmit} bind:this={formSection}>
            <div class="form-row">
              <div class="form-group">
                <label for="name">NAME *</label>
                <input type="text" id="name" bind:value={formData.name} required placeholder="Your name" />
              </div>
              <div class="form-group">
                <label for="surname">SURNAME *</label>
                <input type="text" id="surname" bind:value={formData.surname} required placeholder="Your surname" />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="email">EMAIL *</label>
                <input type="email" id="email" bind:value={formData.email} required placeholder="Your email" />
              </div>
              <div class="form-group">
                <label for="profession">PROFESSION *</label>
                <select id="profession" bind:value={formData.profession} required>
                  <option value="" disabled selected>Select your profession</option>
                  <option value="architect">Architect</option>
                  <option value="designer">Designer</option>
                  <option value="client">Client</option>
                </select>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="city">CITY *</label>
                <input type="text" id="city" bind:value={formData.city} required placeholder="Your city" />
              </div>
              <div class="form-group">
                <label for="cap">CAP *</label>
                <input type="text" id="cap" bind:value={formData.cap} required placeholder="Your CAP" />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="nation">NATION *</label>
                <select id="nation" bind:value={formData.nation} required>
                  <option value="" disabled selected>Select your nation</option>
                  <option value="romania">Romania</option>
                  <option value="italy">Italy</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div class="form-group">
                <label for="phone">TELEPHONE *</label>
                <input type="tel" id="phone" bind:value={formData.phone} required placeholder="Your phone number" />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group full-width">
                <label for="reason">MOTIVO DEL CONTATTO *</label>
                <input type="text" id="reason" bind:value={formData.reason} required placeholder="Reason for contact" />
              </div>
            </div>
            <button type="submit">Trimite Mesaj</button>
          </form>
        </div>
      </div>
    </div>
  </div>

<style>
  .app-container {
    position: relative;
    min-height: 100vh;
  }

  .image-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 90vh;
    z-index: 1;
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
    z-index: 2;
    min-height: 100vh;
    padding-top: 90vh;
  }

  .contact-container {
    background: white;
    position: relative;
    z-index: 2;
    margin: 0 auto;
    padding: 4rem 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  h1 {
    font-family: 'Urbanist', sans-serif;
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }

  .contact-content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    opacity: 1; /* Asigurăm că nu este invizibil inițial */
  }

  .contact-info, .social-info {
    background: #f5f5f5;
    padding: 2rem;
    border-radius: 8px;
    transform: translateY(0); /* Resetăm orice transformare inițială */
  }

  .separator {
    height: 1px;
    background: #ddd;
    margin: 1rem 0;
  }

  .social-links {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
  }

  .social-link {
    display: flex;
    flex-direction: column;
    text-decoration: none;
    color: #333;
    transition: color 0.3s ease;
  }

  .social-link:hover {
    color: #666;
  }

  .platform {
    font-weight: 500;
    margin-bottom: 0.25rem;
  }

  .handle {
    font-size: 0.9rem;
    color: #666;
  }

  .message-section {
    margin: 2rem 0;
  }

  .intro-message {
    font-size: 1.2rem;
    line-height: 1.6;
    color: #333;
    max-width: 800px;
  }

  .contact-form {
    width: 100%;
    max-width: 100%;
    background: #e5e5e5;
    border-radius: 0;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  .form-row {
    display: flex;
    gap: 2rem;
  }
  .form-group {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .form-group.full-width {
    flex: 2;
  }
  label {
    font-size: 0.95rem;
    font-weight: bold;
    text-transform: uppercase;
    color: #444;
    letter-spacing: 0.05em;
  }
  input, select {
    background: transparent;
    border: none;
    border-bottom: 2px solid #888;
    font-size: 2rem;
    color: #444;
    padding: 0.5rem 0;
    outline: none;
    width: 100%;
    font-family: inherit;
  }
  input::placeholder {
    color: #b0b0b0;
    font-size: 2.2rem;
    font-weight: 400;
    opacity: 1;
  }
  select {
    font-size: 2rem;
    color: #888;
    padding: 0.5rem 0;
    border-radius: 0;
    background: transparent;
    border-bottom: 2px solid #888;
    margin-bottom: 0.5rem;
  }
  button {
    margin-top: 2rem;
    background: #333;
    color: white;
    padding: 1rem 2rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    font-size: 1.1rem;
    transition: background-color 0.3s ease;
    align-self: flex-end;
  }
  button:hover {
    background: #444;
  }
  @media (max-width: 900px) {
    .form-row {
      flex-direction: column;
      gap: 1rem;
    }
    input, select{
      font-size: 1.3rem;
    }
    input::placeholde {
      font-size: 1.5rem;
    }
  }
</style> 