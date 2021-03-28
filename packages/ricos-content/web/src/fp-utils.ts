import { curry, compose } from 'lodash/fp';

// TODO: improve types
export const task = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fork: (reject: (data: unknown) => any, resolve: (data: unknown) => any) => any
) => ({
  fork,
  map(f) {
    return task((rej, res) => this.fork(rej, compose(res, f)));
  },
  chain(t) {
    return task((rej, res) => this.fork(rej, x => t(x).fork(rej, res)));
  },
});

task.of = (data: unknown) => task((rej, res) => res(data));

export const firstResolved = (tasks, i) =>
  tasks[i].fork(
    () => firstResolved(tasks, i + 1),
    data => data
  );

export const either = curry((predicate: (data: unknown) => boolean, data) =>
  task((rej, res) => (predicate(data) ? res(data) : rej(data)))
);
