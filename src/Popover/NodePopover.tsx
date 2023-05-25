import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Popover from '@material-ui/core/Popover';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
// import { SelectableValue } from '@grafana/data';
import clsx from 'clsx';
import React, { memo, useEffect, useMemo, useCallback, useRef, useState } from 'react';

import { LabelValue } from '../DataSourceApi';
// import { FilterOption } from '../Filter/Filter';
// import { GroupItem, GroupKind } from '../Filter/SwitchGroupFilter';
import icons from '../icons';
import { useLang } from '../Lang';
// import { useOptionValue } from '../OptionValue';
// import { useTemplateValue } from '../TemplateValue';
import createVDoc from '../utils/createVDoc';
import NodeArea, { INodeArea, TVDocNodeArea } from './NodeArea';
import { IRenderInfo, IQueryBody, IEnableVars, EIconType, INextLayerInfo, INode, CRenderInfo, SUFFIX_FOR_F2E } from '../constants';

const defaultVDocNodeArr = [createVDoc<INodeArea>({
  items: [],
  renderInfo: new CRenderInfo(),
  groupKind: 'Group'
})]

const useStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: {},
      button: {
        textTransform: 'none',
        fontFamily: 'inherit',
        whiteSpace: 'nowrap',
      },
      mainButton: {
        padding: '4px 8px',
        border: 'solid 2px #464646',
        borderRadius: 0,
        backgroundColor: '#1e1e1e',
        height: '40px',
        fontSize: '20px',
        color: '#ffffff',
        '&:hover': {
          border: 'solid 2px #464646',
          backgroundColor: '#1e1e1e',
          color: '#ffffff',
        },
        '& .MuiButton-label': {
          justifyContent: 'start',
        },
        '& .MuiButton-startIcon': {
          marginLeft: 0,
          marginRight: '4px',
        },
      },
      title: {
        maxWidth: '352px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
      active: {
        border: 'solid 2px #5ac8fa',
        backgroundColor: '#191b1e',
        color: '#5ac8fa',
      },
      popover: {
        marginTop: '10px',
      },
      paper: {
        backgroundColor: '#0b0c0e',
        border: 'solid 2px #5ac8fa',
        padding: '12px',
        width: '360px',
      },
      bottom: {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '12px',
      },
      clearButton: {
        width: '90px',
        height: '32px',
        color: '#999999',
        padding: '4px 7px 4px 8px',
        letterSpacing: 'normal',
        fontSize: '19px',
        lineHeight: 1.26,
        '&:hover': {
          backgroundColor: 'transparent',
          color: '#ffffff',
        },
        fontWeight: 'bold',
        marginRight: '74px',
      },
      cancelButton: {
        width: '88px',
        height: '32px',
        color: '#999999',
        padding: '4px 19px 4px 8px',
        letterSpacing: 'normal',
        fontSize: '19px',
        lineHeight: 1.26,
        '&:hover': {
          backgroundColor: 'transparent',
          color: '#ffffff',
        },
        fontWeight: 'bold',
      },
      submitButton: {
        width: '81px',
        height: '32px',
        color: '#000000',
        padding: '4px 7px 4px 8px',
        backgroundColor: '#5ac8fa',
        letterSpacing: 'normal',
        fontSize: '19px',
        lineHeight: 1.26,
        borderRadius: 0,
        fontWeight: 'bold',
        '&:hover': {
          backgroundColor: '#408eb2',
          color: '#ffffff',
        },
      },
    }),
  { name: 'GroupPopover' },
);

interface GroupPopoverProps {
  root: IRenderInfo,
  iconType: EIconType ,
  // getDefaultValue: (key: string)=> LabelValue;
  getOptions: (path: string, body?: IQueryBody)=> Promise<LabelValue[]>;
  // onValueChange: (key: string, value: any)=>void;
  getChildrenInfo: (path: string, body: any)=> Promise<INextLayerInfo>;
  onSubmit: (key: string, value: any) => void;
  renderNode: (info: IRenderInfo) => Promise<INode>;
  // updateTreeLoadingStatus: (status: boolean, ) ㄗ=> void
  className?: string;
  onBack?: () => void;
}

