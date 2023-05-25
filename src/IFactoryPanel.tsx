import './css/default.css';

import {
  PanelProps,
  RawTimeRange,
  TimeOption,
  // TimeRange,
  // dateMath,
  getColorFromHexRgbOrName,
} from '@grafana/data';
import moment from 'moment';
import React, { PureComponent } from 'react';

import DataSourceApiProvider from './DataSourceApi';
import ChangeFont from './fontsize';
import { getI18n, initAttrI18n } from './i18n';
import LangProvider from './Lang';
import OptionValueProvider from './OptionValue';
// import FilterPopover from './Popover/FilterPopover';
import TreeRoot from './Tree/Root';
// import TimeRangePicker from './TimeRangePicker/TimeRangePicker';
// import TemplateValueProvider from './TemplateValue';
import { SimpleOptions } from './types';
interface Props extends PanelProps<SimpleOptions> {
  dashboard: any;
  lang?: any;
}

interface State {
  timeValue: number;
}

// TODO: add WISE check
export class IFactoryPanel extends PureComponent<Props, State> {
  panelContentStyle: any;
  timeSrv?: any;

  constructor(props: any) {
    super(props);

    this.panelContentStyle = React.createRef();
    if (this.props.dashboard) {
      this.timeSrv = this.props.dashboard.getTimeRangeRelatedFun();
    }
    this.state = {
      timeValue: 1,
    };
  }

  componentDidMount() {
    this.panelContentStyle.current.parentNode.style.overflow = 'visible';
    const { options, dashboard, onOptionsChange } = this.props;
    if (dashboard) {
      initAttrI18n(options, 'fontSize', dashboard.panelLanguage);
      initAttrI18n(options, 'text', dashboard.panelLanguage);
    }
    onOptionsChange({
      ...options,
    });
  }

  setActiveTimeOption = (
    timeOptions: TimeOption[],
    rawTimeRange: RawTimeRange,
  ): TimeOption[] => {
    return timeOptions.map(option => {
      if (option.to === rawTimeRange.to && option.from === rawTimeRange.from) {
        return {
          ...option,
          active: true,
        };
      }
      return {
        ...option,
        active: false,
      };
    });
  };

  render() {
    const { options, dashboard, data, lang } = this.props;
    let updateTimeData: any;
    if (options.updateTime) {
      updateTimeData = options.updateTime;
    }
    if (data && data.series && data.series.length > 0) {
      for (let i = 0; i < data.series.length; i++) {
        if (data.series[i].name === options.queryDate) {
          updateTimeData = data.series[i].fields[0].values.get(0);
        }
      }
    }
    options.fontSize = dashboard
      ? getI18n(options, 'fontSize', dashboard.panelLanguage)
      : options.fontSize;
    options.text = dashboard
      ? getI18n(options, 'text', dashboard.panelLanguage)
      : options.text;
    const fontColorValue = getColorFromHexRgbOrName(options.fontColor);
    const fontSizeArray = ChangeFont.defaultValues;
    let fontSizeData;
    for (let i = 0; i < fontSizeArray.length; i++) {
      if (fontSizeArray[i].value === options.fontSize) {
        if (options.adjustFontSize) {
          fontSizeData = fontSizeArray[i].vw;
        } else {
          fontSizeData = fontSizeArray[i].px;
        }
      }
    }
    const titleStyle = {
      fontSize: fontSizeData,
      color: fontColorValue,
    };

    // const {
    //   timeTypeEnable,
    //   energyDeviceKindEnable,
    //   alarmLevelEnable,
    //   oeeAlertKindEnable,
    // } = options;
    // const filterPopoverEnable =
    //   timeTypeEnable ||
    //   energyDeviceKindEnable ||
    //   alarmLevelEnable ||
    //   oeeAlertKindEnable;
    return (
      <>
        <div ref={this.panelContentStyle}>
          <div className="totalReactCommonSwitchPanel">
            <div className="gf-form" style={{ alignItems: 'center' }}>
              <div className="titleClass" style={titleStyle}>
                {options.text}
              </div>

              {/* 此处需要各个团队自己处理，我在此处只是写了一个简单的div（此处div的样式只是一个demo，具体的需各个团队自己按照May的设计去实现） */}
              <LangProvider lang={lang}>
                <DataSourceApiProvider>
                  <OptionValueProvider {...this.props}>
                    {/* <TemplateValueProvider dashboard={dashboard}> */}
                      <TreeRoot />
                      {/* <TimeRangePicker
                        defaultValue={this.props.timeRange}
                      /> */}
                      {/* {filterPopoverEnable && <FilterPopover />} */}
                    {/* </TemplateValueProvider> */}
                  </OptionValueProvider>
                </DataSourceApiProvider>
              </LangProvider>

              {updateTimeData && (
                <div
                  className="commonSwitchTime"
                  style={{ position: 'absolute', right: '12px' }}
                >
                  <div>Last Updated Time </div>
                  <div>
                    {moment(updateTimeData).format('YYYY/MM/DD HH:mm:ss')}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}
