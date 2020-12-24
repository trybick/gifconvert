import { FormControl, FormLabel, Switch, Tooltip } from '@chakra-ui/react';

export default function LargeFileModeSwitch({
  handleLargeFileModeChange,
  isChecked,
  isConverting,
}: {
  handleLargeFileModeChange: () => void;
  isChecked: boolean;
  isConverting: boolean;
}) {
  return isConverting ? null : (
    <FormControl alignItems="center" display="flex" justifyContent="flex-end" mb="25px">
      <Tooltip
        bg="#2C7A7B"
        label="Useful to reduce file size"
        maxW="130px"
        openDelay={300}
        textAlign="center"
        variant="outline"
        hasArrow
      >
        <FormLabel cursor="pointer" fontSize="15px" htmlFor="large-file-mode-switch" m="0 6px 0">
          Large file mode
        </FormLabel>
      </Tooltip>
      <Switch
        colorScheme="green"
        id="large-file-mode-switch"
        isChecked={isChecked}
        onChange={handleLargeFileModeChange}
        size="md"
      />
    </FormControl>
  );
}
