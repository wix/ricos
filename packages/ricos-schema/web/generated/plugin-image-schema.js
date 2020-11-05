/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

/**
 * ImageType enum.
 * @exports ImageType
 * @enum {number}
 * @property {number} DOUBLE=0 DOUBLE value
 * @property {number} SINGLE=1 SINGLE value
 * @property {number} DASHED=3 DASHED value
 * @property {number} DOTTED=4 DOTTED value
 */
$root.ImageType = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "DOUBLE"] = 0;
    values[valuesById[1] = "SINGLE"] = 1;
    values[valuesById[3] = "DASHED"] = 3;
    values[valuesById[4] = "DOTTED"] = 4;
    return values;
})();

/**
 * ImageSize enum.
 * @exports ImageSize
 * @enum {number}
 * @property {number} CONTENT=0 CONTENT value
 * @property {number} SMALL=1 SMALL value
 * @property {number} ORIGINAL=2 ORIGINAL value
 * @property {number} FULL_WIDTH=3 FULL_WIDTH value
 * @property {number} INLINE=4 INLINE value
 */
$root.ImageSize = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "CONTENT"] = 0;
    values[valuesById[1] = "SMALL"] = 1;
    values[valuesById[2] = "ORIGINAL"] = 2;
    values[valuesById[3] = "FULL_WIDTH"] = 3;
    values[valuesById[4] = "INLINE"] = 4;
    return values;
})();

/**
 * ImageAlignment enum.
 * @exports ImageAlignment
 * @enum {number}
 * @property {number} LEFT=0 LEFT value
 * @property {number} RIGHT=1 RIGHT value
 * @property {number} CENTER=3 CENTER value
 */
$root.ImageAlignment = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "LEFT"] = 0;
    values[valuesById[1] = "RIGHT"] = 1;
    values[valuesById[3] = "CENTER"] = 3;
    return values;
})();

