import { ChangeEvent, useState } from 'react';
import { fetchFile, FFmpeg } from '@ffmpeg/ffmpeg';
import { Box, Button, Flex, Heading, Image, Link, Spinner, Text } from '@chakra-ui/react';
import { DownloadIcon, PlusSquareIcon } from '@chakra-ui/icons';
import styled from '@emotion/styled';
import { framesRegex, totalSizeRegex } from '../constants/strings';

export default function Converter({ ffmpeg }: { ffmpeg: FFmpeg }) {
  const [video, setVideo] = useState<string | File>('');
  const [gif, setGif] = useState('');
  const [isConverting, setIsConverting] = useState(false);
  const [numFramesProcessed, setNumFramesProcessed] = useState(0);
  const [totalSize, setTotalSize] = useState('');
  const videoUrl = video && URL.createObjectURL(video);
  const numFramesForDisplay = !numFramesProcessed
    ? 'Initializing'
    : `Frames processed: ${numFramesProcessed}`;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setGif('');
    const file = e.target.files?.item(0);
    file && setVideo(file);
  };

  const handleLogs = ({ message }: { message: string }) => {
    // Frames
    const framesData = message.match(framesRegex);
    const numFrames = framesData && +framesData[0].trim();
    if (numFrames !== null) {
      setNumFramesProcessed(numFrames);
    }
    // Size
    const totalSizeData = message.match(totalSizeRegex);
    const totalSize = totalSizeData && totalSizeData[0].trim();
    if (totalSize !== null) {
      totalSize && setTotalSize(totalSize);
    }
  };

  const convertToGif = async () => {
    setIsConverting(true);
    ffmpeg.setLogger(handleLogs);
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
      <Box minH="210px">
        {video && !isConverting && (
          <Box>
            <Heading as="h4" fontSize="1.2em" mb="10px">
              Input
            </Heading>
            <video src={videoUrl} style={{ height: 180 }}></video>
          </Box>
        )}
      </Box>

      {!isConverting && (
        <Box mt="14px">
          <FileInput id="input" type="file" onChange={handleFileChange} />
          <Button
            as="label"
            colorScheme="teal"
            cursor="pointer"
            htmlFor="input"
            leftIcon={<PlusSquareIcon />}
            size="lg"
            variant="outline"
          >
            Select file
          </Button>
        </Box>
      )}

      {video && !isConverting && (
        <Box mt="30px">
          <Button colorScheme="teal" isDisabled={isConverting} onClick={convertToGif} size="lg">
            Convert
          </Button>
        </Box>
      )}

      {isConverting && (
        <Flex alignItems="center" direction="column" mt="70px">
          <Spinner
            color="teal.500"
            label="converting"
            size="lg"
            textAlign="center"
            thickness="3px"
          />
          <Text fontSize="18px" mt="26px">
            {numFramesForDisplay}
          </Text>
        </Flex>
      )}

      {gif && (
        <Box mt="55px">
          <Image src={gif} height="200px" />
          <Flex alignItems="center" direction="column" justifyContent="center" mt="12px">
            <Text fontSize="14px" fontWeight="500" mt="0px">
              Size: {totalSize}
            </Text>
            <Link href={gif} mt="12px" download>
              <Button colorScheme="teal" leftIcon={<DownloadIcon />} size="lg">
                Download GIF
              </Button>
            </Link>
          </Flex>
        </Box>
      )}
    </Flex>
  );
}

const FileInput = styled.input`
  height: 0.1px;
  opacity: 0;
  position: absolute;
  width: 0.1px;
`;
