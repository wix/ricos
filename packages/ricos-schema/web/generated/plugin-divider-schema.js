/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

/**
 * DividerType enum.
 * @exports DividerType
 * @enum {number}
 * @property {number} DOUBLE=0 DOUBLE value
 * @property {number} SINGLE=1 SINGLE value
 * @property {number} DASHED=3 DASHED value
 * @property {number} DOTTED=4 DOTTED value
 */
$root.DividerType = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "DOUBLE"] = 0;
    values[valuesById[1] = "SINGLE"] = 1;
    values[valuesById[3] = "DASHED"] = 3;
    values[valuesById[4] = "DOTTED"] = 4;
    return values;
})();

/**
 * DividerSize enum.
 * @exports DividerSize
 * @enum {number}
 * @property {number} SMALL=0 SMALL value
 * @property {number} MEDIUM=1 MEDIUM value
 * @property {number} LARGE=3 LARGE value
 */
$root.DividerSize = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "SMALL"] = 0;
    values[valuesById[1] = "MEDIUM"] = 1;
    values[valuesById[3] = "LARGE"] = 3;
    return values;
})();

/**
 * DividerAlignment enum.
 * @exports DividerAlignment
 * @enum {number}
 * @property {number} LEFT=0 LEFT value
 * @property {number} RIGHT=1 RIGHT value
 * @property {number} CENTER=3 CENTER value
 */
$root.DividerAlignment = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "LEFT"] = 0;
    values[valuesById[1] = "RIGHT"] = 1;
    values[valuesById[3] = "CENTER"] = 3;
    return values;
})();

