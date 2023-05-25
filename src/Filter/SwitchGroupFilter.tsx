import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Theme,
  createStyles,
  makeStyles,
} from '@material-ui/core';
import clsx from 'clsx';
import React, { ChangeEvent, memo, useEffect, useMemo, useState } from 'react';

import { isEnumValue, isStringArray } from '../utils';
import { FilterOption, FilterProps, FilterValue } from './Filter';

export enum GroupKind {
  Group = 'Group',
  Machine = 'Machine',
}

export interface GroupItem extends FilterOption {
  value: any;
  kind?: GroupKind;
  machineImageUrl?: string | null;
}

const useStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: {
        display: 'flex',
        overflowX: 'hidden',
      },
      control1: {
        paddingBottom: '12px',
        '& label + .MuiInput-formControl': {
          marginTop: '22px',
        },
      },
      control2: {
        flexGrow: 1,
        paddingBottom: '12px',
        marginTop: '22px',
      },
      label: {
        fontSize: '15px',
        fontWeight: 'bold',
        lineHeight: 1.2,
        color: '#5ac8fa',
        paddingLeft: '14px',
        whiteSpace: 'nowrap',
      },
      select: {
        '& .MuiSelect-select:focus': {
          backgroundColor: '#141619',
          borderRadius: '2px',
        },
        '& .MuiSelect-select.MuiSelect-select': {
          paddingRight: '28px',
          minWidth: '74px',
        },
        '& .MuiSvgIcon-root': {
          color: '#7b8087',
          width: '24px',
          height: '24px',
          marginRight: '4px',
        },
        '& .MuiSelect-iconOpen': {
          color: '#5ac8fa',
        },
      },
      input: {
        border: 'solid 1px #2c3235',
        backgroundColor: '#141619',
        borderRadius: '2px',
        padding: '4px 4px 4px 8px',
        color: '#7b8087',
        height: '24px',
        fontSize: '19px',
        lineHeight: 1.26,
        '&[aria-expanded="true"]': {
          backgroundColor: '#191b1e',
          border: 'solid 1px #5ac8fa',
          color: '#5ac8fa',
        },
      },
      popover: {
        marginTop: '4px',
      },
      paper: {
        backgroundColor: '#0b0c0e',
        color: '#c7d0d9',
        border: 'solid 1px #343436',
        borderRadius: '2px',
        '& .MuiList-padding': {
          paddingTop: '4px',
          paddingBottom: '4px',
        },
      },
      mainPaperWidth: {
        width: '332px',
      },
      menuItem: {
        height: '32px',
        fontSize: '19px',
        lineHeight: 1.26,
        color: '#c7d0d9',
        padding: '4px 8px',
        '&:active': {
          backgroundColor: '#1f2226',
          color: '#ffffff',
        },
        '&:hover': {
          backgroundColor: '#1f2226',
          color: '#ffffff',
        },
      },
    }),
  { name: 'SwitchGroupFilter' },
);

interface SwitchGroupFilterProps extends FilterProps {
  value?: string;
  options?: GroupItem[];
  kindValue?: GroupKind;
  onKindChange?: (kind: GroupKind) => void;
}

function SwitchGroupFilter(props: SwitchGroupFilterProps) {
  const {
    className: classNameProp,
    htmlFor,
    label,
    value,
    options: optionsProp,
    kindValue: kindValueProp,
    onClick,
    onOpen,
    onKindChange,
  } = props;

  const classes = useStyles();
  const className = clsx(classes.root, classNameProp);

  const [empty] = useState('');
  const [kindValue, setKindValue] = useState<GroupKind | undefined>(
    kindValueProp,
  );

  const options = useMemo(() => {
    return kindValue ? optionsProp?.filter(o => o.kind === kindValue) : void 0;
  }, [kindValue, optionsProp]);

  useEffect(() => {
    setKindValue(kindValueProp);
  }, [kindValueProp]);

  function handleKindChange(event: ChangeEvent<{ value: unknown }>) {
    const {
      target: { value },
    } = event;

    if (isEnumValue(value, GroupKind)) {
      setKindValue(value);
      onKindChange?.(value);
    }
  }

  function handleOpen() {
    onOpen?.();
  }

  function handleClick(value?: FilterValue) {
    return () => {
      if (
        typeof value === 'string' ||
        typeof value === 'number' ||
        isStringArray(value)
      ) {
        onClick?.(value);
      }
    };
  }

  return (
    <div className={className}>
      <FormControl className={classes.control1} focused={false} size="small">
        <InputLabel
          className={classes.label}
          htmlFor={`kind-${htmlFor}`}
          shrink
          disableAnimation
        >
          {label}
        </InputLabel>
        <Select
          className={classes.select}
          value={kindValue ?? empty}
          inputProps={{
            id: `kind-${htmlFor}`,
            className: classes.input,
          }}
          MenuProps={{
            PopoverClasses: {
              root: classes.popover,
              paper: classes.paper,
            },
            elevation: 3,
            getContentAnchorEl: null,
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'left',
            },
          }}
          onChange={handleKindChange}
          disableUnderline
        >
          <MenuItem
            className={classes.menuItem}
            key={`${GroupKind.Group}-${htmlFor}`}
            value={GroupKind.Group}
          >
            {GroupKind.Group}
          </MenuItem>
          <MenuItem
            className={classes.menuItem}
            key={`${GroupKind.Machine}-${htmlFor}`}
            value={GroupKind.Machine}
          >
            {GroupKind.Machine}
          </MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.control2} focused={false} size="small">
        <Select
          className={classes.select}
          value={value ?? empty}
          inputProps={{
            id: htmlFor,
            className: classes.input,
          }}
          MenuProps={{
            PopoverClasses: {
              root: classes.popover,
              paper: clsx(classes.paper, classes.mainPaperWidth),
            },
            elevation: 3,
            getContentAnchorEl: null,
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'left',
            },
          }}
          onOpen={handleOpen}
          disableUnderline
        >
          <MenuItem
            value={empty}
            className={classes.menuItem}
            onClick={handleClick(empty)}
          ></MenuItem>
          {options?.map(({ label, value }) => (
            <MenuItem
              className={classes.menuItem}
              key={value}
              value={value}
              onClick={handleClick(value)}
            >
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default memo(SwitchGroupFilter);
