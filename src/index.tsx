import { StrictMode } from 'react';
import { RecoilRoot } from 'recoil';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { css, Global } from '@emotion/react';
import App from './App';
import { isElectron } from 'utils/env';

const globalStyles = css`
  ::-webkit-scrollbar {
    display: none;
  }
`;

const browserStyles =
  !isElectron &&
  css`
    body {
      background-color: #8b94a3;
    }
  `;

const rendereredApp = (
  <StrictMode>
    <ChakraProvider>
      <Global styles={[globalStyles, browserStyles]} />
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </ChakraProvider>
  </StrictMode>
);

ReactDOM.render(rendereredApp, document.getElementById('root'));
