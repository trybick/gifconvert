import { ChangeEvent, useState } from 'react';
import { fetchFile, FFmpeg } from '@ffmpeg/ffmpeg';
import { Box, Button, Flex, Heading, Image, Link, Spinner, Text } from '@chakra-ui/react';
import { framesRegex } from '../constants/strings';

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
    setIsConverting(false);
  };

  return (
    <Flex alignItems="center" direction="column">
      <Box minH="170px">
        {video && (
          <Box>
            <Heading as="h4" fontSize="1.4em" mb="10px">
              Input
            </Heading>
            <video src={videoUrl} width="300" controls></video>
          </Box>
        )}
      </Box>

      <Box mt="25px">
        <input type="file" onChange={handleFileChange} />
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
        <Box mt="35px">
          <Heading as="h4" fontSize="1.4em">
            Result
          </Heading>
          <Image mt="8px" src={gif} width="500" />
          <Flex alignItems="center" justifyContent="center" mt="30px">
            <Link href={gif} download>
              <Button>Download GIF</Button>
            </Link>
          </Flex>
        </Box>
      )}
    </Flex>
  );
}
