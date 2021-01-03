import { Flex, Spinner } from '@chakra-ui/react';
import { isElectron } from 'utils/env';

export default function LoadingSpinner() {
  return (
    <Flex
      alignItems="center"
      color="teal.500"
      flexDirection="column"
      justifyContent="center"
      minH="100vh"
      textAlign="center"
    >
      <Spinner color={isElectron ? 'teal' : 'white'} label="loading" size="xl" thickness="3px" />
    </Flex>
  );
}
