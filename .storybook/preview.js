import '@wireio/ui-library/dist/wire-ui/wire-ui.css';
import { defineCustomElements } from '@wireio/ui-library/dist/loader';
import React from 'react';

// Create a global promise to track component registration
let componentRegistrationPromise = null;

// Function to register components
const registerComponents = async () => {
  if (componentRegistrationPromise) return componentRegistrationPromise;
  
  componentRegistrationPromise = defineCustomElements(window, {
    resourcesUrl: '/assets/',
    syncQueue: true,
  }).then(() => {
    console.log('Stencil components registered successfully');
  }).catch(error => {
    console.error('Failed to register Stencil components:', error);
  });
  
  return componentRegistrationPromise;
};

// Register components immediately
if (typeof window !== 'undefined') {
  registerComponents();
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
      source: {
        type: 'dynamic',
        excludeDecorators: true,
      }
    }
  },
  // Add decorator to ensure components are registered before each story
  decorators: [
    function StoryDecorator(Story) {
      React.useEffect(() => {
        // Force a re-registration on each story change
        componentRegistrationPromise = null;
        registerComponents();
      }, []);

      return React.createElement(Story);
    }
  ]
};

// Add this to help React work better with web components
if (typeof window !== 'undefined') {
  window.React = React;
}

export default preview;
