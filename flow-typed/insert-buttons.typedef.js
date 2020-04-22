/*::
declare type InsertButton = {
  type?: string,
  name: string,
  tooltipText: string,
  toolbars: Array<TOOLBARS>,
  Icon: Component,
  componentData: any,
  helpers: Helpers,
  t?: Translate,
  modalElement?: Component,
  modalStyles?: any,
};

declare type CreateInsertButtons = ({ 
  helpers: Helpers,
  t: Translate,
  settings: any
}) =>
  Array<InsertButton>;
*/
