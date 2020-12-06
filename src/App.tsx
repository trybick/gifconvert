import { useState, useEffect } from 'react';
import { createFFmpeg } from '@ffmpeg/ffmpeg';
import { Box } from '@chakra-ui/react';
import { Global, css } from '@emotion/react';
import Converter from './components/Converter';
import LoadingSpinner from './components/LoadingSpinner';

const ffmpeg = createFFmpeg({ log: true });

function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loadConverter = async () => {
      await ffmpeg.load();
      setIsReady(true);
    };

    loadConverter();
  }, []);

  return isReady ? (
    <Box maxW="600px" overflow="hidden" padding="50px">
      <Global
        styles={css`
          ::-webkit-scrollbar {
            display: none;
          }
        `}
      />
      <Converter ffmpeg={ffmpeg} />
    </Box>
  ) : (
    <LoadingSpinner />
  );
}

export default App;
