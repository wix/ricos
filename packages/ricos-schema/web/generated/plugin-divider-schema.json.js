/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/light");

var $root = ($protobuf.roots["default"] || ($protobuf.roots["default"] = new $protobuf.Root()))
.addJSON({
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
