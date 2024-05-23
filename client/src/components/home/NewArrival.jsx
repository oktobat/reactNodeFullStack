import React from 'react';
import NewArrivalList from './NewArrivalList'
import styled from 'styled-components'

const NewArrivalBlock = styled.div`
    margin: 100px auto;
    h2 { text-align: center; }
    ul { 
        display: flex;
        flex-wrap: wrap;
    }
`

const NewArrival = () => {

    const products = [
        {
          photo: './assets/image/0010020003822.jpg',
          name: '캐릭터인형1',
          desc: '4월중 순차발송 예정(추후 자세한 일정 안내)',
          comment: '※ 1인당 5EA 구매 한정',
          price: 39000,
          icon: [
            './assets/image/kr_shopimages_starshipes_prod_icons_ (1).gif',
            './assets/image/kr_shopimages_starshipes_prod_icons_ (1).gif'
          ]
        },
        {
          photo: './assets/image/0010020003822.jpg',
          name: '캐릭터인형2',
          desc: '4월중 순차발송 예정(추후 자세한 일정 안내)',
          comment: '※ 1인당 2EA 구매 한정',
          price: 30000,
          icon: ['./assets/image/kr_shopimages_starshipes_prod_icons_ (1).gif']
        },
        {
          photo: './assets/image/0010020003822.jpg',
          name: '캐릭터인형3',
          desc: '4월중 순차발송 예정(추후 자세한 일정 안내)',
          comment: '※ 1인당 1EA 구매 한정',
          price: 38000,
          icon: ['./assets/image/kr_shopimages_starshipes_prod_icons_ (1).gif']
        },
        {
          photo: './assets/image/0010020003822.jpg',
          name: '캐릭터인형4',
          desc: '4월중 순차발송 예정(추후 자세한 일정 안내)',
          comment: '※ 1인당 5EA 구매 한정',
          price: 40000,
          icon: []
        },
        {
          photo: './assets/image/0010020003822.jpg',
          name: '캐릭터인형5',
          desc: '4월중 순차발송 예정(추후 자세한 일정 안내)',
          comment: '※ 1인당 5EA 구매 한정',
          price: 39000,
          icon: [
            './assets/image/kr_shopimages_starshipes_prod_icons_ (1).gif',
            './assets/image/kr_shopimages_starshipes_prod_icons_ (1).gif'
          ]
        },
        {
          photo: './assets/image/0010020003822.jpg',
          name: '캐릭터인형6',
          desc: '4월중 순차발송 예정(추후 자세한 일정 안내)',
          comment: '※ 1인당 5EA 구매 한정',
          price: 39000,
          icon: [
            './assets/image/kr_shopimages_starshipes_prod_icons_ (1).gif',
            './assets/image/kr_shopimages_starshipes_prod_icons_ (1).gif'
          ]
        },
        {
          photo: './assets/image/0010020003822.jpg',
          name: '캐릭터인형7',
          desc: '4월중 순차발송 예정(추후 자세한 일정 안내)',
          comment: '※ 1인당 5EA 구매 한정',
          price: 39000,
          icon: [
            './assets/image/kr_shopimages_starshipes_prod_icons_ (1).gif',
            './assets/image/kr_shopimages_starshipes_prod_icons_ (1).gif'
          ]
        },
        {
          photo: './assets/image/0010020003822.jpg',
          name: '캐릭터인형8',
          desc: '4월중 순차발송 예정(추후 자세한 일정 안내)',
          comment: '※ 1인당 5EA 구매 한정',
          price: 39000,
          icon: [
            './assets/image/kr_shopimages_starshipes_prod_icons_ (1).gif',
            './assets/image/kr_shopimages_starshipes_prod_icons_ (1).gif'
          ]
        },
        {
          photo: './assets/image/0010020003822.jpg',
          name: '캐릭터인형9',
          desc: '4월중 순차발송 예정(추후 자세한 일정 안내)',
          comment: '※ 1인당 5EA 구매 한정',
          price: 39000,
          icon: [
            './assets/image/kr_shopimages_starshipes_prod_icons_ (1).gif',
            './assets/image/kr_shopimages_starshipes_prod_icons_ (1).gif'
          ]
        },
        {
          photo: './assets/image/0010020003822.jpg',
          name: '캐릭터인형10',
          desc: '4월중 순차발송 예정(추후 자세한 일정 안내)',
          comment: '※ 1인당 5EA 구매 한정',
          price: 39000,
          icon: [
            './assets/image/kr_shopimages_starshipes_prod_icons_ (1).gif',
            './assets/image/kr_shopimages_starshipes_prod_icons_ (1).gif'
          ]
        }
      ]

    return (
        <NewArrivalBlock  className="row">
            <h2>New Arrival</h2>
            <ul>
                { products.map((item, index)=><NewArrivalList item={item} key={index} />) }
            </ul>
        </NewArrivalBlock>
    );
};

export default NewArrival;