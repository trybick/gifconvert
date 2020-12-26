import { useRecoilState } from 'recoil';
import { Grid } from '@chakra-ui/react';
import HelpModal from './subcomponents/HelpModal';
import LowerQualityModeSwitch from './subcomponents/LowerQualityModeSwitch';
import { isDropActiveState } from '../../recoil/atoms';

export default function Header({
  handleLowerQualityModeChange,
  isConverting,
  isLowerQualityModeEnabled,
}: {
  handleLowerQualityModeChange: () => void;
  isConverting: boolean;
  isLowerQualityModeEnabled: boolean;
}) {
  const [isDropActive] = useRecoilState(isDropActiveState);

  return (
    <Grid
      align="space-between"
      templateColumns="1fr 1fr"
      width="100%"
      zIndex={isDropActive ? '0' : '11'}
    >
      <HelpModal isConverting={isConverting} />
      <LowerQualityModeSwitch
        handleLowerQualityModeChange={handleLowerQualityModeChange}
        isConverting={isConverting}
        isChecked={isLowerQualityModeEnabled}
      />
    </Grid>
  );
}
