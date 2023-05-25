import { PanelEditorProps, SelectableValue } from '@grafana/data';
import { Button, FormField, Select, Switch } from '@grafana/ui';
import React, { PureComponent } from 'react';

import { TimeType } from './enums';
import { getI18n, setI18n } from './i18n';
import { SimpleOptions } from './types';

const TAG = '#ifp-switch-panel editor';

interface SimpleEditorProps extends PanelEditorProps<SimpleOptions> {
  dashboard?: any;
  lang?: string;
}

export class SimpleEditor extends PureComponent<SimpleEditorProps> {
  componentWillReceiveProps(nextProps: SimpleEditorProps) {
    const { options, lang, onOptionsChange } = this.props;

    if (nextProps.lang && nextProps.lang !== lang) {
      console.log(
        `${TAG} componentWillReceiveProps nextProps.lang`,
        nextProps.lang,
      );
      onOptionsChange({
        ...options,
        groupLabels: getI18n(options, 'groupLabels', nextProps.lang) ?? [],
        machineLabel: getI18n(options, 'machineLabel', nextProps.lang) ?? '',
        parameterLabel:
          getI18n(options, 'parameterLabel', nextProps.lang) ?? '',
        timeTypeLabel: getI18n(options, 'timeTypeLabel', nextProps.lang) ?? '',
        energyDeviceKindLabel:
          getI18n(options, 'energyDeviceKindLabel', nextProps.lang) ?? '',
        energyDeviceKindUsageLabel:
          getI18n(options, 'energyDeviceKindUsageLabel', nextProps.lang) ?? '',
        alarmLevelLabel:
          getI18n(options, 'alarmLevelLabel', nextProps.lang) ?? '',
        oeeAlertKindLabel:
          getI18n(options, 'oeeAlertKindLabel', nextProps.lang) ?? '',
      });
    }
  }

  getGroupLabels = () => {
    const { options, dashboard } = this.props;

    const groupLabels: string[] | undefined = dashboard
      ? getI18n(options, 'groupLabels', dashboard.panelLanguage)
      : options.groupLabels;

    return groupLabels;
  };

  getMachineLabel = () => {
    const { options, dashboard } = this.props;

    const machineLabel: string | undefined = dashboard
      ? getI18n(options, 'machineLabel', dashboard.panelLanguage)
      : options.machineLabel;

    return machineLabel;
  };

  getParameterLabel = () => {
    const { options, dashboard } = this.props;

    const parameterLabel: string | undefined = dashboard
      ? getI18n(options, 'parameterLabel', dashboard.panelLanguage)
      : options.parameterLabel;

    return parameterLabel;
  };

  getTimeTypeLabel = () => {
    const { options, dashboard } = this.props;

    const timeTypeLabel: string | undefined = dashboard
      ? getI18n(options, 'timeTypeLabel', dashboard.panelLanguage)
      : options.timeTypeLabel;

    return timeTypeLabel;
  };

  getEnergyDeviceKindLabel = () => {
    const { options, dashboard } = this.props;

    const energyDeviceKindLabel: string | undefined = dashboard
      ? getI18n(options, 'energyDeviceKindLabel', dashboard.panelLanguage)
      : options.energyDeviceKindLabel;

    return energyDeviceKindLabel;
  };

  getEnergyDeviceKindUsageLabel = () => {
    const { options, dashboard } = this.props;

    const energyDeviceKindUsageLabel: string | undefined = dashboard
      ? getI18n(options, 'energyDeviceKindUsageLabel', dashboard.panelLanguage)
      : options.energyDeviceKindUsageLabel;

    return energyDeviceKindUsageLabel;
  };

  getAlarmLevelLabel = () => {
    const { options, dashboard } = this.props;

    const alarmLevelLabel: string | undefined = dashboard
      ? getI18n(options, 'alarmLevelLabel', dashboard.panelLanguage)
      : options.alarmLevelLabel;

    return alarmLevelLabel;
  };

