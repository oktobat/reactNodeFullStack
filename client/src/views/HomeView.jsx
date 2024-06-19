import React from 'react';
import styled from 'styled-components'
import SliderSection from '@/components/home/SliderSection'
import SliderSection2 from '@/components/home/SliderSection2'
import NewArrival from '@/components/home/NewArrival'
import Chat from '@/components/home/Chat'

const HomeViewBlock = styled.div``

const HomeView = () => {
    return (
        <HomeViewBlock>
            <SliderSection />
            <SliderSection2 />
            <NewArrival />
            <Chat />
        </HomeViewBlock>
    );
};

export default HomeView;