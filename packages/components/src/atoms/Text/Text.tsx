import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import './Text.css';

export type TextTag = 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4';
export type TextVariant = 'display' | 'title' | 'body' | 'caption';
export type TextTone = 'default' | 'muted' | 'danger' | 'success';

export interface TextProps {
  /** Semantic element; independent from the visual variant */
  as?: TextTag;
  variant?: TextVariant;
  tone?: TextTone;
  /** Single line with an ellipsis */
  truncate?: boolean;
  className?: string;
  children?: ReactNode;
}

export function Text({
  as: Tag = 'p',
  variant = 'body',
  tone = 'default',
  truncate,
  className,
  children,
}: TextProps) {
  return (
    <Tag
      className={cx(
        'ui-text',
        `ui-text--${variant}`,
        `ui-text--${tone}`,
        truncate && 'ui-text--truncate',
        className,
      )}
    >
      {children}
    </Tag>
  );
}
