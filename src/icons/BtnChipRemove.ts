import { createButtonIcon } from '../common/ButtonIcon';
import {
  BtnChipRemoveA,
  BtnChipRemoveD,
  BtnChipRemoveH,
  BtnChipRemoveN,
} from '../images';

const BtnChipRemove = createButtonIcon(
  {
    normal: BtnChipRemoveN,
    disabled: BtnChipRemoveD,
    active: BtnChipRemoveA,
    hover: BtnChipRemoveH,
  },
  {
    displayName: 'BtnChipRemove',
    defaultAlt: 'chip',
  },
);

export default BtnChipRemove;
