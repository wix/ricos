import { DEFAULTS, ALIGNMENTS, SIZE_LARGE, SIZES } from '../constants';

export const getNextValue = (array, currentValue) =>
  array[(array.indexOf(currentValue) + 1) % array.length];

export class Divider {
  constructor({ type, config } = {}) {
    this.type = type || DEFAULTS.type;
    this.config = { ...DEFAULTS.config, ...config };
    this.size = this.config.size;
    this.alignment = this.config.alignment;
  }

  getNextAlignmentConfig = () => {
    const alignment = getNextValue(ALIGNMENTS, this.config.alignment);
    return { ...this.config, alignment };
  };

  getNextSizeConfig = () => {
    const size = getNextValue(SIZES, this.config.size);
    return { ...this.config, size };
  };

  isAlignmentDisabled = () => this.size === SIZE_LARGE;
}
