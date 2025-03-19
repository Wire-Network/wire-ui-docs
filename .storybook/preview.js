// Change the import path to use the published package
import { defineCustomElements } from '@wireio/ui-library/dist/loader';
// or possibly one of these depending on your package structure:
// import { defineCustomElements } from '@wireio/ui-library/loader/index.js';
// import { defineCustomElements } from '@wireio/ui-library/dist/esm/loader';
import React from 'react';

// Register components immediately
if (typeof window !== 'undefined') {
  defineCustomElements(window, {
    resourcesUrl: '/assets/', // Point to where your assets are in the static build
    syncQueue: true,
  }).then(() => {
    console.log('Stencil components registered successfully');
  }).catch(error => {
    console.error('Failed to register Stencil components:', error);
  });
}

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    actions: {
      argTypesRegex: '^on[A-Z].*',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      // Ensure custom elements are properly rendered in docs
      source: {
        type: 'dynamic',
        excludeDecorators: true,
      },
    },
  },
};

// Add this to help React work better with web components
if (typeof window !== 'undefined') {
  window.React = React; // Ensure React is available globally
}

export default preview;