  getOeeAlertTypeLabel = () => {
    const { options, dashboard } = this.props;

    const oeeAlertKindLabel: string | undefined = dashboard
      ? getI18n(options, 'oeeAlertKindLabel', dashboard.panelLanguage)
      : options.oeeAlertKindLabel;

    return oeeAlertKindLabel;
  };

  updateGroupLabels = (newGroupLabels: string[]) => {
    console.log(`${TAG} updateGroupLabels newGroupLabels`, newGroupLabels);
    const { options, dashboard, onOptionsChange } = this.props;

    if (dashboard) {
      console.log(`${TAG} updateGroupLabels dashboard`, dashboard);
      setI18n(options, 'groupLabels', newGroupLabels, dashboard.panelLanguage);
    }

    onOptionsChange({ ...options, groupLabels: newGroupLabels });
  };

  onTextChanged = (index: number) => {
    return ({ target }: any) => {
      const groupLabels = this.getGroupLabels();
      if (!groupLabels?.length) {
        return;
      }

      if (index > groupLabels?.length) {
        return;
      }

      const newGroupLabels = [
        ...groupLabels.slice(0, index),
        target.value,
        ...groupLabels.slice(index + 1),
      ];

      this.updateGroupLabels(newGroupLabels);
    };
  };

  onMachineTextChanged = ({ target }: any) => {
    const { options, dashboard, onOptionsChange } = this.props;

    if (dashboard) {
      setI18n(options, 'machineLabel', target.value, dashboard.panelLanguage);
    }

    onOptionsChange({ ...options, machineLabel: target.value });
  };

  onParamterTextChanged = ({ target }: any) => {
    const { options, dashboard, onOptionsChange } = this.props;

    if (dashboard) {
      setI18n(options, 'parameterLabel', target.value, dashboard.panelLanguage);
    }

    onOptionsChange({ ...options, parameterLabel: target.value });
  };

  onTimeTypeTextChanged = ({ target }: any) => {
    const { options, dashboard, onOptionsChange } = this.props;

    if (dashboard) {
      setI18n(options, 'timeTypeLabel', target.value, dashboard.panelLanguage);
    }

    onOptionsChange({ ...options, timeTypeLabel: target.value });
  };

  onEnergyDeviceKindTextChanged = ({ target }: any) => {
    const { options, dashboard, onOptionsChange } = this.props;

    if (dashboard) {
      setI18n(
        options,
        'energyDeviceKindLabel',
        target.value,
        dashboard.panelLanguage,
      );
    }

    onOptionsChange({ ...options, energyDeviceKindLabel: target.value });
  };

  onEnergyDeviceKindUsageTextChanged = ({ target }: any) => {
    const { options, dashboard, onOptionsChange } = this.props;

    if (dashboard) {
      setI18n(
        options,
        'energyDeviceKindUsageLabel',
        target.value,
        dashboard.panelLanguage,
      );
    }

    onOptionsChange({ ...options, energyDeviceKindUsageLabel: target.value });
  };

  onAlarmLevelTextChanged = ({ target }: any) => {
    const { options, dashboard, onOptionsChange } = this.props;

    if (dashboard) {
      setI18n(
        options,
        'alarmLevelLabel',
        target.value,
        dashboard.panelLanguage,
      );
    }

    onOptionsChange({ ...options, alarmLevelLabel: target.value });
  };

  onOeeAlertKindTextChanged = ({ target }: any) => {
    const { options, dashboard, onOptionsChange } = this.props;

    if (dashboard) {
      setI18n(
        options,
        'oeeAlertKindLabel',
        target.value,
        dashboard.panelLanguage,
      );
    }

    onOptionsChange({ ...options, oeeAlertKindLabel: target.value });
  };

  onAdd = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const groupLabels = this.getGroupLabels();
    const newGroupLabels = groupLabels ?? [];
    newGroupLabels.push('');

