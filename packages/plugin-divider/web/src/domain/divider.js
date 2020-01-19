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

  getNextAlignment = () => getNextValue(ALIGNMENTS, this.config.alignment);

  getNextSize = () => getNextValue(SIZES, this.config.size);

  isAlignmentDisabled = () => this.size === SIZE_LARGE;
}
