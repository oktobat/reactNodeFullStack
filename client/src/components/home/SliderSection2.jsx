import React, {useState} from 'react';
import styled from 'styled-components'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from 'react-icons/io';

const SliderSection2Block = styled.div`
    margin:50px auto;
    position:relative; 
    padding:0 50px; 
    img { width:100%; padding:0 20px;  }
    .slick-arrow {
        position:absolute; top:50%; transform:translateY(-50%); 
        font-size:50px; color:#f00; 
        &.slick-prev { left:-50px; z-index:9999 }
        &.slick-next { right:-50px } 
    }
`

const SliderSection2 = () => {

    const options = {
        dots:false,
        autoplay:true,
        autoplaySpeed:3000,
        slidesToShow:5,
        slidesToScroll:1,
        prevArrow : <IoIosArrowDropleftCircle />,
        nextArrow : <IoIosArrowDroprightCircle />,
        responsive : [
            {
                breakpoint:769,
                settings:{
                    slidesToShow:3,
                    slideToScroll:3
                }
            }
        ]
    }

    const sliders = [
        { image1:"./assets/image/p_cravity_g.jpg",        image2:"./assets/image/p_cravity.jpg",        alt:"김은영" },
        { image1:"./assets/image/p_ive_g.jpg",            image2:"./assets/image/p_ive.jpg",            alt:"홍길동" },
        { image1:"./assets/image/p_jeongsewoon_g.jpg",    image2:"./assets/image/p_jeongsewoon.jpg",    alt:"장나라" },
        { image1:"./assets/image/p_cravity_g.jpg",        image2:"./assets/image/p_cravity.jpg",        alt:"김은영" },
        { image1:"./assets/image/p_ive_g.jpg",            image2:"./assets/image/p_ive.jpg",            alt:"홍길동" },
        { image1:"./assets/image/p_jeongsewoon_g.jpg",    image2:"./assets/image/p_jeongsewoon.jpg",    alt:"장나라" },
        { image1:"./assets/image/p_cravity_g.jpg",        image2:"./assets/image/p_cravity.jpg",        alt:"김은영" },
        { image1:"./assets/image/p_ive_g.jpg",            image2:"./assets/image/p_ive.jpg",            alt:"홍길동" },
        { image1:"./assets/image/p_jeongsewoon_g.jpg",    image2:"./assets/image/p_jeongsewoon.jpg",    alt:"장나라" }
    ]

    const [currentImage, setCurrentImage] = useState(null);

    const handleMouseOver = (image) => {
        setCurrentImage(image);
    };

    const handleMouseOut = () => {
        setCurrentImage(null);
    };

    return (
        <SliderSection2Block className="row">
            <Slider {...options}>
                {
                    sliders.map((item, index)=>(
                        <div key={index}>
                            <img 
                            src={currentImage === item.image2 ? item.image2 : item.image1}
                            alt={item.alt}
                            onMouseOver={() => handleMouseOver(item.image2)}
                            onMouseOut={handleMouseOut}
                            />
                        </div>
                    ))
                }
            </Slider>
        </SliderSection2Block>
    );
};

export default SliderSection2;