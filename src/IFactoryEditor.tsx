import { PanelEditorProps } from '@grafana/data';
import {
  ColorPicker,
  FormLabel,
  Input,
  PanelOptionsGrid,
  PanelOptionsGroup,
  Select,
  Switch,
} from '@grafana/ui';
import React, { PureComponent } from 'react';

import ChangeFont from './fontsize';
import { getI18n, setI18n } from './i18n';
import { SimpleEditor } from './SimpleEditor';

interface SimpleEditorProps extends PanelEditorProps {
  dashboard?: any;
  lang?: string;
}

interface State {
  titleLengthValid: boolean;
}

// TODO: add WISE check
export class IFactoryEditor extends PureComponent<SimpleEditorProps, State> {
  constructor(props: SimpleEditorProps) {
    super(props);
    this.state = {
      titleLengthValid: false,
    };
  }

  componentWillReceiveProps(nextProps: any) {
    const { options, lang } = this.props;
    if (nextProps.lang && nextProps.lang !== lang) {
      this.props.onOptionsChange({
        ...this.props.options,
        fontSize: getI18n(options, 'fontSize', nextProps.lang),
        text: getI18n(options, 'text', nextProps.lang),
      });
    }
  }

  onTextChanged = ({ target }: any) => {
    let result = target.value;
    if (target.value && target.value.length > 24) {
      this.setState({ titleLengthValid: true });
      result = '';
    } else {
      this.setState({ titleLengthValid: false });
    }
    if (this.props.dashboard) {
      setI18n(
        this.props.options,
        'text',
        result,
        this.props.dashboard.panelLanguage,
      );
    }
    this.props.onOptionsChange({ ...this.props.options, text: result });
  };

  adjustFontsizeChanged = () => {
    return this.props.onOptionsChange({
      ...this.props.options,
      adjustFontSize: !this.props.options.adjustFontSize,
    });
  };

  // eslint-disable-next-line @typescript-eslint/ban-types
  getFontSizeOption = (fontSizeData: Object[]) => {
    return fontSizeData.map((item: any) => ({
      value: item.value,
      label: item.text,
    }));
  };

  onFontSizeChange = (fontSizeValue: any) => {
    if (this.props.dashboard) {
      setI18n(
        this.props.options,
        'fontSize',
        fontSizeValue.value,
        this.props.dashboard.panelLanguage,
      );
    }
    return this.props.onOptionsChange({
      ...this.props.options,
      fontSize: fontSizeValue.value,
    });
  };

  onTimeChanged = ({ target }: any) => {
    this.props.onOptionsChange({
      ...this.props.options,
      updateTime: target.value,
    });
  };

  onFontColorChanged = (color: string) => {
    return this.props.onOptionsChange({
      ...this.props.options,
      fontColor: color,
    });
  };

  onQueryDataChange = (queryDate: any) => {
    return this.props.onOptionsChange({
      ...this.props.options,
      queryDate: queryDate.value,
    });
  };

  render() {
    const { options } = this.props;
    const { titleLengthValid } = this.state;
    const labelWidth = 10;
    const fontOptions = this.getFontSizeOption(ChangeFont.defaultValues);
    const tempData = this.props.data.series;
    const timeArray: any[] = [{ value: '', label: ' ' }];
    if (tempData && tempData.length > 0) {
      for (let i = 0; i < tempData.length; i++) {
        const tempJson = {
          value: tempData[i].name,
          label: tempData[i].name,
        };
        timeArray.push(tempJson);
      }
    }
    return (
      <>
        <PanelOptionsGrid>
          <PanelOptionsGroup title="Options">
            <div className="form-field">
              <FormLabel width={labelWidth}>
                Title&nbsp;&nbsp;<i className="gicon gicon-i18n"></i>
              </FormLabel>
              <Input
                width={13}
                style={
                  titleLengthValid
                    ? { border: 'solid 2px #D9293E' }
                    : { border: 'none' }
                }
                type="text"
                onChange={this.onTextChanged}
                value={options.text || ''}
              />
              {titleLengthValid && (
                <span
                  style={{
                    margin: '8px',
                    fontWeight: 'bold',
                    color: '#D9293E',
                  }}
                >
                  Title can not exceed 24 characters
                </span>
              )}
            </div>
            <div className="from-field">
              <Switch
                label="Adjustable Font Size"
                labelClass="width-10"
                checked={options.adjustFontSize}
                onChange={this.adjustFontsizeChanged}
              />
            </div>
            <div className="form-field">
              <FormLabel width={10}>
                Font Size &nbsp;&nbsp;<i className="gicon gicon-i18n"></i>
              </FormLabel>
              <Select
                width={10}
                options={fontOptions}
                onChange={this.onFontSizeChange}
                value={fontOptions.find(
                  item => item.value === options.fontSize,
                )}
              />
            </div>

            <div className="form-field">
              <FormLabel width={10}>Font Color</FormLabel>
              <div
                className="thresholds-row-input-inner-color"
                style={{ height: '35px' }}
              >
                <div className="thresholds-row-input-inner-color-colorpicker">
                  <ColorPicker
                    color={options.fontColor}
                    onChange={this.onFontColorChanged}
                    enableNamedColors={true}
                  ></ColorPicker>
                </div>
              </div>
            </div>
          </PanelOptionsGroup>
          <PanelOptionsGroup title="Time Setting">
            <div className="form-field">
              <div className="advantech-common-switch-react-panel-select-style">
                <FormLabel width={labelWidth}>Last Updated Time</FormLabel>
                <Input
                  width={13}
                  type="text"
                  onChange={this.onTimeChanged}
                  value={options.updateTime || ''}
                />
                <Select
                  width={10}
                  options={timeArray}
                  onChange={this.onQueryDataChange}
                  value={timeArray.find(
                    item => item.value === options.queryDate,
                  )}
                />
              </div>
            </div>
          </PanelOptionsGroup>
        </PanelOptionsGrid>
        <SimpleEditor {...this.props} />
      </>
    );
  }
}
