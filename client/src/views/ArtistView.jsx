import React from 'react';
import styled from 'styled-components'
import Title from '@/components/layout/Title'
import ArtistSection from '@/components/artist/ArtistSection'

const ArtistViewBlock = styled.div``

const ArtistView = () => {
    return (
        <ArtistViewBlock className="row">
            <Title title="Artist" />
            <ArtistSection />
        </ArtistViewBlock>
    );
};

export default ArtistView;