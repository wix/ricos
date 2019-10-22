# wix-rich-content-editor

The library is built on top of draft.js and adds a plugin model
You can add any plugin to the texteditor and you can write your own
When writing a plugin, you write a component that is rendered in the document
The component automatically gets a toolbar if you list the buttons it has
The communication between the toolbar and the component is done via pubsub when updating componentData and componentState
When one of the parties updates componentData, it is serialized into the document and notifies the textEditor on a change that needs to be saved.
