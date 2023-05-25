import React, { ReactNode, useMemo } from 'react';

import LangContext, { ILangContext } from './LangContext';

interface LangProps {
  children: ReactNode;
  lang?: string;
}

function LangProvider(props: LangProps) {
  const { children, lang: langProp } = props;

  const lang = useMemo<string | undefined>(() => {
    if (langProp) {
      return langProp;
    }

    const { searchParams } = new URL(window.location.href);
    const lang = searchParams.get('language') ?? searchParams.get('lang');
    return lang ?? void 0;
  }, [langProp]);

  const contextValue = useMemo<ILangContext>(
    () => ({
      lang,
    }),
    [lang],
  );

  return (
    <LangContext.Provider value={contextValue}>{children}</LangContext.Provider>
  );
}

export default LangProvider;
