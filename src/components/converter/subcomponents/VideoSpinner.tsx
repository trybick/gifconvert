import { Flex, Spinner, Text } from '@chakra-ui/react';

export default function VideoSpinner({
  isConverting,
  numFramesProcessed,
}: {
  isConverting: boolean;
  numFramesProcessed: number;
}) {
  const numFramesForDisplay = !numFramesProcessed
    ? 'Initializing'
    : `Frames processed: ${numFramesProcessed}`;

  return isConverting ? (
    <Flex alignItems="center" direction="column" mt="160px">
      <Spinner color="teal.500" label="converting" size="lg" textAlign="center" thickness="3px" />
      <Text fontSize="18px" mt="26px">
        {numFramesForDisplay}
      </Text>
    </Flex>
  ) : null;
}
