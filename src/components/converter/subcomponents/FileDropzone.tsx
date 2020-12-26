import { useDropzone } from 'react-dropzone';
import styled from '@emotion/styled';

export default function FileDropzone({
  isConverting,
  onDrop,
}: {
  isConverting: boolean;
  onDrop: (acceptedFiles: File[]) => void;
}) {
  const { getRootProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    accept: 'video/*',
    maxFiles: 1,
    multiple: false,
    onDrop,
  });

  return isConverting ? null : (
    <DropzoneContainer
      {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
      {...(isDragActive ? 'Drag and drop here' : '')}
    ></DropzoneContainer>
  );
}

const getBorderColor = ({ isDragAccept, isDragReject, isDragActive }: any) => {
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

const DropzoneContainer = styled.div<any>`
  position: absolute;
  min-height: 630px;
  min-width: 622px;
  top: 20px;
  left: 20px;
  z-index: -10;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${(props) => getBorderColor(props)};
  border-style: dashed;
  background-color: #ffffff;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;

  ${({ isDragActive }) =>
    isDragActive &&
    `
    z-index: 10;
    background-color: #fafafa;
`}
`;
