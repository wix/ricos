import * as Long from "long";

import * as $protobuf from "protobufjs";
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

/** Properties of a DividerConfig. */
export interface IDividerConfig {

    /** DividerConfig size */
    size?: (DividerSize|null);

    /** DividerConfig alignment */
    alignment?: (DividerAlignment|null);

    /** DividerConfig textWrap */
    textWrap?: (string|null);
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
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a DividerConfig message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns DividerConfig
     */
    public static fromObject(object: [ 'object' ].<string, any>): DividerConfig;

    /**
     * Creates a plain object from a DividerConfig message. Also converts values to other types if specified.
     * @param message DividerConfig
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: DividerConfig, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this DividerConfig to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}

/** Properties of a DividerData. */
export interface IDividerData {

    /** DividerData type */
    type?: (DividerType|null);

    /** DividerData config */
    config?: (IDividerConfig|null);
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
    public static verify(message: [ 'object' ].<string, any>): (string|null);

    /**
     * Creates a DividerData message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns DividerData
     */
    public static fromObject(object: [ 'object' ].<string, any>): DividerData;

    /**
     * Creates a plain object from a DividerData message. Also converts values to other types if specified.
     * @param message DividerData
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: DividerData, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

    /**
     * Converts this DividerData to JSON.
     * @returns JSON object
     */
    public toJSON(): [ 'object' ].<string, any>;
}
