import { getDataSourceSrv } from '@grafana/runtime';
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useLang } from '../Lang';
import DataSourceApiContext, {
  IDataSourceApiContext,
  LabelValue,
  MetricValue,
} from './DataSourceApiContext';

import { DATA_SOURCE_ID, IRenderInfo, IQueryBody } from '../constants';

// 目前寫死特定data source id
// const DATA_SOURCE_ID = 'advantech-ifp-datasource';

interface DataSourceApiProps {
  children: ReactNode;
}

// TODO: find a way to display DataSourceApi error to the front
function DataSourceApiProvider({ children }: DataSourceApiProps) {
  const { lang } = useLang();

  const [dataSourceApi, setDataSourceApi] = useState<any>();
  const [dataSourceLoaded, setDataSourceLoaded] = useState<any>();
  // const loaded = !!(dataSourceApi && dataSourceApi.templateSrv);
  // console.log(`DataSourceApiProvider: `, dataSourceApi, dataSourceApi?.templateSrv? dataSourceApi.templateSrv: 'No')

  // const mapToLabelValue = (res: any): LabelValue[]=> {
  //   return res.map((d: any) => {
  //     if (d && (d.text || d.text==0) && (d.value || d.value==0)) {
  //       return { label: d.text, value: d.value };
  //     } else{
  //       return { label: d, value: d };
  //     }
  //   });
  // }

  const getDataSourceApi = useCallback(async () => {
    const dataSourceSrv: any = getDataSourceSrv();

    // Search all dataSources in the dashboard dataSource plugins
    if (dataSourceSrv.datasources) {
      for (const name of Object.keys(dataSourceSrv.datasources)) {
        if (dataSourceSrv.datasources[name]?.meta?.id === DATA_SOURCE_ID) {
          return dataSourceSrv.get(name);
        }
      }
    }
    return;
  }, []);

  // const mapToLabelValue = useCallback<
  //   (data: any) => Promise<MetricValue[]>
  // >(
  //   async (data: any) => {
  //     if (!dataSourceApi?.mapToLabelValue) {
  //       return [];
  //     }

  //     try {
  //       // console.log(path, lang, body)
  //       // console.log(dataSourceApi.getGroupItems)
  //       return await dataSourceApi.mapToLabelValue(data);
  //     } catch (err) {
  //       console.error(err);
  //     }

  //     return [];
  //   },
  //   [dataSourceApi],
  // );


  const getGroupItems = useCallback<
    (path: string, body: IQueryBody, lang?: string) => Promise<LabelValue[]>
  >(
    async (path: string, body: IQueryBody, lang?: string) => {
      if (!dataSourceApi?.getGroupItems) {
        return [];
      }

      try {
        // console.log(path, lang, body)
        // console.log(dataSourceApi.getGroupItems)
        // console.log('get', await dataSourceApi.getGroupItems(path, body, lang))
        return await dataSourceApi.getGroupItems(path, body, lang);
      } catch (err) {
        console.error(err);
      }

      return [];
    },
    [dataSourceApi],
  );

  const getNextLayerInfo = useCallback<
    (path: string, body?: IQueryBody, lang?: string) => Promise<IRenderInfo[]>
  >(
    async (path: string, body?: IQueryBody, lang?: string) => {
      if (!dataSourceApi?.getNextLayerInfo || !dataSourceApi?.getRoots) {
        return [];
      }
      try {
        if(path === 'init'){
          return await dataSourceApi.getRoots();
        }else{
          return await dataSourceApi.getNextLayerInfo(path, body, lang);
        }
      } catch (err) {
        console.error(err);
      }

      return [];
    },
    [dataSourceApi],
  );

  const deleteUselessVar = useCallback<
    (targetObj: IQueryBody, notForGrafanaQuery?: boolean) => Promise<IQueryBody>
  >(
    async (targetObj: IQueryBody, notForGrafanaQuery?: boolean) => {
      if (!dataSourceApi?.deleteUselessVar) {
        return {};
      }

      try {
        return await dataSourceApi.deleteUselessVar(targetObj, notForGrafanaQuery);
      } catch (err) {
        console.error(err);
        return {};
      }
    },
    [dataSourceApi],
  );


  const getAlarmLevels = useCallback<() => Promise<LabelValue[]>>(async () => {
    if (!dataSourceApi?.metricFindQuery) {
      return [];
    }

    try {
      const list: MetricValue[] = await dataSourceApi.metricFindQuery({
        searchType: 'alarmLevel',
        lang,
      });
      return list.map(({ text: label, value }) => ({ label, value }));
    } catch (err) {
      console.error(err);
    }

    return [];
  }, [dataSourceApi, lang]);


  useEffect(() => {
    const init = async () => {
      const dataSourceApi = await getDataSourceApi();
      if (!dataSourceApi || !dataSourceApi.templateSrv) {
        // 有時候 dataSourceApi.templateSrv 沒有初始那麼快，等到它好再繼續
        setTimeout(() => {
          init();
        }, 1000);
        return;
      } else {
        setDataSourceApi(dataSourceApi);
      }
    };

    init();
  }, [getDataSourceApi]);

  useEffect(() => {
    setDataSourceLoaded(!!(dataSourceApi && dataSourceApi.templateSrv));
    if(dataSourceApi){
      console.log('dataSourceApi is Ready')
    }
  }, [dataSourceApi])

  const contextValue = useMemo<IDataSourceApiContext>(
    () => ({
      dataSourceApi,
      getAlarmLevels,
      getGroupItems,
      getNextLayerInfo,
      deleteUselessVar,
      // getRoots,
      dataSourceLoaded,
    }),
    [
      dataSourceApi,
      getAlarmLevels,
      getGroupItems,
      getNextLayerInfo,
      deleteUselessVar,
      // getRoots,
      dataSourceLoaded,
    ],
  );

  return (
    <DataSourceApiContext.Provider value={contextValue}>
      {dataSourceLoaded && children}
    </DataSourceApiContext.Provider>
  );
}

export default DataSourceApiProvider;
