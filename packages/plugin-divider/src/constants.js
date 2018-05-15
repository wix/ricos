export const DIVIDER_TYPE = 'wix-draft-plugin-divider';

export const LINE_SINGLE = 'single';
export const LINE_DOUBLE = 'double';
export const LINE_DASHED = 'dashed';
export const LINE_DOTTED = 'dotted';

export const LINE_TYPES = [LINE_SINGLE, LINE_DOUBLE, LINE_DASHED, LINE_DOTTED];

export const ALIGN_LEFT = 'left';
export const ALIGN_CENTER = 'center';
export const ALIGN_RIGHT = 'right';

export const SIZE_SMALL = 'small';
export const SIZE_MEDIUM = 'medium';
export const SIZE_LARGE = 'large';

export const DEFAULTS = {
  type: LINE_SINGLE,
  config: {
    dividerSize: SIZE_LARGE,
    dividerAlignment: ALIGN_CENTER
  }
};
