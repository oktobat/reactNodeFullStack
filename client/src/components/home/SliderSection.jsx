import React from 'react';
import styled from 'styled-components'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from 'react-icons/io';

const SliderSectionBlock = styled.div`
    position:relative; 
    .slide {
        height:40vw; 
        background-size:cover;
        background-position:center;
        &.slide1 { background-image:url('./assets/image/main_slide_crvt_24205_pc_02.jpg')}
        &.slide2 { background-image:url('./assets/image/main_slide_crvt_240111_pc.jpg')}
        &.slide3 { background-image:url('./assets/image/main_slide_jsw_231212_pc.jpg')}
    }
    .slick-arrow {
        position:absolute; top:50%; transform:translateY(-50%); 
        font-size:50px; color:#f00; 
        &.slick-prev { left:50px; z-index:9999 }
        &.slick-next { right:50px } 
    }
    .slick-dots { position:absolute; bottom:30px; 
                  left:50%; transform:translate(-50%);
       li { display:inline-block; padding:0 5px; 
            button { width:30px; height:30px; border-radius:50%; 
                   background:#fff; text-indent:-9999px; overflow:hidden }
            &.slick-active { button { background: red; } }
        }
    }
`

const SliderSection = () => {
    const options = {
        dots:true,
        autoplay:true,
        autoplaySpeed:3000,
        slidesToShow:1,
        slidesToScroll:1,
        prevArrow : <IoIosArrowDropleftCircle />,
        nextArrow : <IoIosArrowDroprightCircle />
    }
    return (
        <SliderSectionBlock>
            <Slider {...options}>
                <div className="slide slide1"></div>
                <div className="slide slide2"></div>
                <div className="slide slide3"></div>
            </Slider>
        </SliderSectionBlock>
    );
};

export default SliderSection;