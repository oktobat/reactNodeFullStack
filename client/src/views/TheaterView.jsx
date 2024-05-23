import React from 'react';
import styled from 'styled-components'
import Title from '@/components/layout/Title'
import TheaterSection from '@/components/theater/TheaterSection'

const TheaterViewBlock = styled.div``
const TheaterView = () => {
    return (
        <TheaterViewBlock  className="row">
            <Title title="Theater" />
            <TheaterSection />
        </TheaterViewBlock>
    );
};

export default TheaterView;