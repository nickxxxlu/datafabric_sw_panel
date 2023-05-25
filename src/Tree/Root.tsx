import { getLocationSrv } from '@grafana/runtime';
// import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import React, { memo, useEffect, useMemo, useCallback, useState, useRef } from 'react';
import { useDataSourceApi, LabelValue } from '../DataSourceApi';
import { useLang } from '../Lang';
import NodePopover from '../Popover/NodePopover';
import { IRenderInfo, EIconType, IQueryBody, INextLayerInfo, INode, CNode, EBtnType, SUFFIX_FOR_F2E } from '../constants';
// import { useTemplateValue } from '../TemplateValue/hooks';

// const useStyles = makeStyles(
//   (theme: Theme) =>
//     createStyles({
//       root: {},
//       button: {
//         textTransform: 'none',
//         fontFamily: 'inherit',
//         whiteSpace: 'nowrap',
//       },
//       mainButton: {
//         padding: '4px 8px',
//         border: 'solid 2px #464646',
//         borderRadius: 0,
//         backgroundColor: '#1e1e1e',
//         height: '40px',
//         fontSize: '20px',
//         color: '#ffffff',
//         '&:hover': {
//           border: 'solid 2px #464646',
//           backgroundColor: '#1e1e1e',
//           color: '#ffffff',
//         },
//         '& .MuiButton-label': {
//           justifyContent: 'start',
//         },
//         '& .MuiButton-startIcon': {
//           marginLeft: 0,
//           marginRight: '4px',
//         },
//       },
//       title: {
//         maxWidth: '352px',
//         overflow: 'hidden',
//         textOverflow: 'ellipsis',
//       },
//       active: {
//         border: 'solid 2px #5ac8fa',
//         backgroundColor: '#191b1e',
//         color: '#5ac8fa',
//       },
//       popover: {
//         marginTop: '10px',
//       },
//       paper: {
//         backgroundColor: '#0b0c0e',
//         border: 'solid 2px #5ac8fa',
//         padding: '12px',
//         width: '360px',
//       },
//       bottom: {
//         display: 'flex',
//         justifyContent: 'center',
//         paddingTop: '12px',
//       },
//       clearButton: {
//         width: '90px',
//         height: '32px',
//         color: '#999999',
//         padding: '4px 7px 4px 8px',
//         letterSpacing: 'normal',
//         fontSize: '19px',
//         lineHeight: 1.26,
//         '&:hover': {
//           backgroundColor: 'transparent',
//           color: '#ffffff',
//         },
//         fontWeight: 'bold',
//         marginRight: '74px',
//       },
//       cancelButton: {
//         width: '88px',
//         height: '32px',
//         color: '#999999',
//         padding: '4px 19px 4px 8px',
//         letterSpacing: 'normal',
//         fontSize: '19px',
//         lineHeight: 1.26,
//         '&:hover': {
//           backgroundColor: 'transparent',
//           color: '#ffffff',
//         },
//         fontWeight: 'bold',
//       },
//       submitButton: {
//         width: '81px',
//         height: '32px',
//         color: '#000000',
//         padding: '4px 7px 4px 8px',
//         backgroundColor: '#5ac8fa',
//         letterSpacing: 'normal',
//         fontSize: '19px',
//         lineHeight: 1.26,
//         borderRadius: 0,
//         fontWeight: 'bold',
//         '&:hover': {
//           backgroundColor: '#408eb2',
//           color: '#ffffff',
//         },
//       },
//     }),
//   { name: 'Tree' },
// );

interface IRootProps {
  className?: string;
}

interface IEnableVar{
  [key: string]: boolean
}

