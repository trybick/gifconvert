import { useState, useEffect } from 'react';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

const ffmpeg = createFFmpeg({ log: true });

function App() {
  const [isReady, setIsReady] = useState(false);
  const [video, setVideo] = useState<string | File>('');
  const [gif, setGif] = useState('');

  const loadConverter = async () => {
    await ffmpeg.load();
    setIsReady(true);
  };

  useEffect(() => {
    loadConverter();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0);
    file && setVideo(file);
  };

  const convertToGif = async () => {
    ffmpeg.FS('writeFile', 'test.mp4', await fetchFile(video));
    await ffmpeg.run('-i', 'test.mp4', '-t', '2.5', '-ss', '2.0', '-f', 'gif', 'out.gif');
    const data = ffmpeg.FS('readFile', 'out.gif');
    const url = URL.createObjectURL(new Blob([data.buffer], { type: 'image/gif' }));
    setGif(url);
  };

  return isReady ? (
    <div className="App">
      {video && <video controls width="250" src={URL.createObjectURL(video)}></video>}

      <input type="file" onChange={handleFileChange} />

      <h3>Result</h3>

      <button onClick={convertToGif}>Convert</button>

      {gif && <img src={gif} width="250" />}
    </div>
  ) : (
    <p>Loading...</p>
  );
}

export default App;
