<script>
  import showroomImage from '../assets/showroom.webp';
</script>

<div class="showroom-container">
  <span>FA O VIZITA LA</span>
  <h2 class="title">SHOWROOM</h2>
  <div class="image-container">
    <img src={showroomImage} alt="Showroom Slatina" />
  </div>
  <h2 class="location">SLATINA</h2>
</div>

<style>

  span{
    font-size: 1.2rem;
    color: brown;
    font-weight: bold;
  }
  .title {
    font-size: 3.5rem;
    font-weight: bold;
    color: #333;
    margin-top: -0.8rem;
  }

  .showroom-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    padding: 2rem;
    margin-block: 150px;

  }

  .image-container {
    width: 100%;
    max-width: 800px;
    aspect-ratio: 4/3;
    border-radius: 12px;
    overflow: hidden;
  }

  .image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .location {
    font-size: 2rem;
    font-weight: bold;
    color: #333;
    margin: 0;
  }
</style> 