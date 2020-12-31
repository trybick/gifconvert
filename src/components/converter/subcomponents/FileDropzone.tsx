import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { DropzoneState, useDropzone } from 'react-dropzone';
import { Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { isDropActiveState } from 'recoil/atoms';
import { isElectron } from 'utils/env';

export default function FileDropzone({
  isConverting,
  handleDropFileChange,
}: {
  isConverting: boolean;
  handleDropFileChange: (acceptedFiles: File[]) => void;
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isDropActive, setIsDropActive] = useRecoilState(isDropActiveState);
  const { getRootProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    accept: 'video/*',
    maxFiles: 1,
    multiple: false,
    onDrop: handleDropFileChange,
  });

  // While dropzone detects a drag, tell the rest of the app so it can update z-index values
  useEffect(() => {
    if (isDragActive) {
      setIsDropActive(true);
    } else {
      setIsDropActive(false);
    }
  }, [isDragActive]);

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
  top: 0px;
  left: 0px;
  z-index: 10;
  border-width: ${({ isDragActive }) => (isDragActive ? '2px' : '')};
  border-radius: 2px;
  border-color: ${(props) => getBorderColor(props)};
  border-style: dashed;
  background-color: ${({ isDragActive }) => (isDragActive ? '#fafafa' : 'transparent')};
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
  min-height: 480px;
  min-width: ${isElectron ? '512px' : '550px'};
  }
`;

const DropMessage = styled.div`
  position: absolute;
  left: ${isElectron ? '150px' : '175px'};
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
