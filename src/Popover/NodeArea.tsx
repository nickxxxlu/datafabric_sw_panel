import { Theme, createStyles, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import noop from 'lodash/noop';
import React, { memo } from 'react';
import { IRenderInfo, EBtnType, IEnableVars } from '../constants';
import Filter, { FilterOption, FilterValue } from '../Filter/Filter';
import MultipleFilter from '../Filter/MultipleFilter';
import SwitchGroupFilter, {
  GroupItem,
  GroupKind,
} from '../Filter/SwitchGroupFilter';
// import { useOptionValue } from '../OptionValue';
import { VDoc } from '../utils/createVDoc';

export interface IGroup {
  items: GroupItem[];
  groupKind?: string;
  item?: GroupItem;
}

export type Groups = Array<VDoc<IGroup>>;

export interface INodeArea extends IGroup{
  renderInfo: IRenderInfo;
  enableVars?: IEnableVars;
}

export type TVDocNodeArea = VDoc<INodeArea>;


const useStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: {},
    }),
  { name: 'GroupArea' },
);

interface GroupAreaProps {
  className?: string;
  groups: TVDocNodeArea[];
  displayParameter?: boolean;
  parameterName?: string;
  parameterNameOptions?: FilterOption[];
  onGroupsChange?: (list: TVDocNodeArea[]) => void;
  onGroupsOpen?: (index: number) => void;
  onParameterNameChange?: (parameterName?: string) => void;
}

function GroupArea(props: GroupAreaProps) {
  const {
    className: classNameProp,
    groups,
    // displayParameter,
    // parameterName,
    // parameterNameOptions,
    onGroupsChange = noop,
    onGroupsOpen = noop,
    // onParameterNameChange,
  } = props;

  const classes = useStyles();
  const className = clsx(classes.root, classNameProp);

  // const { groupLabels, machineLabel, parameterLabel } = useOptionValue();

  function handleGroupChange(index: number) {
    return (value: FilterValue) => {
      const group = groups[index];
      const { items, item: prevItem } = group;

      // if select the same as previous value and it is not the last one, will not trigger group change
      if (value === prevItem?.value) {
        if (index !== groups.length - 1) {
          return;
        }
      }
      const item = items.find(i => i.value === value);
      group.item = item;

      onGroupsChange([...groups.slice(0, index), group]);
    };
  }

  function handleMutipleSelectChange(index: number) {
    return (values: string[]) => {
      const group = groups[index];
      const { item, items } = group;
      let str = '';
      for(let i = 0; i < values.length; i++) {
        const el = items.find(el=> el.value === values[i]);
        if(el){
          if(i === values.length-1){
            str = str + el.label;
          }else{
            str = str + el.label + '/';
          }
        }
      }
      // console.log('Area', values)
      if(item?.value){
        item.value = values;
        item.label = str;

      }else{
        const obj = {
          label: str,
          value: values,
        }
        group['item'] = obj;
      }
      onGroupsChange([...groups.slice(0, index), group]);
    };
  }

  function handleGroupOpen(index: number) {
    return () => {
      onGroupsOpen(index);
    };
  }

  function handleKindChange(index: number) {
    return (kind: GroupKind) => {
      const group = groups[index];

      // set an empty item with kind
      group.item = { kind, label: '', value: '' };
      onGroupsChange([...groups.slice(0, index), group]);
    };
  }

  // function handleParameterNameChange(value: FilterValue) {
  //   if (typeof value !== 'string') {
  //     onParameterNameChange?.(void 0);
  //     return;
  //   }
  //   onParameterNameChange?.(value);
  // }

  function renderGroup(group: TVDocNodeArea, index: number) {
    const key = String(group.$key);
    const { items, item, renderInfo } = group;
    // const isMultiKinds = !groupKind;

    if (renderInfo.type === EBtnType.MultiSelect) {
      return (
        <MultipleFilter
          htmlFor={key}
          label={renderInfo?.label}
          options={items}
          values={(item?.value && Array.isArray(item.value)) ? item.value : []}
          renderInfo={group.renderInfo}
          onOpen={handleGroupOpen(index)}
          onChange={handleMutipleSelectChange(index)}
        />
      );
    }else if(renderInfo.type === EBtnType.SwitchGroupFilter){
      return (
        <SwitchGroupFilter
          htmlFor={key}
          label={renderInfo?.label}
          options={items}
          value={item?.value}
          onClick={handleGroupChange(index)}
          onOpen={handleGroupOpen(index)}
          onKindChange={handleKindChange(index)}
          kindValue={item?.kind}
        />
      )
    }else {
      return (
        <Filter
          htmlFor={key}
          label={renderInfo?.label}
          options={items}
          value={item?.value}
          onClick={handleGroupChange(index)}
          onOpen={handleGroupOpen(index)}
        />
      );
    }
  }

  return (
    <div className={className}>
      {groups.map((group, i) => renderGroup(group, i))}
      {/* {displayParameter && (
        <Filter
          htmlFor="parameter-name"
          label={parameterLabel || 'Parameter'}
          options={parameterNameOptions}
          value={parameterName}
          onChange={handleParameterNameChange}
          noEmpty
        />
      )} */}
    </div>
  );
}

export default memo(GroupArea);
