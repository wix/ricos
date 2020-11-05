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
     * @property {google.protobuf.IAny|null} [image] This object is controlled entirely by the plugin. Use it to store any data necessary to run the plugin
     * @property {ITextData|null} [text] Node text
     * @property {Array.<INode>|null} [nodes] List of child nodes
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
     * This object is controlled entirely by the plugin. Use it to store any data necessary to run the plugin
     * @member {google.protobuf.IAny|null|undefined} image
     * @memberof Node
     * @instance
     */
    Node.prototype.image = null;

    /**
     * Node text.
     * @member {ITextData|null|undefined} text
     * @memberof Node
     * @instance
     */
    Node.prototype.text = null;

    /**
     * List of child nodes
     * @member {Array.<INode>} nodes
     * @memberof Node
     * @instance
     */
    Node.prototype.nodes = $util.emptyArray;

    // OneOf field names bound to virtual getters and setters
    var $oneOfFields;

    /**
     * Node data.
     * @member {"image"|"text"|undefined} data
     * @memberof Node
     * @instance
     */
    Object.defineProperty(Node.prototype, "data", {
        get: $util.oneOfGetter($oneOfFields = ["image", "text"]),
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
        if (message.image != null && Object.hasOwnProperty.call(message, "image"))
            $root.google.protobuf.Any.encode(message.image, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.text != null && Object.hasOwnProperty.call(message, "text"))
            $root.TextData.encode(message.text, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        if (message.nodes != null && message.nodes.length)
            for (var i = 0; i < message.nodes.length; ++i)
                $root.Node.encode(message.nodes[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
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
                message.image = $root.google.protobuf.Any.decode(reader, reader.uint32());
                break;
            case 3:
                message.text = $root.TextData.decode(reader, reader.uint32());
                break;
            case 4:
                if (!(message.nodes && message.nodes.length))
                    message.nodes = [];
                message.nodes.push($root.Node.decode(reader, reader.uint32()));
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
        if (message.image != null && message.hasOwnProperty("image")) {
            properties.data = 1;
            {
                var error = $root.google.protobuf.Any.verify(message.image);
                if (error)
                    return "image." + error;
            }
        }
        if (message.text != null && message.hasOwnProperty("text")) {
            if (properties.data === 1)
                return "data: multiple values";
            properties.data = 1;
            {
                var error = $root.TextData.verify(message.text);
                if (error)
                    return "text." + error;
            }
        }
        if (message.nodes != null && message.hasOwnProperty("nodes")) {
            if (!Array.isArray(message.nodes))
                return "nodes: array expected";
            for (var i = 0; i < message.nodes.length; ++i) {
                var error = $root.Node.verify(message.nodes[i]);
                if (error)
                    return "nodes." + error;
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
        if (object.image != null) {
            if (typeof object.image !== "object")
                throw TypeError(".Node.image: object expected");
            message.image = $root.google.protobuf.Any.fromObject(object.image);
        }
        if (object.text != null) {
            if (typeof object.text !== "object")
                throw TypeError(".Node.text: object expected");
            message.text = $root.TextData.fromObject(object.text);
        }
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
        if (message.image != null && message.hasOwnProperty("image")) {
            object.image = $root.google.protobuf.Any.toObject(message.image, options);
            if (options.oneofs)
                object.data = "image";
        }
        if (message.text != null && message.hasOwnProperty("text")) {
            object.text = $root.TextData.toObject(message.text, options);
            if (options.oneofs)
                object.data = "text";
        }
        if (message.nodes && message.nodes.length) {
            object.nodes = [];
            for (var j = 0; j < message.nodes.length; ++j)
                object.nodes[j] = $root.Node.toObject(message.nodes[j], options);
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

module.exports = $root;
