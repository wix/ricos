interface TextStyle {
    textAlignment: "AUTO" | "LEFT" | "RIGHT" | "CENTER" | "JUSTIFY" | "UNRECOGNIZED";
    lineHeight?: string;
    paddingTop?: string;
    paddingBottom?: string;
}
interface Link {
    url: string | undefined;
    anchor: string | undefined;
    customData: string | undefined;
    target?: string;
    rel?: string;
}
interface PluginContainerData {
    width?: PluginContainerData_Width;
    alignment: "CENTER" | "LEFT" | "RIGHT" | "UNRECOGNIZED";
    spoiler?: PluginContainerData_Spoiler;
}
interface PluginContainerData_Spoiler {
    description?: string;
    buttonText?: string;
}
interface PluginContainerData_Width {
    type: "CONTENT" | "SMALL" | "ORIGINAL" | "FULL_WIDTH" | "CUSTOM" | "UNRECOGNIZED";
    customWidth?: number;
}
interface FileSource {
    url?: string;
    custom?: string;
}
interface Media {
    src?: FileSource;
    width?: number;
    height?: number;
}
interface AnchorData {
    anchor: string;
}
interface ColorData {
    background?: string;
    foreground?: string;
}
interface LinkData {
    url: string;
    rel?: string;
    target?: string;
    href?: string;
}
interface MentionData {
    name: string;
    slug: string;
}

