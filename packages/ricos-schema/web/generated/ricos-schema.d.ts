import * as $protobuf from "protobufjs";
/** Properties of a RicosContent. */
export interface IRicosContent {

    /** Document root */
    doc?: (IDocument|null);

    /** Last saved selection */
    selection?: (ISelection|null);

    /** Ricos version used to create this schema */
    version?: (string|null);
}

/** Represents a RicosContent. */
export class RicosContent implements IRicosContent {

    /**
     * Constructs a new RicosContent.
     * @param [properties] Properties to set
     */
    constructor(properties?: IRicosContent);

    /** Document root */
    public doc?: (IDocument|null);

    /** Last saved selection */
    public selection?: (ISelection|null);

    /** Ricos version used to create this schema */
    public version: string;

    /**
     * Creates a new RicosContent instance using the specified properties.
     * @param [properties] Properties to set
     * @returns RicosContent instance
     */
    public static create(properties?: IRicosContent): RicosContent;

    /**
     * Encodes the specified RicosContent message. Does not implicitly {@link RicosContent.verify|verify} messages.
     * @param message RicosContent message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IRicosContent, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified RicosContent message, length delimited. Does not implicitly {@link RicosContent.verify|verify} messages.
     * @param message RicosContent message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IRicosContent, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a RicosContent message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns RicosContent
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): RicosContent;

    /**
     * Decodes a RicosContent message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns RicosContent
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): RicosContent;

    /**
     * Verifies a RicosContent message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a RicosContent message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns RicosContent
     */
    public static fromObject(object: { [k: string]: any }): RicosContent;

    /**
     * Creates a plain object from a RicosContent message. Also converts values to other types if specified.
     * @param message RicosContent
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: RicosContent, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this RicosContent to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a Document. */
export interface IDocument {

    /** List of nodes */
    nodes?: (INode[]|null);

    /** Timestamp when the document was last edited */
    lastEdited?: (string|null);
}

/** Represents a Document. */
export class Document implements IDocument {

    /**
     * Constructs a new Document.
     * @param [properties] Properties to set
     */
    constructor(properties?: IDocument);

    /** List of nodes */
    public nodes: INode[];

    /** Timestamp when the document was last edited */
    public lastEdited: string;

    /**
     * Creates a new Document instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Document instance
     */
    public static create(properties?: IDocument): Document;

    /**
     * Encodes the specified Document message. Does not implicitly {@link Document.verify|verify} messages.
     * @param message Document message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IDocument, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Document message, length delimited. Does not implicitly {@link Document.verify|verify} messages.
     * @param message Document message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IDocument, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Document message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Document
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Document;

    /**
     * Decodes a Document message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Document
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Document;

    /**
     * Verifies a Document message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Document message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Document
     */
    public static fromObject(object: { [k: string]: any }): Document;

    /**
     * Creates a plain object from a Document message. Also converts values to other types if specified.
     * @param message Document
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Document, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Document to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a Selection. */
export interface ISelection {

    /** Selection start index */
    anchor?: (number|null);

    /** Selection end index */
    focus?: (number|null);
}

/** Represents a Selection. */
export class Selection implements ISelection {

    /**
     * Constructs a new Selection.
     * @param [properties] Properties to set
     */
    constructor(properties?: ISelection);

    /** Selection start index */
    public anchor: number;

    /** Selection end index */
    public focus: number;

    /**
     * Creates a new Selection instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Selection instance
     */
    public static create(properties?: ISelection): Selection;

    /**
     * Encodes the specified Selection message. Does not implicitly {@link Selection.verify|verify} messages.
     * @param message Selection message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ISelection, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Selection message, length delimited. Does not implicitly {@link Selection.verify|verify} messages.
     * @param message Selection message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ISelection, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Selection message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Selection
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Selection;

    /**
     * Decodes a Selection message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Selection
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Selection;

    /**
     * Verifies a Selection message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Selection message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Selection
     */
    public static fromObject(object: { [k: string]: any }): Selection;

