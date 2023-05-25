import React from 'react';

export interface ILangContext {
  lang?: string;
}

const LangContext = React.createContext<ILangContext>({
  lang: void 0,
});

export default LangContext;
