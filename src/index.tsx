import { StrictMode } from 'react';
import { RecoilRoot } from 'recoil';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { Global, css } from '@emotion/react';
import App from './App';

const globalStyles = css`
  ::-webkit-scrollbar {
    display: none;
  }
`;

ReactDOM.render(
  <StrictMode>
    <ChakraProvider>
      <Global styles={globalStyles} />
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </ChakraProvider>
  </StrictMode>,
  document.getElementById('root')
);