    /**
     * Creates a plain object from a Selection message. Also converts values to other types if specified.
     * @param message Selection
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Selection, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Selection to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a Node. */
export interface INode {

    /** Node type */
    type?: (string|null);

    /** List of child nodes */
    nodes?: (INode[]|null);

    /** Node text */
    text?: (ITextData|null);

    /** Node image */
    image?: (IImageData|null);

    /** Node divider */
    divider?: (IDividerData|null);
}

/** Represents a Node. */
export class Node implements INode {

    /**
     * Constructs a new Node.
     * @param [properties] Properties to set
     */
    constructor(properties?: INode);

    /** Node type. */
    public type: string;

    /** List of child nodes */
    public nodes: INode[];

    /** Node text. */
    public text?: (ITextData|null);

    /** Node image. */
    public image?: (IImageData|null);

    /** Node divider. */
    public divider?: (IDividerData|null);

    /** Node data. */
    public data?: ("text"|"image"|"divider");

    /**
     * Creates a new Node instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Node instance
     */
    public static create(properties?: INode): Node;

    /**
     * Encodes the specified Node message. Does not implicitly {@link Node.verify|verify} messages.
     * @param message Node message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: INode, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Node message, length delimited. Does not implicitly {@link Node.verify|verify} messages.
     * @param message Node message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: INode, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Node message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Node
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Node;

    /**
     * Decodes a Node message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Node
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Node;

    /**
     * Verifies a Node message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Node message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Node
     */
    public static fromObject(object: { [k: string]: any }): Node;

    /**
     * Creates a plain object from a Node message. Also converts values to other types if specified.
     * @param message Node
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Node, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Node to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a TextData. */
export interface ITextData {

    /** Textual data */
    text?: (string|null);

    /** List of decorations */
    decorations?: (IDecoration[]|null);
}

/** Represents a TextData. */
export class TextData implements ITextData {

    /**
     * Constructs a new TextData.
     * @param [properties] Properties to set
     */
    constructor(properties?: ITextData);

    /** Textual data */
    public text: string;

    /** List of decorations */
    public decorations: IDecoration[];

    /**
     * Creates a new TextData instance using the specified properties.
     * @param [properties] Properties to set
     * @returns TextData instance
     */
    public static create(properties?: ITextData): TextData;

    /**
     * Encodes the specified TextData message. Does not implicitly {@link TextData.verify|verify} messages.
     * @param message TextData message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ITextData, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified TextData message, length delimited. Does not implicitly {@link TextData.verify|verify} messages.
     * @param message TextData message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ITextData, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a TextData message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns TextData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): TextData;

    /**
     * Decodes a TextData message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns TextData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): TextData;

    /**
     * Verifies a TextData message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a TextData message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns TextData
     */
    public static fromObject(object: { [k: string]: any }): TextData;

    /**
     * Creates a plain object from a TextData message. Also converts values to other types if specified.
     * @param message TextData
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: TextData, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this TextData to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a Decoration. */
export interface IDecoration {

    /** Decoration type */
    type?: (string|null);

    /** This object is controlled entirely by the decorator. Use it to store any data necessary to run the decorator */
    data?: (google.protobuf.IAny|null);
}

/** Represents a Decoration. */
export class Decoration implements IDecoration {

    /**
     * Constructs a new Decoration.
     * @param [properties] Properties to set
     */
    constructor(properties?: IDecoration);

    /** Decoration type. */
    public type: string;

    /** This object is controlled entirely by the decorator. Use it to store any data necessary to run the decorator */
    public data?: (google.protobuf.IAny|null);

    /**
     * Creates a new Decoration instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Decoration instance
     */
    public static create(properties?: IDecoration): Decoration;

    /**
     * Encodes the specified Decoration message. Does not implicitly {@link Decoration.verify|verify} messages.
     * @param message Decoration message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IDecoration, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Decoration message, length delimited. Does not implicitly {@link Decoration.verify|verify} messages.
     * @param message Decoration message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IDecoration, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Decoration message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Decoration
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Decoration;

    /**
     * Decodes a Decoration message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Decoration
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Decoration;

    /**
     * Verifies a Decoration message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Decoration message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Decoration
     */
    public static fromObject(object: { [k: string]: any }): Decoration;

