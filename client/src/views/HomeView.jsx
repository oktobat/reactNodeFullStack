import React, {useEffect} from 'react';
import styled from 'styled-components'
import SliderSection from '@/components/home/SliderSection'
import SliderSection2 from '@/components/home/SliderSection2'
import NewArrival from '@/components/home/NewArrival'

const HomeViewBlock = styled.div``

const HomeView = () => {
    return (
        <HomeViewBlock>
            <SliderSection />
            <SliderSection2 />
            <NewArrival />
        </HomeViewBlock>
    );
};

export default HomeView;