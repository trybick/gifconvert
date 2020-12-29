import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { fetchFile, FFmpeg } from '@ffmpeg/ffmpeg';
import { Flex } from '@chakra-ui/react';
import { convertedSizeRegex, framesRegex } from 'utils/regex';
import { DownloadSection, FileDropzone, SelectFileButton, VideoSpinner } from './subcomponents';
import Header from 'components/header/Header';

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

  const handleDropFileChange = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file && file.type === 'video/quicktime') {
      setGif('');
      setVideo(file);
    }
  }, []);

  const handleSelectFileChange = (event: ChangeEvent<HTMLInputElement>) => {
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
      <FileDropzone handleDropFileChange={handleDropFileChange} isConverting={isConverting} />
      <SelectFileButton
        handleSelectFileChange={handleSelectFileChange}
        isConverting={isConverting}
      />
      <VideoSpinner isConverting={isConverting} numFramesProcessed={numFramesProcessed} />
      <DownloadSection convertedSize={convertedSize} gif={gif} />
    </Flex>
  );
}
