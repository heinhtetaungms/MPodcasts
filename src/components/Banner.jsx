import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import banner from '../assets/img/banner.png';

const ImageSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 5000,
        slidesToShow: 1, // Set the number of slides to display at a time
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
    };
    const sliderStyle = {
        width: "100%",
        overflow: "hidden",
    };
    const slideStyle = {
        transition: "transform 0.5s ease", // Adjust the transition properties
    };

    return (
        <div className="h-[450px] object-center overflow-hidden ">
            <Slider {...settings} style={sliderStyle}>
                <div style={slideStyle}>
                    <img src={banner} alt="Music 1" className='w-full h-full' />
                </div>
                <div style={slideStyle}>
                    <img src={banner} alt="Music 2" className='w-full h-full' />
                </div>
                <div style={slideStyle}>
                    <img src={banner} alt="Music 3" className='w-full h-full' />
                </div>
            </Slider>
        </div>
    );
};

export default ImageSlider;
