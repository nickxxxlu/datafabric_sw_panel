import { useContext } from 'react';

import TemplateValueContext from './TemplateValueContext';

export function useTemplateValue() {
  return useContext(TemplateValueContext);
}
