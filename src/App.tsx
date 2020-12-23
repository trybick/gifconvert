import { useState, useEffect } from 'react';
import { createFFmpeg } from '@ffmpeg/ffmpeg';
import { Box } from '@chakra-ui/react';
import Converter from './components/converter/Converter';
import AppSpinner from './components/core/AppSpinner';

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
    <Box maxW="600px" overflow="hidden" padding="25px">
      <Converter ffmpeg={ffmpeg} />
    </Box>
  ) : (
    <AppSpinner />
  );
}

export default App;
