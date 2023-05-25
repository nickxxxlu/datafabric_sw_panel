import { useContext } from 'react';

import OptionValueContext from './OptionValueContext';

export function useOptionValue() {
  return useContext(OptionValueContext);
}
