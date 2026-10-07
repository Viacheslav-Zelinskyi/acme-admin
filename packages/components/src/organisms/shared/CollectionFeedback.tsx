import { Spinner } from '../../atoms/Spinner';
import { Text } from '../../atoms/Text';
import './CollectionFeedback.css';

export interface CollectionFeedbackProps {
  kind: 'loading' | 'empty';
  message?: string;
}

/** Internal helper: shared loading / empty states for collection organisms */
export function CollectionFeedback({ kind, message = 'Nothing to show.' }: CollectionFeedbackProps) {
  return (
    <div className="ui-collection-feedback">
      {kind === 'loading' ? <Spinner label="Loading users" /> : <Text tone="muted">{message}</Text>}
    </div>
  );
}
