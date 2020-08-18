import React from 'react';

import Button from './Button';

export default {
  title: 'Components/Button',
  component: Button
  // argTypes: {
  //   backgroundColor: { control: 'color' }
  // }
};

const Template = ({ children, ...args }) => <Button {...args}> {children}</Button>;

export const Primary = Template.bind({});
