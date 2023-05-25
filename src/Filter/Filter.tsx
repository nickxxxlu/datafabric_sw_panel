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
import React, { ChangeEvent, memo, useState } from 'react';

import { isStringArray } from '../utils';

const useStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: {
        paddingBottom: '12px',
        '& label + .MuiInput-formControl': {
          marginTop: '22px',
        },
        overflowX: 'hidden',
      },
      label: {
        fontSize: '15px',
        fontWeight: 'bold',
        lineHeight: 1.2,
        color: '#5ac8fa',
        paddingLeft: '14px',
      },
      select: {
        '& .MuiSelect-select:focus': {
          backgroundColor: '#141619',
          borderRadius: '2px',
        },
        '& .MuiSelect-select.MuiSelect-select': {
          paddingRight: '28px',
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
        width: '332px',
        backgroundColor: '#0b0c0e',
        color: '#c7d0d9',
        border: 'solid 1px #343436',
        borderRadius: '2px',
        maxHeight: '300px',
        overflow: 'auto',
        '& .MuiList-padding': {
          paddingTop: '4px',
          paddingBottom: '4px',
        },
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
  { name: 'Filter' },
);

export type FilterValue = string | number | readonly string[];

export interface FilterOption {
  label: string;
  value?: FilterValue;
}

export interface FilterProps {
  className?: string;
  htmlFor: string;
  label?: string;
  value?: FilterValue;
  options?: FilterOption[];
  noEmpty?: boolean;
  onChange?: (value: FilterValue) => void;
  onClick?: (value: FilterValue) => void;
  onOpen?: () => void;
}

function Filter(props: FilterProps) {
  const {
    className: classNameProp,
    htmlFor,
    label,
    value,
    options,
    noEmpty,
    onChange,
    onClick,
    onOpen,
  } = props;

  const classes = useStyles();
  const className = clsx(classes.root, classNameProp);

  const [empty] = useState('');

  // trigger only when value change
  function handleChange(event: ChangeEvent<{ value: unknown }>) {
    const {
      target: { value },
    } = event;
    if (
      typeof value === 'string' ||
      typeof value === 'number' ||
      isStringArray(value)
    ) {
      onChange?.(value);
    }
  }

  function handleOpen() {
    onOpen?.();
  }

  // trigger every value click
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
    <FormControl className={className} fullWidth focused={false} size="small">
      <InputLabel
        className={classes.label}
        htmlFor={htmlFor}
        shrink
        disableAnimation
      >
        {label}
      </InputLabel>
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
        onChange={handleChange}
        onOpen={handleOpen}
        disableUnderline
      >
        {!noEmpty && (
          <MenuItem
            className={classes.menuItem}
            value={empty}
            onClick={handleClick(empty)}
          ></MenuItem>
        )}
        {options?.map(({ label, value }) => (
          <MenuItem
            className={classes.menuItem}
            key={typeof value === 'string' ? value : String(value)}
            value={value}
            onClick={handleClick(value)}
          >
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default memo(Filter);
