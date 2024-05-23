import React, { useState } from 'react';
import styled from 'styled-components'

const ArtistSectionBlock = styled.div`
    h3 {
        text-align: center;
        font-size: 20px;
        margin: 50px 0;
    }
    .artist__wrap {
        .artist__type {
          display: flex;
          justify-content: center;
          button {
            margin: 20px;
            padding: 10px;
            border-radius: 10px;
            backgrond:#ddd;
            &.on {
                background:#f00;
                color:#fff
            }
          }
        }
        .artist__member {
            display: flex;
            flex-wrap: wrap;
            .member__info {
              flex: 0 0 23%;
              margin: 20px 1%;
              a { display: block;
                .member__photo { img { width: 100%; } }
              }
            }
        }
    }
`

const ArtistSection = () => {

    const [active, setActive] = useState(0)

    const artistMenu = [
        {menu: '팝 (Pop)',          id:0 },
        {menu: '발라드 (Ballad)',   id:1 },
        {menu: '힙합 (Hip-hop)',    id:2 },
        {menu: '알앤비 (R&B)',      id:3 }
    ]

    const artistData = {
        0 : [ 
          { artistImg: './assets/image/p_cravity.jpg', title: '팝 크래비티', link: '#' },
          { artistImg: './assets/image/p_cravity.jpg', title: '팝 크래비티', link: '#' },
          { artistImg: './assets/image/p_cravity.jpg', title: '팝 크래비티', link: '#' },
          { artistImg: './assets/image/p_cravity.jpg', title: '팝 크래비티', link: '#' },
          { artistImg: './assets/image/p_cravity.jpg', title: '팝 크래비티', link: '#' },
          { artistImg: './assets/image/p_cravity.jpg', title: '팝 크래비티', link: '#' },
          { artistImg: './assets/image/p_cravity.jpg', title: '팝 크래비티', link: '#' },
          { artistImg: './assets/image/p_cravity.jpg', title: '팝 크래비티', link: '#' },
          { artistImg: './assets/image/p_cravity.jpg', title: '팝 크래비티', link: '#' },
          { artistImg: './assets/image/p_cravity.jpg', title: '팝 크래비티', link: '#' }
        ],
        1 : [ 
            { artistImg: './assets/image/p_cravity.jpg', title: '발라드 크래비티', link: '#' },
            { artistImg: './assets/image/p_cravity.jpg', title: '발라드 크래비티', link: '#' },
            { artistImg: './assets/image/p_cravity.jpg', title: '발라드 크래비티', link: '#' },
            { artistImg: './assets/image/p_cravity.jpg', title: '발라드 크래비티', link: '#' },
            { artistImg: './assets/image/p_cravity.jpg', title: '발라드 크래비티', link: '#' },
            { artistImg: './assets/image/p_cravity.jpg', title: '발라드 크래비티', link: '#' },
            { artistImg: './assets/image/p_cravity.jpg', title: '발라드 크래비티', link: '#' },
            { artistImg: './assets/image/p_cravity.jpg', title: '발라드 크래비티', link: '#' }  
        ],
        2 : [ 
          { artistImg: './assets/image/p_cravity.jpg', title: '힙합 크래비티', link: '#' },
          { artistImg: './assets/image/p_cravity.jpg', title: '힙합 크래비티', link: '#' },
          { artistImg: './assets/image/p_cravity.jpg', title: '힙합 크래비티', link: '#' },
          { artistImg: './assets/image/p_cravity.jpg', title: '힙합 크래비티', link: '#' },
          { artistImg: './assets/image/p_cravity.jpg', title: '힙합 크래비티', link: '#' },
          { artistImg: './assets/image/p_cravity.jpg', title: '힙합 크래비티', link: '#' },
          { artistImg: './assets/image/p_cravity.jpg', title: '힙합 크래비티', link: '#' },
          { artistImg: './assets/image/p_cravity.jpg', title: '힙합 크래비티', link: '#' }
        ],
        3 : [ 
          { artistImg: './assets/image/p_cravity.jpg', title: '알앤비 크래비티', link: '#' },
          { artistImg: './assets/image/p_cravity.jpg', title: '알앤비 크래비티', link: '#' },
          { artistImg: './assets/image/p_cravity.jpg', title: '알앤비 크래비티', link: '#' },
          { artistImg: './assets/image/p_cravity.jpg', title: '알앤비 크래비티', link: '#' },
          { artistImg: './assets/image/p_cravity.jpg', title: '알앤비 크래비티', link: '#' },
          { artistImg: './assets/image/p_cravity.jpg', title: '알앤비 크래비티', link: '#' },
          { artistImg: './assets/image/p_cravity.jpg', title: '알앤비 크래비티', link: '#' },
          { artistImg: './assets/image/p_cravity.jpg', title: '알앤비 크래비티', link: '#' }  
        ]
    }


    return (
        <ArtistSectionBlock>
            <h3>{ artistMenu[active].menu }</h3>
            <div className="artist__wrap">
                <div className="artist__type">
                    {
                        artistMenu.map((item, index)=><button key={index} onClick={()=>{setActive(item.id)}} className={ active===item.id && 'on' }>{item.menu}</button>)
                    }
                </div>
                <div className="artist__member">
                    {
                        artistData[active].map((item, index)=>(
                            <div className="member__info" key={index}>
                                <a href={item.link}>
                                    <figure className="member__photo">
                                        <img src={item.artistImg} alt={item.title} />
                                    </figure>
                                    <div className="member__desc">
                                        <h4>{item.title}</h4>
                                    </div>
                                </a>
                            </div>
                        ))
                    }
                </div>    
            </div>
        </ArtistSectionBlock>
    );
};

export default ArtistSection;