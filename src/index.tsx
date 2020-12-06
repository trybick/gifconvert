import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { Global, css } from '@emotion/react';
import App from './App';

ReactDOM.render(
  <StrictMode>
    <ChakraProvider>
      <Global
        styles={css`
          ::-webkit-scrollbar {
            display: none;
          }
        `}
      />
      <App />
    </ChakraProvider>
  </StrictMode>,
  document.getElementById('root')
);
