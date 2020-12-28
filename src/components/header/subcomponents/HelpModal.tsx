import {
  Box,
  Button,
  Heading,
  Link,
  ListItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
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

            <Box mt="18px" textAlign="right">
              <Link href="https://github.com/trybick/gif-tray" isExternal>
                More info <ExternalLinkIcon mx="2px" />
              </Link>
            </Box>
          </ModalBody>
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
