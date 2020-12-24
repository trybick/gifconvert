import { Box, Button, Flex, Image, Link, Text } from '@chakra-ui/react';
import { DownloadIcon } from '@chakra-ui/icons';

export default function DownloadButton({ totalSize, gif }: { totalSize: string; gif: string }) {
  const getTotalSizeForDisplay = () => {
    const sizeInMB = (+totalSize / 1000).toFixed(2);
    return `${sizeInMB} MB`;
  };

  return gif ? (
    <Box mt="55px">
      <Image borderRadius="4px" height="200px" src={gif} />
      <Flex alignItems="center" direction="column" justifyContent="center" mt="12px">
        <Text fontSize="14px" fontWeight="500" mt="0px">
          Size: {getTotalSizeForDisplay()}
        </Text>
        <Link href={gif} mt="12px" textDecor="none" _hover={{ textDecoration: 'none' }} download>
          <Button colorScheme="teal" leftIcon={<DownloadIcon />} size="lg">
            Download GIF
          </Button>
        </Link>
      </Flex>
    </Box>
  ) : null;
}
