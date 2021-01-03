import { StrictMode } from 'react';
import { RecoilRoot } from 'recoil';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { css, Global } from '@emotion/react';
import App from './App';

const globalStyles = css`
  ::-webkit-scrollbar {
    display: none;
  }
`;

const rendereredApp = (
  <StrictMode>
    <ChakraProvider>
      <Global styles={[globalStyles]} />
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </ChakraProvider>
  </StrictMode>
);

ReactDOM.render(rendereredApp, document.getElementById('root'));