$root.ImageLink = (function() {

    /**
     * Properties of an ImageLink.
     * @exports IImageLink
     * @interface IImageLink
     * @property {string|null} [url] ImageLink url
     * @property {ImageLink.Target|null} [target] ImageLink target
     * @property {string|null} [rel] ImageLink rel
     */

    /**
     * Constructs a new ImageLink.
     * @exports ImageLink
     * @classdesc Represents an ImageLink.
     * @implements IImageLink
     * @constructor
     * @param {IImageLink=} [properties] Properties to set
     */
    function ImageLink(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ImageLink url.
     * @member {string} url
     * @memberof ImageLink
     * @instance
     */
    ImageLink.prototype.url = "";

    /**
     * ImageLink target.
     * @member {ImageLink.Target} target
     * @memberof ImageLink
     * @instance
     */
    ImageLink.prototype.target = 0;

    /**
     * ImageLink rel.
     * @member {string} rel
     * @memberof ImageLink
     * @instance
     */
    ImageLink.prototype.rel = "";

    /**
     * Creates a new ImageLink instance using the specified properties.
     * @function create
     * @memberof ImageLink
     * @static
     * @param {IImageLink=} [properties] Properties to set
     * @returns {ImageLink} ImageLink instance
     */
    ImageLink.create = function create(properties) {
        return new ImageLink(properties);
    };

    /**
     * Encodes the specified ImageLink message. Does not implicitly {@link ImageLink.verify|verify} messages.
     * @function encode
     * @memberof ImageLink
     * @static
     * @param {IImageLink} message ImageLink message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ImageLink.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.url != null && Object.hasOwnProperty.call(message, "url"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.url);
        if (message.target != null && Object.hasOwnProperty.call(message, "target"))
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.target);
        if (message.rel != null && Object.hasOwnProperty.call(message, "rel"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.rel);
        return writer;
    };

    /**
     * Encodes the specified ImageLink message, length delimited. Does not implicitly {@link ImageLink.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ImageLink
     * @static
     * @param {IImageLink} message ImageLink message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ImageLink.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an ImageLink message from the specified reader or buffer.
     * @function decode
     * @memberof ImageLink
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ImageLink} ImageLink
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ImageLink.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ImageLink();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.url = reader.string();
                break;
            case 2:
                message.target = reader.int32();
                break;
            case 3:
                message.rel = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an ImageLink message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ImageLink
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ImageLink} ImageLink
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ImageLink.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an ImageLink message.
     * @function verify
     * @memberof ImageLink
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ImageLink.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.url != null && message.hasOwnProperty("url"))
            if (!$util.isString(message.url))
                return "url: string expected";
        if (message.target != null && message.hasOwnProperty("target"))
            switch (message.target) {
            default:
                return "target: enum value expected";
            case 0:
            case 1:
            case 2:
                break;
            }
        if (message.rel != null && message.hasOwnProperty("rel"))
            if (!$util.isString(message.rel))
                return "rel: string expected";
        return null;
    };

    /**
     * Creates an ImageLink message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ImageLink
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ImageLink} ImageLink
     */
    ImageLink.fromObject = function fromObject(object) {
        if (object instanceof $root.ImageLink)
            return object;
        var message = new $root.ImageLink();
        if (object.url != null)
            message.url = String(object.url);
        switch (object.target) {
        case "BLANK":
        case 0:
            message.target = 0;
            break;
        case "SELF":
        case 1:
            message.target = 1;
            break;
        case "TOP":
        case 2:
            message.target = 2;
            break;
        }
        if (object.rel != null)
            message.rel = String(object.rel);
        return message;
    };

    /**
     * Creates a plain object from an ImageLink message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ImageLink
     * @static
     * @param {ImageLink} message ImageLink
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    ImageLink.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.url = "";
            object.target = options.enums === String ? "BLANK" : 0;
            object.rel = "";
        }
        if (message.url != null && message.hasOwnProperty("url"))
            object.url = message.url;
        if (message.target != null && message.hasOwnProperty("target"))
            object.target = options.enums === String ? $root.ImageLink.Target[message.target] : message.target;
        if (message.rel != null && message.hasOwnProperty("rel"))
            object.rel = message.rel;
        return object;
    };

    /**
     * Converts this ImageLink to JSON.
     * @function toJSON
     * @memberof ImageLink
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ImageLink.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Target enum.
     * @name ImageLink.Target
     * @enum {number}
     * @property {number} BLANK=0 BLANK value
     * @property {number} SELF=1 SELF value
     * @property {number} TOP=2 TOP value
     */
    ImageLink.Target = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "BLANK"] = 0;
        values[valuesById[1] = "SELF"] = 1;
        values[valuesById[2] = "TOP"] = 2;
        return values;
    })();

    return ImageLink;
})();

