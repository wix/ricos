export default class EmojiDecorator {
  constructor(componentProps) {
    this.componentProps = componentProps;
  }

  getDecorations(block) {
    console.log('getDecorations');
    const key = block.getKey();
    const text = block.getText();
    const type = block.getType();
    const decorations = Array(text.length).fill(null);

    getComponentForKey = () => {
      console.log('getComponentForKey');
      return <div>Emoji</div>;
    };

    getPropsForKey = () => {
      console.log('getPropsForKey');
      return this.componentProps;
    };
  }
}
