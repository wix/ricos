import { Command, Extension } from '@tiptap/core'

type LineHeightOptions = {
    types: string[],
    defaultLineHeight: number
}

declare module '@tiptap/core' {
    interface Commands {
        lineHeight: {
            /**
             * Set the text align attribute
             */
            setLineHeight: (lineHeight: number) => Command,
            /**
             * Unset the text align attribute
             */
            usetLineHeight: () => Command,
        }
    }
}

export const LineHeight = Extension.create<LineHeightOptions>({
    name: 'lineHeight',

    defaultOptions: {
        types: ['paragraph'],
        defaultLineHeight: 20
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    lineHeight: {
                        default: this.options.defaultLineHeight,
                        renderHTML: attributes => {
                            console.log({ attributes })
                            return ({
                                style: `line-height: ${attributes.lineHeight}px`,
                            })
                        }
                        ,
                        parseHTML: element => ({
                            textAlign: element.style.lineHeight || this.options.defaultLineHeight,
                        }),
                    },
                },
            },
        ]
    },

    addCommands() {
        return {
            setLineHeight: (lineHeight: number) => ({ commands }) => {
                console.log('setLineHeight', lineHeight)
                return this.options.types.every(type => commands.updateAttributes(type, { lineHeight: lineHeight }))
            },
            unsetTextAlign: () => ({ commands }) => {
                return this.options.types.every(type => commands.resetAttributes(type, 'lineHeight'))
            },
        }
    },

    addKeyboardShortcuts() {
        return {
            'Mod-Shift-l': () => this.editor.commands.setLineHeight(40),
        }
    },
})