interface CodeData {
    textStyle?: TextStyle;
}
interface HeadingData {
    level: number;
    textStyle?: TextStyle;
    indentation?: number;
}
interface ParagraphData {
    textStyle?: TextStyle;
    indentation?: number;
}
interface ButtonData {
    containerData?: PluginContainerData;
    type: "LINK" | "ACTION" | "UNRECOGNIZED";
    styles?: ButtonData_ButtonStyles;
    text?: string;
    link?: Link;
}
interface ButtonData_ButtonStyles {
    borderWidth?: number;
    borderRadius?: number;
    textColor?: string;
    borderColor?: string;
    backgroundColor?: string;
}
interface DividerData {
    containerData?: PluginContainerData;
    type: "SINGLE" | "DOUBLE" | "DASHED" | "DOTTED" | "UNRECOGNIZED";
    width: "LARGE" | "MEDIUM" | "SMALL" | "UNRECOGNIZED";
    alignment: "CENTER" | "LEFT" | "RIGHT" | "UNRECOGNIZED";
}
interface FileData {
    containerData?: PluginContainerData;
    src?: FileSource;
    name?: string;
    type?: string;
    size?: number;
}
interface GalleryData {
    containerData?: PluginContainerData;
    items: GalleryItem[];
    styles?: GalleryStyles;
    config?: GalleryConfig;
}
interface GalleryStyles {
    galleryLayout?: number;
    gallerySizeType?: string;
    gallerySizePx?: number;
    oneRow?: boolean;
    cubeRatio?: number;
    galleryThumbnailsAlignment?: string;
    isVertical?: boolean;
    numberOfImagesPerRow?: number;
    imageMargin?: number;
    thumbnailSpacings?: number;
    cubeType?: string;
    enableInfiniteScroll?: boolean;
    titlePlacement?: string;
    allowHover?: boolean;
    itemClick?: string;
    showArrows?: boolean;
    gridStyle?: number;
    loveButton?: boolean;
    allowSocial?: boolean;
    allowDownload?: boolean;
    cubeImages?: boolean;
    groupSize?: number;
    groupTypes?: string;
    fixedColumns?: number;
    hasThumbnails?: boolean;
    enableScroll?: boolean;
    isGrid?: boolean;
    isSlider?: boolean;
    isColumns?: boolean;
    isSlideshow?: boolean;
    cropOnlyFill?: boolean;
    galleryMargin?: number;
    fullscreen?: boolean;
    mobileSwipeAnimation?: string;
    thumbnailSize?: number;
    gotStyleParams?: boolean;
    showVideoPlayButton?: boolean;
    videoPlay?: string;
    galleryType?: string;
}
interface GalleryConfig {
    layout?: string;
    spacing?: number;
    key?: string;
    disableExpand?: boolean;
}
interface GalleyItemMetadata {
    height?: number;
    width?: number;
    title?: string;
    type?: string;
}
interface GalleryItem {
    metadata?: GalleyItemMetadata;
    itemId?: string;
    url?: string;
    selected?: boolean;
}
interface GiphyData {
    containerData?: PluginContainerData;
    gif?: GIFSource;
}
interface GIFSource {
    height: number;
    width: number;
    originalUrl: string;
    stillUrl: string;
    originalMp4?: string;
    downsizedUrl?: string;
    downsizedStillUrl?: string;
    downsizedSmallMp4?: string;
}
interface HTMLData {
    containerData?: PluginContainerData;
    src: string;
    srcType?: string;
    config?: HTMLConfig;
}
interface HTMLConfig {
    width?: number;
    height?: number;
    safe?: boolean;
}
interface ImageData {
    containerData?: PluginContainerData;
    image?: Media;
    link?: Link;
    disableExpand?: boolean;
    altText?: string;
    caption?: string;
}
interface LinkPreviewData {
    containerData?: PluginContainerData;
    config?: LinkPreviewConfig;
    title?: string;
    thumbnailUrl?: string;
    description?: string;
    providerUrl?: string;
    html?: string;
    socialType?: string;
}
interface LinkPreviewConfig {
    link?: LinkPreviewConfig_Link;
    width?: number;
}
interface LinkPreviewConfig_Link {
    url: string;
    rel?: string;
    target?: string;
}
interface MapData {
    containerData?: PluginContainerData;
    zoom?: number;
    config?: MapConfig;
    mapSettings?: MapSettings;
}
interface MapConfig {
    height?: number;
    width?: number;
}
interface MapSettings {
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
interface PollData {
    config?: PollConfig;
    poll?: Poll;
    layout?: PollWidgetLayout;
    design?: PollWidgetDesign;
    siteToken?: string;
}
interface PollConfig {
    enableVoteRole?: boolean;
}
interface PollOption {
    anonymousCount?: number;
    count?: number;
    id?: string;
    latestVoters: string[];
    mediaId?: string;
    rating?: number;
    title?: string;
}
interface PollSettings {
    multipleVotes?: boolean;
    resultsVisibility: "ALWAYS" | "VOTERS_ONLY" | "ONLY_ME" | "UNRECOGNIZED";
    voteRole: "ALL" | "SITE_MEMBERS" | "UNRECOGNIZED";
    votersDisplay?: boolean;
    votesDisplay?: boolean;
}
interface PollWidgetLayout {
    poll?: PollWidgetLayout_PollLayout;
    option?: PollWidgetLayout_PollOptionLayout;
}
interface PollWidgetLayout_PollLayout {
    type: "LIST" | "GRID" | "UNRECOGNIZED";
    direction: "LTR" | "RTL" | "UNRECOGNIZED";
    enableImage?: boolean;
}
interface PollWidgetLayout_PollOptionLayout {
    enableImage?: boolean;
}
interface Poll {
    anonymousCount?: number;
    count?: number;
    createdBy?: string;
    creatorFlag?: boolean;
    id?: string;
    mediaId?: string;
    options: PollOption[];
    ownVotes: string[];
    title?: string;
    settings?: PollSettings;
}
interface PollWidgetDesign {
    poll?: PollWidgetDesign_PollDesign;
    option?: PollWidgetDesign_PollOptionDesign;
}
interface PollWidgetDesign_PollDesign {
    backgroundType: "COLOR" | "IMAGE" | "GRADIENT" | "UNRECOGNIZED";
    background?: string;
    borderRadius?: number;
}
interface PollWidgetDesign_PollOptionDesign {
    borderRadius?: number;
}
interface VerticalEmbedData {
    type: "PRODUCT" | "EVENT" | "STORE" | "UNRECOGNIZED";
    selectedProduct?: VerticalEmbedData_SelectedProduct;
    config?: VerticalEmbedConfig;
}
interface VerticalEmbedData_SelectedProduct {
    id?: string;
    name?: string;
    imageSrc?: string;
    html?: string;
}
interface VerticalEmbedConfig {
	dummy?: boolean;
}
interface VideoData {
    containerData?: PluginContainerData;
    video?: Media;
    thumbnail?: Media;
}
interface RichContent {
    nodes: Node[];
    metadata?: Metadata;
}
interface Node {
    type: "PARAGRAPH" | "TEXT" | "HEADING" | "BULLET_LIST" | "ORDERED_LIST" | "LIST_ITEM" | "BLOCKQUOTE" | "CODEBLOCK" | "VIDEO" | "DIVIDER" | "FILE" | "GALLERY" | "GIPHY" | "HTML" | "IMAGE" | "LINK_PREVIEW" | "MAP" | "POLL" | "VERTICAL_EMBED" | "BUTTON" | "ACCORDION" | "TABLE" | "UNRECOGNIZED";
    key: string;
    nodes: Node[];
    buttonData?: ButtonData | undefined;
    codeData?: CodeData | undefined;
    dividerData?: DividerData | undefined;
    fileData?: FileData | undefined;
    galleryData?: GalleryData | undefined;
    giphyData?: GiphyData | undefined;
    headingData?: HeadingData | undefined;
    htmlData?: HTMLData | undefined;
    imageData?: ImageData | undefined;
    linkPreviewData?: LinkPreviewData | undefined;
    mapData?: MapData | undefined;
    paragraphData?: ParagraphData | undefined;
    pollData?: PollData | undefined;
    textData?: TextData | undefined;
    verticalEmbedData?: VerticalEmbedData | undefined;
    videoData?: VideoData | undefined;
}
interface TextData {
    text: string;
    decorations: Decoration[];
}
interface Decoration {
    type: "BOLD" | "ITALIC" | "UNDERLINE" | "SPOILER" | "ANCHOR" | "MENTION" | "LINK" | "COLOR" | "UNRECOGNIZED";
    anchorData?: AnchorData | undefined;
    colorData?: ColorData | undefined;
    linkData?: LinkData | undefined;
    mentionData?: MentionData | undefined;
}
interface Metadata {
    createdVersion: string;
    updatedVersion: string;
    updatedDate?: Timestamp;
}
interface Selection {
    anchorNode: string;
    anchorOffset?: number;
    focusNode?: string;
    focusOffset?: number;
}
interface Timestamp {
    seconds: number;
    nanos: number;
}