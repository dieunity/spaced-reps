import { style } from '@vanilla-extract/css';
import { relative } from 'path';

import { themeClass, vars } from '~/styles/index.css';

export const searchFieldWrapper = style({
  position: 'relative',
  width: '100%',
  display: 'flex',
});

export const input = style({
  backgroundColor: '#52324d',
  display: 'grid',
  width: '100%',
  fontFamily: vars.font.body,
  color: '#fff',
  padding: 10,
  paddingLeft: 40, // accounts for search icon taking up left side of input
  borderBottom: '1px solid #5a5a5a',
  border: 0,
  borderRadius: '8px',
  '::placeholder': { color: '#fff', opacity: 0.6 },
});

export const searchIcon = style({
  position: 'absolute',
  height: 24,
  top: '25%',
  left: '8px',
  fill: '#000000',
});
