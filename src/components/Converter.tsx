import { ChangeEvent, useState } from 'react';
import { fetchFile, FFmpeg } from '@ffmpeg/ffmpeg';
import { Box, Button, Flex, Heading, Image } from '@chakra-ui/react';

export default function Converter({ ffmpeg }: { ffmpeg: FFmpeg }) {
  const [video, setVideo] = useState<string | File>('');
  const [gif, setGif] = useState('');
  const videoUrl = video && URL.createObjectURL(video);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0);
    file && setVideo(file);
  };

  const convertToGif = async () => {
    ffmpeg.FS('writeFile', 'in.mp4', await fetchFile(video));
    await ffmpeg.run('-i', 'in.mp4', '-t', '2.5', '-ss', '2.0', '-f', 'gif', 'out.gif');
    const data = ffmpeg.FS('readFile', 'out.gif');
    const url = URL.createObjectURL(new Blob([data.buffer], { type: 'image/gif' }));
    setGif(url);
  };

  return (
    <Flex alignItems="center" direction="column">
      <Box minH="170px">
        {video && (
          <Box>
            <video controls width="300" src={videoUrl}></video>
          </Box>
        )}
      </Box>

      <Box mt="25px">
        <input type="file" onChange={handleFileChange} />
      </Box>

      {video && (
        <Box mt="25px">
          <Button onClick={convertToGif}>Convert</Button>
        </Box>
      )}

      {gif && (
        <Box mt="35px">
          <Heading as="h4" fontSize="1.4em">
            Result
          </Heading>
          <Image mt="8px" src={gif} width="500" />
        </Box>
      )}
    </Flex>
  );
}
