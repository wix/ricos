import { Link_Rel } from 'ricos-schema';
import { convertRelObjectToString } from '../../linkUtils';

const isUndefined = val => val === undefined;
const isDefined = val => !isUndefined(val);

const validate = ({ targetBlank, nofollow, target, rel }) =>
  isUndefined(targetBlank) && isUndefined(nofollow) && isDefined(target) && isDefined(rel);

const linkDataNormalizer = (
  componentData,
  { anchorTarget, rel = {} }: { anchorTarget: string; rel: Link_Rel }
) => {
  // converts { targetBlank, nofollow } => { target, rel }
  const { targetBlank, nofollow, ...rest } = componentData;
  if (validate(componentData)) {
    return componentData;
  }

  return {
    target: targetBlank ? '_blank' : anchorTarget || '_self',
    rel: nofollow ? 'nofollow' : convertRelObjectToString(rel),
    ...rest,
  };
};

export default linkDataNormalizer;