$root.DividerConfig = (function() {

    /**
     * Properties of a DividerConfig.
     * @exports IDividerConfig
     * @interface IDividerConfig
     * @property {DividerSize|null} [size] DividerConfig size
     * @property {DividerAlignment|null} [alignment] DividerConfig alignment
     * @property {string|null} [textWrap] DividerConfig textWrap
     */

    /**
     * Constructs a new DividerConfig.
     * @exports DividerConfig
     * @classdesc Represents a DividerConfig.
     * @implements IDividerConfig
     * @constructor
     * @param {IDividerConfig=} [properties] Properties to set
     */
    function DividerConfig(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * DividerConfig size.
     * @member {DividerSize} size
     * @memberof DividerConfig
     * @instance
     */
    DividerConfig.prototype.size = 0;

    /**
     * DividerConfig alignment.
     * @member {DividerAlignment} alignment
     * @memberof DividerConfig
     * @instance
     */
    DividerConfig.prototype.alignment = 0;

    /**
     * DividerConfig textWrap.
     * @member {string} textWrap
     * @memberof DividerConfig
     * @instance
     */
    DividerConfig.prototype.textWrap = "";

    /**
     * Creates a new DividerConfig instance using the specified properties.
     * @function create
     * @memberof DividerConfig
     * @static
     * @param {IDividerConfig=} [properties] Properties to set
     * @returns {DividerConfig} DividerConfig instance
     */
    DividerConfig.create = function create(properties) {
        return new DividerConfig(properties);
    };

    /**
     * Encodes the specified DividerConfig message. Does not implicitly {@link DividerConfig.verify|verify} messages.
     * @function encode
     * @memberof DividerConfig
     * @static
     * @param {IDividerConfig} message DividerConfig message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DividerConfig.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.size != null && Object.hasOwnProperty.call(message, "size"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.size);
        if (message.alignment != null && Object.hasOwnProperty.call(message, "alignment"))
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.alignment);
        if (message.textWrap != null && Object.hasOwnProperty.call(message, "textWrap"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.textWrap);
        return writer;
    };

    /**
     * Encodes the specified DividerConfig message, length delimited. Does not implicitly {@link DividerConfig.verify|verify} messages.
     * @function encodeDelimited
     * @memberof DividerConfig
     * @static
     * @param {IDividerConfig} message DividerConfig message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DividerConfig.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a DividerConfig message from the specified reader or buffer.
     * @function decode
     * @memberof DividerConfig
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {DividerConfig} DividerConfig
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DividerConfig.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.DividerConfig();
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
                message.textWrap = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a DividerConfig message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof DividerConfig
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {DividerConfig} DividerConfig
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DividerConfig.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a DividerConfig message.
     * @function verify
     * @memberof DividerConfig
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    DividerConfig.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.size != null && message.hasOwnProperty("size"))
            switch (message.size) {
            default:
                return "size: enum value expected";
            case 0:
            case 1:
            case 3:
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
        if (message.textWrap != null && message.hasOwnProperty("textWrap"))
            if (!$util.isString(message.textWrap))
                return "textWrap: string expected";
        return null;
    };

    /**
     * Creates a DividerConfig message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof DividerConfig
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {DividerConfig} DividerConfig
     */
    DividerConfig.fromObject = function fromObject(object) {
        if (object instanceof $root.DividerConfig)
            return object;
        var message = new $root.DividerConfig();
        switch (object.size) {
        case "SMALL":
        case 0:
            message.size = 0;
            break;
        case "MEDIUM":
        case 1:
            message.size = 1;
            break;
        case "LARGE":
        case 3:
            message.size = 3;
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
        if (object.textWrap != null)
            message.textWrap = String(object.textWrap);
        return message;
    };

    /**
     * Creates a plain object from a DividerConfig message. Also converts values to other types if specified.
     * @function toObject
     * @memberof DividerConfig
     * @static
     * @param {DividerConfig} message DividerConfig
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    DividerConfig.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.size = options.enums === String ? "SMALL" : 0;
            object.alignment = options.enums === String ? "LEFT" : 0;
            object.textWrap = "";
        }
        if (message.size != null && message.hasOwnProperty("size"))
            object.size = options.enums === String ? $root.DividerSize[message.size] : message.size;
        if (message.alignment != null && message.hasOwnProperty("alignment"))
            object.alignment = options.enums === String ? $root.DividerAlignment[message.alignment] : message.alignment;
        if (message.textWrap != null && message.hasOwnProperty("textWrap"))
            object.textWrap = message.textWrap;
        return object;
    };

    /**
     * Converts this DividerConfig to JSON.
     * @function toJSON
     * @memberof DividerConfig
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    DividerConfig.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return DividerConfig;
})();

$root.DividerData = (function() {

    /**
     * Properties of a DividerData.
     * @exports IDividerData
     * @interface IDividerData
     * @property {DividerType|null} [type] DividerData type
     * @property {IDividerConfig|null} [config] DividerData config
     */

    /**
     * Constructs a new DividerData.
     * @exports DividerData
     * @classdesc Represents a DividerData.
     * @implements IDividerData
     * @constructor
     * @param {IDividerData=} [properties] Properties to set
     */
    function DividerData(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * DividerData type.
     * @member {DividerType} type
     * @memberof DividerData
     * @instance
     */
    DividerData.prototype.type = 0;

    /**
     * DividerData config.
     * @member {IDividerConfig|null|undefined} config
     * @memberof DividerData
     * @instance
     */
    DividerData.prototype.config = null;

    /**
     * Creates a new DividerData instance using the specified properties.
     * @function create
     * @memberof DividerData
     * @static
     * @param {IDividerData=} [properties] Properties to set
     * @returns {DividerData} DividerData instance
     */
    DividerData.create = function create(properties) {
        return new DividerData(properties);
    };

    /**
     * Encodes the specified DividerData message. Does not implicitly {@link DividerData.verify|verify} messages.
     * @function encode
     * @memberof DividerData
     * @static
     * @param {IDividerData} message DividerData message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DividerData.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.type != null && Object.hasOwnProperty.call(message, "type"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
        if (message.config != null && Object.hasOwnProperty.call(message, "config"))
            $root.DividerConfig.encode(message.config, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified DividerData message, length delimited. Does not implicitly {@link DividerData.verify|verify} messages.
     * @function encodeDelimited
     * @memberof DividerData
     * @static
     * @param {IDividerData} message DividerData message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DividerData.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a DividerData message from the specified reader or buffer.
     * @function decode
     * @memberof DividerData
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {DividerData} DividerData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DividerData.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.DividerData();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.type = reader.int32();
                break;
            case 2:
                message.config = $root.DividerConfig.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a DividerData message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof DividerData
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {DividerData} DividerData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DividerData.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a DividerData message.
     * @function verify
     * @memberof DividerData
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    DividerData.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.type != null && message.hasOwnProperty("type"))
            switch (message.type) {
            default:
                return "type: enum value expected";
            case 0:
            case 1:
            case 3:
            case 4:
                break;
            }
        if (message.config != null && message.hasOwnProperty("config")) {
            var error = $root.DividerConfig.verify(message.config);
            if (error)
                return "config." + error;
        }
        return null;
    };

    /**
     * Creates a DividerData message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof DividerData
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {DividerData} DividerData
     */
    DividerData.fromObject = function fromObject(object) {
        if (object instanceof $root.DividerData)
            return object;
        var message = new $root.DividerData();
        switch (object.type) {
        case "DOUBLE":
        case 0:
            message.type = 0;
            break;
        case "SINGLE":
        case 1:
            message.type = 1;
            break;
        case "DASHED":
        case 3:
            message.type = 3;
            break;
        case "DOTTED":
        case 4:
            message.type = 4;
            break;
        }
        if (object.config != null) {
            if (typeof object.config !== "object")
                throw TypeError(".DividerData.config: object expected");
            message.config = $root.DividerConfig.fromObject(object.config);
        }
        return message;
    };

    /**
     * Creates a plain object from a DividerData message. Also converts values to other types if specified.
     * @function toObject
     * @memberof DividerData
     * @static
     * @param {DividerData} message DividerData
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    DividerData.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.type = options.enums === String ? "DOUBLE" : 0;
            object.config = null;
        }
        if (message.type != null && message.hasOwnProperty("type"))
            object.type = options.enums === String ? $root.DividerType[message.type] : message.type;
        if (message.config != null && message.hasOwnProperty("config"))
            object.config = $root.DividerConfig.toObject(message.config, options);
        return object;
    };

    /**
     * Converts this DividerData to JSON.
     * @function toJSON
     * @memberof DividerData
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    DividerData.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return DividerData;
})();

module.exports = $root;
