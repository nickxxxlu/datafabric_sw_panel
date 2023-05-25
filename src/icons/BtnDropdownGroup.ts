import { createButtonIcon } from '../common/ButtonIcon';
import {
  BtnDropdownGroupA,
  BtnDropdownGroupD,
  BtnDropdownGroupH,
  BtnDropdownGroupN,
} from '../images';

const BtnDropdownGroup = createButtonIcon(
  {
    normal: BtnDropdownGroupN,
    disabled: BtnDropdownGroupD,
    active: BtnDropdownGroupA,
    hover: BtnDropdownGroupH,
  },
  {
    displayName: 'BtnDropdownGroup',
    defaultAlt: 'group',
  },
);

export default BtnDropdownGroup;
