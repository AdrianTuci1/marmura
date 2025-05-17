<script>
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
</script>

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

<style>
  .contact-container {
    max-width: 1200px;
    margin: 100px auto 0;
    padding: 2rem;
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