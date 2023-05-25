import { PanelPlugin } from '@grafana/data';

import { IFactoryEditor } from './IFactoryEditor';
import { IFactoryPanel } from './IFactoryPanel';
import { SimpleOptions, defaults } from './types';

export const plugin = new PanelPlugin<SimpleOptions>(IFactoryPanel)
  .setDefaults(defaults)
  .setEditor(IFactoryEditor);
