import { useEffect, useState } from 'react';
import { createFFmpeg } from '@ffmpeg/ffmpeg';
import { Box } from '@chakra-ui/react';
import styled from '@emotion/styled';
import Converter from 'components/converter/Converter';
import AppSpinner from 'components/core/AppSpinner';
import { isElectron } from 'utils/env';

const ffmpeg = createFFmpeg({ log: true });

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadConverter = async () => {
      await ffmpeg.load();
      setIsLoaded(true);
    };
    loadConverter();
  }, []);

  return isLoaded ? (
    <AppWrapper>
      <Converter ffmpeg={ffmpeg} />
    </AppWrapper>
  ) : (
    <AppSpinner />
  );
}

export default App;

const AppWrapper = styled(Box)`
  margin: 0 auto;
  max-width: 600px;
  overflow: hidden;
  padding: 25px;
  ${!isElectron &&
  `
    background-color: white;
    border: 2px solid grey;
    border-radius: 34px;
`}
`;
