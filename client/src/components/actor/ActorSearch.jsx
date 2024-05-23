import React, { useState } from "react";
import styled from "styled-components";

const ActorSearchBlock = styled.div`
  text-align: center;
  margin-bottom: 70px;
  input {
    border: 1px solid #e8ecf2;
    font-size: 16px;
    padding: 10px 20px;
    border-radius: 50px;
    max-width: 300px;
    margin-right: 10px;
  }
  button {
    color: #fff;
    background: #00c183;
    border-radius: 50px;
    padding: 10px 50px;
  }
`;

const ActorSearch = ({ onSearch }) => {
  const [text, setText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    onSearch(text, "search");
    setText("");
  };

  const onChange = (e) => {
    setText(e.target.value);
  };

  return (
    <ActorSearchBlock>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="efg 검색할 배우명을 입력하세요."
          value={text}
          onChange={onChange}
        />
        <button type="submit">검색하기</button>
      </form>
    </ActorSearchBlock>
  );
};

export default ActorSearch;
