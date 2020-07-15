import { UniDriver } from '@unidriver/core';

export type TodoAppDriver = {
  getItems: () => Promise<string[]>;
  addItem: (text: string) => Promise<void>;
  deleteItem: (idx: number) => Promise<void>;
  getCount: () => Promise<number>;
  isDone: (idx: number) => Promise<boolean>;
  toggleItem: (idx: number) => Promise<void>;
};

export const todoAppDriver = (wrapper: UniDriver): TodoAppDriver => {
  const base = wrapper.$('.todo-app');
  return {
    getItems: async () => base.$$('.title').text(),
    addItem: async (text: string) => {
      await base.$('input').enterValue(text);
      await base.$('.add').click();
    },
    deleteItem: async (idx: number) =>
      base
        .$$('.item')
        .get(idx)
        .$('.delete')
        .click(),
    getCount: async () => parseInt(await base.$('.count').text(), 10),
    isDone: async (idx: number) => {
      return base
        .$$('.item')
        .get(idx)
        .hasClass('done');
    },
    toggleItem: async (idx: number) =>
      base
        .$$('.item')
        .get(idx)
        .$('.title')
        .click(),
  };
};
