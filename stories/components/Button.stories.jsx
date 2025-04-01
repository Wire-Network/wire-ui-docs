import React from 'react';
import { fn } from '@storybook/test';
// We no longer need to import and call defineCustomElements here
// as it's now handled centrally in preview.js

export default {
  title: 'Components/Button',
  component: 'wire-button',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A customizable button component with various styles and sizes.',
      },
    },
    options: {
      storySort: {
        order: [
          'Primary',
          'Secondary',
          'Tertiary',
          'Gradient',
          'Small',
          'Medium',
          'Large',
          'Disabled'
        ]
      }
    }
  },
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'The text displayed on the button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Button' },
      },
    },
    role: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary'],
      description: 'The role of the button which determines its style',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
    },
    color: {
      control: { type: 'select' },
      options: ['blue', 'white', 'gradient'],
      description: 'The color of the button. When set, this overrides the role-based color.',
      table: {
        type: { summary: 'string' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'The size of the button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'medium' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the button is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Called when the button is clicked',
      table: {
        type: { summary: 'function' },
      },
    },
    icon: {
      control: { type: 'select' },
      options: ['arrows-left-right', 'bell', 'cardholder', 'chat', 'coin-vertical', 'coin', 'coins', 'copy', 'cube', 'currency-btc', 'currency-eth', 'currency', 'database', 'dots-horizontal', 'dots-vertical'],
      description: 'The icon to display on the button',
      table: {
        type: { summary: 'string' },
      },
    },
    iconPosition: {
      control: { type: 'select' },
      options: ['left', 'right'],
      description: 'The position of the icon on the button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'left' },
      },
    }
  },
};

const Template = (args) => {
  const { ...props } = args;
  
  // Handle the onClick event
  const handleClick = (event) => {
    if (props.onClick) {
      props.onClick(event);
    }
  };
  
  return (
    <wire-button
      role={props.role}
      color={props.color}
      size={props.size}
      icon={props.icon}
      iconPosition={props.iconPosition}
      disabled={props.disabled}
      label={props.label || 'Button'}
      onClick={handleClick}
    />
  );
};

export const Primary = Template.bind({});
Primary.args = {
  role: 'primary',
  label: 'Primary Button',
  onClick: fn(),
};

export const Secondary = Template.bind({});
Secondary.args = {
  role: 'secondary',
  label: 'Secondary Button',
  onClick: fn(),
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  role: 'tertiary',
  label: 'Tertiary Button',
  onClick: fn(),
};

export const FeaturedPrimary = Template.bind({});
FeaturedPrimary.args = {
  role: 'primary',
  color: 'gradient',
  label: 'Primary Button',
  onClick: fn(),
};

export const FeaturedSecondary = Template.bind({});
FeaturedSecondary.args = {
  role: 'secondary',
  color: 'gradient',
  label: 'Secondary Button',
  onClick: fn(),
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'Small Button',
  onClick: fn(),
};

export const Medium = Template.bind({});
Medium.args = {
  size: 'medium',
  label: 'Medium Button',
  onClick: fn(),
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'Large Button',
  onClick: fn(),
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  label: 'Disabled Button',
  onClick: fn(),
}; 