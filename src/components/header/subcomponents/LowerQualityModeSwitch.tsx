import { Box, FormControl, FormLabel, Switch, Tooltip } from '@chakra-ui/react';

export default function LowerQualityModeSwitch({
  handleLowerQualityModeChange,
  isChecked,
  isConverting,
}: {
  handleLowerQualityModeChange: () => void;
  isChecked: boolean;
  isConverting: boolean;
}) {
  return isConverting ? null : (
    <Box>
      <FormControl alignItems="center" display="flex" justifyContent="flex-end" mb="25px">
        <Tooltip
          bg="#2C7A7B"
          label="Enable to reduce file size for longer clips"
          maxW="160px"
          openDelay={300}
          textAlign="center"
          variant="outline"
          hasArrow
        >
          <FormLabel cursor="pointer" fontSize="15px" htmlFor="quality-switch" m="0 6px 0">
            Lower quality
          </FormLabel>
        </Tooltip>
        <Switch
          colorScheme="green"
          id="quality-switch"
          isChecked={isChecked}
          onChange={handleLowerQualityModeChange}
          size="md"
        />
      </FormControl>
    </Box>
  );
}
