import { KeyBindingUtil, getDefaultKeyBinding } from '@wix/draft-js';
import isEqual from 'lodash/isEqual';

export const COMMANDS = {
  LINK: 'link',
  TITLE: 'header-one',
  SUBTITLE: 'header-two',
  ALIGN_LEFT: 'left',
  ALIGN_RIGHT: 'right',
  ALIGN_CENTER: 'center',
  JUSTIFY: 'justify',
  NUMBERED_LIST: 'ordered-list-item',
  BULLET_LIST: 'unordered-list-item',
  CODE: 'code-block',
  BLOCKQUOTE: 'blockquote',
  TAB: 'tab'
};

const MODIFIERS = {
  COMMAND: 'command',
  CTRL: 'ctrl',
  OPTION: 'option',
  SHIFT: 'shift',
};

const COMMAND_BY_SHORTCUT = [
  {
    command: COMMANDS.LINK,
    modifiers: [MODIFIERS.COMMAND],
    key: 'k'
  }, {
    command: COMMANDS.TITLE,
    modifiers: [MODIFIERS.COMMAND, MODIFIERS.SHIFT],
    key: '1'
  }, {
    command: COMMANDS.SUBTITLE,
    modifiers: [MODIFIERS.COMMAND, MODIFIERS.SHIFT],
    key: '2'
  }, {
    command: COMMANDS.ALIGN_LEFT,
    modifiers: [MODIFIERS.COMMAND],
    key: 'l'
  }, {
    command: COMMANDS.ALIGN_RIGHT,
    modifiers: [MODIFIERS.COMMAND],
    key: 'r'
  }, {
    command: COMMANDS.ALIGN_CENTER,
    modifiers: [MODIFIERS.COMMAND],
    key: 'e'
  }, {
    command: COMMANDS.JUSTIFY,
    modifiers: [MODIFIERS.COMMAND],
    key: 'j'
  }, {
    command: COMMANDS.NUMBERED_LIST,
    modifiers: [MODIFIERS.COMMAND],
    key: 'm'
  }, {
    command: COMMANDS.BULLET_LIST,
    modifiers: [MODIFIERS.COMMAND, MODIFIERS.SHIFT],
    key: 'l'
  }, {
    command: COMMANDS.CODE,
    modifiers: [MODIFIERS.COMMAND, MODIFIERS.SHIFT],
    key: '8'
  }, {
    command: COMMANDS.BLOCKQUOTE,
    modifiers: [MODIFIERS.COMMAND, MODIFIERS.SHIFT],
    key: '9'
  }, {
    command: COMMANDS.TAB,
    modifiers: [],
    key: 'Tab'
  }];

const { hasCommandModifier, isCtrlKeyCommand, isOptionKeyCommand } = KeyBindingUtil;

function getModifiers(e) {
  return [
    ...(hasCommandModifier(e) ? [MODIFIERS.COMMAND] : []),
    ...(isCtrlKeyCommand(e) ? [MODIFIERS.CTRL] : []),
    ...(isOptionKeyCommand(e) ? [MODIFIERS.OPTION] : []),
    ...(e.shiftKey ? [MODIFIERS.SHIFT] : [])
  ];
}

function getCommandByShortcut(shortcut) {
  if (!shortcut) {
    return null;
  }

  const commands = COMMAND_BY_SHORTCUT
    .filter(mapped => mapped.key === shortcut.key &&
      isEqual(mapped.modifiers, shortcut.modifiers))
    .map(mapped => mapped.command);

  return commands.length > 0 ? commands[0] : null;
}

export function keyBindingFn(e) {
  const shortcut = { modifiers: getModifiers(e), key: e.key };
  return getCommandByShortcut(shortcut) || getDefaultKeyBinding(e);
}