function GroupPopover(props: GroupPopoverProps) {
  const {
    root,
    iconType,
    className: classNameProp,
    // getDefaultValue,
    getOptions,
    // onValueChange,
    getChildrenInfo,
    renderNode,
    onBack,
    onSubmit,
    // updateTreeLoadingStatus
  } = props;

  const classes = useStyles();
  const className = clsx(classes.root, classNameProp);

  const { lang } = useLang();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [unsavedParameterName, setUnsavedParameterName] = useState('parameterName');
  const [groups, setGroups] = useState<TVDocNodeArea[]>(defaultVDocNodeArr);
  const [unsavedGroups, setUnsavedGroups] = useState<TVDocNodeArea[]>(defaultVDocNodeArr);
  const shouldInitGroupListRef = useRef(true);
  const isLoadingRef = useRef(true);

  // const [parameterNameOptions, setParameterNameOptions] = useState<FilterOption[]>();

  const buildOneNode = useCallback(async(renderInfo: IRenderInfo, items: LabelValue[]=[]): Promise<TVDocNodeArea> => {
    isLoadingRef.current = true;
    const node = await renderNode(renderInfo);
    const obj = createVDoc<INodeArea>({
      items: items,
      renderInfo: node.renderInfo,
      groupKind: node.renderInfo.key,
      enableVars: node.enableVars
    })
    isLoadingRef.current = false;
    return obj
  }, [renderNode])

  const buildDefaultGroups = useCallback(async(renderInfo: IRenderInfo) => {
    if(!renderInfo.key){
      return
    }
    isLoadingRef.current = true;
    const node = await renderNode(renderInfo);
    const obj = createVDoc<INodeArea>({
      items: node.options,
      item: node.value,
      renderInfo: renderInfo,
      groupKind: renderInfo.key,
      enableVars: node.enableVars
    })

    setUnsavedGroups(pre=>{
      if(!pre[0].renderInfo.key){
        return [obj]
      }else{
        return ([
          ...pre,
          obj
        ])
      }
    });
    setGroups(pre=>{
      if(!pre[0].renderInfo.key){
        return [obj]
      }else{
        return ([
          ...pre,
          obj
        ])
      }
    });

    if(node.children?.length){
      buildDefaultGroups(node.children[0]);
    }else{
      isLoadingRef.current = false;
    }

  }, [renderNode])

  const updateGroupEnableVars = (enableVars: IEnableVars, assignValue?: boolean)=>{
    if(!enableVars) return;
    for(const [key, value] of Object.entries(enableVars)){
      const result = assignValue?? value;
      console.log(`change ${key} to ${result}`)
      onSubmit(`${key}`, result);
    }
  }

  const init = useCallback(async()=>{
    console.log(`-----------------  Popover Init  -----------------`);
    buildDefaultGroups(root);
    // setUnsavedGroups([VDocNode]);
    // setGroups([VDocNode]);
  }, [root, buildDefaultGroups])

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if(isLoadingRef.current) return;
    setUnsavedGroups(groups);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setUnsavedGroups(groups);
    setAnchorEl(null);
  };

  const handleClear = () => {
    let resultGroupsArr = [];
    if (unsavedGroups && unsavedGroups.length > 1) {
      console.log(unsavedGroups[unsavedGroups.length - 1])
      if(unsavedGroups[unsavedGroups.length - 1].enableVars){
        updateGroupEnableVars(unsavedGroups[unsavedGroups.length - 1].enableVars ?? {}, false);
      }
      resultGroupsArr = [...unsavedGroups.slice(0, unsavedGroups.length - 1)];
    } else {
      console.log('First', unsavedGroups);
      resultGroupsArr = [createVDoc<INodeArea>({
        items: [],
        renderInfo: new CRenderInfo(unsavedGroups[0].renderInfo),
        groupKind: unsavedGroups[0].renderInfo.key
      })]
    }
    setUnsavedGroups(resultGroupsArr);
    onBack?.();
  };

  const handleSubmit = () => {
    // if (unsavedGroups && unsavedGroups.length > 1) {
    isLoadingRef.current = true;
    setGroups(unsavedGroups);
    shouldInitGroupListRef.current = false;
    // refreshDashboard();

    for(let i = 0; i < unsavedGroups.length; i++){
      if(unsavedGroups[i]){
        const newItem = unsavedGroups[i].item ?? {label: '', value: ''};
        const enableVars = unsavedGroups[i].enableVars ?? undefined;
        console.log('newItem', newItem)
        onSubmit(unsavedGroups[i].renderInfo.key, newItem.value);
        onSubmit(`${unsavedGroups[i].renderInfo.key}${SUFFIX_FOR_F2E}`, newItem.label);
        // console.log('enableVars', enableVars)
        if(enableVars){
          for(const [key, value] of Object.entries(enableVars)){
            console.log(`UpdateEn: ${key} = ${value}`)
            onSubmit(`${key}`, value);
          }
        }
      }
    }
    setAnchorEl(null);
    isLoadingRef.current = false;
  };

  async function handleGroupsOpen(index: number) {
    const obj = {} as IQueryBody;
    unsavedGroups.forEach(el=>{
      if(el?.item){
        obj[el.renderInfo.key] = el.item.value;
      }
    })

    const items = await getOptions(unsavedGroups[index].renderInfo.path, obj);

    const newNode = {
      ...unsavedGroups[index],
      items,
      groupKind: unsavedGroups[index].renderInfo.key,
    };

    setUnsavedGroups([
      ...unsavedGroups.slice(0, index),
      newNode,
      ...unsavedGroups.slice(index + 1),
    ]);
  }

  async function handleGroupsChange(list: TVDocNodeArea[]) {
    isLoadingRef.current = true;
    const index = list.length - 1;
    if (index < 0) {
      return;
    }
    const { item, renderInfo } = list[index];
    if (!item) {
      setUnsavedGroups(list);
      return;
    }
      const child = (await getChildrenInfo(renderInfo.path, {[renderInfo.key]: item.value})).children;
      if(child?.length && child[0].sw){
        const VDocNode = await buildOneNode(child[0]);

        setUnsavedGroups([
          ...unsavedGroups.slice(0, index),
          list[index],
          VDocNode
        ]);
      }else{
        setUnsavedGroups([
          ...unsavedGroups.slice(0, index),
          list[index],
        ]);
      }
    // }
    isLoadingRef.current = false;
  }

  function handleParameterNameChange(value?: string) {
    setUnsavedParameterName(value ?? '');
  }

  useEffect(() => {
    // detect lang change to change all popover texts
    shouldInitGroupListRef.current = true;
  }, [lang]);

  // useEffect(() => {
  //   if(!isLoadingRef){
  //     updateTreeLoadingStatus(isLoadingRef);
  //   }
  // }, [isLoadingRef, updateTreeLoadingStatus]);


  useEffect(() => {
    shouldInitGroupListRef.current = true;
    init();
  }, [init]);

  useEffect(() => {
    shouldInitGroupListRef.current = true;
  }, [groups, unsavedGroups]);

  const title = useMemo(() => {
    if(!unsavedGroups || unsavedGroups.length < 1) return
    const labelList = unsavedGroups.map(({ item }) => item?.label ?? '');
    if (labelList[labelList.length - 1] === '') {
      labelList.pop();
    }
    return labelList.join(', ');
  }, [unsavedGroups]);

  const open = Boolean(anchorEl);
  const id = open ? 'group-popover' : undefined;
  const icon = iconType === 'filter'? <icons.BtnDropdownFilter active={open} />:<icons.BtnDropdownGroup active={open} />;

  return (
    <div className={className}>
      <Button
        className={clsx(
          classes.button,
          classes.mainButton,
          open && classes.active,
        )}
        aria-describedby={id}
        variant="outlined"
        onClick={handleClick}
        disableRipple
        disableFocusRipple
        startIcon={icon}
      >
        <span className={classes.title}>{title}</span>
      </Button>
      <Popover
        className={classes.popover}
        PaperProps={{
          classes: { root: classes.paper },
          elevation: 3,
          square: true,
        }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 0 }}
      >
        <NodeArea
          groups={unsavedGroups}
          onGroupsOpen={handleGroupsOpen}
          onGroupsChange={handleGroupsChange}
          displayParameter={true}
          parameterName={unsavedParameterName}
          // parameterNameOptions={parameterNameOptions}
          onParameterNameChange={handleParameterNameChange}
        />
        <div className={classes.bottom}>
          <Button
            className={clsx(classes.button, classes.clearButton)}
            disableRipple
            disableFocusRipple
            onClick={handleClear}
          >
            Go back
          </Button>
          <Button
            className={clsx(classes.button, classes.cancelButton)}
            disableRipple
            disableFocusRipple
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            className={clsx(classes.button, classes.submitButton)}
            disableRipple
            disableFocusRipple
            disableElevation
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </Popover>
    </div>
  );
}

export default memo(GroupPopover);