    /**
     * Creates a plain object from a Decoration message. Also converts values to other types if specified.
     * @param message Decoration
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Decoration, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Decoration to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Namespace google. */
export namespace google {

    /** Namespace protobuf. */
    namespace protobuf {

        /** Properties of an Any. */
        interface IAny {

            /** Any type_url */
            type_url?: (string|null);

            /** Any value */
            value?: (Uint8Array|null);
        }

        /** Represents an Any. */
        class Any implements IAny {

            /**
             * Constructs a new Any.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IAny);

            /** Any type_url. */
            public type_url: string;

            /** Any value. */
            public value: Uint8Array;

            /**
             * Creates a new Any instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Any instance
             */
            public static create(properties?: google.protobuf.IAny): google.protobuf.Any;

            /**
             * Encodes the specified Any message. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
             * @param message Any message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IAny, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Any message, length delimited. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
             * @param message Any message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IAny, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an Any message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Any
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.Any;

            /**
             * Decodes an Any message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Any
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.Any;

            /**
             * Verifies an Any message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an Any message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Any
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.Any;

            /**
             * Creates a plain object from an Any message. Also converts values to other types if specified.
             * @param message Any
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.Any, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Any to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }
}

/** ImageType enum. */
export enum ImageType {
    DOUBLE = 0,
    SINGLE = 1,
    DASHED = 2,
    DOTTED = 3
}

/** ImageSize enum. */
export enum ImageSize {
    CONTENT = 0,
    SMALL = 1,
    ORIGINAL = 2,
    FULL_WIDTH = 3,
    INLINE = 4
}

/** ImageAlignment enum. */
export enum ImageAlignment {
    LEFT = 0,
    RIGHT = 1,
    CENTER = 2
}

/** Represents an ImageLink. */
export class ImageLink implements IImageLink {

    /**
     * Constructs a new ImageLink.
     * @param [properties] Properties to set
     */
    constructor(properties?: IImageLink);

    /** ImageLink url. */
    public url: string;

    /** ImageLink target. */
    public target: ImageLink.Target;

    /** ImageLink rel. */
    public rel: string;

    /**
     * Creates a new ImageLink instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ImageLink instance
     */
    public static create(properties?: IImageLink): ImageLink;

    /**
     * Encodes the specified ImageLink message. Does not implicitly {@link ImageLink.verify|verify} messages.
     * @param message ImageLink message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IImageLink, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified ImageLink message, length delimited. Does not implicitly {@link ImageLink.verify|verify} messages.
     * @param message ImageLink message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IImageLink, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an ImageLink message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ImageLink
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ImageLink;

    /**
     * Decodes an ImageLink message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ImageLink
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ImageLink;

    /**
     * Verifies an ImageLink message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an ImageLink message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ImageLink
     */
    public static fromObject(object: { [k: string]: any }): ImageLink;

    /**
     * Creates a plain object from an ImageLink message. Also converts values to other types if specified.
     * @param message ImageLink
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: ImageLink, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this ImageLink to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

export namespace ImageLink {

    /** Target enum. */
    enum Target {
        BLANK = 0,
        SELF = 1,
        TOP = 2
    }
}

/** Represents an ImageConfig. */
export class ImageConfig implements IImageConfig {

    /**
     * Constructs a new ImageConfig.
     * @param [properties] Properties to set
     */
    constructor(properties?: IImageConfig);

    /** ImageConfig size. */
    public size: ImageSize;

    /** ImageConfig alignment. */
    public alignment: ImageAlignment;

    /** ImageConfig showTitle. */
    public showTitle: boolean;

    /** ImageConfig showDescription. */
    public showDescription: boolean;

    /** ImageConfig anchor. */
    public anchor: string;

    /** ImageConfig link. */
    public link?: (IImageLink|null);

