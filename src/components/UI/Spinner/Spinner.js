import React from 'react';
import styled from 'styled-components';

const Spinner = styled.div`
  border-radius: 50%;
  width: 10em;
  height: 10em;
  margin: 60px auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 1.1em solid rgba(82, 23, 81, 0.2);
  border-right: 1.1em solid rgba(82, 23, 81, 0.2);
  border-bottom: 1.1em solid rgba(82, 23, 81, 0.2);
  border-left: 1.1em solid #521751;
  transform: translateZ(0);
  animation: load8 1.1s infinite linear;

  &:after {
    border-radius: 50%;
    width: 10em;
    height: 10em;
  }

  @keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;

const spinner = () => <Spinner>Loading...</Spinner>;

export default spinner;