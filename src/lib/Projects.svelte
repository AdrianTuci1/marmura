<script>
  import { onMount } from 'svelte';
  import Swiper from 'swiper';
  import { Navigation, Pagination } from 'swiper/modules';
  import 'swiper/css';
  import 'swiper/css/navigation';
  import 'swiper/css/pagination';
    import RisingText from './RisingText.svelte';

  let swiper;
  const projects = [
    {
      title: 'Project 1',
      description: 'Description for project 1',
      image: 'https://images.adsttc.com/media/images/62f6/2095/f08d/d163/3f1d/26cd/newsletter/from-monumental-ruins-to-lavish-interiors-16-projects-that-prove-marble-is-a-timeless-material_16.jpg?1660297370'
    },
    {
      title: 'Project 2',
      description: 'Description for project 2',
      image: 'https://www.decorilla.com/online-decorating/wp-content/uploads/2022/04/Marble-bathroom-ideas-.jpg'
    },
    {
      title: 'Project 3',
      description: 'Description for project 3',
      image: 'https://georgestones.com/wp-content/uploads/2024/01/Black-Statuario-Marble-background-wall-1024x687.jpg'
    },
    {
      title: 'Project 4',
      description: 'Description for project 4',
      image: 'https://i.pinimg.com/736x/4f/8b/61/4f8b6177ef435a0b28685ff62e6e0ee8.jpg'
    },
    {
      title: 'Project 5',
      description: 'Description for project 5',
      image: 'https://i.pinimg.com/736x/3a/37/59/3a3759f1c5aacd354943b3c83d906a52.jpg'
    }
  ];

  onMount(() => {
    swiper = new Swiper('.swiper', {
      modules: [Pagination],
      slidesPerView: 1,
      spaceBetween: 30,
      grabCursor: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        640: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 30,
        },
      },
    });
  });
</script>

<section class="projects-section">
  <div class="container">
    <div class="project-title"><RisingText text="PROIECTE" delay={0.2} fontSize="3.5rem" /></div>
    <div class="swiper">
      <div class="swiper-wrapper">
        {#each projects as project}
          <div class="swiper-slide">
            <div class="project-card">
              <img src={project.image} alt={project.title} />
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
          </div>
        {/each}
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</section>

<style>
  .projects-section {
    background-color: #1a1a1a;
    padding: 2rem 0rem 4rem 0rem;
    color: white;
  }

  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 10px;
  }

  .project-title {
    text-align: left;
    margin-bottom: 3rem;
    font-weight: bold;
  }

  .swiper {
    width: 100%;
    padding: 2rem 0;
  }

  .project-card {
    background: #2a2a2a;
    border-radius: 12px;
    overflow: hidden;
  }

  .project-card img {
    width: 100%;
    aspect-ratio: 3/4;
    object-fit: cover;
    border-radius: 12px 12px 0 0;
  }

  .project-card h3 {
    padding: 0.75rem 1rem 0.25rem;
    margin: 0;
    font-size: 1.2rem;
    text-align: left;
  }

  .project-card p {
    padding: 0 1rem 1rem;
    margin: 0;
    color: #ccc;
    text-align: left;
  }

  :global(.swiper) {
    cursor: grab;
  }

  :global(.swiper:active) {
    cursor: grabbing;
  }

  :global(.swiper-pagination-bullet) {
    background: white;
  }

  :global(.swiper-pagination-bullet-active) {
    background: #007bff;
  }
</style> 