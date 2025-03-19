import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getAbsolutePath(value) {
  return path.resolve(__dirname, value);
}

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
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
    autodocs: 'tag',
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
          '@wireio/ui-library': path.resolve(__dirname, '../node_modules/@wireio/ui-library')
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