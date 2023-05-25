import { createButtonIcon } from '../common/ButtonIcon';
import {
  BtnDropdownFilterA,
  BtnDropdownFilterD,
  BtnDropdownFilterH,
  BtnDropdownFilterN,
} from '../images';

const BtnDropdownFilter = createButtonIcon(
  {
    normal: BtnDropdownFilterN,
    disabled: BtnDropdownFilterD,
    active: BtnDropdownFilterA,
    hover: BtnDropdownFilterH,
  },
  {
    displayName: 'BtnDropdownFilter',
    defaultAlt: 'filter',
  },
);

export default BtnDropdownFilter;
