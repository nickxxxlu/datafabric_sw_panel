import {
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Theme,
  createStyles,
  makeStyles,
} from '@material-ui/core';
import clsx from 'clsx';
import { LabelValue } from '../DataSourceApi';
import React, {
  ChangeEvent,
  memo,
  useCallback,
  useState,
} from 'react';

import { BtnChipRemoveN } from '../images';
import { isStringArray } from '../utils';
import { IRenderInfo } from '../constants';
import { isArray } from 'lodash';

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
        '& .MuiSelect-icon': {
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
        padding: '0 4px 4px 8px',
        color: '#7b8087',
        minHeight: '28px',
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
        '&[aria-selected="true"]': {
          backgroundColor: '#1f2226',
          color: '#ffffff',
        },
        '&.MuiListItem-root.Mui-selected:hover': {
          backgroundColor: '#1f2226',
          color: '#ffffff',
        },
      },
      chips: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      chip: {
        maxWidth: '290px',
        height: '32px',
        backgroundColor: '#141619',
        borderRadius: '16px',
        border: 'solid 1px #464646',
        margin: '4px 4px 0 0',
        padding: '4px 4px 4px 8px',
        color: '#7b8087',
        '& .MuiChip-label': {
          paddingRight: '6px',
          paddingLeft: 0,
          height: '24px',
          fontSize: '19px',
          lineHeight: 1.26,
        },
        '& .MuiChip-deleteIcon': {
          color: '#7b8087',
          width: '24px',
          height: '24px',
          marginRight: '4px',
          flexShrink: 0,
        },
      },
    }),
  { name: 'MultipleFilter' },
);

export interface MultipleFilterProps {
  className?: string;
  htmlFor: string;
  renderInfo: IRenderInfo,
  label?: string;
  values?: string[];
  options?: LabelValue[];
  onChange?: (values: string[]) => void;
  onOpen?: () => void;
}

function MultipleFilter(props: MultipleFilterProps) {
  const {
    className: classNameProp,
    htmlFor,
    label,
    values,
    options,
    onChange,
    onOpen,
  } = props;

  const classes = useStyles();
  const className = clsx(classes.root, classNameProp);

  const [empty] = useState<string[]>([]);
  // const [values, setValues] = useState<string[]>(defaultValues?? []);

  const stopPropagation = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
  }, []);

  // trigger only when value change
  function handleChange(event: ChangeEvent<{ value: string[] | unknown }>) {
    const {
      target: { value },
    } = event;

    if(isStringArray(value) || (isArray(value) && value.length === 0)){
      onChange?.(value);
      // setValues(value);
    }
  }

  function handleOpen() {
    onOpen?.();
  }

  function handleChipDelete(value: string) {
    return () => {
      if (values) {
        onChange?.(values.filter(v => v !== value));
        // setValues(values.filter(v => v !== value));
      }
    };
  }

  function renderValues(selected: unknown) {
    const labelValues: LabelValue[] = [];

    options?.forEach(o => {
      const v = (selected as string[]).find(v => o.value === v);
      if (v) {
        labelValues.push(o);
      }
    });

    return (
      <div className={classes.chips}>
        {labelValues.map(({ label, value }) => (
          <Chip
            className={classes.chip}
            variant="outlined"
            deleteIcon={<BtnChipRemoveN />}
            key={value}
            label={label}
            onDelete={handleChipDelete(value)}
            onMouseDown={stopPropagation}
          />
        ))}
      </div>
    );
  }

  // useEffect(()=>{
  //   onChange?.(values);
  // }, [values, onChange])

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
        value={values ?? empty}
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
        multiple
        renderValue={renderValues}
      >
        {options?.map(({ label, value }) => (
          <MenuItem className={classes.menuItem} key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default memo(MultipleFilter);
