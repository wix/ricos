/*::
declare type InsertButton = {
  type: BUTTON_TYPES,
  name: string,
  tooltip: string,
  toolbars: Array<TOOLBARS>,
  getIcon: () => Component,
  componentData: any,
  helpers: Helpers,
  t?: Translate,
  modalElement?: Component,
  modalStyles?: any,
  modalStylesFn?: any => any,
};

declare type CreateInsertButtons = ({ 
  helpers: Helpers,
  t: Translate,
  settings: any
}) =>
  Array<InsertButton>;
*/
