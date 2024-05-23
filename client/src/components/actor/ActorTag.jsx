import React from 'react';
import styled from 'styled-components'

const ActorTagBlock = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    button {
        flex: 0 0 100px;
        border: 1px solid #00c183;
        padding: 10px 20px;
        margin: 0 10px 10px;
        color: #00c183;
        background: #fff;
        &:hover, &.on {
            color: #fff;
            background: #00c183;
        }
    }
`

const ActorTag = ({onSearch, name}) => {

    const actorName = [
        { name: '이동욱' },
        { name: '유연석' },
        { name: '김범' },
        { name: '손우현' },
        { name: '이동욱1' },
        { name: '유연석1' },
        { name: '김범1' },
        { name: '손우현1' },
        { name: '이동욱2' },
        { name: '유연석2' },
        { name: '김범2' },
        { name: '손우현2' }
      ]

    const handleClick = (value)=>{
        onSearch(value, "tag")
    }

    return (
        <ActorTagBlock>
            {
                actorName.map((item, index)=>(
                    <button key={index} type="button" className={ name==item.name && 'on'} onClick={ ()=>handleClick(item.name) }>
                        {item.name}
                    </button>
                ))
            }
        </ActorTagBlock>
    );
};

export default ActorTag;