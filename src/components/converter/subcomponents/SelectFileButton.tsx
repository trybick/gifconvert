import { useDropzone } from 'react-dropzone';
import styled from '@emotion/styled';

export default function SelectFileButton({
  isConverting,
  onDrop,
}: {
  isConverting: boolean;
  onDrop: (acceptedFiles: File[]) => void;
}) {
  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    accept: 'video/*',
    maxFiles: 1,
    multiple: false,
    onDrop,
  });

  return isConverting ? null : (
    <DropzoneContainer {...getRootProps({ isDragActive, isDragAccept, isDragReject })}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select file</p>
    </DropzoneContainer>
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
  return '#eeeeee';
};

const DropzoneContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${(props) => getBorderColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
  cursor: pointer;
  margin-top: 14px;
`;
