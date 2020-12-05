import { useState, useEffect } from 'react';
import { createFFmpeg } from '@ffmpeg/ffmpeg';
import { Box } from '@chakra-ui/react';
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
    <Box padding="50px">
      <Converter ffmpeg={ffmpeg} />
    </Box>
  ) : (
    <LoadingSpinner />
  );
}

export default App;
