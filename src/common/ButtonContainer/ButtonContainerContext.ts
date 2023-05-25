import { Ref, createContext } from 'react';

interface IButtonContainerContext {
  container: Ref<HTMLElement> | void;
  disabled: boolean;
  readonly: boolean;
  active: boolean;
  hover: boolean;
}

const ButtonContainerContext = createContext<IButtonContainerContext>({
  container: void 0,
  disabled: false,
  readonly: false,
  active: false,
  hover: false,
});

export default ButtonContainerContext;
