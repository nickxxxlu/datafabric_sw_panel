import { TimePicker } from '@grafana/ui';
import { TimeRange, rangeUtil } from '@grafana/data';
import React, { memo, useMemo } from 'react';
// import { getDataSourceSrv } from '@grafana/runtime';

type TTimePickerType = {
  defaultValue: TimeRange
}

function TimeRangePicker({ defaultValue }: TTimePickerType){

  const onTimePickerChange = (timeRange: TimeRange)=>{
    console.log(timeRange.from.unix(), timeRange.to.unix())
  }

  const timeRangeOptionList = useMemo(()=>{
    let arr:any = [];
    const allOptions = Object.values(rangeUtil.getRelativeTimesList(undefined, undefined));
    for(let i=allOptions.length-1; i>=0; i--){
      arr = [...arr, ...allOptions[i]];
    }
    return arr
  },[])

  // const testConsole = ()=>{
  //   const time = (getDataSourceSrv() as any).templateSrv.timeRange;
  //   console.log('from:', time.from._d, 'to:', time.to._d,);
  //   // console.log(dataSourceApi)
  // }

  return(
    <>
      {/* <button onClick={testConsole}>Test</button> */}
      <TimePicker
        value={defaultValue}
        selectOptions={timeRangeOptionList}
        isSynced={true}
        onChange={onTimePickerChange}
        onMoveBackward={()=>{console.log('')}}
        onMoveForward={()=>{console.log('')}}
        onZoom={()=>{console.log('')}}
      />
    </>
  )
}

export default memo(TimeRangePicker)