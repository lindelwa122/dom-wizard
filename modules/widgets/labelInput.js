/**
 * LabelInput widget that combines an existing Label and Input into a single container element.
 */

import { Label } from './label';
import { Input } from './input';

export const LabelInput = ({ label, input, styles = {} }) => {
  if (!label || !input)
    throw new TypeError(
      "LabelInput requires both 'label' and 'input' elements.",
    );

  const defaultStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  };

  const containerStyles = { ...defaultStyles, ...styles };

  return {
    tagName: 'div',
    options: { style: containerStyles },
    children: [label, input],
  };
};
