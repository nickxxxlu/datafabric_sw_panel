import React, { ReactNode, useCallback, useState, useMemo } from 'react';
import TemplateValueContext, { ITemplateValueContext } from './TemplateValueContext';
// import { useOptionValue } from '../OptionValue';
import { IEnableVars } from '../constants';
import isEqual from 'lodash/isEqual';

interface TemplateValueProps {
  children: ReactNode;
  dashboard?: any;
}

function TemplateValueProvider(props: TemplateValueProps) {
  const { children } = props;
  const [enableVars, setEnableVars] = useState<IEnableVars>();

  // const {} = useOptionValue();

  const updateEnableVars = useCallback((obj?: IEnableVars, force?: boolean)=>{
    if(obj && isEqual(obj, enableVars)) return;
    // const obj = {DatasetIDEnable: true};
    console.log(obj, enableVars);
    setEnableVars(pre=>{
      if(pre){
        return({
          ...pre,
          ...obj
        })
      }else{
        return obj
      }
    })

  },[])

  const contextValue = useMemo<ITemplateValueContext>(
    () => ({
      enableVars,
      updateEnableVars
    }),
    [
      enableVars,
      updateEnableVars
    ],
  );

  return (
    <TemplateValueContext.Provider value={contextValue}>
      {children}
    </TemplateValueContext.Provider>
  );
}

export default TemplateValueProvider;
