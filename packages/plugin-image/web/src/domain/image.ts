import { ComponentData, ImageComponentData } from 'wix-rich-content-common';
import { DEFAULTS } from '../consts';

export class Image {
  config: ComponentData['config'] & {
    size: string;
    alignment: string;
    showTitle: boolean;
    showDescription: boolean;
    link?: { url?: string; target?: string; rel?: string };
  };
  size: string;
  alignment: string;
  showTitle: boolean;
  showDescription: boolean;
  link?: { url?: string; target?: string; rel?: string };
  src?: ImageComponentData & {
    id: string;
    original_file_name: string;
    file_name: string;
    width: number;
    height: number;
  };
  metadata?: { caption?: string; alt?: string };

  constructor({ config }: ComponentData = {}, ImageComponentData) {
    this.config = { ...DEFAULTS.config, ...config };
    this.size = this.config.size;
    this.alignment = this.config.alignment;
    this.showTitle = this.config.showTitle;
    this.showDescription = this.config.showDescription;
    this.src = { ...ImageComponentData };
  }
}
