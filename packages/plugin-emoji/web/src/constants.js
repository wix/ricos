import React from 'react';
import {
  FaSmile,
  FaPaw,
  FaPlane,
  FaBell,
  FaHeart,
  FaFlag,
  FaUtensils,
  FaRegFutbol,
} from 'react-icons/fa';
export const EMOJI_TYPE = 'wix-draft-plugin-emoji';

export const getEmojiGroups = t => [
  {
    title: t('EmojiPlugin_EmojiGroups_People'),
    icon: <FaSmile style={{ width: '16px', height: '16px' }} />,
    category: 'people',
  },
  {
    title: t('EmojiPlugin_EmojiGroups_Nature'),
    icon: <FaPaw style={{ width: '16px', height: '16px' }} />,
    category: 'nature',
  },
  {
    title: t('EmojiPlugin_EmojiGroups_Food'),
    icon: <FaUtensils style={{ width: '16px', height: '16px' }} />,
    category: 'food',
  },
  {
    title: t('EmojiPlugin_EmojiGroups_Activity'),
    icon: <FaRegFutbol style={{ width: '16px', height: '16px' }} />,
    category: 'activity',
  },
  {
    title: t('EmojiPlugin_EmojiGroups_Travel'),
    icon: <FaPlane style={{ width: '16px', height: '16px' }} />,
    category: 'travel',
  },
  {
    title: t('EmojiPlugin_EmojiGroups_Objects'),
    icon: <FaBell style={{ width: '16px', height: '16px' }} />,
    category: 'objects',
  },
  {
    title: t('EmojiPlugin_EmojiGroups_Symbols'),
    icon: <FaHeart style={{ width: '16px', height: '16px' }} />,
    category: 'symbols',
  },
  {
    title: t('EmojiPlugin_EmojiGroups_Flags'),
    icon: <FaFlag style={{ width: '16px', height: '16px' }} />,
    category: 'flags',
  },
];

export const DesktopFlyOutModalStyles = Object.freeze({
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    zIndex: 5,
  },
  content: {
    width: '325px',
    boxSizing: 'border-box',
    height: '282px',
    overflow: 'visible',
    border: '1px solid #ccc',
    paddingRight: '0px',
    paddingLeft: '0px',
    display: 'block',
    borderRadius: '2px',
    position: 'absolute',
    zIndex: 6,
    paddingTop: '20px',
  },
});
