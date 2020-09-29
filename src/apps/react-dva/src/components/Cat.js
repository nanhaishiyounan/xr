import React from 'react';
import styled from 'styled-components';
const Container = styled.div`
  display: flex;
`;
const CatImg = styled(animated.img)`
  display: block;
  margin: auto;
  width: 1rem;
`;

function Cat() {
  return (
    <Container>
      <CatImg src={require('../assets/icon-cat-0.gif')} />
    </Container>
  );
}

export default Cat;
