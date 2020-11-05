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

    /** This object is controlled entirely by the plugin. Use it to store any data necessary to run the plugin */
    image?: (google.protobuf.IAny|null);

    /** Node text */
    text?: (ITextData|null);

    /** List of child nodes */
    nodes?: (INode[]|null);
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

    /** This object is controlled entirely by the plugin. Use it to store any data necessary to run the plugin */
    public image?: (google.protobuf.IAny|null);

    /** Node text. */
    public text?: (ITextData|null);

    /** List of child nodes */
    public nodes: INode[];

    /** Node data. */
    public data?: ("image"|"text");

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
