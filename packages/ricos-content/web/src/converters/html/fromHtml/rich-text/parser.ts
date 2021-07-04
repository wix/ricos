import { flow } from 'fp-ts/function';
import { preprocess } from './preprocess';
import { parse } from '../core/parser';

export default flow(preprocess, parse);
