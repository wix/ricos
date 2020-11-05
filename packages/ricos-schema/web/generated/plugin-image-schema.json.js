/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/light");

var $root = ($protobuf.roots["default"] || ($protobuf.roots["default"] = new $protobuf.Root()))
.addJSON({
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
  }
});

module.exports = $root;
