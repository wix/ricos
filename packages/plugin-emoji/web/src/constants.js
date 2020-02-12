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
    icon: <FaSmile />,
    category: 'people',
  },
  {
    title: t('EmojiPlugin_EmojiGroups_Nature'),
    icon: <FaPaw />,
    category: 'nature',
  },
  {
    title: t('EmojiPlugin_EmojiGroups_Food'),
    icon: <FaUtensils />,
    category: 'food',
  },
  {
    title: t('EmojiPlugin_EmojiGroups_Activity'),
    icon: <FaRegFutbol />,
    category: 'activity',
  },
  {
    title: t('EmojiPlugin_EmojiGroups_Travel'),
    icon: <FaPlane />,
    category: 'travel',
  },
  {
    title: t('EmojiPlugin_EmojiGroups_Objects'),
    icon: <FaBell />,
    category: 'objects',
  },
  {
    title: t('EmojiPlugin_EmojiGroups_Symbols'),
    icon: <FaHeart />,
    category: 'symbols',
  },
  {
    title: t('EmojiPlugin_EmojiGroups_Flags'),
    icon: <FaFlag />,
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
