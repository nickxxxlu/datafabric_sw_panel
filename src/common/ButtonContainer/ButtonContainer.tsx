import { useForkRef } from '@material-ui/core';
import React, {
  ReactElement,
  ReactNode,
  Ref,
  cloneElement,
  forwardRef,
  isValidElement,
  useMemo,
  useRef,
} from 'react';

import { useActive, useHover } from '../../utils';
import ButtonContainerContext from './ButtonContainerContext';

interface ButtonContainerChildrenProps {
  ref?: Ref<HTMLElement>;
  disabled?: boolean;
}

interface ButtonContainerChildren
  extends ReactElement<ButtonContainerChildrenProps> {
  ref?: Ref<HTMLElement>;
}

interface ButtonContainerProps {
  children: ((ref: Ref<HTMLElement>) => ReactNode) | ButtonContainerChildren;
  disabled?: boolean;
  readonly?: boolean;
  hover?: boolean;
  active?: boolean;
  onHover?: () => void;
  onBlur?: () => void;
}

function ButtonContainer(props: ButtonContainerProps, ref: Ref<HTMLElement>) {
  const {
    children,
    disabled = false,
    readonly = false,
    hover: hoverProp,
    active: activeProp,
    onHover,
    onBlur,
    ...other
  } = props;

  const innerRef = useRef<HTMLElement>(null);
  const [activeRef, activeState] = useActive();
  const [hoverRef, hoverState] = useHover({ onHover, onBlur });
  const childrenRef = isValidElement(children) ? children.ref : void 0;
  const active = activeProp ?? activeState;
  const hover = hoverProp ?? hoverState;

  const handleStatefulRef = useForkRef(activeRef, hoverRef);
  const handleUseRef = useForkRef(ref, childrenRef ?? null);
  const handleForeignRef = useForkRef(innerRef, handleUseRef);
  const handleRef = useForkRef(handleForeignRef, handleStatefulRef);

  const ctx = useMemo(
    () => ({ container: innerRef, disabled, readonly, active, hover }),
    [active, disabled, hover, readonly],
  );

  return (
    <ButtonContainerContext.Provider value={ctx}>
      {children instanceof Function
        ? children(handleRef)
        : cloneElement(children, {
            ref: handleRef,
            disabled: disabled || readonly,
            ...other,
          })}
    </ButtonContainerContext.Provider>
  );
}

export default forwardRef(ButtonContainer);
