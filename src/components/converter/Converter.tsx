import { ChangeEvent, useEffect, useState } from 'react';
import { fetchFile, FFmpeg } from '@ffmpeg/ffmpeg';
import { Flex } from '@chakra-ui/react';
import { framesRegex, totalSizeRegex } from '../../utils/regex';
import {
  DownloadButton,
  LargeFileModeSwitch,
  SelectFileButton,
  VideoSpinner,
} from './subcomponents';

export default function Converter({ ffmpeg }: { ffmpeg: FFmpeg }) {
  const [video, setVideo] = useState<string | File>('');
  const [gif, setGif] = useState('');
  const [isConverting, setIsConverting] = useState(false);
  const [numFramesProcessed, setNumFramesProcessed] = useState(0);
  const [totalSize, setTotalSize] = useState('');
  const [isLargeFileModeEnabled, setIsLargeFileModeEnabled] = useState(false);

  useEffect(() => {
    video && convertToGif();
  }, [video]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setGif('');
    const file = event.target.files?.item(0);
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
      <LargeFileModeSwitch
        handleLargeFileModeChange={handleLargeFileModeChange}
        isConverting={isConverting}
      />
      <SelectFileButton handleFileChange={handleFileChange} isConverting={isConverting} />
      <VideoSpinner isConverting={isConverting} numFramesProcessed={numFramesProcessed} />
      <DownloadButton getTotalSizeForDisplay={getTotalSizeForDisplay} gif={gif} />
    </Flex>
  );
}
