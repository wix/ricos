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
          "text",
          "image",
          "divider"
        ]
      }
    },
    fields: {
      type: {
        type: "string",
        id: 1
      },
      nodes: {
        rule: "repeated",
        type: "Node",
        id: 2
      },
      text: {
        type: "TextData",
        id: 3
      },
      image: {
        type: "ImageData",
        id: 4
      },
      divider: {
        type: "DividerData",
        id: 5
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
  },
  ImageType: {
    values: {
      DOUBLE: 0,
      SINGLE: 1,
      DASHED: 2,
      DOTTED: 3
    }
  },
  ImageSize: {
    values: {
      CONTENT: 0,
      SMALL: 1,
      ORIGINAL: 2,
      FULL_WIDTH: 3,
      INLINE: 4
    }
  },
  ImageAlignment: {
    values: {
      LEFT: 0,
      RIGHT: 1,
      CENTER: 2
    }
  },
  ImageLink: {
    fields: {
      url: {
        type: "string",
        id: 1
      },
      target: {
        type: "Target",
        id: 2
      },
      rel: {
        type: "string",
        id: 3
      }
    },
    nested: {
      Target: {
        values: {
          BLANK: 0,
          SELF: 1,
          TOP: 2
        }
      }
    }
  },
  ImageConfig: {
    fields: {
      size: {
        type: "ImageSize",
        id: 1
      },
      alignment: {
        type: "ImageAlignment",
        id: 2
      },
      showTitle: {
        type: "bool",
        id: 3
      },
      showDescription: {
        type: "bool",
        id: 4
      },
      anchor: {
        type: "string",
        id: 5
      },
      link: {
        type: "ImageLink",
        id: 6
      }
    }
  },
  ImageSource: {
    fields: {
      id: {
        type: "string",
        id: 1
      },
      originalFileName: {
        type: "string",
        id: 2
      },
      fileName: {
        type: "string",
        id: 3
      },
      width: {
        type: "int32",
        id: 4
      },
      height: {
        type: "int32",
        id: 5
      }
    }
  },
  ImageMetadata: {
    fields: {
      alt: {
        type: "string",
        id: 1
      },
      caption: {
        type: "string",
        id: 2
      }
    }
  },
  ImageData: {
    fields: {
      config: {
        type: "ImageConfig",
        id: 1
      },
      src: {
        type: "ImageSource",
        id: 2
      },
      metadata: {
        type: "ImageMetadata",
        id: 3
      }
    }
  },
  DividerType: {
    values: {
      DOUBLE: 0,
      SINGLE: 1,
      DASHED: 2,
      DOTTED: 3
    }
  },
  DividerSize: {
    values: {
      SMALL: 0,
      MEDIUM: 1,
      LARGE: 2
    }
  },
  DividerAlignment: {
    values: {
      LEFT: 0,
      RIGHT: 1,
      CENTER: 2
    }
  },
  DividerConfig: {
    fields: {
      size: {
        type: "DividerSize",
        id: 1
      },
      alignment: {
        type: "DividerAlignment",
        id: 2
      },
      textWrap: {
        type: "string",
        id: 3
      }
    }
  },
  DividerData: {
    fields: {
      type: {
        type: "DividerType",
        id: 1
      },
      config: {
        type: "DividerConfig",
        id: 2
      }
    }
  }
});

module.exports = $root;
