import React from 'react';
import { Button } from '@storybook/react/demo';
import Temp from "../src/components/temp";

export default { title: 'Button' };

export const Tree = () => <Temp />;

export const withEmoji = () => (
  <Button>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </Button>
);
