import React from 'react';

import Tooltip from './Tooltip';
import Button from '../buttons/Button';

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  argTypes: {
    enterDelay: { control: 'number' }
  }
};

const Template = ({ ...args }) => {
  return (
    <Tooltip arrow text="Information" {...args}>
      <button>Hover here!</button>
    </Tooltip>
  );
};

export const Primary = Template.bind({});
