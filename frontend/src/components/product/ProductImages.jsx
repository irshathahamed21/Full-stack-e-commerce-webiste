import React from 'react';
import Slider from 'react-slick';


const ProductImages = ({prod}) => {
  console.log(prod)
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div>
      <Slider {...settings}>
        {prod.images && prod.images.map((image, index) => (
          <div key={index}>
            <img className = "CarouselImage" src={image.url} alt={image.alt} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductImages;