$root.ImageConfig = (function() {

    /**
     * Properties of an ImageConfig.
     * @exports IImageConfig
     * @interface IImageConfig
     * @property {ImageSize|null} [size] ImageConfig size
     * @property {ImageAlignment|null} [alignment] ImageConfig alignment
     * @property {boolean|null} [showTitle] ImageConfig showTitle
     * @property {boolean|null} [showDescription] ImageConfig showDescription
     * @property {string|null} [anchor] ImageConfig anchor
     * @property {IImageLink|null} [link] ImageConfig link
     */

    /**
     * Constructs a new ImageConfig.
     * @exports ImageConfig
     * @classdesc Represents an ImageConfig.
     * @implements IImageConfig
     * @constructor
     * @param {IImageConfig=} [properties] Properties to set
     */
    function ImageConfig(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ImageConfig size.
     * @member {ImageSize} size
     * @memberof ImageConfig
     * @instance
     */
    ImageConfig.prototype.size = 0;

    /**
     * ImageConfig alignment.
     * @member {ImageAlignment} alignment
     * @memberof ImageConfig
     * @instance
     */
    ImageConfig.prototype.alignment = 0;

    /**
     * ImageConfig showTitle.
     * @member {boolean} showTitle
     * @memberof ImageConfig
     * @instance
     */
    ImageConfig.prototype.showTitle = false;

    /**
     * ImageConfig showDescription.
     * @member {boolean} showDescription
     * @memberof ImageConfig
     * @instance
     */
    ImageConfig.prototype.showDescription = false;

    /**
     * ImageConfig anchor.
     * @member {string} anchor
     * @memberof ImageConfig
     * @instance
     */
    ImageConfig.prototype.anchor = "";

    /**
     * ImageConfig link.
     * @member {IImageLink|null|undefined} link
     * @memberof ImageConfig
     * @instance
     */
    ImageConfig.prototype.link = null;

    /**
     * Creates a new ImageConfig instance using the specified properties.
     * @function create
     * @memberof ImageConfig
     * @static
     * @param {IImageConfig=} [properties] Properties to set
     * @returns {ImageConfig} ImageConfig instance
     */
    ImageConfig.create = function create(properties) {
        return new ImageConfig(properties);
    };

    /**
     * Encodes the specified ImageConfig message. Does not implicitly {@link ImageConfig.verify|verify} messages.
     * @function encode
     * @memberof ImageConfig
     * @static
     * @param {IImageConfig} message ImageConfig message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ImageConfig.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.size != null && Object.hasOwnProperty.call(message, "size"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.size);
        if (message.alignment != null && Object.hasOwnProperty.call(message, "alignment"))
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.alignment);
        if (message.showTitle != null && Object.hasOwnProperty.call(message, "showTitle"))
            writer.uint32(/* id 3, wireType 0 =*/24).bool(message.showTitle);
        if (message.showDescription != null && Object.hasOwnProperty.call(message, "showDescription"))
            writer.uint32(/* id 4, wireType 0 =*/32).bool(message.showDescription);
        if (message.anchor != null && Object.hasOwnProperty.call(message, "anchor"))
            writer.uint32(/* id 5, wireType 2 =*/42).string(message.anchor);
        if (message.link != null && Object.hasOwnProperty.call(message, "link"))
            $root.ImageLink.encode(message.link, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified ImageConfig message, length delimited. Does not implicitly {@link ImageConfig.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ImageConfig
     * @static
     * @param {IImageConfig} message ImageConfig message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ImageConfig.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an ImageConfig message from the specified reader or buffer.
     * @function decode
     * @memberof ImageConfig
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ImageConfig} ImageConfig
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ImageConfig.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ImageConfig();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.size = reader.int32();
                break;
            case 2:
                message.alignment = reader.int32();
                break;
            case 3:
                message.showTitle = reader.bool();
                break;
            case 4:
                message.showDescription = reader.bool();
                break;
            case 5:
                message.anchor = reader.string();
                break;
            case 6:
                message.link = $root.ImageLink.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an ImageConfig message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ImageConfig
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ImageConfig} ImageConfig
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ImageConfig.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an ImageConfig message.
     * @function verify
     * @memberof ImageConfig
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ImageConfig.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.size != null && message.hasOwnProperty("size"))
            switch (message.size) {
            default:
                return "size: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
                break;
            }
        if (message.alignment != null && message.hasOwnProperty("alignment"))
            switch (message.alignment) {
            default:
                return "alignment: enum value expected";
            case 0:
            case 1:
            case 3:
                break;
            }
        if (message.showTitle != null && message.hasOwnProperty("showTitle"))
            if (typeof message.showTitle !== "boolean")
                return "showTitle: boolean expected";
        if (message.showDescription != null && message.hasOwnProperty("showDescription"))
            if (typeof message.showDescription !== "boolean")
                return "showDescription: boolean expected";
        if (message.anchor != null && message.hasOwnProperty("anchor"))
            if (!$util.isString(message.anchor))
                return "anchor: string expected";
        if (message.link != null && message.hasOwnProperty("link")) {
            var error = $root.ImageLink.verify(message.link);
            if (error)
                return "link." + error;
        }
        return null;
    };

    /**
     * Creates an ImageConfig message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ImageConfig
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ImageConfig} ImageConfig
     */
    ImageConfig.fromObject = function fromObject(object) {
        if (object instanceof $root.ImageConfig)
            return object;
        var message = new $root.ImageConfig();
        switch (object.size) {
        case "CONTENT":
        case 0:
            message.size = 0;
            break;
        case "SMALL":
        case 1:
            message.size = 1;
            break;
        case "ORIGINAL":
        case 2:
            message.size = 2;
            break;
        case "FULL_WIDTH":
        case 3:
            message.size = 3;
            break;
        case "INLINE":
        case 4:
            message.size = 4;
            break;
        }
        switch (object.alignment) {
        case "LEFT":
        case 0:
            message.alignment = 0;
            break;
        case "RIGHT":
        case 1:
            message.alignment = 1;
            break;
        case "CENTER":
        case 3:
            message.alignment = 3;
            break;
        }
        if (object.showTitle != null)
            message.showTitle = Boolean(object.showTitle);
        if (object.showDescription != null)
            message.showDescription = Boolean(object.showDescription);
        if (object.anchor != null)
            message.anchor = String(object.anchor);
        if (object.link != null) {
            if (typeof object.link !== "object")
                throw TypeError(".ImageConfig.link: object expected");
            message.link = $root.ImageLink.fromObject(object.link);
        }
        return message;
    };

    /**
     * Creates a plain object from an ImageConfig message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ImageConfig
     * @static
     * @param {ImageConfig} message ImageConfig
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    ImageConfig.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.size = options.enums === String ? "CONTENT" : 0;
            object.alignment = options.enums === String ? "LEFT" : 0;
            object.showTitle = false;
            object.showDescription = false;
            object.anchor = "";
            object.link = null;
        }
        if (message.size != null && message.hasOwnProperty("size"))
            object.size = options.enums === String ? $root.ImageSize[message.size] : message.size;
        if (message.alignment != null && message.hasOwnProperty("alignment"))
            object.alignment = options.enums === String ? $root.ImageAlignment[message.alignment] : message.alignment;
        if (message.showTitle != null && message.hasOwnProperty("showTitle"))
            object.showTitle = message.showTitle;
        if (message.showDescription != null && message.hasOwnProperty("showDescription"))
            object.showDescription = message.showDescription;
        if (message.anchor != null && message.hasOwnProperty("anchor"))
            object.anchor = message.anchor;
        if (message.link != null && message.hasOwnProperty("link"))
            object.link = $root.ImageLink.toObject(message.link, options);
        return object;
    };

    /**
     * Converts this ImageConfig to JSON.
     * @function toJSON
     * @memberof ImageConfig
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ImageConfig.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ImageConfig;
})();

$root.ImageSource = (function() {

    /**
     * Properties of an ImageSource.
     * @exports IImageSource
     * @interface IImageSource
     * @property {string|null} [id] ImageSource id
     * @property {string|null} [originalFileName] ImageSource originalFileName
     * @property {string|null} [fileName] ImageSource fileName
     * @property {number|null} [width] ImageSource width
     * @property {number|null} [height] ImageSource height
     */

    /**
     * Constructs a new ImageSource.
     * @exports ImageSource
     * @classdesc Represents an ImageSource.
     * @implements IImageSource
     * @constructor
     * @param {IImageSource=} [properties] Properties to set
     */
    function ImageSource(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ImageSource id.
     * @member {string} id
     * @memberof ImageSource
     * @instance
     */
    ImageSource.prototype.id = "";

    /**
     * ImageSource originalFileName.
     * @member {string} originalFileName
     * @memberof ImageSource
     * @instance
     */
    ImageSource.prototype.originalFileName = "";

    /**
     * ImageSource fileName.
     * @member {string} fileName
     * @memberof ImageSource
     * @instance
     */
    ImageSource.prototype.fileName = "";

    /**
     * ImageSource width.
     * @member {number} width
     * @memberof ImageSource
     * @instance
     */
    ImageSource.prototype.width = 0;

    /**
     * ImageSource height.
     * @member {number} height
     * @memberof ImageSource
     * @instance
     */
    ImageSource.prototype.height = 0;

    /**
     * Creates a new ImageSource instance using the specified properties.
     * @function create
     * @memberof ImageSource
     * @static
     * @param {IImageSource=} [properties] Properties to set
     * @returns {ImageSource} ImageSource instance
     */
    ImageSource.create = function create(properties) {
        return new ImageSource(properties);
    };

    /**
     * Encodes the specified ImageSource message. Does not implicitly {@link ImageSource.verify|verify} messages.
     * @function encode
     * @memberof ImageSource
     * @static
     * @param {IImageSource} message ImageSource message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ImageSource.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.id != null && Object.hasOwnProperty.call(message, "id"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
        if (message.originalFileName != null && Object.hasOwnProperty.call(message, "originalFileName"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.originalFileName);
        if (message.fileName != null && Object.hasOwnProperty.call(message, "fileName"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.fileName);
        if (message.width != null && Object.hasOwnProperty.call(message, "width"))
            writer.uint32(/* id 4, wireType 0 =*/32).int32(message.width);
        if (message.height != null && Object.hasOwnProperty.call(message, "height"))
            writer.uint32(/* id 5, wireType 0 =*/40).int32(message.height);
        return writer;
    };

    /**
     * Encodes the specified ImageSource message, length delimited. Does not implicitly {@link ImageSource.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ImageSource
     * @static
     * @param {IImageSource} message ImageSource message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ImageSource.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an ImageSource message from the specified reader or buffer.
     * @function decode
     * @memberof ImageSource
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ImageSource} ImageSource
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ImageSource.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ImageSource();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.id = reader.string();
                break;
            case 2:
                message.originalFileName = reader.string();
                break;
            case 3:
                message.fileName = reader.string();
                break;
            case 4:
                message.width = reader.int32();
                break;
            case 5:
                message.height = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an ImageSource message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ImageSource
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ImageSource} ImageSource
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ImageSource.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an ImageSource message.
     * @function verify
     * @memberof ImageSource
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ImageSource.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.id != null && message.hasOwnProperty("id"))
            if (!$util.isString(message.id))
                return "id: string expected";
        if (message.originalFileName != null && message.hasOwnProperty("originalFileName"))
            if (!$util.isString(message.originalFileName))
                return "originalFileName: string expected";
        if (message.fileName != null && message.hasOwnProperty("fileName"))
            if (!$util.isString(message.fileName))
                return "fileName: string expected";
        if (message.width != null && message.hasOwnProperty("width"))
            if (!$util.isInteger(message.width))
                return "width: integer expected";
        if (message.height != null && message.hasOwnProperty("height"))
            if (!$util.isInteger(message.height))
                return "height: integer expected";
        return null;
    };

    /**
     * Creates an ImageSource message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ImageSource
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ImageSource} ImageSource
     */
    ImageSource.fromObject = function fromObject(object) {
        if (object instanceof $root.ImageSource)
            return object;
        var message = new $root.ImageSource();
        if (object.id != null)
            message.id = String(object.id);
        if (object.originalFileName != null)
            message.originalFileName = String(object.originalFileName);
        if (object.fileName != null)
            message.fileName = String(object.fileName);
        if (object.width != null)
            message.width = object.width | 0;
        if (object.height != null)
            message.height = object.height | 0;
        return message;
    };

    /**
     * Creates a plain object from an ImageSource message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ImageSource
     * @static
     * @param {ImageSource} message ImageSource
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    ImageSource.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.id = "";
            object.originalFileName = "";
            object.fileName = "";
            object.width = 0;
            object.height = 0;
        }
        if (message.id != null && message.hasOwnProperty("id"))
            object.id = message.id;
        if (message.originalFileName != null && message.hasOwnProperty("originalFileName"))
            object.originalFileName = message.originalFileName;
        if (message.fileName != null && message.hasOwnProperty("fileName"))
            object.fileName = message.fileName;
        if (message.width != null && message.hasOwnProperty("width"))
            object.width = message.width;
        if (message.height != null && message.hasOwnProperty("height"))
            object.height = message.height;
        return object;
    };

    /**
     * Converts this ImageSource to JSON.
     * @function toJSON
     * @memberof ImageSource
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ImageSource.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ImageSource;
})();

$root.ImageMetadata = (function() {

    /**
     * Properties of an ImageMetadata.
     * @exports IImageMetadata
     * @interface IImageMetadata
     * @property {string|null} [alt] ImageMetadata alt
     * @property {string|null} [caption] ImageMetadata caption
     */

    /**
     * Constructs a new ImageMetadata.
     * @exports ImageMetadata
     * @classdesc Represents an ImageMetadata.
     * @implements IImageMetadata
     * @constructor
     * @param {IImageMetadata=} [properties] Properties to set
     */
    function ImageMetadata(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ImageMetadata alt.
     * @member {string} alt
     * @memberof ImageMetadata
     * @instance
     */
    ImageMetadata.prototype.alt = "";

    /**
     * ImageMetadata caption.
     * @member {string} caption
     * @memberof ImageMetadata
     * @instance
     */
    ImageMetadata.prototype.caption = "";

    /**
     * Creates a new ImageMetadata instance using the specified properties.
     * @function create
     * @memberof ImageMetadata
     * @static
     * @param {IImageMetadata=} [properties] Properties to set
     * @returns {ImageMetadata} ImageMetadata instance
     */
    ImageMetadata.create = function create(properties) {
        return new ImageMetadata(properties);
    };

    /**
     * Encodes the specified ImageMetadata message. Does not implicitly {@link ImageMetadata.verify|verify} messages.
     * @function encode
     * @memberof ImageMetadata
     * @static
     * @param {IImageMetadata} message ImageMetadata message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ImageMetadata.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.alt != null && Object.hasOwnProperty.call(message, "alt"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.alt);
        if (message.caption != null && Object.hasOwnProperty.call(message, "caption"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.caption);
        return writer;
    };

    /**
     * Encodes the specified ImageMetadata message, length delimited. Does not implicitly {@link ImageMetadata.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ImageMetadata
     * @static
     * @param {IImageMetadata} message ImageMetadata message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ImageMetadata.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an ImageMetadata message from the specified reader or buffer.
     * @function decode
     * @memberof ImageMetadata
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ImageMetadata} ImageMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ImageMetadata.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ImageMetadata();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.alt = reader.string();
                break;
            case 2:
                message.caption = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an ImageMetadata message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ImageMetadata
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ImageMetadata} ImageMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ImageMetadata.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an ImageMetadata message.
     * @function verify
     * @memberof ImageMetadata
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ImageMetadata.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.alt != null && message.hasOwnProperty("alt"))
            if (!$util.isString(message.alt))
                return "alt: string expected";
        if (message.caption != null && message.hasOwnProperty("caption"))
            if (!$util.isString(message.caption))
                return "caption: string expected";
        return null;
    };

    /**
     * Creates an ImageMetadata message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ImageMetadata
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ImageMetadata} ImageMetadata
     */
    ImageMetadata.fromObject = function fromObject(object) {
        if (object instanceof $root.ImageMetadata)
            return object;
        var message = new $root.ImageMetadata();
        if (object.alt != null)
            message.alt = String(object.alt);
        if (object.caption != null)
            message.caption = String(object.caption);
        return message;
    };

    /**
     * Creates a plain object from an ImageMetadata message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ImageMetadata
     * @static
     * @param {ImageMetadata} message ImageMetadata
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    ImageMetadata.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.alt = "";
            object.caption = "";
        }
        if (message.alt != null && message.hasOwnProperty("alt"))
            object.alt = message.alt;
        if (message.caption != null && message.hasOwnProperty("caption"))
            object.caption = message.caption;
        return object;
    };

    /**
     * Converts this ImageMetadata to JSON.
     * @function toJSON
     * @memberof ImageMetadata
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ImageMetadata.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ImageMetadata;
})();

$root.ImageData = (function() {

    /**
     * Properties of an ImageData.
     * @exports IImageData
     * @interface IImageData
     * @property {IImageConfig|null} [config] ImageData config
     * @property {IImageSource|null} [src] ImageData src
     * @property {IImageMetadata|null} [metadata] ImageData metadata
     */

    /**
     * Constructs a new ImageData.
     * @exports ImageData
     * @classdesc Represents an ImageData.
     * @implements IImageData
     * @constructor
     * @param {IImageData=} [properties] Properties to set
     */
    function ImageData(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ImageData config.
     * @member {IImageConfig|null|undefined} config
     * @memberof ImageData
     * @instance
     */
    ImageData.prototype.config = null;

    /**
     * ImageData src.
     * @member {IImageSource|null|undefined} src
     * @memberof ImageData
     * @instance
     */
    ImageData.prototype.src = null;

    /**
     * ImageData metadata.
     * @member {IImageMetadata|null|undefined} metadata
     * @memberof ImageData
     * @instance
     */
    ImageData.prototype.metadata = null;

    /**
     * Creates a new ImageData instance using the specified properties.
     * @function create
     * @memberof ImageData
     * @static
     * @param {IImageData=} [properties] Properties to set
     * @returns {ImageData} ImageData instance
     */
    ImageData.create = function create(properties) {
        return new ImageData(properties);
    };

    /**
     * Encodes the specified ImageData message. Does not implicitly {@link ImageData.verify|verify} messages.
     * @function encode
     * @memberof ImageData
     * @static
     * @param {IImageData} message ImageData message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ImageData.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.config != null && Object.hasOwnProperty.call(message, "config"))
            $root.ImageConfig.encode(message.config, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.src != null && Object.hasOwnProperty.call(message, "src"))
            $root.ImageSource.encode(message.src, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.metadata != null && Object.hasOwnProperty.call(message, "metadata"))
            $root.ImageMetadata.encode(message.metadata, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified ImageData message, length delimited. Does not implicitly {@link ImageData.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ImageData
     * @static
     * @param {IImageData} message ImageData message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ImageData.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an ImageData message from the specified reader or buffer.
     * @function decode
     * @memberof ImageData
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ImageData} ImageData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ImageData.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ImageData();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.config = $root.ImageConfig.decode(reader, reader.uint32());
                break;
            case 2:
                message.src = $root.ImageSource.decode(reader, reader.uint32());
                break;
            case 3:
                message.metadata = $root.ImageMetadata.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an ImageData message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ImageData
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ImageData} ImageData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ImageData.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an ImageData message.
     * @function verify
     * @memberof ImageData
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ImageData.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.config != null && message.hasOwnProperty("config")) {
            var error = $root.ImageConfig.verify(message.config);
            if (error)
                return "config." + error;
        }
        if (message.src != null && message.hasOwnProperty("src")) {
            var error = $root.ImageSource.verify(message.src);
            if (error)
                return "src." + error;
        }
        if (message.metadata != null && message.hasOwnProperty("metadata")) {
            var error = $root.ImageMetadata.verify(message.metadata);
            if (error)
                return "metadata." + error;
        }
        return null;
    };

    /**
     * Creates an ImageData message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ImageData
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ImageData} ImageData
     */
    ImageData.fromObject = function fromObject(object) {
        if (object instanceof $root.ImageData)
            return object;
        var message = new $root.ImageData();
        if (object.config != null) {
            if (typeof object.config !== "object")
                throw TypeError(".ImageData.config: object expected");
            message.config = $root.ImageConfig.fromObject(object.config);
        }
        if (object.src != null) {
            if (typeof object.src !== "object")
                throw TypeError(".ImageData.src: object expected");
            message.src = $root.ImageSource.fromObject(object.src);
        }
        if (object.metadata != null) {
            if (typeof object.metadata !== "object")
                throw TypeError(".ImageData.metadata: object expected");
            message.metadata = $root.ImageMetadata.fromObject(object.metadata);
        }
        return message;
    };

    /**
     * Creates a plain object from an ImageData message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ImageData
     * @static
     * @param {ImageData} message ImageData
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    ImageData.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.config = null;
            object.src = null;
            object.metadata = null;
        }
        if (message.config != null && message.hasOwnProperty("config"))
            object.config = $root.ImageConfig.toObject(message.config, options);
        if (message.src != null && message.hasOwnProperty("src"))
            object.src = $root.ImageSource.toObject(message.src, options);
        if (message.metadata != null && message.hasOwnProperty("metadata"))
            object.metadata = $root.ImageMetadata.toObject(message.metadata, options);
        return object;
    };

    /**
     * Converts this ImageData to JSON.
     * @function toJSON
     * @memberof ImageData
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ImageData.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ImageData;
})();

module.exports = $root;
