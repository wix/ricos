import { TOOLBARS, TOOLBAR_OFFSETS, DISPLAY_MODE } from '../../consts';
import { getConfigByFormFactor } from '../../Utils/getConfigByFormFactor';
import { mergeToolbarSettings } from '../../Utils/mergeToolbarSettings';
import { getDefaultToolbarSettings } from '../default-toolbar-settings';

export const getInitialState = () => ({
  position: { transform: 'scale(0)' },
  showLeftArrow: false,
  showRightArrow: false,
  componentData: {},
  componentState: {},
  overrideContent: undefined,
  tabIndex: -1,
});

export const setVariables = ({ buttons, getToolbarSettings, isMobile }) => {
  const { all, hidden } = buttons;
  const visibleButtons = all.filter(({ keyName }) => !hidden.includes(keyName));

  const defaultSettings = getDefaultToolbarSettings({ pluginButtons: visibleButtons });
  const customSettings = getToolbarSettings({ pluginButtons: visibleButtons }).filter(
    ({ name }) => name === TOOLBARS.PLUGIN
  );
  const toolbarSettings = mergeToolbarSettings({ defaultSettings, customSettings }).filter(
    ({ name }) => name === TOOLBARS.PLUGIN
  )[0];

  const {
    shouldCreate: _shouldCreate,
    getPositionOffset,
    getButtons,
    getVisibilityFn,
    getDisplayOptions,
    getToolbarDecorationFn,
  } = toolbarSettings;

  const structure = getConfigByFormFactor({ config: getButtons(), isMobile, defaultValue: [] });
  const offset = getConfigByFormFactor({
    config: getPositionOffset(),
    isMobile,
    defaultValue: { x: 0, y: 0 },
  });
  const shouldCreate = getConfigByFormFactor({
    config: _shouldCreate(),
    isMobile,
    defaultValue: true,
  });
  const visibilityFn = getConfigByFormFactor({
    config: getVisibilityFn(),
    isMobile,
    defaultValue: () => true,
  });
  const displayOptions = getConfigByFormFactor({
    config: getDisplayOptions(),
    isMobile,
    defaultValue: { displayMode: DISPLAY_MODE.NORMAL },
  });
  const toolbarDecorationFn = getConfigByFormFactor({
    config: getToolbarDecorationFn(),
    isMobile,
    defaultValue: () => null,
  });
  const ToolbarDecoration = toolbarDecorationFn();
  return { structure, offset, shouldCreate, visibilityFn, displayOptions, ToolbarDecoration };
};

export const shouldComponentUpdate = state => {
  return !!state.isVisible;
};

export const onOverrideContent = (setState, overrideContent) => {
  setState({ overrideContent });
};

export const hideToolbar = setState => {
  setState({ ...getInitialState(), isVisible: false });
};

export const getRelativePositionStyle = ({
  boundingRect,
  offset,
  offsetHeight,
  toolbarNode,
  languageDir,
}) => {
  const { x, y } = offset;
  const updatedOffsetHeight = offsetHeight || toolbarNode.offsetHeight;
  const toolbarHeight = updatedOffsetHeight;
  const toolbarWidth = toolbarNode.offsetWidth;
  const offsetParentRect = toolbarNode.offsetParent.getBoundingClientRect();
  const offsetParentTop = offsetParentRect.top;
  const offsetParentLeft = offsetParentRect.left;
  const top = boundingRect.top - toolbarHeight - TOOLBAR_OFFSETS.top - offsetParentTop + y;
  const tmpLeft =
    boundingRect.left + boundingRect.width / 2 - offsetParentLeft - toolbarWidth / 2 + x;
  const maxLeft = offsetParentRect.right - toolbarWidth - TOOLBAR_OFFSETS.left;
  const left = calculateLeftOffset(tmpLeft, maxLeft, languageDir);
  return {
    position: {
      '--offset-top': `${top}px`,
      '--offset-left': `${left}px`,
      transform: 'scale(1)',
    },
    updatedOffsetHeight,
  };
};

const calculateLeftOffset = (left, maxLeft, languageDir) => {
  const isLtr = languageDir === 'ltr';
  const outOfMargins = isLtr ? left < 0 : left > maxLeft;
  if (outOfMargins) {
    return -TOOLBAR_OFFSETS.left * 2;
  }
  if (isLtr) {
    return Math.min(left, maxLeft);
  }
  return left < 0 ? maxLeft : left;
};

export const showToolbar = (
  setState,
  { boundingRect, visibilityFn, displayOptions, getRelativePositionStyle, offset, pubsub }
) => {
  if (!visibilityFn()) {
    return;
  }

  let position;
  if (displayOptions.displayMode === DISPLAY_MODE.NORMAL) {
    position = getRelativePositionStyle(boundingRect);
  } else if (displayOptions.displayMode === DISPLAY_MODE.FLOATING) {
    position = {
      '--offset-top': `${offset.y}px`,
      '--offset-left': `${offset.x}px`,
      transform: 'scale(1)',
      position: 'absolute',
    };
  }

  const componentData = pubsub.get('componentData') || {};
  const componentState = pubsub.get('componentState') || {};
  setState({
    isVisible: true,
    position,
    componentData,
    componentState,
    tabIndex: 0,
  });
};
