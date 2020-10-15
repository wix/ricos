const isUndefined = val => val === undefined;
const isDefined = val => !isUndefined(val);

const validate = ({ targetBlank, nofollow, target, rel }) =>
  isUndefined(targetBlank) && isUndefined(nofollow) && isDefined(target) && isDefined(rel);

const linkDataNormalizer = (
  componentData,
  { anchorTarget, relValue }: { anchorTarget: string; relValue: string }
) => {
  // converts { targetBlank, nofollow } => { target, rel }
  const { targetBlank, nofollow, ...rest } = componentData;
  if (validate(componentData)) {
    return componentData;
  }

  return {
    ...rest,
    target: targetBlank ? '_blank' : anchorTarget || '_self',
    rel: nofollow ? 'nofollow' : relValue || 'noopener',
  };
};

export default linkDataNormalizer;
