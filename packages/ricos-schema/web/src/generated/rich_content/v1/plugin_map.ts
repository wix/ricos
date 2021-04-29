/* eslint-disable */
import { PluginContainerData } from '../../rich_content/v1/common';

export interface MapData {
  containerData?: PluginContainerData;
  zoom?: number;
  config?: MapConfig;
  mapSettings?: MapSettings;
}

export interface MapConfig {
  height?: number;
  width?: number;
}

export interface MapSettings {
  address?: string;
  isDraggingAllowed?: boolean;
  isMarkerShown?: boolean;
  isStreetViewControlShown?: boolean;
  isZoomControlShown?: boolean;
  lat?: number;
  lng?: number;
  locationDisplayName?: string;
  mode?: string;
  zoom?: number;
}

const baseMapData: object = {};

export const MapData = {
  fromJSON(object: any): MapData {
    const message = { ...baseMapData } as MapData;
    if (object.containerData !== undefined && object.containerData !== null) {
      message.containerData = PluginContainerData.fromJSON(object.containerData);
    } else {
      message.containerData = undefined;
    }
    if (object.zoom !== undefined && object.zoom !== null) {
      message.zoom = Number(object.zoom);
    } else {
      message.zoom = undefined;
    }
    if (object.config !== undefined && object.config !== null) {
      message.config = MapConfig.fromJSON(object.config);
    } else {
      message.config = undefined;
    }
    if (object.mapSettings !== undefined && object.mapSettings !== null) {
      message.mapSettings = MapSettings.fromJSON(object.mapSettings);
    } else {
      message.mapSettings = undefined;
    }
    return message;
  },

  toJSON(message: MapData): unknown {
    const obj: any = {};
    message.containerData !== undefined &&
      (obj.containerData = message.containerData
        ? PluginContainerData.toJSON(message.containerData)
        : undefined);
    message.zoom !== undefined && (obj.zoom = message.zoom);
    message.config !== undefined &&
      (obj.config = message.config ? MapConfig.toJSON(message.config) : undefined);
    message.mapSettings !== undefined &&
      (obj.mapSettings = message.mapSettings ? MapSettings.toJSON(message.mapSettings) : undefined);
    return obj;
  },
};

const baseMapConfig: object = {};

export const MapConfig = {
  fromJSON(object: any): MapConfig {
    const message = { ...baseMapConfig } as MapConfig;
    if (object.height !== undefined && object.height !== null) {
      message.height = Number(object.height);
    } else {
      message.height = undefined;
    }
    if (object.width !== undefined && object.width !== null) {
      message.width = Number(object.width);
    } else {
      message.width = undefined;
    }
    return message;
  },

  toJSON(message: MapConfig): unknown {
    const obj: any = {};
    message.height !== undefined && (obj.height = message.height);
    message.width !== undefined && (obj.width = message.width);
    return obj;
  },
};

const baseMapSettings: object = {};

export const MapSettings = {
  fromJSON(object: any): MapSettings {
    const message = { ...baseMapSettings } as MapSettings;
    if (object.address !== undefined && object.address !== null) {
      message.address = String(object.address);
    } else {
      message.address = undefined;
    }
    if (object.isDraggingAllowed !== undefined && object.isDraggingAllowed !== null) {
      message.isDraggingAllowed = Boolean(object.isDraggingAllowed);
    } else {
      message.isDraggingAllowed = undefined;
    }
    if (object.isMarkerShown !== undefined && object.isMarkerShown !== null) {
      message.isMarkerShown = Boolean(object.isMarkerShown);
    } else {
      message.isMarkerShown = undefined;
    }
    if (object.isStreetViewControlShown !== undefined && object.isStreetViewControlShown !== null) {
      message.isStreetViewControlShown = Boolean(object.isStreetViewControlShown);
    } else {
      message.isStreetViewControlShown = undefined;
    }
    if (object.isZoomControlShown !== undefined && object.isZoomControlShown !== null) {
      message.isZoomControlShown = Boolean(object.isZoomControlShown);
    } else {
      message.isZoomControlShown = undefined;
    }
    if (object.lat !== undefined && object.lat !== null) {
      message.lat = Number(object.lat);
    } else {
      message.lat = undefined;
    }
    if (object.lng !== undefined && object.lng !== null) {
      message.lng = Number(object.lng);
    } else {
      message.lng = undefined;
    }
    if (object.locationDisplayName !== undefined && object.locationDisplayName !== null) {
      message.locationDisplayName = String(object.locationDisplayName);
    } else {
      message.locationDisplayName = undefined;
    }
    if (object.mode !== undefined && object.mode !== null) {
      message.mode = String(object.mode);
    } else {
      message.mode = undefined;
    }
    if (object.zoom !== undefined && object.zoom !== null) {
      message.zoom = Number(object.zoom);
    } else {
      message.zoom = undefined;
    }
    return message;
  },

  toJSON(message: MapSettings): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.isDraggingAllowed !== undefined && (obj.isDraggingAllowed = message.isDraggingAllowed);
    message.isMarkerShown !== undefined && (obj.isMarkerShown = message.isMarkerShown);
    message.isStreetViewControlShown !== undefined &&
      (obj.isStreetViewControlShown = message.isStreetViewControlShown);
    message.isZoomControlShown !== undefined &&
      (obj.isZoomControlShown = message.isZoomControlShown);
    message.lat !== undefined && (obj.lat = message.lat);
    message.lng !== undefined && (obj.lng = message.lng);
    message.locationDisplayName !== undefined &&
      (obj.locationDisplayName = message.locationDisplayName);
    message.mode !== undefined && (obj.mode = message.mode);
    message.zoom !== undefined && (obj.zoom = message.zoom);
    return obj;
  },
};
