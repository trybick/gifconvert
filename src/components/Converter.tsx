import { ChangeEvent, useEffect, useState } from 'react';
import { fetchFile, FFmpeg } from '@ffmpeg/ffmpeg';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Link,
  Spinner,
  Switch,
  Text,
} from '@chakra-ui/react';
import { DownloadIcon, PlusSquareIcon } from '@chakra-ui/icons';
import styled from '@emotion/styled';
import { framesRegex, totalSizeRegex } from '../constants/strings';

export default function Converter({ ffmpeg }: { ffmpeg: FFmpeg }) {
  const [video, setVideo] = useState<string | File>('');
  const [gif, setGif] = useState('');
  const [isConverting, setIsConverting] = useState(false);
  const [numFramesProcessed, setNumFramesProcessed] = useState(0);
  const [totalSize, setTotalSize] = useState('');
  const [isLargeFileModeEnabled, setIsLargeFileModeEnabled] = useState(false);
  const numFramesForDisplay = !numFramesProcessed
    ? 'Initializing'
    : `Frames processed: ${numFramesProcessed}`;

  useEffect(() => {
    video && convertToGif();
  }, [video]);

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

  const getVideoOptions = () => {
    const largeFileModeOptions = ',scale=2000:-1:flags=lanczos';
    return [
      '-i',
      'in.mov',
      '-vf',
      `fps=15${isLargeFileModeEnabled ? largeFileModeOptions : ''}`,
      '-f',
      'gif',
      'out.gif',
    ];
  };

  const convertToGif = async () => {
    setIsConverting(true);
    ffmpeg.setLogger(handleLogs);
    ffmpeg.FS('writeFile', 'in.mov', await fetchFile(video));
    await ffmpeg.run(...getVideoOptions());
    const gifRaw = ffmpeg.FS('readFile', 'out.gif');
    const gifUrl = URL.createObjectURL(new Blob([gifRaw.buffer], { type: 'image/gif' }));
    setGif(gifUrl);
    setVideo('');
    setIsConverting(false);
  };

  const handleLargeFileModeChange = () => {
    setIsLargeFileModeEnabled(!isLargeFileModeEnabled);
  };

  const getTotalSizeForDisplay = () => {
    const sizeInMB = (+totalSize / 1000).toFixed(2);
    return `${sizeInMB} MB`;
  };

  return (
    <Flex alignItems="center" direction="column">
      {!isConverting && (
        <FormControl alignItems="center" display="flex" justifyContent="flex-end" mb="25px">
          <FormLabel cursor="pointer" fontSize="15px" htmlFor="large-file-mode-switch" m="0 6px 0">
            Large file mode
          </FormLabel>
          <Switch id="large-file-mode-switch" onChange={handleLargeFileModeChange} size="md" />
        </FormControl>
      )}

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
              Size: {getTotalSizeForDisplay()}
            </Text>
            <Link
              href={gif}
              mt="12px"
              textDecor="none"
              _hover={{ textDecoration: 'none' }}
              download
            >
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
