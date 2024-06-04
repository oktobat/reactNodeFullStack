import React, {useEffect} from 'react';
import styled from 'styled-components'
import AOS from 'aos';
import 'aos/dist/aos.css';

const NewArrivalListBlock = styled.div`
    flex: 0 0 23%;
    border: 0px solid #000;
    margin: 10px 1%;
    @media (max-width:768px) {
        flex: 0 0 48%;
    }
    .imgbox {
        overflow: hidden;
        border: 1px solid #ddd;
        img { transition: all 0.5s; }
            &:hover {
                img { transform: scale(1.5); }
            }
      }
    .info { 
        p:last-child {
            span { margin-right: 10px; }
        }
    }
`

const NewArrivalList = ({item, delay}) => {
    const { photo, name, desc, comment, price, icon } = item

    useEffect(() => {
        AOS.init({
          duration: 1000,
        });
      }, []);

    return (
        <NewArrivalListBlock data-aos="zoom-in" data-aos-anchor-placement="center-center" data-aos-delay={delay}>
            <div class="imgbox">
               <a href="#"><img src={photo} alt={name} /></a>
            </div>
            <div class="info">
                <div>
                    <p><a href="#">{ name }</a></p>
                    <p>{ desc }</p>
                    <p>{ comment }</p>
                    <p>{ price }</p>
                    <p>
                        { icon.map((item, index)=><span key={index}><img src={item} /></span>) }
                    </p>
                </div>
            </div>
        </NewArrivalListBlock>
    );
};

export default NewArrivalList;