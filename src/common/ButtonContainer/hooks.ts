import { useContext } from 'react';

import ButtonContainerContext from './ButtonContainerContext';

export function useButtonContainer() {
  return useContext(ButtonContainerContext);
}