    /**
     * Creates a new ImageConfig instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ImageConfig instance
     */
    public static create(properties?: IImageConfig): ImageConfig;

    /**
     * Encodes the specified ImageConfig message. Does not implicitly {@link ImageConfig.verify|verify} messages.
     * @param message ImageConfig message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IImageConfig, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified ImageConfig message, length delimited. Does not implicitly {@link ImageConfig.verify|verify} messages.
     * @param message ImageConfig message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IImageConfig, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an ImageConfig message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ImageConfig
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ImageConfig;

    /**
     * Decodes an ImageConfig message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ImageConfig
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ImageConfig;

    /**
     * Verifies an ImageConfig message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an ImageConfig message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ImageConfig
     */
    public static fromObject(object: { [k: string]: any }): ImageConfig;

    /**
     * Creates a plain object from an ImageConfig message. Also converts values to other types if specified.
     * @param message ImageConfig
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: ImageConfig, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this ImageConfig to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents an ImageSource. */
export class ImageSource implements IImageSource {

    /**
     * Constructs a new ImageSource.
     * @param [properties] Properties to set
     */
    constructor(properties?: IImageSource);

    /** ImageSource id. */
    public id: string;

    /** ImageSource originalFileName. */
    public originalFileName: string;

    /** ImageSource fileName. */
    public fileName: string;

    /** ImageSource width. */
    public width: number;

    /** ImageSource height. */
    public height: number;

    /**
     * Creates a new ImageSource instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ImageSource instance
     */
    public static create(properties?: IImageSource): ImageSource;

    /**
     * Encodes the specified ImageSource message. Does not implicitly {@link ImageSource.verify|verify} messages.
     * @param message ImageSource message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IImageSource, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified ImageSource message, length delimited. Does not implicitly {@link ImageSource.verify|verify} messages.
     * @param message ImageSource message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IImageSource, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an ImageSource message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ImageSource
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ImageSource;

    /**
     * Decodes an ImageSource message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ImageSource
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ImageSource;

    /**
     * Verifies an ImageSource message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an ImageSource message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ImageSource
     */
    public static fromObject(object: { [k: string]: any }): ImageSource;

    /**
     * Creates a plain object from an ImageSource message. Also converts values to other types if specified.
     * @param message ImageSource
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: ImageSource, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this ImageSource to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents an ImageMetadata. */
export class ImageMetadata implements IImageMetadata {

    /**
     * Constructs a new ImageMetadata.
     * @param [properties] Properties to set
     */
    constructor(properties?: IImageMetadata);

    /** ImageMetadata alt. */
    public alt: string;

    /** ImageMetadata caption. */
    public caption: string;

    /**
     * Creates a new ImageMetadata instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ImageMetadata instance
     */
    public static create(properties?: IImageMetadata): ImageMetadata;

    /**
     * Encodes the specified ImageMetadata message. Does not implicitly {@link ImageMetadata.verify|verify} messages.
     * @param message ImageMetadata message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IImageMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified ImageMetadata message, length delimited. Does not implicitly {@link ImageMetadata.verify|verify} messages.
     * @param message ImageMetadata message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IImageMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an ImageMetadata message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ImageMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ImageMetadata;

    /**
     * Decodes an ImageMetadata message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ImageMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ImageMetadata;

    /**
     * Verifies an ImageMetadata message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an ImageMetadata message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ImageMetadata
     */
    public static fromObject(object: { [k: string]: any }): ImageMetadata;

    /**
     * Creates a plain object from an ImageMetadata message. Also converts values to other types if specified.
     * @param message ImageMetadata
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: ImageMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this ImageMetadata to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents an ImageData. */
export class ImageData implements IImageData {

    /**
     * Constructs a new ImageData.
     * @param [properties] Properties to set
     */
    constructor(properties?: IImageData);

    /** ImageData config. */
    public config?: (IImageConfig|null);

    /** ImageData src. */
    public src?: (IImageSource|null);

    /** ImageData metadata. */
    public metadata?: (IImageMetadata|null);

