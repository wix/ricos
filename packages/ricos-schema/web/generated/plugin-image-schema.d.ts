import * as $protobuf from "protobufjs";
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
