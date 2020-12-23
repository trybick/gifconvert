import { ChangeEvent } from 'react';
import { Box, Button } from '@chakra-ui/react';
import { PlusSquareIcon } from '@chakra-ui/icons';
import styled from '@emotion/styled';

export default function SelectFileButton({
  handleFileChange,
  isConverting,
}: {
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isConverting: boolean;
}) {
  return isConverting ? null : (
    <Box mt="14px">
      <FileInput id="input" type="file" onChange={handleFileChange} />
      <Button
        as="label"
        colorScheme="teal"
        cursor="pointer"
        htmlFor="input"
        leftIcon={<PlusSquareIcon />}
        size="lg"
        variant="outline"
      >
        Select file
      </Button>
    </Box>
  );
}

const FileInput = styled.input`
  height: 0.1px;
  opacity: 0;
  position: absolute;
  width: 0.1px;
`;
