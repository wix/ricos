/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.RicosContent = (function() {

    /**
     * Properties of a RicosContent.
     * @exports IRicosContent
     * @interface IRicosContent
     * @property {IDocument|null} [doc] Document root
     * @property {ISelection|null} [selection] Last saved selection
     * @property {string|null} [version] Ricos version used to create this schema
     */

    /**
     * Constructs a new RicosContent.
     * @exports RicosContent
     * @classdesc Represents a RicosContent.
     * @implements IRicosContent
     * @constructor
     * @param {IRicosContent=} [properties] Properties to set
     */
    function RicosContent(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Document root
     * @member {IDocument|null|undefined} doc
     * @memberof RicosContent
     * @instance
     */
    RicosContent.prototype.doc = null;

    /**
     * Last saved selection
     * @member {ISelection|null|undefined} selection
     * @memberof RicosContent
     * @instance
     */
    RicosContent.prototype.selection = null;

    /**
     * Ricos version used to create this schema
     * @member {string} version
     * @memberof RicosContent
     * @instance
     */
    RicosContent.prototype.version = "";

    /**
     * Creates a new RicosContent instance using the specified properties.
     * @function create
     * @memberof RicosContent
     * @static
     * @param {IRicosContent=} [properties] Properties to set
     * @returns {RicosContent} RicosContent instance
     */
    RicosContent.create = function create(properties) {
        return new RicosContent(properties);
    };

    /**
     * Encodes the specified RicosContent message. Does not implicitly {@link RicosContent.verify|verify} messages.
     * @function encode
     * @memberof RicosContent
     * @static
     * @param {IRicosContent} message RicosContent message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RicosContent.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.doc != null && Object.hasOwnProperty.call(message, "doc"))
            $root.Document.encode(message.doc, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.selection != null && Object.hasOwnProperty.call(message, "selection"))
            $root.Selection.encode(message.selection, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.version != null && Object.hasOwnProperty.call(message, "version"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.version);
        return writer;
    };

    /**
     * Encodes the specified RicosContent message, length delimited. Does not implicitly {@link RicosContent.verify|verify} messages.
     * @function encodeDelimited
     * @memberof RicosContent
     * @static
     * @param {IRicosContent} message RicosContent message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RicosContent.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a RicosContent message from the specified reader or buffer.
     * @function decode
     * @memberof RicosContent
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {RicosContent} RicosContent
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RicosContent.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.RicosContent();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.doc = $root.Document.decode(reader, reader.uint32());
                break;
            case 2:
                message.selection = $root.Selection.decode(reader, reader.uint32());
                break;
            case 3:
                message.version = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a RicosContent message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof RicosContent
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {RicosContent} RicosContent
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RicosContent.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a RicosContent message.
     * @function verify
     * @memberof RicosContent
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    RicosContent.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.doc != null && message.hasOwnProperty("doc")) {
            var error = $root.Document.verify(message.doc);
            if (error)
                return "doc." + error;
        }
        if (message.selection != null && message.hasOwnProperty("selection")) {
            var error = $root.Selection.verify(message.selection);
            if (error)
                return "selection." + error;
        }
        if (message.version != null && message.hasOwnProperty("version"))
            if (!$util.isString(message.version))
                return "version: string expected";
        return null;
    };

    /**
     * Creates a RicosContent message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof RicosContent
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {RicosContent} RicosContent
     */
    RicosContent.fromObject = function fromObject(object) {
        if (object instanceof $root.RicosContent)
            return object;
        var message = new $root.RicosContent();
        if (object.doc != null) {
            if (typeof object.doc !== "object")
                throw TypeError(".RicosContent.doc: object expected");
            message.doc = $root.Document.fromObject(object.doc);
        }
        if (object.selection != null) {
            if (typeof object.selection !== "object")
                throw TypeError(".RicosContent.selection: object expected");
            message.selection = $root.Selection.fromObject(object.selection);
        }
        if (object.version != null)
            message.version = String(object.version);
        return message;
    };

    /**
     * Creates a plain object from a RicosContent message. Also converts values to other types if specified.
     * @function toObject
     * @memberof RicosContent
     * @static
     * @param {RicosContent} message RicosContent
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    RicosContent.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.doc = null;
            object.selection = null;
            object.version = "";
        }
        if (message.doc != null && message.hasOwnProperty("doc"))
            object.doc = $root.Document.toObject(message.doc, options);
        if (message.selection != null && message.hasOwnProperty("selection"))
            object.selection = $root.Selection.toObject(message.selection, options);
        if (message.version != null && message.hasOwnProperty("version"))
            object.version = message.version;
        return object;
    };

    /**
     * Converts this RicosContent to JSON.
     * @function toJSON
     * @memberof RicosContent
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    RicosContent.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return RicosContent;
})();

$root.Document = (function() {

    /**
     * Properties of a Document.
     * @exports IDocument
     * @interface IDocument
     * @property {Array.<INode>|null} [nodes] List of nodes
     * @property {string|null} [lastEdited] Timestamp when the document was last edited
     */

    /**
     * Constructs a new Document.
     * @exports Document
     * @classdesc Represents a Document.
     * @implements IDocument
     * @constructor
     * @param {IDocument=} [properties] Properties to set
     */
    function Document(properties) {
        this.nodes = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * List of nodes
     * @member {Array.<INode>} nodes
     * @memberof Document
     * @instance
     */
    Document.prototype.nodes = $util.emptyArray;

    /**
     * Timestamp when the document was last edited
     * @member {string} lastEdited
     * @memberof Document
     * @instance
     */
    Document.prototype.lastEdited = "";

    /**
     * Creates a new Document instance using the specified properties.
     * @function create
     * @memberof Document
     * @static
     * @param {IDocument=} [properties] Properties to set
     * @returns {Document} Document instance
     */
    Document.create = function create(properties) {
        return new Document(properties);
    };

    /**
     * Encodes the specified Document message. Does not implicitly {@link Document.verify|verify} messages.
     * @function encode
     * @memberof Document
     * @static
     * @param {IDocument} message Document message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Document.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.nodes != null && message.nodes.length)
            for (var i = 0; i < message.nodes.length; ++i)
                $root.Node.encode(message.nodes[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.lastEdited != null && Object.hasOwnProperty.call(message, "lastEdited"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.lastEdited);
        return writer;
    };

    /**
     * Encodes the specified Document message, length delimited. Does not implicitly {@link Document.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Document
     * @static
     * @param {IDocument} message Document message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Document.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Document message from the specified reader or buffer.
     * @function decode
     * @memberof Document
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Document} Document
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Document.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Document();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.nodes && message.nodes.length))
                    message.nodes = [];
                message.nodes.push($root.Node.decode(reader, reader.uint32()));
                break;
            case 2:
                message.lastEdited = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Document message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Document
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Document} Document
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Document.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Document message.
     * @function verify
     * @memberof Document
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Document.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.nodes != null && message.hasOwnProperty("nodes")) {
            if (!Array.isArray(message.nodes))
                return "nodes: array expected";
            for (var i = 0; i < message.nodes.length; ++i) {
                var error = $root.Node.verify(message.nodes[i]);
                if (error)
                    return "nodes." + error;
            }
        }
        if (message.lastEdited != null && message.hasOwnProperty("lastEdited"))
            if (!$util.isString(message.lastEdited))
                return "lastEdited: string expected";
        return null;
    };

    /**
     * Creates a Document message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Document
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Document} Document
     */
    Document.fromObject = function fromObject(object) {
        if (object instanceof $root.Document)
            return object;
        var message = new $root.Document();
        if (object.nodes) {
            if (!Array.isArray(object.nodes))
                throw TypeError(".Document.nodes: array expected");
            message.nodes = [];
            for (var i = 0; i < object.nodes.length; ++i) {
                if (typeof object.nodes[i] !== "object")
                    throw TypeError(".Document.nodes: object expected");
                message.nodes[i] = $root.Node.fromObject(object.nodes[i]);
            }
        }
        if (object.lastEdited != null)
            message.lastEdited = String(object.lastEdited);
        return message;
    };

    /**
     * Creates a plain object from a Document message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Document
     * @static
     * @param {Document} message Document
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Document.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.nodes = [];
        if (options.defaults)
            object.lastEdited = "";
        if (message.nodes && message.nodes.length) {
            object.nodes = [];
            for (var j = 0; j < message.nodes.length; ++j)
                object.nodes[j] = $root.Node.toObject(message.nodes[j], options);
        }
        if (message.lastEdited != null && message.hasOwnProperty("lastEdited"))
            object.lastEdited = message.lastEdited;
        return object;
    };

    /**
     * Converts this Document to JSON.
     * @function toJSON
     * @memberof Document
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Document.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Document;
})();

$root.Selection = (function() {

    /**
     * Properties of a Selection.
     * @exports ISelection
     * @interface ISelection
     * @property {number|null} [anchor] Selection start index
     * @property {number|null} [focus] Selection end index
     */

    /**
     * Constructs a new Selection.
     * @exports Selection
     * @classdesc Represents a Selection.
     * @implements ISelection
     * @constructor
     * @param {ISelection=} [properties] Properties to set
     */
    function Selection(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Selection start index
     * @member {number} anchor
     * @memberof Selection
     * @instance
     */
    Selection.prototype.anchor = 0;

    /**
     * Selection end index
     * @member {number} focus
     * @memberof Selection
     * @instance
     */
    Selection.prototype.focus = 0;

    /**
     * Creates a new Selection instance using the specified properties.
     * @function create
     * @memberof Selection
     * @static
     * @param {ISelection=} [properties] Properties to set
     * @returns {Selection} Selection instance
     */
    Selection.create = function create(properties) {
        return new Selection(properties);
    };

    /**
     * Encodes the specified Selection message. Does not implicitly {@link Selection.verify|verify} messages.
     * @function encode
     * @memberof Selection
     * @static
     * @param {ISelection} message Selection message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Selection.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.anchor != null && Object.hasOwnProperty.call(message, "anchor"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.anchor);
        if (message.focus != null && Object.hasOwnProperty.call(message, "focus"))
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.focus);
        return writer;
    };

    /**
     * Encodes the specified Selection message, length delimited. Does not implicitly {@link Selection.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Selection
     * @static
     * @param {ISelection} message Selection message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Selection.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Selection message from the specified reader or buffer.
     * @function decode
     * @memberof Selection
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Selection} Selection
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Selection.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Selection();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.anchor = reader.int32();
                break;
            case 2:
                message.focus = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Selection message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Selection
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Selection} Selection
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Selection.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Selection message.
     * @function verify
     * @memberof Selection
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Selection.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.anchor != null && message.hasOwnProperty("anchor"))
            if (!$util.isInteger(message.anchor))
                return "anchor: integer expected";
        if (message.focus != null && message.hasOwnProperty("focus"))
            if (!$util.isInteger(message.focus))
                return "focus: integer expected";
        return null;
    };

    /**
     * Creates a Selection message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Selection
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Selection} Selection
     */
    Selection.fromObject = function fromObject(object) {
        if (object instanceof $root.Selection)
            return object;
        var message = new $root.Selection();
        if (object.anchor != null)
            message.anchor = object.anchor | 0;
        if (object.focus != null)
            message.focus = object.focus | 0;
        return message;
    };

    /**
     * Creates a plain object from a Selection message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Selection
     * @static
     * @param {Selection} message Selection
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Selection.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.anchor = 0;
            object.focus = 0;
        }
        if (message.anchor != null && message.hasOwnProperty("anchor"))
            object.anchor = message.anchor;
        if (message.focus != null && message.hasOwnProperty("focus"))
            object.focus = message.focus;
        return object;
    };

    /**
     * Converts this Selection to JSON.
     * @function toJSON
     * @memberof Selection
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Selection.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Selection;
})();

$root.Node = (function() {

    /**
     * Properties of a Node.
     * @exports INode
     * @interface INode
     * @property {string|null} [type] Node type
     * @property {Array.<INode>|null} [nodes] List of child nodes
     * @property {ITextData|null} [text] Node text
     * @property {IImageData|null} [image] Node image
     * @property {IDividerData|null} [divider] Node divider
     */

    /**
     * Constructs a new Node.
     * @exports Node
     * @classdesc Represents a Node.
     * @implements INode
     * @constructor
     * @param {INode=} [properties] Properties to set
     */
    function Node(properties) {
        this.nodes = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Node type.
     * @member {string} type
     * @memberof Node
     * @instance
     */
    Node.prototype.type = "";

    /**
     * List of child nodes
     * @member {Array.<INode>} nodes
     * @memberof Node
     * @instance
     */
    Node.prototype.nodes = $util.emptyArray;

    /**
     * Node text.
     * @member {ITextData|null|undefined} text
     * @memberof Node
     * @instance
     */
    Node.prototype.text = null;

    /**
     * Node image.
     * @member {IImageData|null|undefined} image
     * @memberof Node
     * @instance
     */
    Node.prototype.image = null;

    /**
     * Node divider.
     * @member {IDividerData|null|undefined} divider
     * @memberof Node
     * @instance
     */
    Node.prototype.divider = null;

    // OneOf field names bound to virtual getters and setters
    var $oneOfFields;

    /**
     * Node data.
     * @member {"text"|"image"|"divider"|undefined} data
     * @memberof Node
     * @instance
     */
    Object.defineProperty(Node.prototype, "data", {
        get: $util.oneOfGetter($oneOfFields = ["text", "image", "divider"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * Creates a new Node instance using the specified properties.
     * @function create
     * @memberof Node
     * @static
     * @param {INode=} [properties] Properties to set
     * @returns {Node} Node instance
     */
    Node.create = function create(properties) {
        return new Node(properties);
    };

    /**
     * Encodes the specified Node message. Does not implicitly {@link Node.verify|verify} messages.
     * @function encode
     * @memberof Node
     * @static
     * @param {INode} message Node message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Node.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.type != null && Object.hasOwnProperty.call(message, "type"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.type);
        if (message.nodes != null && message.nodes.length)
            for (var i = 0; i < message.nodes.length; ++i)
                $root.Node.encode(message.nodes[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.text != null && Object.hasOwnProperty.call(message, "text"))
            $root.TextData.encode(message.text, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        if (message.image != null && Object.hasOwnProperty.call(message, "image"))
            $root.ImageData.encode(message.image, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
        if (message.divider != null && Object.hasOwnProperty.call(message, "divider"))
            $root.DividerData.encode(message.divider, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified Node message, length delimited. Does not implicitly {@link Node.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Node
     * @static
     * @param {INode} message Node message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Node.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Node message from the specified reader or buffer.
     * @function decode
     * @memberof Node
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Node} Node
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Node.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Node();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.type = reader.string();
                break;
            case 2:
                if (!(message.nodes && message.nodes.length))
                    message.nodes = [];
                message.nodes.push($root.Node.decode(reader, reader.uint32()));
                break;
            case 3:
                message.text = $root.TextData.decode(reader, reader.uint32());
                break;
            case 4:
                message.image = $root.ImageData.decode(reader, reader.uint32());
                break;
            case 5:
                message.divider = $root.DividerData.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Node message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Node
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Node} Node
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Node.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Node message.
     * @function verify
     * @memberof Node
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Node.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        var properties = {};
        if (message.type != null && message.hasOwnProperty("type"))
            if (!$util.isString(message.type))
                return "type: string expected";
        if (message.nodes != null && message.hasOwnProperty("nodes")) {
            if (!Array.isArray(message.nodes))
                return "nodes: array expected";
            for (var i = 0; i < message.nodes.length; ++i) {
                var error = $root.Node.verify(message.nodes[i]);
                if (error)
                    return "nodes." + error;
            }
        }
        if (message.text != null && message.hasOwnProperty("text")) {
            properties.data = 1;
            {
                var error = $root.TextData.verify(message.text);
                if (error)
                    return "text." + error;
            }
        }
        if (message.image != null && message.hasOwnProperty("image")) {
            if (properties.data === 1)
                return "data: multiple values";
            properties.data = 1;
            {
                var error = $root.ImageData.verify(message.image);
                if (error)
                    return "image." + error;
            }
        }
        if (message.divider != null && message.hasOwnProperty("divider")) {
            if (properties.data === 1)
                return "data: multiple values";
            properties.data = 1;
            {
                var error = $root.DividerData.verify(message.divider);
                if (error)
                    return "divider." + error;
            }
        }
        return null;
    };

    /**
     * Creates a Node message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Node
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Node} Node
     */
    Node.fromObject = function fromObject(object) {
        if (object instanceof $root.Node)
            return object;
        var message = new $root.Node();
        if (object.type != null)
            message.type = String(object.type);
        if (object.nodes) {
            if (!Array.isArray(object.nodes))
                throw TypeError(".Node.nodes: array expected");
            message.nodes = [];
            for (var i = 0; i < object.nodes.length; ++i) {
                if (typeof object.nodes[i] !== "object")
                    throw TypeError(".Node.nodes: object expected");
                message.nodes[i] = $root.Node.fromObject(object.nodes[i]);
            }
        }
        if (object.text != null) {
            if (typeof object.text !== "object")
                throw TypeError(".Node.text: object expected");
            message.text = $root.TextData.fromObject(object.text);
        }
        if (object.image != null) {
            if (typeof object.image !== "object")
                throw TypeError(".Node.image: object expected");
            message.image = $root.ImageData.fromObject(object.image);
        }
        if (object.divider != null) {
            if (typeof object.divider !== "object")
                throw TypeError(".Node.divider: object expected");
            message.divider = $root.DividerData.fromObject(object.divider);
        }
        return message;
    };

    /**
     * Creates a plain object from a Node message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Node
     * @static
     * @param {Node} message Node
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Node.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.nodes = [];
        if (options.defaults)
            object.type = "";
        if (message.type != null && message.hasOwnProperty("type"))
            object.type = message.type;
        if (message.nodes && message.nodes.length) {
            object.nodes = [];
            for (var j = 0; j < message.nodes.length; ++j)
                object.nodes[j] = $root.Node.toObject(message.nodes[j], options);
        }
        if (message.text != null && message.hasOwnProperty("text")) {
            object.text = $root.TextData.toObject(message.text, options);
            if (options.oneofs)
                object.data = "text";
        }
        if (message.image != null && message.hasOwnProperty("image")) {
            object.image = $root.ImageData.toObject(message.image, options);
            if (options.oneofs)
                object.data = "image";
        }
        if (message.divider != null && message.hasOwnProperty("divider")) {
            object.divider = $root.DividerData.toObject(message.divider, options);
            if (options.oneofs)
                object.data = "divider";
        }
        return object;
    };

    /**
     * Converts this Node to JSON.
     * @function toJSON
     * @memberof Node
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Node.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Node;
})();

$root.TextData = (function() {

    /**
     * Properties of a TextData.
     * @exports ITextData
     * @interface ITextData
     * @property {string|null} [text] Textual data
     * @property {Array.<IDecoration>|null} [decorations] List of decorations
     */

    /**
     * Constructs a new TextData.
     * @exports TextData
     * @classdesc Represents a TextData.
     * @implements ITextData
     * @constructor
     * @param {ITextData=} [properties] Properties to set
     */
    function TextData(properties) {
        this.decorations = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Textual data
     * @member {string} text
     * @memberof TextData
     * @instance
     */
    TextData.prototype.text = "";

    /**
     * List of decorations
     * @member {Array.<IDecoration>} decorations
     * @memberof TextData
     * @instance
     */
    TextData.prototype.decorations = $util.emptyArray;

    /**
     * Creates a new TextData instance using the specified properties.
     * @function create
     * @memberof TextData
     * @static
     * @param {ITextData=} [properties] Properties to set
     * @returns {TextData} TextData instance
     */
    TextData.create = function create(properties) {
        return new TextData(properties);
    };

    /**
     * Encodes the specified TextData message. Does not implicitly {@link TextData.verify|verify} messages.
     * @function encode
     * @memberof TextData
     * @static
     * @param {ITextData} message TextData message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    TextData.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.text != null && Object.hasOwnProperty.call(message, "text"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.text);
        if (message.decorations != null && message.decorations.length)
            for (var i = 0; i < message.decorations.length; ++i)
                $root.Decoration.encode(message.decorations[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified TextData message, length delimited. Does not implicitly {@link TextData.verify|verify} messages.
     * @function encodeDelimited
     * @memberof TextData
     * @static
     * @param {ITextData} message TextData message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    TextData.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a TextData message from the specified reader or buffer.
     * @function decode
     * @memberof TextData
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {TextData} TextData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    TextData.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.TextData();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.text = reader.string();
                break;
            case 2:
                if (!(message.decorations && message.decorations.length))
                    message.decorations = [];
                message.decorations.push($root.Decoration.decode(reader, reader.uint32()));
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a TextData message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof TextData
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {TextData} TextData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    TextData.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a TextData message.
     * @function verify
     * @memberof TextData
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    TextData.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.text != null && message.hasOwnProperty("text"))
            if (!$util.isString(message.text))
                return "text: string expected";
        if (message.decorations != null && message.hasOwnProperty("decorations")) {
            if (!Array.isArray(message.decorations))
                return "decorations: array expected";
            for (var i = 0; i < message.decorations.length; ++i) {
                var error = $root.Decoration.verify(message.decorations[i]);
                if (error)
                    return "decorations." + error;
            }
        }
        return null;
    };

    /**
     * Creates a TextData message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof TextData
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {TextData} TextData
     */
    TextData.fromObject = function fromObject(object) {
        if (object instanceof $root.TextData)
            return object;
        var message = new $root.TextData();
        if (object.text != null)
            message.text = String(object.text);
        if (object.decorations) {
            if (!Array.isArray(object.decorations))
                throw TypeError(".TextData.decorations: array expected");
            message.decorations = [];
            for (var i = 0; i < object.decorations.length; ++i) {
                if (typeof object.decorations[i] !== "object")
                    throw TypeError(".TextData.decorations: object expected");
                message.decorations[i] = $root.Decoration.fromObject(object.decorations[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a TextData message. Also converts values to other types if specified.
     * @function toObject
     * @memberof TextData
     * @static
     * @param {TextData} message TextData
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    TextData.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.decorations = [];
        if (options.defaults)
            object.text = "";
        if (message.text != null && message.hasOwnProperty("text"))
            object.text = message.text;
        if (message.decorations && message.decorations.length) {
            object.decorations = [];
            for (var j = 0; j < message.decorations.length; ++j)
                object.decorations[j] = $root.Decoration.toObject(message.decorations[j], options);
        }
        return object;
    };

    /**
     * Converts this TextData to JSON.
     * @function toJSON
     * @memberof TextData
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    TextData.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return TextData;
})();

$root.Decoration = (function() {

    /**
     * Properties of a Decoration.
     * @exports IDecoration
     * @interface IDecoration
     * @property {string|null} [type] Decoration type
     * @property {google.protobuf.IAny|null} [data] This object is controlled entirely by the decorator. Use it to store any data necessary to run the decorator
     */

    /**
     * Constructs a new Decoration.
     * @exports Decoration
     * @classdesc Represents a Decoration.
     * @implements IDecoration
     * @constructor
     * @param {IDecoration=} [properties] Properties to set
     */
    function Decoration(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Decoration type.
     * @member {string} type
     * @memberof Decoration
     * @instance
     */
    Decoration.prototype.type = "";

    /**
     * This object is controlled entirely by the decorator. Use it to store any data necessary to run the decorator
     * @member {google.protobuf.IAny|null|undefined} data
     * @memberof Decoration
     * @instance
     */
    Decoration.prototype.data = null;

    /**
     * Creates a new Decoration instance using the specified properties.
     * @function create
     * @memberof Decoration
     * @static
     * @param {IDecoration=} [properties] Properties to set
     * @returns {Decoration} Decoration instance
     */
    Decoration.create = function create(properties) {
        return new Decoration(properties);
    };

    /**
     * Encodes the specified Decoration message. Does not implicitly {@link Decoration.verify|verify} messages.
     * @function encode
     * @memberof Decoration
     * @static
     * @param {IDecoration} message Decoration message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Decoration.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.type != null && Object.hasOwnProperty.call(message, "type"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.type);
        if (message.data != null && Object.hasOwnProperty.call(message, "data"))
            $root.google.protobuf.Any.encode(message.data, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified Decoration message, length delimited. Does not implicitly {@link Decoration.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Decoration
     * @static
     * @param {IDecoration} message Decoration message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Decoration.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Decoration message from the specified reader or buffer.
     * @function decode
     * @memberof Decoration
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Decoration} Decoration
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Decoration.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Decoration();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.type = reader.string();
                break;
            case 2:
                message.data = $root.google.protobuf.Any.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Decoration message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Decoration
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Decoration} Decoration
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Decoration.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Decoration message.
     * @function verify
     * @memberof Decoration
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Decoration.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.type != null && message.hasOwnProperty("type"))
            if (!$util.isString(message.type))
                return "type: string expected";
        if (message.data != null && message.hasOwnProperty("data")) {
            var error = $root.google.protobuf.Any.verify(message.data);
            if (error)
                return "data." + error;
        }
        return null;
    };

    /**
     * Creates a Decoration message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Decoration
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Decoration} Decoration
     */
    Decoration.fromObject = function fromObject(object) {
        if (object instanceof $root.Decoration)
            return object;
        var message = new $root.Decoration();
        if (object.type != null)
            message.type = String(object.type);
        if (object.data != null) {
            if (typeof object.data !== "object")
                throw TypeError(".Decoration.data: object expected");
            message.data = $root.google.protobuf.Any.fromObject(object.data);
        }
        return message;
    };

    /**
     * Creates a plain object from a Decoration message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Decoration
     * @static
     * @param {Decoration} message Decoration
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Decoration.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.type = "";
            object.data = null;
        }
        if (message.type != null && message.hasOwnProperty("type"))
            object.type = message.type;
        if (message.data != null && message.hasOwnProperty("data"))
            object.data = $root.google.protobuf.Any.toObject(message.data, options);
        return object;
    };

    /**
     * Converts this Decoration to JSON.
     * @function toJSON
     * @memberof Decoration
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Decoration.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Decoration;
})();

$root.google = (function() {

    /**
     * Namespace google.
     * @exports google
     * @namespace
     */
    var google = {};

    google.protobuf = (function() {

        /**
         * Namespace protobuf.
         * @memberof google
         * @namespace
         */
        var protobuf = {};

        protobuf.Any = (function() {

            /**
             * Properties of an Any.
             * @memberof google.protobuf
             * @interface IAny
             * @property {string|null} [type_url] Any type_url
             * @property {Uint8Array|null} [value] Any value
             */

            /**
             * Constructs a new Any.
             * @memberof google.protobuf
             * @classdesc Represents an Any.
             * @implements IAny
             * @constructor
             * @param {google.protobuf.IAny=} [properties] Properties to set
             */
            function Any(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Any type_url.
             * @member {string} type_url
             * @memberof google.protobuf.Any
             * @instance
             */
            Any.prototype.type_url = "";

            /**
             * Any value.
             * @member {Uint8Array} value
             * @memberof google.protobuf.Any
             * @instance
             */
            Any.prototype.value = $util.newBuffer([]);

            /**
             * Creates a new Any instance using the specified properties.
             * @function create
             * @memberof google.protobuf.Any
             * @static
             * @param {google.protobuf.IAny=} [properties] Properties to set
             * @returns {google.protobuf.Any} Any instance
             */
            Any.create = function create(properties) {
                return new Any(properties);
            };

            /**
             * Encodes the specified Any message. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.Any
             * @static
             * @param {google.protobuf.IAny} message Any message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Any.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.type_url != null && Object.hasOwnProperty.call(message, "type_url"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.type_url);
                if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                    writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.value);
                return writer;
            };

            /**
             * Encodes the specified Any message, length delimited. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.Any
             * @static
             * @param {google.protobuf.IAny} message Any message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Any.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an Any message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.Any
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.Any} Any
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Any.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.Any();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.type_url = reader.string();
                        break;
                    case 2:
                        message.value = reader.bytes();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an Any message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.Any
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.Any} Any
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Any.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an Any message.
             * @function verify
             * @memberof google.protobuf.Any
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Any.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.type_url != null && message.hasOwnProperty("type_url"))
                    if (!$util.isString(message.type_url))
                        return "type_url: string expected";
                if (message.value != null && message.hasOwnProperty("value"))
                    if (!(message.value && typeof message.value.length === "number" || $util.isString(message.value)))
                        return "value: buffer expected";
                return null;
            };

            /**
             * Creates an Any message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.Any
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.Any} Any
             */
            Any.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.Any)
                    return object;
                var message = new $root.google.protobuf.Any();
                if (object.type_url != null)
                    message.type_url = String(object.type_url);
                if (object.value != null)
                    if (typeof object.value === "string")
                        $util.base64.decode(object.value, message.value = $util.newBuffer($util.base64.length(object.value)), 0);
                    else if (object.value.length)
                        message.value = object.value;
                return message;
            };

            /**
             * Creates a plain object from an Any message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.Any
             * @static
             * @param {google.protobuf.Any} message Any
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Any.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.type_url = "";
                    if (options.bytes === String)
                        object.value = "";
                    else {
                        object.value = [];
                        if (options.bytes !== Array)
                            object.value = $util.newBuffer(object.value);
                    }
                }
                if (message.type_url != null && message.hasOwnProperty("type_url"))
                    object.type_url = message.type_url;
                if (message.value != null && message.hasOwnProperty("value"))
                    object.value = options.bytes === String ? $util.base64.encode(message.value, 0, message.value.length) : options.bytes === Array ? Array.prototype.slice.call(message.value) : message.value;
                return object;
            };

            /**
             * Converts this Any to JSON.
             * @function toJSON
             * @memberof google.protobuf.Any
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Any.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Any;
        })();

        return protobuf;
    })();

    return google;
})();

/**
 * ImageType enum.
 * @exports ImageType
 * @enum {number}
 * @property {number} DOUBLE=0 DOUBLE value
 * @property {number} SINGLE=1 SINGLE value
 * @property {number} DASHED=2 DASHED value
 * @property {number} DOTTED=3 DOTTED value
 */
$root.ImageType = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "DOUBLE"] = 0;
    values[valuesById[1] = "SINGLE"] = 1;
    values[valuesById[2] = "DASHED"] = 2;
    values[valuesById[3] = "DOTTED"] = 3;
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
 * @property {number} CENTER=2 CENTER value
 */
$root.ImageAlignment = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "LEFT"] = 0;
    values[valuesById[1] = "RIGHT"] = 1;
    values[valuesById[2] = "CENTER"] = 2;
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
            case 2:
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
        case 2:
            message.alignment = 2;
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

/**
 * DividerType enum.
 * @exports DividerType
 * @enum {number}
 * @property {number} DOUBLE=0 DOUBLE value
 * @property {number} SINGLE=1 SINGLE value
 * @property {number} DASHED=2 DASHED value
 * @property {number} DOTTED=3 DOTTED value
 */
$root.DividerType = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "DOUBLE"] = 0;
    values[valuesById[1] = "SINGLE"] = 1;
    values[valuesById[2] = "DASHED"] = 2;
    values[valuesById[3] = "DOTTED"] = 3;
    return values;
})();

/**
 * DividerSize enum.
 * @exports DividerSize
 * @enum {number}
 * @property {number} SMALL=0 SMALL value
 * @property {number} MEDIUM=1 MEDIUM value
 * @property {number} LARGE=2 LARGE value
 */
$root.DividerSize = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "SMALL"] = 0;
    values[valuesById[1] = "MEDIUM"] = 1;
    values[valuesById[2] = "LARGE"] = 2;
    return values;
})();

/**
 * DividerAlignment enum.
 * @exports DividerAlignment
 * @enum {number}
 * @property {number} LEFT=0 LEFT value
 * @property {number} RIGHT=1 RIGHT value
 * @property {number} CENTER=2 CENTER value
 */
$root.DividerAlignment = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "LEFT"] = 0;
    values[valuesById[1] = "RIGHT"] = 1;
    values[valuesById[2] = "CENTER"] = 2;
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
            case 2:
                break;
            }
        if (message.alignment != null && message.hasOwnProperty("alignment"))
            switch (message.alignment) {
            default:
                return "alignment: enum value expected";
            case 0:
            case 1:
            case 2:
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
        case 2:
            message.size = 2;
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
        case 2:
            message.alignment = 2;
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
            case 2:
            case 3:
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
        case 2:
            message.type = 2;
            break;
        case "DOTTED":
        case 3:
            message.type = 3;
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
