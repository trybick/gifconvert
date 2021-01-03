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

  return (
    <FullPageBackground>
      {isLoaded ? (
        <ConverterWrapper>
          <Converter ffmpeg={ffmpeg} />
        </ConverterWrapper>
      ) : (
        <AppSpinner />
      )}
    </FullPageBackground>
  );
}

export default App;

const FullPageBackground = styled(Box)`
  ${!isElectron &&
  `
  background: linear-gradient(0deg, rgba(34, 193, 195, 1) 0%, rgba(253, 187, 45, 1) 100%);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
`}
`;

const ConverterWrapper = styled(Box)`
  margin: 0 auto;
  max-width: 600px;
  overflow: hidden;
  padding: 25px;
  ${!isElectron &&
  `
    background-color: white;
    border: 2px solid grey;
    border-radius: 34px;
    margin-top: 25px;
    width: 600px;
`}
`;
