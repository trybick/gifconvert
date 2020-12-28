import { ChangeEvent } from 'react';
import { useRecoilState } from 'recoil';
import { Box, Button } from '@chakra-ui/react';
import { PlusSquareIcon } from '@chakra-ui/icons';
import styled from '@emotion/styled';
import { isDropActiveState } from 'recoil/atoms';

export default function SelectFileButton({
  handleSelectFileChange,
  isConverting,
}: {
  handleSelectFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  isConverting: boolean;
}) {
  const [isDropActive] = useRecoilState(isDropActiveState);

  return !isConverting ? (
    <Box mt="14px" zIndex={isDropActive ? '0' : '11'}>
      <FileInput id="input" type="file" onChange={handleSelectFileChange} />
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
  ) : null;
}

const FileInput = styled.input`
  height: 0.1px;
  opacity: 0;
  position: absolute;
  width: 0.1px;
`;
