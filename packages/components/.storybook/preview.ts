import type { Preview } from '@storybook/react';
import '../src/styles/tokens.css';
import './preview.css';

const preview: Preview = {
  parameters: {
    layout: 'padded',
    controls: { expanded: true },
  },
};

export default preview;
