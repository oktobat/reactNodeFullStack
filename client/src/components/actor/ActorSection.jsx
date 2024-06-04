import React, {useState, useEffect} from 'react';
import styled from 'styled-components'
import AOS from 'aos';
import 'aos/dist/aos.css';

const ActorSectionBlock = styled.div`
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      flex: 0 0 23%;
      margin: 20px 1%;
      a {
        display: block;
        img {
          width: 100%;
        }
        span {
          display: block;
        }
      }
    }
  }
`

const ActorSection = ({searchWorks}) => {
    const [key, setKey] = useState(0);  
    useEffect(() => {
      AOS.init({
        duration: 1000,
      });
    }, []);

    useEffect(() => {
        setKey(prevKey => prevKey + 1);
        AOS.refresh(); // 상태 변경 시 AOS를 새로고침하여 DOM 변경 사항 감지
    }, [searchWorks]);

    return (
        <ActorSectionBlock>
            <ul>
                {
                    searchWorks.map((item, index)=>(
                        <li 
                        key={`${key}-${index}`} // key에 상태 변경 반영
                        data-aos="fade-up"
                        data-aos-anchor-placement="top-bottom"
                        >
                            <a href="#">
                                <img src={item.photo} alt={item.title} />
                                <span>작품명 : {item.title}</span>
                                <span>출연배우 : {item.name}</span>
                            </a>
                        </li>
                    ))
                }
            </ul>
        </ActorSectionBlock>
    );
};

export default ActorSection;