import { useContext } from 'react';

import DataSourceApiContext from './DataSourceApiContext';

export function useDataSourceApi() {
  return useContext(DataSourceApiContext);
}
