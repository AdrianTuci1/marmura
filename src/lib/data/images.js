// Import local images
import showroomImage from '../../assets/showroom.webp';

// External image URLs
export const images = {
  interior: 'https://static.uwalls.com/products/98000/98288/u93578v2pig22mr_1200.webp',
  exterior: 'https://www.bosun.co.za/wp-content/uploads/2022/04/Bosun-Urban-Large-Paver.jpg',
  cover: 'https://www.bosun.co.za/wp-content/uploads/2022/04/Bosun-Urban-Large-Paver.jpg',
  showroom: showroomImage
};

// Image collections with descriptions
export const imageCollections = {
  slideshow: [
    {
      image: images.interior,
      description: "Marmură de înaltă calitate pentru interior, oferind eleganță și rafinament spațiilor dumneavoastră."
    },
    {
      image: images.exterior,
      description: "Soluții durabile pentru exterior, combinând rezistența cu estetica naturală a marmurei."
    }
  ]
}; 