    this.updateGroupLabels(newGroupLabels);
  };

  onDelete = (index: number) => {
    return () => {
      const groupLabels = this.getGroupLabels();
      if (!groupLabels?.length) {
        return;
      }

      if (index > groupLabels?.length) {
        return;
      }

      const newGroupLabels = [
        ...groupLabels.slice(0, index),
        ...groupLabels.slice(index + 1),
      ];

      this.updateGroupLabels(newGroupLabels);
    };
  };

  onGroupOnlySwitchChange = () => {
    const { options, onOptionsChange } = this.props;
    const { groupOnly } = options;

    const onOrOff = !groupOnly;

    if (onOrOff) {
      onOptionsChange({
        ...options,
        groupOnly: onOrOff,
        parameterEnable: false,
      });
      return;
    }

    onOptionsChange({ ...options, groupOnly: onOrOff });
  };

  onParameterSwitchChange = () => {
    const { options, onOptionsChange } = this.props;
    const { parameterEnable } = options;

    onOptionsChange({ ...options, parameterEnable: !parameterEnable });
  };

  onTimeTypeEnableSwitchChange = () => {
    const { options, onOptionsChange } = this.props;
    const { timeTypeEnable } = options;

    onOptionsChange({ ...options, timeTypeEnable: !timeTypeEnable });
  };

  onEnergyDeviceKindEnableSwitchChange = () => {
    const { options, onOptionsChange } = this.props;
    const { energyDeviceKindEnable } = options;

    const onOrOff = !energyDeviceKindEnable;

    if (!onOrOff) {
      onOptionsChange({
        ...options,
        energyDeviceKindEnable: onOrOff,
        energyDeviceKindUsageEnable: onOrOff,
      });
      return;
    }

    onOptionsChange({
      ...options,
      energyDeviceKindEnable: onOrOff,
    });
  };

  onEnergyDeviceKindUsageEnableSwitchChange = () => {
    const { options, onOptionsChange } = this.props;
    const { energyDeviceKindUsageEnable } = options;

    onOptionsChange({
      ...options,
      energyDeviceKindUsageEnable: !energyDeviceKindUsageEnable,
    });
  };

  handleTimeTypeChange = (
    value: SelectableValue<TimeType> | Array<SelectableValue<TimeType>> | null,
  ) => {
    const { options, onOptionsChange } = this.props;
    if (!value) {
      return;
    }

    if (!Array.isArray(value)) {
      return;
    }

    const newTimeTypes: TimeType[] = [];

    value.forEach(v => {
      if (v.value) {
        newTimeTypes.push(v.value);
      }
    });

    onOptionsChange({ ...options, timeTypes: newTimeTypes });
  };

  onAlarmLevelEnableSwitchChange = () => {
    const { options, onOptionsChange } = this.props;
    const { alarmLevelEnable } = options;

    onOptionsChange({
      ...options,
      alarmLevelEnable: !alarmLevelEnable,
    });
  };

  onOeeAlertKindEnableSwitchChange = () => {
    const { options, onOptionsChange } = this.props;
    const { oeeAlertKindEnable } = options;

    onOptionsChange({
      ...options,
      oeeAlertKindEnable: !oeeAlertKindEnable,
    });
  };

  render() {
    const { options } = this.props;
    const {
      groupOnly,
      timeTypeEnable,
      timeTypes,
      energyDeviceKindEnable,
      energyDeviceKindUsageEnable,
      alarmLevelEnable,
      parameterEnable,
      oeeAlertKindEnable,
    } = options;
    const groupLabels = this.getGroupLabels();
    const machineLabel = this.getMachineLabel();
    const timeTypeLabel = this.getTimeTypeLabel();
    const energyDeviceKindLabel = this.getEnergyDeviceKindLabel();
    const energyDeviceKindUsageLabel = this.getEnergyDeviceKindUsageLabel();
    const alarmLevelLabel = this.getAlarmLevelLabel();
    const parameterLabel = this.getParameterLabel();
    const oeeAlertKindLabel = this.getOeeAlertTypeLabel();

    return (
      <div className="section gf-form-group">
        {groupLabels?.map((groupLabel, index) => (
          <div className="gf-form-inline">
            <FormField
              label={`Group ${index}`}
              labelWidth={5}
              inputWidth={20}
              onChange={this.onTextChanged(index)}
              value={groupLabel || ''}
            />
            <button
              className="gf-form-label gf-form-label--btn"
              onClick={this.onDelete(index)}
            >
              <i className="fa fa-times" />
            </button>
          </div>
        ))}
        <Button className="btn" onClick={this.onAdd}>
          <i className="fa fa-plus" />
          <span>Add Group</span>
        </Button>
        <FormField
          label={'Machine'}
          labelWidth={5}
          inputWidth={20}
          onChange={this.onMachineTextChanged}
          value={machineLabel || ''}
        />
        <Switch
          label="Group Only"
          checked={!!groupOnly}
          onChange={this.onGroupOnlySwitchChange}
        />
        <Switch
          label="Time Type Enable"
          checked={!!timeTypeEnable}
          onChange={this.onTimeTypeEnableSwitchChange}
        />
        {timeTypeEnable && (
          <div className="gf-form submenu-item">
            <label className="gf-form-label">{'TimeType'}</label>
            <Select
              isMulti={true}
              options={Object.values(TimeType).map(v => ({
                label: v,
                value: v,
              }))}
              onChange={this.handleTimeTypeChange}
              value={timeTypes?.map(v => ({ label: v, value: v }))}
            />
          </div>
        )}
        {timeTypeEnable && (
          <FormField
            label={'TimeType label'}
            labelWidth={10}
            inputWidth={20}
            onChange={this.onTimeTypeTextChanged}
            value={timeTypeLabel || ''}
          />
        )}
        <Switch
          label="Energy Device Enable"
          checked={!!energyDeviceKindEnable}
          onChange={this.onEnergyDeviceKindEnableSwitchChange}
        />
        {energyDeviceKindEnable && (
          <FormField
            label={'Energy Device'}
            labelWidth={15}
            inputWidth={20}
            onChange={this.onEnergyDeviceKindTextChanged}
            value={energyDeviceKindLabel || ''}
          />
        )}
        {energyDeviceKindEnable && (
          <Switch
            label="Energy Usage Enable"
            checked={!!energyDeviceKindUsageEnable}
            onChange={this.onEnergyDeviceKindUsageEnableSwitchChange}
          />
        )}
        {energyDeviceKindUsageEnable && (
          <FormField
            label={'Energy Usage'}
            labelWidth={15}
            inputWidth={20}
            onChange={this.onEnergyDeviceKindUsageTextChanged}
            value={energyDeviceKindUsageLabel || ''}
          />
        )}
        <Switch
          label={'Alarm Level Enable'}
          checked={!!alarmLevelEnable}
          onChange={this.onAlarmLevelEnableSwitchChange}
        />
        {alarmLevelEnable && (
          <FormField
            label={'Alarm Level'}
            labelWidth={15}
            inputWidth={20}
            onChange={this.onAlarmLevelTextChanged}
            value={alarmLevelLabel || ''}
          />
        )}
        {!groupOnly && (
          <Switch
            label="Parameter Enable"
            checked={!!parameterEnable}
            onChange={this.onParameterSwitchChange}
          />
        )}
        {parameterEnable && (
          <FormField
            label={'Parameter'}
            labelWidth={5}
            inputWidth={20}
            onChange={this.onParamterTextChanged}
            value={parameterLabel || ''}
          />
        )}
        <Switch
          label={'OEE Alert Kind Enable'}
          checked={!!oeeAlertKindEnable}
          onChange={this.onOeeAlertKindEnableSwitchChange}
        />
        {oeeAlertKindEnable && (
          <FormField
            label={'OEE Alert Kind'}
            labelWidth={15}
            inputWidth={20}
            onChange={this.onOeeAlertKindTextChanged}
            value={oeeAlertKindLabel || ''}
          />
        )}
      </div>
    );
  }
}
