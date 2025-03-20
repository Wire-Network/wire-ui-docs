import '@wireio/ui-library/dist/wire-ui/wire-ui.css';
import { defineCustomElements } from '@wireio/ui-library/dist/loader';
import React from 'react';

// Create a global promise to track component registration
let componentRegistrationPromise = null;
let isRegistering = false;

// Function to register components
const registerComponents = async () => {
  if (isRegistering) {
    return componentRegistrationPromise;
  }

  if (componentRegistrationPromise) {
    return componentRegistrationPromise;
  }

  isRegistering = true;
  
  try {
    componentRegistrationPromise = defineCustomElements(window, {
      resourcesUrl: '/assets/',
      syncQueue: true,
    }).then(() => {
      isRegistering = false;
    }).catch(error => {
      console.error('Failed to register Stencil components:', error);
      componentRegistrationPromise = null;
      isRegistering = false;
    });
    
    return componentRegistrationPromise;
  } catch (error) {
    console.error('Error during registration setup:', error);
    componentRegistrationPromise = null;
    isRegistering = false;
    throw error;
  }
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
      },
      inlineStories: false,
      iframeHeight: 400,
      transformSource: (src) => {
        return src.replace(/console\.log\([^)]*\);/g, '');
      }
    },
    options: {
      storySort: {
        order: ['Introduction', 'Guides', 'Components', '*']
      }
    },
    previewTabs: {
      'storybook/docs/panel': {
        index: -1
      }
    },
    viewMode: 'docs',
    defaultPath: '/docs/introduction--introduction'
  },
  // Add decorator to ensure components are registered before each story
  decorators: [
    function StoryDecorator(Story) {
      React.useEffect(() => {
        // Only attempt registration if no components are registered
        if (!window.customElements || Object.keys(window.customElements).length === 0) {
          registerComponents();
        }

        // Cleanup function
        return () => {
          // Don't do any cleanup here - let the components stay registered
        };
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