    /**
     * Creates a new ImageData instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ImageData instance
     */
    public static create(properties?: IImageData): ImageData;

    /**
     * Encodes the specified ImageData message. Does not implicitly {@link ImageData.verify|verify} messages.
     * @param message ImageData message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IImageData, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified ImageData message, length delimited. Does not implicitly {@link ImageData.verify|verify} messages.
     * @param message ImageData message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IImageData, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an ImageData message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ImageData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ImageData;

    /**
     * Decodes an ImageData message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ImageData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ImageData;

    /**
     * Verifies an ImageData message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an ImageData message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ImageData
     */
    public static fromObject(object: { [k: string]: any }): ImageData;

    /**
     * Creates a plain object from an ImageData message. Also converts values to other types if specified.
     * @param message ImageData
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: ImageData, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this ImageData to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** DividerType enum. */
export enum DividerType {
    DOUBLE = 0,
    SINGLE = 1,
    DASHED = 2,
    DOTTED = 3
}

/** DividerSize enum. */
export enum DividerSize {
    SMALL = 0,
    MEDIUM = 1,
    LARGE = 2
}

/** DividerAlignment enum. */
export enum DividerAlignment {
    LEFT = 0,
    RIGHT = 1,
    CENTER = 2
}

/** Represents a DividerConfig. */
export class DividerConfig implements IDividerConfig {

    /**
     * Constructs a new DividerConfig.
     * @param [properties] Properties to set
     */
    constructor(properties?: IDividerConfig);

    /** DividerConfig size. */
    public size: DividerSize;

    /** DividerConfig alignment. */
    public alignment: DividerAlignment;

    /** DividerConfig textWrap. */
    public textWrap: string;

    /**
     * Creates a new DividerConfig instance using the specified properties.
     * @param [properties] Properties to set
     * @returns DividerConfig instance
     */
    public static create(properties?: IDividerConfig): DividerConfig;

    /**
     * Encodes the specified DividerConfig message. Does not implicitly {@link DividerConfig.verify|verify} messages.
     * @param message DividerConfig message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IDividerConfig, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified DividerConfig message, length delimited. Does not implicitly {@link DividerConfig.verify|verify} messages.
     * @param message DividerConfig message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IDividerConfig, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a DividerConfig message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns DividerConfig
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): DividerConfig;

    /**
     * Decodes a DividerConfig message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns DividerConfig
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): DividerConfig;

    /**
     * Verifies a DividerConfig message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a DividerConfig message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns DividerConfig
     */
    public static fromObject(object: { [k: string]: any }): DividerConfig;

    /**
     * Creates a plain object from a DividerConfig message. Also converts values to other types if specified.
     * @param message DividerConfig
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: DividerConfig, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this DividerConfig to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a DividerData. */
export class DividerData implements IDividerData {

    /**
     * Constructs a new DividerData.
     * @param [properties] Properties to set
     */
    constructor(properties?: IDividerData);

    /** DividerData type. */
    public type: DividerType;

    /** DividerData config. */
    public config?: (IDividerConfig|null);

    /**
     * Creates a new DividerData instance using the specified properties.
     * @param [properties] Properties to set
     * @returns DividerData instance
     */
    public static create(properties?: IDividerData): DividerData;

    /**
     * Encodes the specified DividerData message. Does not implicitly {@link DividerData.verify|verify} messages.
     * @param message DividerData message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IDividerData, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified DividerData message, length delimited. Does not implicitly {@link DividerData.verify|verify} messages.
     * @param message DividerData message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IDividerData, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a DividerData message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns DividerData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): DividerData;

    /**
     * Decodes a DividerData message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns DividerData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): DividerData;

    /**
     * Verifies a DividerData message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a DividerData message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns DividerData
     */
    public static fromObject(object: { [k: string]: any }): DividerData;

    /**
     * Creates a plain object from a DividerData message. Also converts values to other types if specified.
     * @param message DividerData
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: DividerData, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this DividerData to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}
