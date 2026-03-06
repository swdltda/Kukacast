import { createElement } from 'react';

function createMotionTag(tag: keyof JSX.IntrinsicElements) {
  return ({ children, ...props }: Record<string, unknown>) => {
    const domProps = Object.fromEntries(
      Object.entries(props).filter(([key]) => !['initial', 'animate', 'transition', 'whileHover'].includes(key)),
    );
    return createElement(tag, domProps, children);
  };
}

export const motion = {
  div: createMotionTag('div'),
  p: createMotionTag('p'),
  h1: createMotionTag('h1'),
  article: createMotionTag('article'),
};
