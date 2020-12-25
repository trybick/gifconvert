import { ChangeEvent, useEffect, useState } from 'react';
import { fetchFile, FFmpeg } from '@ffmpeg/ffmpeg';
import { Flex } from '@chakra-ui/react';
import { framesRegex, convertedSizeRegex } from '../../utils/regex';
import { DownloadButton, SelectFileButton, VideoSpinner } from './subcomponents';
import Header from '../header/Header';

export default function Converter({ ffmpeg }: { ffmpeg: FFmpeg }) {
  const [video, setVideo] = useState<string | File>('');
  const [gif, setGif] = useState('');
  const [isConverting, setIsConverting] = useState(false);
  const [numFramesProcessed, setNumFramesProcessed] = useState(0);
  const [convertedSize, setConvertedSize] = useState('');
  const [isLowerQualityModeEnabled, setIsLowerQualityModeEnabled] = useState(false);

  useEffect(() => {
    video && convertToGif();
  }, [video]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setGif('');
    const file = event.target.files?.item(0);
    file && setVideo(file);
  };

  const handleLowerQualityModeChange = () => {
    setIsLowerQualityModeEnabled(!isLowerQualityModeEnabled);
  };

  const handleLogs = ({ message }: { message: string }) => {
    const framesMatch = message.match(framesRegex);
    const numFrames = framesMatch && +framesMatch[0].trim();
    if (numFrames !== null) {
      setNumFramesProcessed(numFrames);
    }
    const convertedSizeMatch = message.match(convertedSizeRegex);
    const convertedSize = convertedSizeMatch && convertedSizeMatch[0].trim();
    if (convertedSize !== null) {
      convertedSize && setConvertedSize(convertedSize);
    }
  };

  const getVideoOptions = () => {
    const normalOptions = 'fps=15';
    const lowerQualityOptions = 'fps=12,scale=800:-1:flags=lanczos';
    return [
      '-i',
      'in.mov',
      '-vf',
      `${isLowerQualityModeEnabled ? lowerQualityOptions : normalOptions}`,
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

  return (
    <Flex alignItems="center" direction="column">
      <Header
        handleLowerQualityModeChange={handleLowerQualityModeChange}
        isConverting={isConverting}
        isLowerQualityModeEnabled={isLowerQualityModeEnabled}
      />
      <SelectFileButton handleFileChange={handleFileChange} isConverting={isConverting} />
      <VideoSpinner isConverting={isConverting} numFramesProcessed={numFramesProcessed} />
      <DownloadButton gif={gif} convertedSize={convertedSize} />
    </Flex>
  );
}
