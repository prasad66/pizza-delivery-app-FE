import React from 'react';
import styled from 'styled-components'
import Loader from "react-js-loader";


const LoaderPage = () => {
    return <LoaderSite>
        <Loader type="bubble-ping" bgColor={"#00a884"}  color={'#FFFFFF'} size={200} />
    </LoaderSite>;
};

export default LoaderPage;

const LoaderSite = styled.div`
height:100vh;
display:flex;
justify-content:center;
`;