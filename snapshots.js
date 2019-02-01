module.exports = {
  "__version": "3.1.4",
  "editor": {
    "should support lists": {
      "before": {
        "blocks": [
          {
            "key": 0,
            "text": "",
            "type": "unstyled",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
          }
        ],
        "entityMap": {}
      },
      "after": {
        "blocks": [
          {
            "key": 0,
            "text": "hello",
            "type": "unstyled",
            "depth": 0,
            "inlineStyleRanges": [
              {
                "offset": 0,
                "length": 5,
                "style": "BOLD"
              }
            ],
            "entityRanges": [],
            "data": {}
          }
        ],
        "entityMap": {}
      }
    }
  }
}
