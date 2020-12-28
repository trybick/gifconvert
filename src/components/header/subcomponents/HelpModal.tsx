import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons';

export default function SelectFileButton({ isConverting }: { isConverting: boolean }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return isConverting ? null : (
    <Box>
      <Box as="button" outline="none">
        <InfoOutlineIcon boxSize="20px" color="#757575" onClick={onOpen} />
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tray Gif</ModalHeader>
          <ModalCloseButton outline="none" />
          <ModalBody>Hello here is some text</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
