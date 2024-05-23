import React, {useState} from 'react';
import styled from 'styled-components'
import Title from '@/components/layout/Title'
import ActorSearch from '@/components/actor/ActorSearch'
import ActorTag from '@/components/actor/ActorTag'
import ActorSection from '@/components/actor/ActorSection'

const ActorViewBlock = styled.div``

const ActorView = () => {

    const [name, setName] = useState("")

    const actorWorks = [
          {
            name: '이동욱',
            genre: '드라마',
            title: '도깨비',
            photo: './assets/image/p_leedongwook.jpg'
          },
          {
            name: '유연석',
            genre: '영화',
            title: '멍뭉미',
            photo: './assets/image/p_yooyeonseok.jpg'
          },
          {
            name: '이동욱',
            genre: '드라마',
            title: '도깨비1',
            photo: './assets/image/p_leedongwook.jpg'
          },
          {
            name: '유연석',
            genre: '영화',
            title: '멍뭉미1',
            photo: './assets/image/p_yooyeonseok.jpg'
          },
          {
            name: '이동욱1',
            genre: '영화',
            title: '도깨비',
            photo: './assets/image/p_leedongwook.jpg'
          },
          {
            name: '유연석1',
            genre: '드라마',
            title: '멍뭉미',
            photo: './assets/image/p_yooyeonseok.jpg'
          },
          {
            name: '이동욱',
            genre: '드라마',
            title: '도깨비3',
            photo: './assets/image/p_leedongwook.jpg'
          },
          {
            name: '유연석',
            genre: '영화',
            title: '멍뭉미3',
            photo: './assets/image/p_yooyeonseok.jpg'
          },
          {
            name: '이동욱',
            genre: '영화',
            title: '도깨비4',
            photo: './assets/image/p_leedongwook.jpg'
          },
          {
            name: '유연석',
            genre: '영화',
            title: '멍뭉미4',
            photo: './assets/image/p_yooyeonseok.jpg'
          }
    ]

    const [searchWorks, setSearchWorks] = useState(actorWorks)

    const onSearch = (value, text) => {
        setSearchWorks(actorWorks.filter((item)=>item.name.indexOf(value)>-1 || item.genre.indexOf(value)>-1 || item.title.indexOf(value)>-1))
        if (text=="search") {
            setName("")
        } else {
            setName(value)
        }
    }

    return (
        <ActorViewBlock className="row">
            <Title title="Actor" />
            <ActorSearch onSearch={onSearch} />
            <ActorTag onSearch={onSearch} name={name} />
            <ActorSection searchWorks={searchWorks} />
        </ActorViewBlock>
    );
};

export default ActorView;