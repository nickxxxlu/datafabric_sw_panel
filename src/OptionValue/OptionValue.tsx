import { PanelEditorProps } from '@grafana/data';
import React, { ReactNode, useEffect, useMemo, useRef } from 'react';

import { getI18n } from '../i18n';
import { SimpleOptions } from '../types';
import OptionValueContext, { IOptionValueContext } from './OptionValueContext';

interface OptionValueProps extends PanelEditorProps<SimpleOptions> {
  children: ReactNode;
  dashboard?: any;
  lang?: string;
}

function OptionValueProvider(props: OptionValueProps) {
  const { children, options, dashboard, lang, onOptionsChange } = props;
  const {
    groupOnly,
    parameterEnable,
    timeTypeEnable,
    timeTypes,
    energyDeviceKindEnable,
    energyDeviceKindUsageEnable,
    alarmLevelEnable,
    oeeAlertKindEnable,
  } = options;

  const prevLang = useRef<string | undefined>();

  const groupLabels: string[] | undefined = useMemo(() => {
    return dashboard
      ? getI18n(options, 'groupLabels', dashboard.panelLanguage)
      : options.groupLabels;
  }, [dashboard, options]);
  const machineLabel: string | undefined = useMemo(() => {
    return dashboard
      ? getI18n(options, 'machineLabel', dashboard.panelLanguage)
      : options.machineLabel;
  }, [dashboard, options]);
  const parameterLabel: string | undefined = useMemo(() => {
    return dashboard
      ? getI18n(options, 'parameterLabel', dashboard.panelLanguage)
      : options.parameterLabel;
  }, [dashboard, options]);
  const timeTypeLabel: string | undefined = useMemo(() => {
    return dashboard
      ? getI18n(options, 'timeTypeLabel', dashboard.panelLanguage)
      : options.timeTypeLabel;
  }, [dashboard, options]);
  const energyDeviceKindLabel: string | undefined = useMemo(() => {
    return dashboard
      ? getI18n(options, 'energyDeviceKindLabel', dashboard.panelLanguage)
      : options.energyDeviceKindLabel;
  }, [dashboard, options]);
  const energyDeviceKindUsageLabel: string | undefined = useMemo(() => {
    return dashboard
      ? getI18n(options, 'energyDeviceKindUsageLabel', dashboard.panelLanguage)
      : options.energyDeviceKindUsageLabel;
  }, [dashboard, options]);
  const alarmLevelLabel: string | undefined = useMemo(() => {
    return dashboard
      ? getI18n(options, 'alarmLevelLabel', dashboard.panelLanguage)
      : options.alarmLevelLabel;
  }, [dashboard, options]);
  const oeeAlertKindLabel: string | undefined = useMemo(() => {
    return dashboard
      ? getI18n(options, 'oeeAlertKindLabel', dashboard.panelLanguage)
      : options.oeeAlertKindLabel;
  }, [dashboard, options]);

  useEffect(() => {
    if (lang && lang !== prevLang.current) {
      onOptionsChange({
        ...options,
        groupLabels: getI18n(options, 'groupLabels', lang) ?? [],
        machineLabel: getI18n(options, 'machineLabel', lang) ?? '',
        parameterLabel: getI18n(options, 'parameterLabel', lang) ?? '',
        timeTypeLabel: getI18n(options, 'timeTypeLabel', lang) ?? '',
        energyDeviceKindLabel:
          getI18n(options, 'energyDeviceKindLabel', lang) ?? '',
        energyDeviceKindUsageLabel:
          getI18n(options, 'energyDeviceKindUsageLabel', lang) ?? '',
        alarmLevelLabel: getI18n(options, 'alarmLevelLabel', lang) ?? '',
        oeeAlertKindLabel: getI18n(options, 'oeeAlertKindLabel', lang) ?? '',
      });
    }
    prevLang.current = lang;
  }, [lang, onOptionsChange, options]);

  const contextValue = useMemo<IOptionValueContext>(
    () => ({
      groupLabels,
      machineLabel,
      groupOnly,
      parameterEnable,
      parameterLabel,
      timeTypeLabel,
      timeTypeEnable,
      timeTypes,
      energyDeviceKindLabel,
      energyDeviceKindUsageLabel,
      energyDeviceKindEnable,
      energyDeviceKindUsageEnable,
      alarmLevelEnable,
      alarmLevelLabel,
      oeeAlertKindEnable,
      oeeAlertKindLabel,
    }),
    [
      alarmLevelEnable,
      alarmLevelLabel,
      energyDeviceKindEnable,
      energyDeviceKindLabel,
      energyDeviceKindUsageEnable,
      energyDeviceKindUsageLabel,
      groupLabels,
      groupOnly,
      machineLabel,
      oeeAlertKindEnable,
      oeeAlertKindLabel,
      parameterEnable,
      parameterLabel,
      timeTypeEnable,
      timeTypeLabel,
      timeTypes,
    ],
  );

  return (
    <OptionValueContext.Provider value={contextValue}>
      {children}
    </OptionValueContext.Provider>
  );
}

export default OptionValueProvider;
