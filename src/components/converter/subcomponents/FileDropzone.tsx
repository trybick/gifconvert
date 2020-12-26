import { DropzoneState, useDropzone } from 'react-dropzone';
import { Text } from '@chakra-ui/react';
import styled from '@emotion/styled';

export default function FileDropzone({
  isConverting,
  handleDropFileChange,
}: {
  isConverting: boolean;
  handleDropFileChange: (acceptedFiles: File[]) => void;
}) {
  const { getRootProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    accept: 'video/*',
    maxFiles: 1,
    multiple: false,
    onDrop: handleDropFileChange,
  });

  return isConverting ? null : (
    <DropzoneContainer {...getRootProps({ isDragActive, isDragAccept, isDragReject })}>
      {isDragActive && (
        <DropMessage>
          <Text fontSize="30px">Drop to upload</Text>
        </DropMessage>
      )}
    </DropzoneContainer>
  );
}

const DropzoneContainer = styled.div<any>`
  position: absolute;
  min-height: 495px;
  min-width: 523px;
  top: 20px;
  left: 20px;
  z-index: 10;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${(props) => getBorderColor(props)};
  border-style: dashed;
  background-color: ${({ isDragActive }) => (isDragActive ? '#fafafa' : 'transparent')};
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

const DropMessage = styled.div`
  position: absolute;
  left: 150px;
  top: 200px;
`;

const getBorderColor = ({ isDragAccept, isDragReject, isDragActive }: DropzoneState) => {
  if (isDragAccept) {
    return '#00e676';
  }
  if (isDragReject) {
    return '#ff1744';
  }
  if (isDragActive) {
    return '#2196f3';
  }
  return '#ffffff';
};
