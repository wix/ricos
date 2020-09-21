/* eslint-disable array-callback-return */
import { toInteger } from 'lodash';
import { EXPANDED, FIRST_EXPANDED } from '../defaults';
import { Pair, PairState } from '../types';

export const isExpanded = (pairs: Pair[], expandState: string, key: number | undefined) => {
  if (expandState === FIRST_EXPANDED && pairs[0].key === key) {
    return true;
  }

  return expandState === EXPANDED;
};

export const getPairsAllCollpased = (pairs: Pair[]) => {
  let pairsState = {};
  pairs.map(pair => {
    pairsState = { ...pairsState, [pair.key]: { isExpanded: false } };
  });

  return pairsState;
};

export const getDefaultState = (pairs: Pair[], expandState: string) => {
  let pairsState = {};
  let expandedPairIdx;

  const addPairState = pair => {
    const key = pair.key;
    const isPairExpanded = isExpanded(pairs, expandState, key);
    if (isPairExpanded) {
      expandedPairIdx = key;
    }

    const pairState = {
      isExpanded: isPairExpanded,
    };
    pairsState = { ...pairsState, [key]: pairState };
  };

  pairs.map(addPairState);

  return { pairsState, expandedPairIdx };
};

const getNewPairKey = (pairs: Pair[], prevPairsState: PairState[]) => {
  const pair = pairs.find(
    pair => !Object.entries(prevPairsState).some(pairState => toInteger(pairState[0]) === pair.key)
  );

  return pair?.key;
};

export const onInsertNewPair = (
  pairs: Pair[],
  prevPairsState: PairState[],
  expandState: string,
  expandOnlyOne: boolean,
  isEditor: boolean
) => {
  const key = getNewPairKey(pairs, prevPairsState);

  if (!key) {
    return null;
  }

  const isPairExpanded = isEditor ? true : isExpanded(pairs, expandState, key);
  const pairState = {
    isExpanded: isPairExpanded,
  };

  const pairsState = expandOnlyOne
    ? { ...getPairsAllCollpased(pairs), [key]: pairState }
    : { ...prevPairsState, [key]: pairState };

  const expandedPairIdx = isEditor && key;

  if (isEditor) {
    return { pairsState, expandedPairIdx };
  }

  return { pairsState };
};

export const onDeletePair = (pairs: Pair[], pairsState: PairState[]) => {
  let newPairsState;

  Object.entries(pairsState).some(pairState => {
    const key = toInteger(pairState[0]);
    const isDeletedPair = !pairs.some(pair => pair.key === key);

    if (isDeletedPair) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [key]: _, ...rest } = pairsState;
      newPairsState = rest;
    }
  });

  return newPairsState;
};
