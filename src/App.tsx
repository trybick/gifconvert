import { useState, useEffect } from 'react';
import { createFFmpeg } from '@ffmpeg/ffmpeg';
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

  return isReady ? <Converter ffmpeg={ffmpeg} /> : <LoadingSpinner />;
}

export default App;
