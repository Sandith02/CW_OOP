import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="loader">simpleEvents</div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Full viewport height */
  background-color: #f9f9f9; /* Optional background color */

  @keyframes animate8345 {
    0%, 100% {
      filter: hue-rotate(0deg);
    }

    50% {
      filter: hue-rotate(360deg);
    }
  }

  .loader {
    color: rgb(0, 0, 0);
    background: linear-gradient(to right, #2d60ec, #3ccfda);
    font-family: "Poppins", sans-serif;
    font-size: 25px;
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    animation: animate8345 9s linear infinite;
    font-weight: 500;
    text-align: center; /* Center the text */
  }
`;

export default Loader;
