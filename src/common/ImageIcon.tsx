import { Theme, createStyles, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React, {
  ComponentType,
  Fragment,
  ImgHTMLAttributes,
  ReactNode,
  SVGProps,
  useEffect,
  useState,
} from 'react';

import { spacing } from './styles';

export enum ImageIconSize {
  Small = 'sm',
  Medium = 'md',
  Large = 'lg',
  XLarge = 'xl',
}

const useStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: {
        width: '24px',
        height: '24px',
        objectFit: 'contain',
      },
      [ImageIconSize.Small]: {
        width: '16px',
        height: '16px',
      },
      [ImageIconSize.Medium]: {},
      [ImageIconSize.Large]: {
        width: '32px',
        height: '32px',
      },
      [ImageIconSize.XLarge]: {
        width: '72px',
        height: '72px',
      },
      marginRight: {
        marginRight: spacing.spacingS,
      },
    }),
  { name: 'ImageIcon' },
);

interface ImgImageIconProps extends ImgHTMLAttributes<HTMLImageElement> {
  component?: undefined;
  src: string;
  alt: string;
  size?: ImageIconSize;
  className?: string;
  fallback?: ReactNode;
  marginRight?: boolean;
}

interface SvgImageIconProps extends SVGProps<SVGSVGElement> {
  component: ComponentType<SVGProps<SVGSVGElement> & { title?: string }>;
  src?: undefined;
  alt: string;
  size?: ImageIconSize;
  fallback?: ReactNode;
  marginRight?: boolean;
}

export type ImageIconProps = ImgImageIconProps | SvgImageIconProps;

function ImageIcon(props: ImageIconProps) {
  const classes = useStyles();
  const {
    alt,
    size = ImageIconSize.Medium,
    className: classNameProp,
    fallback,
    marginRight,
    ...extProps
  } = props;
  const className = clsx(
    classes.root,
    classes[size],
    {
      [classes.marginRight]: marginRight,
    },
    classNameProp,
  );

  const [hasError, setHasError] = useState(false);

  useEffect(() => setHasError(false), [extProps.src]);

  if (extProps.src) {
    const { onError, ...other } = extProps;
    const handleError: typeof onError = event => {
      onError?.(event);
      setHasError(true);
    };
    if (hasError && fallback) {
      return <Fragment>{fallback}</Fragment>;
    }

    return (
      <img alt={alt} className={className} onError={handleError} {...other} />
    );
  } else if (extProps.component) {
    const { component: Component, ...other } = extProps;
    return <Component title={alt} className={className} {...other} />;
  }
  return <Fragment>{fallback ?? null}</Fragment>;
}

export default ImageIcon;
