import path from 'path';
import { fileURLToPath } from 'url';

// Use a different variable name to avoid conflicts
const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = path.dirname(currentFilePath);

function getAbsolutePath(value) {
  return path.resolve(currentDirPath, value);
}

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: [
    // Put Introduction first to ensure it's loaded first
    '../stories/Introduction.mdx',
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
    '@storybook/addon-mdx-gfm',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: true,
    defaultName: 'Documentation',
  },
  // Add this to ensure docs are the default view
  features: {
    storyStoreV7: true,
    buildStoriesJson: true,
  },
  staticDirs: [
    // Serve package assets at the /assets path
    { from: '../node_modules/@wireio/ui-library/dist/assets', to: '/assets' }
  ],
  viteFinal: async (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          '@wireio/ui-library': path.resolve(currentDirPath, '../node_modules/@wireio/ui-library')
        }
      },
      optimizeDeps: {
        ...config.optimizeDeps,
        include: ['@wireio/ui-library/dist/index.js'],
        exclude: ['@wireio/ui-library']
      },
      build: {
        ...config.build,
        sourcemap: false,
      },
      server: {
        ...config.server,
        fs: {
          strict: false,
          allow: ['..']
        }
      }
    };
  }
};

export default config; 