import {
  convertRelObjectToString,
  convertRelStringToObject,
  convertTargetStringToBoolean,
  convertTargetBooleanToString,
  getRelValue,
  getTargetValue,
} from '../../lib/linkConverters';

const relString = 'nofollow sponsored ugc';
const relObject = { nofollow: true, sponsored: true, ugc: true };
const target1 = '_blank';
const target2 = '_top';
const targetBlank1 = true;
const targetBlank2 = false;
const anchorTarget = '_blank';
const defaultRelValue = 'noopener noreferrer';
const dynamicRelValue = `${defaultRelValue} ${relString}`;

describe('Test link converters', () => {
  it('should convert rel object to string', () => {
    const converted = convertRelObjectToString(relObject);
    expect(converted).toBe(relString);
  });

  it('should convert rel string to object', () => {
    const converted = convertRelStringToObject(relString);
    expect(converted).toEqual(relObject);
  });

  it('should convert target string to boolean', () => {
    const converted = convertTargetStringToBoolean(target1);
    expect(converted).toBe(targetBlank1);
  });

  it('should convert target string to boolean', () => {
    const converted = convertTargetStringToBoolean(target2);
    expect(converted).toBe(targetBlank2);
  });

  it('should convert target boolean to string', () => {
    const converted = convertTargetBooleanToString(targetBlank1, anchorTarget);
    expect(converted).toBe(target1);
  });

  it('should convert target boolean to string', () => {
    const converted = convertTargetBooleanToString(targetBlank2, anchorTarget);
    expect(converted).toBe(target2);
  });

  it('should convert target boolean to string', () => {
    const converted = convertTargetBooleanToString(undefined, undefined);
    expect(converted).toBe(target2);
  });

  it('should get default rel value', () => {
    const converted = getRelValue(undefined);
    expect(converted).toBe(defaultRelValue);
  });

  it('should get dynamic rel value', () => {
    const converted = getRelValue(relString);
    expect(converted).toBe(dynamicRelValue);
  });

  it('should get default target value', () => {
    const converted = getTargetValue(undefined);
    expect(converted).toBe(target2);
  });

  it('should get dynamic target value', () => {
    const converted = getTargetValue(target1);
    expect(converted).toBe(target1);
  });
});
