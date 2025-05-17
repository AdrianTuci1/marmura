<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import Footer from '../lib/Footer.svelte';

  let isReady = false;

  // Sample project data - replace with your actual data
  const projects = [
    {
      id: 1,
      title: "Proiect 1",
      description: "Descriere proiect 1",
      image: "https://images.adsttc.com/media/images/62f6/2095/f08d/d163/3f1d/26cd/newsletter/from-monumental-ruins-to-lavish-interiors-16-projects-that-prove-marble-is-a-timeless-material_16.jpg?1660297370"
    },
    {
      id: 2,
      title: "Proiect 2",
      description: "Descriere proiect 2",
      image: "https://www.decorilla.com/online-decorating/wp-content/uploads/2022/04/Marble-bathroom-ideas-.jpg"
    },
    // Add more projects as needed
    {
      id: 3,
      title: "Proiect 3",
      description: "Descriere proiect 3",
      image: "https://georgestones.com/wp-content/uploads/2024/01/Black-Statuario-Marble-background-wall-1024x687.jpg"
    },
    {
      id: 4,
      title: "Proiect 4",
      description: "Descriere proiect 4",
      image: "https://i.pinimg.com/736x/4f/8b/61/4f8b6177ef435a0b28685ff62e6e0ee8.jpg"
    },
    {
      id: 5,
      title: "Proiect 5",
      description: "Descriere proiect 5",
      image: "https://i.pinimg.com/736x/3a/37/59/3a3759f1c5aacd354943b3c83d906a52.jpg"
    }
    
  ];

  onMount(() => {
    // Small delay to ensure DOM is ready
    requestAnimationFrame(() => {
      isReady = true;
    });
  });
</script>

<svelte:head>
  <title>Proiecte - MarmurArt</title>
</svelte:head>

{#if isReady}
  <div class="projects-page" in:fade={{ duration: 400 }}>
    <div class="projects-container">
      <div class="content-wrapper">
        <div class="projects-grid">
          {#each projects as project}
            <div class="project-card">
              <div class="image-container">
                <img 
                  src={project.image} 
                  alt={project.title}
                />
              </div>
              <div class="project-info">
                <h3 class="project-title">{project.title}</h3>
                <p class="project-description">{project.description}</p>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>

  <Footer />
{/if}

<style>
  .projects-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .projects-container {
    flex: 1;
    padding-top: 80px; /* Adjust based on your navbar height */
  }

  .content-wrapper {
    margin: 0 auto;
    padding: 2rem 1rem;
  }



  .projects-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1.5rem;
  }

  @media (max-width: 1200px) {
    .projects-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  @media (max-width: 992px) {
    .projects-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (max-width: 768px) {
    .projects-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 480px) {
    .projects-grid {
      grid-template-columns: 1fr;
    }
  }

  .project-card {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }

  .image-container {
    position: relative;
    padding-top: 133.33%; /* 4:3 aspect ratio */
  }

  .image-container img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .project-info {
    padding: 1rem;
  }

  .project-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .project-description {
    color: #666;
    font-size: 0.875rem;
    line-height: 1.5;
  }
</style> 