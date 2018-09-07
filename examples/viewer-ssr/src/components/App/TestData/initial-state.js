/* eslint-disable */
const TestData = {
  onlyText: {
    entityMap: {},
    blocks: [
      {
        key: "5g8yu",
        text: "Hello text only #hashtag test.com",
        type: "unstyled",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {}
      }
    ]
  },
  textStyled: {
    blocks: [
      {
        key: "foo",
        text: "H2 center",
        type: "header-two",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {
          textAlignment: "center"
        }
      },
      {
        key: "1fu1i",
        text: "H2 Bold",
        type: "header-two",
        depth: 0,
        inlineStyleRanges: [
          {
            offset: 0,
            length: 7,
            style: "BOLD"
          }
        ],
        entityRanges: [],
        data: {
          textAlignment: "left"
        }
      },
      {
        key: "bp80a",
        text: "H2 italic",
        type: "header-two",
        depth: 0,
        inlineStyleRanges: [
          {
            offset: 0,
            length: 9,
            style: "ITALIC"
          }
        ],
        entityRanges: [],
        data: {}
      },
      {
        key: "4c07a",
        text: "H2 underline right",
        type: "header-two",
        depth: 0,
        inlineStyleRanges: [
          {
            offset: 0,
            length: 18,
            style: "UNDERLINE"
          }
        ],
        entityRanges: [],
        data: {
          textAlignment: "right"
        }
      },
      {
        key: "5tu09",
        text: "H2 numbered",
        type: "ordered-list-item",
        depth: 0,
        inlineStyleRanges: [
          {
            offset: 0,
            length: 11,
            style: "inline-header-two"
          }
        ],
        entityRanges: [],
        data: {
          textAlignment: "left"
        }
      },
      {
        key: "dmo5o",
        text: "H2 bullet",
        type: "unordered-list-item",
        depth: 0,
        inlineStyleRanges: [
          {
            offset: 0,
            length: 9,
            style: "inline-header-two"
          }
        ],
        entityRanges: [],
        data: {}
      },
      {
        key: "7tcj1",
        text: "H3 center",
        type: "header-three",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {
          textAlignment: "center"
        }
      },
      {
        key: "7vk99",
        text: "H3 Bold",
        type: "header-three",
        depth: 0,
        inlineStyleRanges: [
          {
            offset: 0,
            length: 7,
            style: "BOLD"
          }
        ],
        entityRanges: [],
        data: {}
      },
      {
        key: "f8vre",
        text: "H3 italic",
        type: "header-three",
        depth: 0,
        inlineStyleRanges: [
          {
            offset: 0,
            length: 9,
            style: "ITALIC"
          }
        ],
        entityRanges: [],
        data: {}
      },
      {
        key: "5s7kr",
        text: "H3 underline right",
        type: "header-three",
        depth: 0,
        inlineStyleRanges: [
          {
            offset: 0,
            length: 18,
            style: "UNDERLINE"
          }
        ],
        entityRanges: [],
        data: {
          textAlignment: "right"
        }
      },
      {
        key: "bpodd",
        text: "H3 numbered",
        type: "ordered-list-item",
        depth: 0,
        inlineStyleRanges: [
          {
            offset: 0,
            length: 11,
            style: "inline-header-three"
          }
        ],
        entityRanges: [],
        data: {
          textAlignment: "left"
        }
      },
      {
        key: "cdtes",
        text: "H3 bullet",
        type: "unordered-list-item",
        depth: 0,
        inlineStyleRanges: [
          {
            offset: 0,
            length: 9,
            style: "inline-header-three"
          }
        ],
        entityRanges: [],
        data: {}
      },
      {
        key: "3vlvl",
        text: "Text center",
        type: "unstyled",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {
          textAlignment: "center"
        }
      },
      {
        key: "bkfej",
        text: "Text bold",
        type: "unstyled",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {}
      },
      {
        key: "4l1s1",
        text: "Text italic",
        type: "unstyled",
        depth: 0,
        inlineStyleRanges: [
          {
            offset: 0,
            length: 11,
            style: "ITALIC"
          }
        ],
        entityRanges: [],
        data: {}
      },
      {
        key: "2bdfj",
        text: "Text underline right",
        type: "unstyled",
        depth: 0,
        inlineStyleRanges: [
          {
            offset: 0,
            length: 20,
            style: "UNDERLINE"
          }
        ],
        entityRanges: [],
        data: {
          textAlignment: "right"
        }
      },
      {
        key: "5imgj",
        text: "Quote1",
        type: "blockquote",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {
          textAlignment: "left"
        }
      },
      {
        key: "b47af",
        text: "Quote2",
        type: "blockquote",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {}
      },
      {
        key: "5g8yu",
        text: "Text with #hashtag",
        type: "unstyled",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {}
      },
    ],
    entityMap: {}
  },
  softNewLine: {
    blocks: [
      {
        key: "4rcs3",
        text: "test me!hi, my name is Dor. \nI'm an idiot",
        type: "unstyled",
        depth: 0,
        inlineStyleRanges: [
          {
            offset: 0,
            length: 8,
            style: "inline-header-one"
          }
        ],
        entityRanges: [],
        data: {}
      },
      {
        key: "c926g",
        text: "one more block \nand this is a normal text",
        type: "unstyled",
        depth: 0,
        inlineStyleRanges: [
          {
            offset: 0,
            length: 14,
            style: "inline-header-one"
          }
        ],
        entityRanges: [],
        data: {}
      }
    ],
    entityMap: {}
  },
  lists: {
    blocks: [
      {
        key: "b1jra",
        text: "h2test",
        type: "ordered-list-item",
        depth: 0,
        inlineStyleRanges: [
          {
            offset: 0,
            length: 2,
            style: "inline-header-one"
          },
          {
            offset: 0,
            length: 6,
            style: "BOLD"
          }
        ],
        entityRanges: [],
        data: {}
      },
      {
        key: "9ne2e",
        text: "h3test",
        type: "ordered-list-item",
        depth: 0,
        inlineStyleRanges: [
          {
            offset: 0,
            length: 2,
            style: "inline-header-two"
          },
          {
            offset: 0,
            length: 6,
            style: "ITALIC"
          }
        ],
        entityRanges: [],
        data: {}
      },
      {
        key: "6gc05",
        text: "h4test",
        type: "ordered-list-item",
        depth: 0,
        inlineStyleRanges: [
          {
            offset: 0,
            length: 2,
            style: "inline-header-three"
          },
          {
            offset: 0,
            length: 6,
            style: "UNDERLINE"
          }
        ],
        entityRanges: [],
        data: {}
      },
      {
        key: "3k78h",
        text: "",
        type: "unstyled",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {}
      },
      {
        key: "4vk1l",
        text: "h2\ntest",
        type: "unordered-list-item",
        depth: 0,
        inlineStyleRanges: [
          {
            offset: 0,
            length: 3,
            style: "inline-header-one"
          },
          {
            offset: 0,
            length: 7,
            style: "BOLD"
          }
        ],
        entityRanges: [],
        data: {}
      },
      {
        key: "f76qt",
        text: "h3\ntest",
        type: "unordered-list-item",
        depth: 0,
        inlineStyleRanges: [
          {
            offset: 0,
            length: 3,
            style: "inline-header-two"
          },
          {
            offset: 0,
            length: 7,
            style: "ITALIC"
          }
        ],
        entityRanges: [],
        data: {}
      },
      {
        key: "dc2cf",
        text: "h4\ntest",
        type: "unordered-list-item",
        depth: 0,
        inlineStyleRanges: [
          {
            offset: 0,
            length: 3,
            style: "inline-header-three"
          },
          {
            offset: 0,
            length: 7,
            style: "UNDERLINE"
          }
        ],
        entityRanges: [],
        data: {}
      }
    ],
    entityMap: {}
  },
  links: {
    blocks: [
      {
        key: "foo",
        text:
          "Search was Google’s only unambiguous win, as well as its primary source of revenue, so when Amazon rapidly surpassed Google as the top product search destination, Google’s foundations began to falter. As many noted at the time, the online advertising industry experienced a major shift from search to discovery in the mid-2010s.",
        type: "unstyled",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [
          {
            offset: 57,
            length: 25,
            key: 0
          },
          {
            offset: 99,
            length: 24,
            key: 1
          },
          {
            offset: 204,
            length: 10,
            key: 2
          }
        ],
        data: {}
      }
    ],
    entityMap: {
      "0": {
        type: "LINK",
        mutability: "MUTABLE",
        data: {
          href:
            "http://www.cnbc.com/2017/01/26/googlealphabet-reports-fourth-quarter-2016-earnings-q4.html",
          rel: "noopener",
          target: "_blank",
          url:
            "http://www.cnbc.com/2017/01/26/googlealphabet-reports-fourth-quarter-2016-earnings-q4.html"
        }
      },
      "1": {
        type: "LINK",
        mutability: "MUTABLE",
        data: {
          href:
            "http://www.geekwire.com/2017/amazon-continues-grow-lead-google-starting-point-online-shoppers/",
          rel: "noopener",
          target: "_blank",
          url:
            "http://www.geekwire.com/2017/amazon-continues-grow-lead-google-starting-point-online-shoppers/"
        }
      },
      "2": {
        type: "LINK",
        mutability: "MUTABLE",
        data: {
          href:
            "https://techcrunch.com/2016/08/11/google-isnt-safe-from-yahoos-fate/",
          rel: "noopener",
          target: "_blank",
          url:
            "https://techcrunch.com/2016/08/11/google-isnt-safe-from-yahoos-fate/"
        }
      }
    }
  },
  legacyImage2: {
    entityMap: {},
    blocks: [
      {
        key: "5g8yu",
        text: "Is this the right way to define atomic blocks?",
        type: "unstyled",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {}
      },
      {
        key: "3ov91",
        text: "",
        type: "atomic",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {
          type: "IMAGE",
          item: {
            file_name: "20",
            source: "static",
            url: "https://unsplash.it/500/500?image=20"
          }
        }
      }
    ]
  },
  legacyImage: {
    entityMap: {
      "0": {
        type: "IMAGE",
        mutability: "IMMUTABLE",
        data: {
          src: {
            original_file_name:
              "a27d24_5a98b777b0dd4c518ce70744ad44f630~mv2_d_4600_3903_s_4_2.jpg",
            file_name:
              "a27d24_5a98b777b0dd4c518ce70744ad44f630~mv2_d_4600_3903_s_4_2.jpg",
            width: 4600,
            height: 3903
          },
          size: "fullWidth"
        }
      }
    },
    blocks: [
      {
        key: "ov8f",
        text: " ",
        type: "atomic",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [
          {
            offset: 0,
            length: 1,
            key: 0
          }
        ],
        data: {}
      }
    ]
  },
  image: {
    entityMap: {
      "0": {
        type: "wix-draft-plugin-image",
        mutability: "IMMUTABLE",
        data: {
          src: {
            width: 960,
            height: 720,
            file_name: "a27d24_3427f118d84444dbbb01c684ec4a82da~mv2.png",
            original_file_name: "blob"
          },
          isLoading: false
        }
      }
    },
    blocks: [
      {
        key: "7euc6",
        text: " ",
        type: "atomic",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [
          {
            offset: 0,
            length: 1,
            key: 0
          }
        ],
        data: {}
      }
    ]
  },
  legacyVideo: {
    entityMap: {
      "0": {
        type: "VIDEO-EMBED",
        mutability: "IMMUTABLE",
        data: {
          src: "https://www.youtube.com/watch?v=eqZVIiD6wSg",
          config: { size: "content" }
        }
      }
    },
    blocks: [
      {
        key: "ov8f",
        text: " ",
        type: "atomic",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [
          {
            offset: 0,
            length: 1,
            key: 0
          }
        ],
        data: {}
      }
    ]
  },
  video: {
    entityMap: {
      "0": {
        type: "wix-draft-plugin-video",
        mutability: "IMMUTABLE",
        data: {
          src: "https://www.youtube.com/watch?v=eqZVIiD6wSg"
        },
        config: {
          alignment: "center",
          size: "content",
          key: "ov8f"
        }
      }
    },
    blocks: [
      {
        key: "ov8f",
        text: " ",
        type: "atomic",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [
          {
            offset: 0,
            length: 1,
            key: 0
          }
        ],
        data: {}
      }
    ]
  },
  html: {
    entityMap: {
      "0": {
        type: "wix-draft-plugin-html",
        mutability: "IMMUTABLE",
        data: {
          src: "https://www.youtube.com/embed/owsfdh4gxyc",
          srcType: "url",
          config: {
            width: 500,
            height: 200,
            safe: true
          }
        }
      }
    },
    blocks: [
      {
        key: "ov8f",
        text: " ",
        type: "atomic",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [
          {
            offset: 0,
            length: 1,
            key: 0
          }
        ],
        data: {}
      }
    ]
  },
  divider: {
    entityMap: {
      "0": {
        type: "wix-draft-plugin-divider",
        mutability: "IMMUTABLE",
        data: {
          type: "double",
          config: {
            size: "large"
          }
        }
      }
    },
    blocks: [
      {
        key: "ov8f",
        text: " ",
        type: "atomic",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [
          {
            offset: 0,
            length: 1,
            key: 0
          }
        ],
        data: {}
      }
    ]
  },
  gallery: {
    entityMap: {
      "0": {
        type: "wix-draft-plugin-gallery",
        mutability: "IMMUTABLE",
        data: {
          items: [
            {
              metadata: {
                height: 1000,
                width: 1920
              },
              itemId: "8b72558253b2502b401bb46e5599f22a",
              url: "8bb438_1b73a6b067b24175bd087e86613bd00c.jpg"
            },
            {
              metadata: {
                height: 5600,
                width: 3737
              },
              itemId: "2d3b675ea857dc41158bad3b28300824",
              url: "8bb438_78ff5e32500d48cdaa22a3f446d68216.jpg"
            },
            {
              metadata: {
                height: 3737,
                width: 5600
              },
              itemId: "860df034014674abd7a2e73abe0b851b",
              url: "8bb438_ff062a651e174cf5926fe5c088be1099.jpg"
            },
            {
              metadata: {
                height: 333,
                width: 500
              },
              itemId: "8b72558253b2502b401bb46e5599f22b",
              url: "8bb438_bc43580d2f36408f87cf8302a86e5ad4.jpg"
            },
            {
              metadata: {
                height: 560,
                width: 374
              },
              itemId: "2d3b675ea857dc41158bad3b28300825",
              url: "8bb438_7dde2abf38e24163b80c11619c357bf1.jpg"
            },
            {
              metadata: {
                height: 374,
                width: 560
              },
              itemId: "860df034014674abd7a2e73abe0b851c",
              url: "8bb438_ac190df97cfe4c6d8bcd9ca8b6b3c100.jpg"
            }
          ],
          config: { layout: "small" },
          styles: {}
        }
      }
    },
    blocks: [
      {
        key: "5g8yu",
        text: "Hello text only #hashtag test.com",
        type: "unstyled",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {}
      },
      {
        key: "ov8f",
        text: " ",
        type: "atomic",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [
          {
            offset: 0,
            length: 1,
            key: 0
          }
        ],
        data: {}
      }
    ]
  },
  soundCloud: {
    blocks: [
      {
        key: "evpng",
        text: " ",
        type: "atomic",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [
          {
            offset: 0,
            length: 1,
            key: 0
          }
        ],
        data: {}
      }
    ],
    entityMap: {
      0: {
        type: "wix-draft-plugin-sound-cloud",
        mutability: "IMMUTABLE",
        data: {
          config: {
            size: "content",
            alignment: "center",
            key: "evpng"
          },
          src:
            "https://soundcloud.com/miraj-perera/red-hot-chilli-peppers-cant",
          metadata: {
            height: 270,
            author_name: "Wix.com",
            html: "",
            thumbnail_width: 480,
            type: "video",
            version: "1.0",
            thumbnail_height: 360
          }
        }
      }
    }
  },
  full: {
    entityMap: {
      "0": {
        type: "IMAGE",
        mutability: "IMMUTABLE",
        data: {
          src: {
            original_file_name:
              "a27d24_5a98b777b0dd4c518ce70744ad44f630~mv2_d_4600_3903_s_4_2.jpg",
            file_name:
              "a27d24_5a98b777b0dd4c518ce70744ad44f630~mv2_d_4600_3903_s_4_2.jpg",
            width: 4600,
            height: 3903
          },
          size: "fullWidth"
        }
      },
      "1": {
        type: "IMAGE",
        mutability: "IMMUTABLE",
        data: {
          src: {
            original_file_name:
              "a27d24_f669708d0fe74538817f2636ca55e492~mv2_d_3000_2000_s_2.jpg",
            file_name:
              "a27d24_f669708d0fe74538817f2636ca55e492~mv2_d_3000_2000_s_2.jpg",
            width: 3000,
            height: 2000
          }
        },
        config: {
          layout: "classic",
          showTitle: true,
          showDescription: true
        }
      },
      "2": {
        type: "wix-draft-plugin-gallery",
        mutability: "IMMUTABLE",
        data: {
          items: [
            {
              metadata: {
                height: 1000,
                width: 1920
              },
              itemId: "8b72558253b2502b401bb46e5599f22a",
              url: "8bb438_1b73a6b067b24175bd087e86613bd00c.jpg"
            },
            {
              metadata: {
                height: 5600,
                width: 3737
              },
              itemId: "2d3b675ea857dc41158bad3b28300824",
              url: "8bb438_78ff5e32500d48cdaa22a3f446d68216.jpg"
            },
            {
              metadata: {
                height: 3737,
                width: 5600
              },
              itemId: "860df034014674abd7a2e73abe0b851b",
              url: "8bb438_ff062a651e174cf5926fe5c088be1099.jpg"
            },
            {
              metadata: {
                height: 333,
                width: 500
              },
              itemId: "8b72558253b2502b401bb46e5599f22b",
              url: "8bb438_bc43580d2f36408f87cf8302a86e5ad4.jpg"
            },
            {
              metadata: {
                height: 560,
                width: 374
              },
              itemId: "2d3b675ea857dc41158bad3b28300825",
              url: "8bb438_7dde2abf38e24163b80c11619c357bf1.jpg"
            },
            {
              metadata: {
                height: 374,
                width: 560
              },
              itemId: "860df034014674abd7a2e73abe0b851c",
              url: "8bb438_ac190df97cfe4c6d8bcd9ca8b6b3c100.jpg"
            }
          ],
          config: { layout: "small" }
        }
      },
      "3": {
        type: "wix-draft-plugin-image",
        mutability: "IMMUTABLE",
        data: {
          item: {
            file_name: "20",
            source: "static",
            url: "https://unsplash.it/300/300?image=20",
            title: "This is a title",
            description: "This is the description"
          },
          config: {
            layout: "classic",
            showTitle: true,
            showDescription: true
          }
        }
      },
      "4": {
        type: "wix-draft-plugin-html",
        mutability: "IMMUTABLE",
        data: {
          src: "https://www.youtube.com/embed/owsfdh4gxyc",
          config: {
            width: 200,
            height: 200,
            safe: true,
            isSrc: true
          }
        }
      },
      "5": {
        type: "wix-draft-plugin-html",
        mutability: "IMMUTABLE",
        data: {
          src: "https://www.youtube.com/embed/owsfdh4gxyc",
          srcType: "url",
          config: {
            width: 500,
            height: 200,
            safe: true
          }
        }
      },
      "6": {
        type: "wix-draft-plugin-divider",
        mutability: "IMMUTABLE",
        data: {
          type: "dashed",
          config: {
            size: "medium"
          }
        }
      }
    },
    blocks: [
      {
        key: "9gm3s",
        text:
          "Spicy jalapeno #bacon ipsum dolor amet kevin shank ground round, andouille tail shoulder venison strip steak biltong pastrami alcatra ribeye. Porchetta doner tail brisket chicken. Shank jerky flank, pastrami frankfurter hamburger burgdoggen filet mignon salami pork chop. Jerky swine short loin picanha porchetta, prosciutto short ribs jowl chuck burgdoggen brisket turkey.",
        type: "unstyled",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {}
      },
      {
        key: "ov8f",
        text: " ",
        type: "atomic",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [
          {
            offset: 0,
            length: 1,
            key: 6
          }
        ],
        data: {}
      },
      {
        key: "ov8w",
        text: " ",
        type: "atomic",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [
          {
            offset: 0,
            length: 1,
            key: 4
          }
        ],
        data: {}
      },
      {
        key: "ov8t",
        text: " ",
        type: "atomic",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [
          {
            offset: 0,
            length: 1,
            key: 5
          }
        ],
        data: {}
      },
      {
        key: "ov7w",
        text: " ",
        type: "atomic",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [
          {
            offset: 0,
            length: 1,
            key: 2
          }
        ],
        data: {}
      },
      {
        key: "ov7z",
        text: " ",
        type: "atomic",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [
          {
            offset: 0,
            length: 1,
            key: 3
          }
        ],
        data: {}
      },
      {
        key: "ov7r",
        text: " ",
        type: "atomic",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [
          {
            offset: 0,
            length: 1,
            key: 0
          }
        ],
        data: {}
      },
      {
        key: "e23a8",
        text:
          "Meatball.com rump tri-tip short ribs frankfurter chuck. Salami turkey ham, ball tip shankle chicken pork jerky venison beef ribs pastrami sausage bresaola. Beef ribs pork salami fatback tenderloin cupim, picanha porchetta pancetta hamburger pig pork loin chuck jerky bresaola. T-bone biltong landjaeger ham hock meatball tri-tip pancetta kevin chicken turducken drumstick tenderloin beef ribs tail. Sausage t-bone ham hock, bacon chicken jowl venison turkey bresaola tongue hamburger.",
        type: "unstyled",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {}
      },
      {
        key: "ov7a",
        text: " ",
        type: "atomic",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [
          {
            offset: 0,
            length: 1,
            key: 1
          }
        ],
        data: {}
      },
      {
        key: "5g8yu",
        text:
          "Biltong landjaeger andouille, doner prosciutto tri-tip sirloin shank. Ribeye capicola biltong pastrami burgdoggen. Filet mignon kielbasa capicola landjaeger pig hamburger, corned beef meatloaf swine meatball. Frankfurter brisket rump, pork fatback strip steak boudin cupim landjaeger sirloin venison pastrami cow pork chop chuck.",
        type: "unstyled",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {}
      }
    ]
  }
};

export default TestData;
