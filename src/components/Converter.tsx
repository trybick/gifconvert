import { ChangeEvent, useState } from 'react';
import { fetchFile, FFmpeg } from '@ffmpeg/ffmpeg';
import { Box, Button, Flex, Heading, Image, Link, Spinner, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { framesRegex } from '../constants/strings';

const FileInput = styled.input`
  opacity: 0;
  width: 0.1px;
  height: 0.1px;
  position: absolute;
`;

const FileLabel = styled.label`
  display: block;
  position: relative;
  width: 200px;
  height: 50px;
  border-radius: 25px;
  background: linear-gradient(40deg, #ff6ec4, #7873f5);
  box-shadow: 0 4px 7px rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s ease-out;
`;

export default function Converter({ ffmpeg }: { ffmpeg: FFmpeg }) {
  const [video, setVideo] = useState<string | File>('');
  const [gif, setGif] = useState('');
  const [isConverting, setIsConverting] = useState(false);
  const [numFramesProcessed, setNumFramesProcessed] = useState(0);
  const videoUrl = video && URL.createObjectURL(video);
  const numFramesForDisplay = !numFramesProcessed
    ? 'Initializing'
    : `Frames processed: ${numFramesProcessed}`;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVideo('');
    setGif('');
    const file = e.target.files?.item(0);
    file && setVideo(file);
  };

  const convertToGif = async () => {
    setIsConverting(true);
    ffmpeg.setLogger(({ message }) => {
      const framesData = message.match(framesRegex);
      const numFrames = framesData && +framesData[0].trim();
      if (numFrames !== null) {
        setNumFramesProcessed(numFrames);
      }
    });
    ffmpeg.FS('writeFile', 'in.mov', await fetchFile(video));
    await ffmpeg.run('-i', 'in.mov', '-t', '2.5', '-ss', '2.0', '-f', 'gif', 'out.gif');
    const data = ffmpeg.FS('readFile', 'out.gif');
    const url = URL.createObjectURL(new Blob([data.buffer], { type: 'image/gif' }));
    setGif(url);
    setVideo('');
    setIsConverting(false);
  };

  return (
    <Flex alignItems="center" direction="column">
      <Box minH="170px">
        {video && !isConverting && (
          <Box>
            <Heading as="h4" fontSize="1.4em" mb="10px">
              Input
            </Heading>
            <video src={videoUrl} width="300" controls></video>
          </Box>
        )}
      </Box>

      <Box mt="25px">
        <FileInput id="input" type="file" onChange={handleFileChange} />
        <FileLabel htmlFor="input">Select file</FileLabel>
      </Box>

      {video && (
        <Box mt="25px">
          <Button isDisabled={isConverting} onClick={convertToGif}>
            Convert
          </Button>
        </Box>
      )}

      {isConverting && (
        <Flex alignItems="center" direction="column" mt="15px">
          <Text>{numFramesForDisplay}</Text>
          <Spinner label="converting" mt="20px" size="xl" textAlign="center" thickness="3px" />
        </Flex>
      )}

      {gif && (
        <Box mt="55px">
          <Image src={gif} width="500" />
          <Flex alignItems="center" justifyContent="center" mt="20px">
            <Link href={gif} download>
              <Button>Download GIF</Button>
            </Link>
          </Flex>
        </Box>
      )}
    </Flex>
  );
}
