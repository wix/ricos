/** Taken from draft-js https://github.com/facebook/draft-js/blob/master/src/model/keys/generateRandomKey.js */
import { camelCase, cloneDeep } from 'lodash';
import { any } from 'lodash/fp';

const seenKeys = {};
const MULTIPLIER = Math.pow(2, 24);

function genKey(): string {
    let key;
    // eslint-disable-next-line fp/no-loops, no-prototype-builtins
    while (key === undefined || seenKeys.hasOwnProperty(key) || !isNaN(Number(key))) {
        key = Math.floor(Math.random() * MULTIPLIER).toString(32);
    }
    seenKeys[key] = true;
    return key;
}


const content = {
    "type": "doc",
    "content": [
        {
            "type": "paragraph",
            "attrs": {
                "lineHeight": 40
            },
            "content": [
                {
                    "type": "text",
                    "marks": [
                        {
                            "type": "bold"
                        }
                    ],
                    "text": "yaron"
                }
            ]
        }
    ]
}

const attributesToTextStyle = (attributes) => {
    const textStyle = {
    }

    Object.keys(attributes).forEach(attribute => {
        textStyle[camelCase(attribute)] = attributes[attribute];
    })

    return textStyle
}

const marksToDecorations = (marks) => {
    const decorations = marks.map(mark => {
        return {
            type: mark.type.toUpperCase()
        }
    })

    return decorations
}

const isInlineNode = (node) => {
    return node.type.toLowerCase() === 'text';
}
interface RicosNode {
    type: string;
    key: string;
    nodes?: [],
    decorations?: []
}
const convertProsMirrorNodeToRicosNode = (content) => {
    return content.map(node => {
        const newNode: RicosNode = {
            type: node.type.toUpperCase(),
            key: genKey(),
            nodes: []
        }
        const dataKey = `${node.type}Data`;
        newNode[dataKey] = {};
        if (node.attrs) {
            newNode[dataKey].textStyle = attributesToTextStyle(node.attrs)
        }

        if (node.marks) {
            newNode[dataKey].decorations = marksToDecorations(node.marks)
        };

        if (node.text) {
            newNode[dataKey].text = node.text;
        }

        if (node.content) {
            newNode.nodes = convertProsMirrorNodeToRicosNode(node.content)
        }

        return newNode
    })
}
export const convertProsMirrorContentToRicosContent = (content) => {
    let newContent = cloneDeep(content)
    newContent.nodes = []
    newContent.metadata = {
        version: 1,
        createdTimestamp: new Date(),
        updatedTimestamp: new Date(),
    }

    newContent.nodes = convertProsMirrorNodeToRicosNode(newContent.content);
    delete newContent.content;
    delete newContent.type;
    return newContent;
}
