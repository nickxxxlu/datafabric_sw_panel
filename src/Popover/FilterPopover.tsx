import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Popover from '@material-ui/core/Popover';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { memo, useEffect, useMemo, useState } from 'react';

import { useDataSourceApi } from '../DataSourceApi';
import { OeeKpiAlertKind } from '../enums';
import Filter, { FilterOption, FilterValue } from '../Filter/Filter';
import MultipleFilter, { MultipleFilterOption } from '../Filter/MultipleFilter';
import icons from '../icons';
import { useOptionValue } from '../OptionValue';
import { useTemplateValue } from '../TemplateValue';

const useStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: {
        paddingLeft: '12px',
      },
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
        justifyContent: 'flex-end',
        paddingTop: '12px',
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
  { name: 'FilterPopover' },
);

interface FilterPopoverProps {
  className?: string;
  onSubmit?: () => void;
}

const oeeAlertKindOptions = Object.values(OeeKpiAlertKind).map(v => ({
  label: v,
  value: v,
}));

function FilterPopover(props: FilterPopoverProps) {
  const { className: classNameProp, onSubmit } = props;

  const classes = useStyles();
  const className = clsx(classes.root, classNameProp);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? 'filter-popover' : undefined;

  const {
    getAlarmLevels,
    getEnergyDeviceKinds,
    getEnergyUsages,
  } = useDataSourceApi();
  const {
    timeShiftEnable,
    timeShiftLabel,
    timeShifts,
    timeTypeEnable,
    timeTypeLabel,
    timeTypes,
    energyDeviceKindEnable,
    energyDeviceKindLabel,
    energyDeviceKindUsageEnable,
    energyDeviceKindUsageLabel,
    alarmLevelEnable,
    alarmLevelLabel,
    oeeAlertKindEnable,
    oeeAlertKindLabel,
  } = useOptionValue();
  const {
    timeShift,
    updateTimeShift,
    timeType,
    updateTimeType,
    energyDeviceKind,
    updateEnergyDeviceKind,
    usages,
    updateUsages,
    alarmLevels,
    updateAlarmLevels,
    oeeAlertKinds,
    updateOeeAlertKinds,
    refreshDashboard,
  } = useTemplateValue();

  const [unsavedTimeShift, setUnsavedTimeShift] = useState(timeShift);
  const [unsavedTimeType, setUnsavedTimeType] = useState(timeType);
  const [unsavedEnergyDeviceKind, setUnsavedEnergyDeviceKind] = useState(
    energyDeviceKind,
  );
  const [unsavedEnergyUsages, setUnsavedEnergyUsages] = useState(usages);
  const [unsavedAlarmLevels, setUnsavedAlarmLevels] = useState(alarmLevels);
  const [unsavedOeeAlertKinds, setUnsavedOeeAlertKinds] = useState(
    oeeAlertKinds,
  );
  const [alarmLevelOptions, setAlarmLevelOptions] = useState<
    MultipleFilterOption[]
  >();
  const [energyDeviceKindOptions, setEnergyDeviceKindOptions] = useState<
    FilterOption[]
  >();
  const [energyUsagesOptions, setEnergyUsagesOptions] = useState<
    MultipleFilterOption[]
  >();
  const [
    unsavedEnergyDeviceKindOptions,
    setUnsavedEnergyDeviceKindOptions,
  ] = useState<FilterOption[]>();
  const [unsavedEnergyUsagesOptions, setUnsavedEnergyUsagesOptions] = useState<
    MultipleFilterOption[]
  >();

  const title = useMemo(() => {
    const labelList: string[] = [];
    if (timeShiftEnable && timeShift) {
      labelList.push(timeShift);
    }
    if (timeTypeEnable && timeType) {
      labelList.push(timeType);
    }
    if (energyDeviceKindEnable && energyDeviceKind) {
      labelList.push(
        energyDeviceKindOptions?.find(({ value }) => value === energyDeviceKind)
          ?.label || energyDeviceKind,
      );
      if (energyDeviceKindUsageEnable && usages) {
        const usageLabels: string[] = [];
        energyUsagesOptions?.forEach(({ label, value }) => {
          if (usages.includes(value)) {
            usageLabels.push(label);
          }
        });

        if (usageLabels.length) {
          labelList.push(usageLabels.join('/'));
        }
      }
    }
    if (alarmLevelEnable && alarmLevels?.length) {
      const alarmLevelLabels: string[] = [];
      alarmLevelOptions?.forEach(({ label, value }) => {
        if (alarmLevels.includes(value)) {
          alarmLevelLabels.push(label);
        }
      });

      if (alarmLevelLabels.length) {
        labelList.push(alarmLevelLabels.join('/'));
      }
    }
    if (oeeAlertKindEnable && oeeAlertKinds?.length) {
      labelList.push(oeeAlertKinds.join('/'));
    }
    return labelList.join(', ');
  }, [
    timeShiftEnable,
    timeShift,
    timeTypeEnable,
    timeType,
    energyDeviceKindEnable,
    energyDeviceKind,
    alarmLevelEnable,
    alarmLevels,
    oeeAlertKindEnable,
    oeeAlertKinds,
    energyDeviceKindOptions,
    energyDeviceKindUsageEnable,
    usages,
    energyUsagesOptions,
    alarmLevelOptions,
  ]);

  useEffect(() => {
    setUnsavedTimeShift(timeShift);
  }, [timeShift]);

  useEffect(() => {
    setUnsavedTimeType(timeType);
  }, [timeType]);

  useEffect(() => {
    setUnsavedEnergyDeviceKind(energyDeviceKind);
  }, [energyDeviceKind]);

  useEffect(() => {
    const getEnergyDeviceKindOptions = async () => {
      if (!energyDeviceKindEnable) {
        return;
      }
      const options = await getEnergyDeviceKinds();
      setEnergyDeviceKindOptions(options);
    };

    getEnergyDeviceKindOptions();
  }, [energyDeviceKindEnable, getEnergyDeviceKinds]);

  useEffect(() => {
    setUnsavedEnergyUsages(usages);
  }, [usages]);

  useEffect(() => {
    const getEnergyUsageOptions = async () => {
      if (
        !energyDeviceKindEnable ||
        !energyDeviceKindUsageEnable ||
        !energyDeviceKind
      ) {
        return;
      }
      const options = await getEnergyUsages(energyDeviceKind);
      setEnergyUsagesOptions(options);
    };

    getEnergyUsageOptions();
  }, [
    energyDeviceKind,
    energyDeviceKindEnable,
    energyDeviceKindUsageEnable,
    getEnergyUsages,
  ]);

  useEffect(() => {
    const getEnergyUsageOptions = async () => {
      if (
        !energyDeviceKindEnable ||
        !energyDeviceKindUsageEnable ||
        !unsavedEnergyDeviceKind
      ) {
        return;
      }
      const options = await getEnergyUsages(unsavedEnergyDeviceKind);
      setUnsavedEnergyUsagesOptions(options);
    };

    getEnergyUsageOptions();
  }, [
    energyDeviceKindEnable,
    energyDeviceKindUsageEnable,
    getEnergyUsages,
    unsavedEnergyDeviceKind,
  ]);

  useEffect(() => {
    setUnsavedAlarmLevels(alarmLevels);
  }, [alarmLevels]);

  useEffect(() => {
    const getAlarmLevelOptions = async () => {
      if (!alarmLevelEnable) {
        return;
      }
      const options = await getAlarmLevels();
      setAlarmLevelOptions(options);
    };

    getAlarmLevelOptions();
  }, [alarmLevelEnable, getAlarmLevels]);

  useEffect(() => {
    setUnsavedOeeAlertKinds(oeeAlertKinds);
  }, [oeeAlertKinds]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setUnsavedTimeShift(timeShift);
    setUnsavedTimeType(timeType);
    setUnsavedEnergyDeviceKind(energyDeviceKind);
    setUnsavedEnergyDeviceKindOptions(energyDeviceKindOptions);
    setUnsavedEnergyUsages(usages);
    setUnsavedEnergyUsagesOptions(energyUsagesOptions);
    setUnsavedAlarmLevels(alarmLevels);
    setUnsavedOeeAlertKinds(oeeAlertKinds);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setUnsavedTimeShift(timeShift);
    setUnsavedTimeType(timeType);
    setUnsavedEnergyDeviceKind(energyDeviceKind);
    setUnsavedEnergyDeviceKindOptions(energyDeviceKindOptions);
    setUnsavedEnergyUsages(usages);
    setUnsavedEnergyUsagesOptions(energyUsagesOptions);
    setUnsavedAlarmLevels(alarmLevels);
    setUnsavedOeeAlertKinds(oeeAlertKinds);
    setAnchorEl(null);
  };

  const handleSubmit = () => {
    if (timeShiftEnable) {
      updateTimeShift(unsavedTimeShift ?? '');
    }
    if (timeTypeEnable) {
      updateTimeType(unsavedTimeType ?? '');
    }
    if (energyDeviceKindEnable) {
      updateEnergyDeviceKind(unsavedEnergyDeviceKind ?? '');
    }
    if (energyDeviceKindEnable && energyDeviceKindUsageEnable) {
      updateUsages(unsavedEnergyUsages ?? []);
    }
    if (alarmLevelEnable) {
      updateAlarmLevels(unsavedAlarmLevels ?? []);
    }
    if (oeeAlertKindEnable) {
      updateOeeAlertKinds(unsavedOeeAlertKinds ?? []);
    }
    refreshDashboard();
    onSubmit?.();
    setAnchorEl(null);
  };

  function handleTimeShiftChange(value: FilterValue) {
    if (typeof value !== 'string') {
      return;
    }
    setUnsavedTimeShift(value);
  }

  function handleTimeTypeChange(value: FilterValue) {
    if (typeof value !== 'string') {
      return;
    }
    setUnsavedTimeType(value);
  }

  function handleEnergyDeviceKindChange(value: FilterValue) {
    if (typeof value !== 'string') {
      return;
    }

    setUnsavedEnergyDeviceKind(value);
    setUnsavedEnergyUsages(void 0);
  }

  function handleUsagesChange(values: string[]) {
    setUnsavedEnergyUsages(values);
  }

  function handleAlarmLevelsChange(values: string[]) {
    setUnsavedAlarmLevels(values);
  }

  function handleOeeAlertKindsChange(values: string[]) {
    setUnsavedOeeAlertKinds(values);
  }

  async function handleEnergyDeviceKindOpen() {
    const options = await getEnergyDeviceKinds();
    setUnsavedEnergyDeviceKindOptions(options);
  }

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
        startIcon={<icons.BtnDropdownFilter active={open} />}
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
        {timeTypeEnable && (
          <Filter
            htmlFor="time-type"
            label={timeTypeLabel || 'Time Type'}
            options={timeTypes?.map(v => ({
              label: String(v),
              value: String(v),
            }))}
            value={unsavedTimeType}
            onChange={handleTimeTypeChange}
            noEmpty
          />
        )}
        {timeShiftEnable && (
          <Filter
            htmlFor="time-shift"
            label={timeShiftLabel || 'Time Shift'}
            options={timeShifts?.map(v => ({
              label: String(v),
              value: String(v),
            }))}
            value={unsavedTimeShift}
            onChange={handleTimeShiftChange}
            noEmpty
          />
        )}
        {energyDeviceKindEnable && (
          <Filter
            htmlFor="energy-device-kind"
            label={energyDeviceKindLabel || 'Energy Device'}
            options={unsavedEnergyDeviceKindOptions}
            value={unsavedEnergyDeviceKind}
            onChange={handleEnergyDeviceKindChange}
            onOpen={handleEnergyDeviceKindOpen}
            noEmpty
          />
        )}
        {energyDeviceKindUsageEnable && (
          <MultipleFilter
            htmlFor="energy-device-kind-usages"
            label={energyDeviceKindUsageLabel || 'Energy Usage'}
            options={unsavedEnergyUsagesOptions}
            values={unsavedEnergyUsages}
            onChange={handleUsagesChange}
          />
        )}
        {alarmLevelEnable && (
          <MultipleFilter
            htmlFor="alarm-levels"
            label={alarmLevelLabel || 'Alarm Level'}
            values={unsavedAlarmLevels}
            options={alarmLevelOptions}
            onChange={handleAlarmLevelsChange}
          />
        )}
        {oeeAlertKindEnable && (
          <MultipleFilter
            htmlFor="oee-alert-kinds"
            label={oeeAlertKindLabel || 'OEE Alert Kind'}
            values={unsavedOeeAlertKinds}
            options={oeeAlertKindOptions}
            onChange={handleOeeAlertKindsChange}
          />
        )}
        <div className={classes.bottom}>
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

export default memo(FilterPopover);