function Root(props: IRootProps) {

  const {
    dataSourceLoaded,
    dataSourceApi,
    getGroupItems,
    deleteUselessVar,
    getNextLayerInfo,
  } = useDataSourceApi();

  const { lang } = useLang();
  const [initList, setInitList] = useState<IRenderInfo[]>([]);
  const submitTimerRef = useRef<ReturnType<typeof setTimeout>| null>(null);
  const shouldInitGroupListRef = useRef(true);

  const refreshDashboard = useCallback(() => {
    console.log('refreshDashboard')
    if (!dataSourceApi?.templateSrv?.variables?.length) {
      console.error(
        'refreshDashboard fail, dataSourceApi?.templateSrv?.variables?.length undefined',
      );
      return;
    }
    let variable = dataSourceApi.templateSrv.variables;
    variable = Array.isArray(variable) ? variable[0] : variable;
    const { variableSrv } = variable;
    if (!variableSrv || !variableSrv.timeSrv) {
      console.error('refreshDashboard fail, no template variable');
      return;
    }

    if(submitTimerRef?.current) {
      clearTimeout(submitTimerRef.current);
    }
    submitTimerRef.current = setTimeout(()=>{
      variableSrv.timeSrv.refreshDashboard()
    }, 200);

  }, [dataSourceApi]);

  const unsavedVars = useMemo(()=>{
    if(!dataSourceApi?.templateSrv?.index) return {};
    const valueObj = {} as {[key: string]: any};
    const obj = dataSourceApi.templateSrv.index;

    for(const key in obj){
      if(obj[key]){
        const value: string | undefined = obj[key].current?.value;
        valueObj[key] = value;
      }
    }
    return valueObj
  },[dataSourceApi]);

  const updateVariable = useCallback(
    (name: string, value: string, updatingQueryString = true) => {

      if (updatingQueryString) {
        getLocationSrv().update({
          partial: true,
          query: {
            [`var-${name}`]: value,
          },
          replace: true,
        });
      }

      if (
        !dataSourceApi ||
        !dataSourceApi.templateSrv ||
        !dataSourceApi.templateSrv.index ||
        !dataSourceApi.templateSrv.index[name]
      ) {
        return;
      }
      dataSourceApi.templateSrv.index[name].current = {
        text: value,
        value: value,
      };
      dataSourceApi.templateSrv.index[name].options = value
        ? [
            {
              selected: true,
              text: value,
              value: value,
            },
          ]
        : [];

      refreshDashboard();
    },
    [dataSourceApi, refreshDashboard],
  );

  const checkEnableVarStatus = useCallback((variable?: string)=>{
    if(variable && !unsavedVars[variable]){
      return false;
    }else{
      return true;
    }
  },[unsavedVars])

  const getOptions = async(path: string, body?: IQueryBody): Promise<LabelValue[]>=>{
    try {
      const payloadObj = { ...await deleteUselessVar({ ...unsavedVars, ...body }) }
      return await getGroupItems(path, payloadObj );
    } catch (err) {
      alert(`get ${path} options error`);
      return [];
    }
  }

  const getChildrenInfo = useCallback(async(path: string, body?: IQueryBody): Promise<INextLayerInfo>=>{
    const newQuery = await deleteUselessVar({ ...unsavedVars, ...body });
    try {
      const children = await getNextLayerInfo(path, newQuery);
      const renderArr = JSON.parse(JSON.stringify(children)) as IRenderInfo[];
      const enableObj = {} as IEnableVar;

      for(let i=0; i<children.length; i++) {
        if(children[i]?.enable){
          const keyName = children[i].enable ?? '';
          if(!checkEnableVarStatus(keyName)){
            console.log(`with ens: ${path}`)
            enableObj[keyName] = true;
            // isEnable = true;
          }
          renderArr.splice(i, 1);
        }
        if(!children[i]?.sw){
          renderArr.splice(i, 1);
        }
        if(children[i].restrictedBy && !checkEnableVarStatus(children[i].restrictedBy)){
          renderArr.splice(i, 1);
        }
      }

      if(Object.keys(enableObj).length){
        return({
          enableVars: enableObj,
          children: renderArr
        })
      }else{
        return {children: renderArr};
      }

    } catch (err) {
      alert(`get ${path} children error`);
      return {children: []};
    }
  },[unsavedVars, deleteUselessVar, getNextLayerInfo, checkEnableVarStatus])

  const getDefaultValue = (key: string): LabelValue=>{
    const empty = {label: '', value: ''};
    if(!unsavedVars) {
      return empty
    }

    if(Object.keys(unsavedVars)?.length){
      if(unsavedVars[key] && unsavedVars[`${key}${SUFFIX_FOR_F2E}`]){
        return (
          {
            label: unsavedVars[`${key}${SUFFIX_FOR_F2E}`],
            value: unsavedVars[key],
          }
        )
      }else if(unsavedVars[key]){
        return ({
          label: unsavedVars[key],
          value: unsavedVars[key],
        })
      }else{
        return empty
      }
    }else{
      return empty
    }
  }

  const saveFn = useCallback(
    (key: string, value: any, updatingQueryString = true): Promise<void> => {
      return new Promise((resolve) => {
        // console.log(`${key} = ${value}`)
        updateVariable(key, value, updatingQueryString);
        resolve();
      })
    },
    [updateVariable],
  );

  const renderNode = async(nodeInfo: IRenderInfo): Promise<INode>=>{
    if(nodeInfo){
      const defaultValue = getDefaultValue(nodeInfo.key);
      const options = await getOptions(nodeInfo.path);

      let children = [] as IRenderInfo[];
      let enableVars = undefined;

      if(defaultValue?.value){
        const nextLayerInfo = await getChildrenInfo(nodeInfo.path, {
          [nodeInfo.key]: defaultValue.value,
        })
        if(nextLayerInfo){
          children = nextLayerInfo.children ?? [];
          enableVars = nextLayerInfo.enableVars ?? undefined;
          if(enableVars){
            console.log(nextLayerInfo)
          }
        }
      }

      return({
        // kind: nodeInfo.key,
        renderInfo: nodeInfo,
        value: defaultValue,
        options,
        children: children,
        enableVars
        // label: list[i].label,
      })
    }else{
      return new CNode();
    }
  }

  // const updateTreeLoadingStatus = (index: number)=>{
  //   return (status: boolean) => {
  //     setTreeStatusList(pre=>([
  //       ...pre.slice(0, index),
  //       status,
  //       ...pre.slice(index),
  //     ]))
  //   };
  // }

  const renderTree = (renderInfo: IRenderInfo)=>{
    const { type, iconType } = renderInfo;

    if(type === EBtnType.OtherTree){
      return <span>Error</span>

    }else{
      return(
        <NodePopover
          root={renderInfo}
          iconType={ iconType ?? EIconType.Filter}
          // getDefaultValue={getDefaultValue}
          getOptions={getOptions}
          onSubmit={saveFn}
          getChildrenInfo={getChildrenInfo}
          renderNode={renderNode}
          // updateTreeLoadingStatus={updateTreeLoadingStatus(idx)}
        />
      )
    }
  }

  const init = useCallback(async()=>{
    console.log(`--------------------  Root Init  --------------------`);
    setInitList((await getChildrenInfo('init')).children);
  },[getChildrenInfo]);

  useEffect(() => {
    // detect lang change to change all popover texts
    shouldInitGroupListRef.current = true;
  }, [lang]);

  useEffect(() => {
    if(dataSourceLoaded){
      init();
    }
  }, [init, dataSourceLoaded]);

  // useEffect(() => {
  //   console.log(treeStatusList)
  // }, [treeStatusList]);

  return (
    <>
      <div className="gf-form submenu-item">
      </div>
      {initList?.length?(
        initList.map((el)=>(
          <>
            {renderTree(el)}
          </>
        ))
      ): null}
    </>
  );
}

export default memo(Root);
