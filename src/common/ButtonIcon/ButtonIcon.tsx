import {
  Theme,
  createStyles,
  makeStyles,
  useControlled,
} from '@material-ui/core';
import clsx from 'clsx';
import React, {
  DOMAttributes,
  ReactElement,
  Ref,
  forwardRef,
  memo,
  useEffect,
} from 'react';

import { useButtonContainer } from '../ButtonContainer';
import { spacing } from '../styles';

const useStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      /* Styles applied to the span element that wraps the children. */
      root: {
        display: 'inherit',
        alignItems: 'inherit',
        justifyContent: 'inherit',
        position: 'relative',
      },
      /* 防止因為修改 HTML Element，導致重複觸發 mouseover 事件 */
      surface: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
      marginRight: {
        marginRight: spacing.spacingS,
      },
    }),
  { name: 'ButtonIcon' },
);

interface NodeProps
  extends Pick<
    DOMAttributes<Element>,
    'onMouseDown' | 'onMouseUp' | 'onMouseEnter' | 'onMouseLeave'
  > {}

export interface ButtonIconProps {
  disabled?: boolean;
  readonly?: boolean;
  active?: boolean;
  hover?: boolean;
  disabledNode?: ReactElement<NodeProps>;
  readonlyNode?: ReactElement<NodeProps>;
  activeNode?: ReactElement<NodeProps>;
  hoverNode?: ReactElement<NodeProps>;
  children: ReactElement<NodeProps>;
  className?: string;
  marginRight?: boolean;
}

function ButtonIcon(props: ButtonIconProps, ref: Ref<HTMLElement>) {
  const {
    disabled: disabledProp,
    readonly: readonlyProp,
    active: activeProp,
    hover: hoverProp,
    disabledNode,
    readonlyNode,
    activeNode,
    hoverNode,
    children,
    className: classNameProp,
    marginRight,
  } = props;

  const classes = useStyles();
  const className = clsx(
    classes.root,
    {
      [classes.marginRight]: marginRight,
    },
    classNameProp,
  );

  const {
    disabled: disabledCtx,
    readonly: readonlyCtx,
    active: activeCtx,
    hover: hoverCtx,
  } = useButtonContainer();

  const [disabled, setDisabledState] = useControlled({
    controlled: disabledProp,
    default: false,
    name: 'ButtonIcon',
    state: 'disabled',
  });

  const [readonly, setReadonlyState] = useControlled({
    controlled: readonlyProp,
    default: false,
    name: 'ButtonIcon',
    state: 'disabled',
  });

  const [active, setActiveState] = useControlled({
    controlled: activeProp,
    default: false,
    name: 'ButtonIcon',
    state: 'active',
  });

  const [hover, setHoverState] = useControlled({
    controlled: hoverProp,
    default: false,
    name: 'ButtonIcon',
    state: 'hover',
  });

  useEffect(() => setDisabledState(disabledCtx), [
    disabledCtx,
    setDisabledState,
  ]);
  useEffect(() => setReadonlyState(readonlyCtx), [
    readonlyCtx,
    setReadonlyState,
  ]);
  useEffect(() => setActiveState(activeCtx), [activeCtx, setActiveState]);
  useEffect(() => setHoverState(hoverCtx), [hoverCtx, setHoverState]);

  let node = children;
  if (disabled) {
    node = disabledNode ?? node;
  } else if (readonly) {
    node = readonlyNode ?? node;
  } else if (active && activeNode) {
    node = activeNode;
  } else if (hover && hoverNode) {
    node = hoverNode;
  }

  return (
    <span ref={ref} className={className}>
      {node}
      <span className={classes.surface} />
    </span>
  );
}

export default memo(forwardRef(ButtonIcon));
