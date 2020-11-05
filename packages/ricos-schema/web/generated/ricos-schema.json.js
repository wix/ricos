/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/light");

var $root = ($protobuf.roots["default"] || ($protobuf.roots["default"] = new $protobuf.Root()))
.addJSON({
  RicosContent: {
    fields: {
      doc: {
        type: "Document",
        id: 1
      },
      selection: {
        type: "Selection",
        id: 2
      },
      version: {
        type: "string",
        id: 3
      }
    }
  },
  Document: {
    fields: {
      nodes: {
        rule: "repeated",
        type: "Node",
        id: 1
      },
      lastEdited: {
        type: "string",
        id: 2
      }
    }
  },
  Selection: {
    fields: {
      anchor: {
        type: "int32",
        id: 1
      },
      focus: {
        type: "int32",
        id: 2
      }
    }
  },
  Node: {
    oneofs: {
      data: {
        oneof: [
          "image",
          "text"
        ]
      }
    },
    fields: {
      type: {
        type: "string",
        id: 1
      },
      image: {
        type: "google.protobuf.Any",
        id: 2
      },
      text: {
        type: "TextData",
        id: 3
      },
      nodes: {
        rule: "repeated",
        type: "Node",
        id: 4
      }
    }
  },
  TextData: {
    fields: {
      text: {
        type: "string",
        id: 1
      },
      decorations: {
        rule: "repeated",
        type: "Decoration",
        id: 2
      }
    }
  },
  Decoration: {
    fields: {
      type: {
        type: "string",
        id: 1
      },
      data: {
        type: "google.protobuf.Any",
        id: 2
      }
    }
  },
  google: {
    nested: {
      protobuf: {
        nested: {
          Any: {
            fields: {
              type_url: {
                type: "string",
                id: 1
              },
              value: {
                type: "bytes",
                id: 2
              }
            }
          }
        }
      }
    }
  }
});

module.exports = $root;
