import { Grid } from '@chakra-ui/react';
import HelpModal from './subcomponents/HelpModal';
import LowerQualityModeSwitch from './subcomponents/LowerQualityModeSwitch';

export default function Header({
  handleLowerQualityModeChange,
  isConverting,
  isLowerQualityModeEnabled,
}: {
  handleLowerQualityModeChange: () => void;
  isConverting: boolean;
  isLowerQualityModeEnabled: boolean;
}) {
  return (
    <Grid align="space-between" templateColumns="1fr 1fr" width="100%">
      <HelpModal isConverting={isConverting} />
      <LowerQualityModeSwitch
        handleLowerQualityModeChange={handleLowerQualityModeChange}
        isConverting={isConverting}
        isChecked={isLowerQualityModeEnabled}
      />
    </Grid>
  );
}
