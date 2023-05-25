import { IEnableVars } from '../constants';
import React from 'react';

export interface ITemplateValueContext {
  enableVars?: IEnableVars,
  updateEnableVars: (obj: IEnableVars, force?: boolean)=>void
}

const TemplateValueContext = React.createContext<ITemplateValueContext>({
  enableVars: {},
  get updateEnableVars(): (obj: IEnableVars, force?: boolean) => void {
    throw new Error('You probably forgot to put <TemplateValueProvider>.');
  },
});

export default TemplateValueContext;