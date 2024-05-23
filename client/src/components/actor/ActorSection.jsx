import React from 'react';
import styled from 'styled-components'

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
    return (
        <ActorSectionBlock>
            <ul>
                {
                    searchWorks.map((item, index)=>(
                        <li key={index}>
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