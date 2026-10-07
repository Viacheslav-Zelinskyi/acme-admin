import { useState } from 'react';
import { cx } from '../../utils/cx';
import './Avatar.css';

export type AvatarSize = 'sm' | 'md' | 'lg';

export interface AvatarProps {
  name: string;
  src?: string;
  size?: AvatarSize;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  const first = parts[0][0];
  const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return (first + last).toUpperCase();
}

/** Shows the image when it loads, otherwise falls back to the user's initials */
export function Avatar({ name, src, size = 'md' }: AvatarProps) {
  // Remember which URL failed so a new `src` gets a fresh attempt without an effect
  const [failedSrc, setFailedSrc] = useState<string>();
  const showImage = Boolean(src) && src !== failedSrc;

  return (
    <span role="img" aria-label={name} className={cx('ui-avatar', `ui-avatar--${size}`)}>
      {showImage ? (
        <img src={src} alt="" onError={() => setFailedSrc(src)} />
      ) : (
        <span aria-hidden="true">{getInitials(name)}</span>
      )}
    </span>
  );
}
