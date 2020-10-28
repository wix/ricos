export interface BICallbacks {
  onPluginAdd?(pluginId: string, entryPoint: string, version: string): void;
  onPluginAddSuccess?(pluginId: string, entryPoint: string, version: string): void;
  onPluginDelete?(pluginId: string, version: string): void;
  onPublish?(
    postId: string,
    pluginsCount: Record<string, number> | undefined,
    pluginsDetails:
      | {
          type: string;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data: any;
        }[]
      | undefined,
    version: string
  ): void;
  onViewerAction?(pluginId: string, actionName: string, value: string): void;
  onPluginChange?(
    pluginId: string,
    changeObject: { from: string; to: string },
    version: string
  ): void;
  onMediaUploadStart?(
    correlationId: string,
    pluginId: string,
    fileSize: number | undefined,
    mediaType: string | undefined,
    version: string
  ): void;
  onMediaUploadEnd?(
    correlationId: string,
    pluginId: string,
    duration: number,
    fileSize: number,
    mediaType: string,
    isSuccess: boolean,
    version: string,
    errorType?: string | number
  ): void;
}
