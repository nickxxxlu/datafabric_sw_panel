import { TimeOption } from '@grafana/data';

export const timeRangeOptionList: TimeOption[] = [
  {
    from: 'now-5m',
    to: 'now',
    display: 'Last 5 minutes',
    section: 0,
  },
  {
    from: 'now-1y',
    to: 'now',
    display: 'Last 1 year',
    section: 0,
  }
]
