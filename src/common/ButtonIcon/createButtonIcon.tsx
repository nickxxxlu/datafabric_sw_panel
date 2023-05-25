import {
  SVGProps as BaseSVGProps,
  ComponentType,
  Ref,
  forwardRef,
  memo,
} from 'react';
import React from 'react';

import ImageIcon, { ImageIconSize } from '../ImageIcon';
import ButtonIcon, {
  ButtonIconProps as BaseButtonIconProps,
} from './ButtonIcon';

interface SVGProps extends BaseSVGProps<SVGSVGElement> {
  title?: string | undefined;
}

interface ButtonIconImages {
  normal: ComponentType<SVGProps> | string;
  disabled?: ComponentType<SVGProps> | string;
  active?: ComponentType<SVGProps> | string;
  hover?: ComponentType<SVGProps> | string;
  readonly?: ComponentType<SVGProps> | string;
}

interface ButtonIconProps
  extends Omit<
    BaseButtonIconProps,
    'disabledNode' | 'activeNode' | 'hoverNode' | 'children'
  > {
  alt?: string;
  size?: ImageIconSize;
}

interface ButtonIconOpts {
  displayName: string;
  defaultAlt: string;
  defaultSize?: ImageIconSize;
}

export default function createButtonIcon(
  images: ButtonIconImages,
  { displayName, defaultAlt, defaultSize }: ButtonIconOpts,
) {
  function Component(props: ButtonIconProps, ref: Ref<HTMLElement>) {
    const { alt: altProp, size: sizeProp } = props;
    const alt = altProp ?? defaultAlt;
    const size = sizeProp ?? defaultSize;
    const imageIconProps = { alt, size };

    function renderImageIcon(image: ComponentType<SVGProps> | string) {
      if (typeof image === 'string') {
        return <ImageIcon src={image} {...imageIconProps} />;
      }
      return <ImageIcon component={image} {...imageIconProps} />;
    }

    return (
      <ButtonIcon
        ref={ref}
        disabledNode={
          images.disabled ? renderImageIcon(images.disabled) : void 0
        }
        readonlyNode={
          images.readonly ? renderImageIcon(images.readonly) : void 0
        }
        activeNode={images.active ? renderImageIcon(images.active) : void 0}
        hoverNode={images.hover ? renderImageIcon(images.hover) : void 0}
        {...props}
      >
        {renderImageIcon(images.normal)}
      </ButtonIcon>
    );
  }

  if (displayName) {
    Component.displayName = displayName;
  }

  return memo(forwardRef(Component));
}
