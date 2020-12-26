import { Box } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';

export default function SelectFileButton({
  isConverting,
  onDrop,
}: {
  isConverting: boolean;
  onDrop: any;
}) {
  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop,
  });

  return isConverting ? null : (
    <Box mt="14px">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
    </Box>
  );
}
