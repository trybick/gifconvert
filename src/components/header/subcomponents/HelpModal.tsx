import {
  Box,
  Button,
  Link,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  UnorderedList,
  useDisclosure,
} from '@chakra-ui/react';
import { ExternalLinkIcon, InfoOutlineIcon } from '@chakra-ui/icons';

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
          <ModalHeader>How to Use</ModalHeader>
          <ModalCloseButton outline="none" />

          <ModalBody>
            <UnorderedList>
              <ListItem>Click 'Select File' or drop a file anywhere in the window </ListItem>
              <ListItem>The conversion to GIF will begin automatically </ListItem>
              <ListItem>Click 'Download GIF' and choose where to save it</ListItem>
              <ListItem>Repeat!</ListItem>
            </UnorderedList>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={onClose}>
              Close
            </Button>
            <Link href="https://github.com/trybick/gif-tray" isExternal>
              <Button variant="ghost">
                More info <ExternalLinkIcon mx="2px" />
              </Button>
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
