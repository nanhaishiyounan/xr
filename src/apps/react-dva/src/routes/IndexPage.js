import React from 'react';
import styled from 'styled-components';
import { connect } from 'dva';
import Cat from '../components/Cat';

const Container = styled.div`
  height: 100%;
`;

function IndexPage() {
  return (
    <Container>
      <Cat />
    </Container>
  );
}

IndexPage.propTypes = {};

export default connect()(IndexPage);
