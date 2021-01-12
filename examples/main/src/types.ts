export type OnVisibilityChanged = (sectionName: string, isVisible: boolean) => void;

export interface SectionSettings {
  name: string;
  active?: any;
  action: (item?: any) => void;
  items?: string[];
}
