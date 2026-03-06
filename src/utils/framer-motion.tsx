import { createElement } from 'react';

const NON_DOM_PROPS = ['initial', 'animate', 'transition', 'whileHover', 'whileInView', 'viewport', 'whileTap'];

function createMotionTag(tag: keyof JSX.IntrinsicElements) {
  return ({ children, ...props }: Record<string, unknown>) => {
    const domProps = Object.fromEntries(Object.entries(props).filter(([key]) => !NON_DOM_PROPS.includes(key)));
    return createElement(tag, domProps, children);
  };
}

export const motion = {
  div: createMotionTag('div'),
  p: createMotionTag('p'),
  h1: createMotionTag('h1'),
  article: createMotionTag('article'),
  figure: createMotionTag('figure'),
};
