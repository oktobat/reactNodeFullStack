import React from 'react';
import styled from 'styled-components'

const TitleBlock = styled.div`
    font-size:50px;
    text-align:center;
    margin:50px 0;
`

const Title = ({title}) => {
    return (
        <TitleBlock>
            <h2>{title}</h2>
        </TitleBlock>
    );
};

export default Title;