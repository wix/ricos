import React from 'react';
import FaBell from './icons/FaBell';
import FaFlag from './icons/FaFlag';
import FaHeart from './icons/FaHeart';
import FaPaw from './icons/FaPaw';
import FaSmile from './icons/FaSmile';
import FaPlane from './icons/FaPlane';
import FaUtensils from './icons/FaUtensils';
import FaRegFutbol from './icons/FaRegFutbol';
export const EMOJI_TYPE = 'wix-draft-plugin-emoji';

export const getEmojiGroups = t => [
  {
    title: t('EmojiPlugin_EmojiGroups_People'),
    icon: <FaSmile />,
    category: 'people',
    top: 948,
  },
  {
    title: t('EmojiPlugin_EmojiGroups_Nature'),
    icon: <FaPaw />,
    category: 'nature',
    top: 1937,
  },
  {
    title: t('EmojiPlugin_EmojiGroups_Food'),
    icon: <FaUtensils />,
    category: 'food',
    top: 2453,
  },
  {
    title: t('EmojiPlugin_EmojiGroups_Activity'),
    icon: <FaRegFutbol />,
    category: 'activity',
    top: 2497,
  },
  {
    title: t('EmojiPlugin_EmojiGroups_Travel'),
    icon: <FaPlane />,
    category: 'travel',
    top: 3485,
  },
  {
    title: t('EmojiPlugin_EmojiGroups_Objects'),
    icon: <FaBell />,
    category: 'objects',
    top: 4603,
  },
  {
    title: t('EmojiPlugin_EmojiGroups_Symbols'),
    icon: <FaHeart />,
    category: 'symbols',
    top: 6280,
  },
  {
    title: t('EmojiPlugin_EmojiGroups_Flags'),
    icon: <FaFlag />,
    category: 'flags',
    top: 10000,
  },
];

export const DesktopFlyOutModalStyles = Object.freeze({
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    zIndex: 5,
  },
  content: {
    width: '320px',
    boxSizing: 'border-box',
    height: '364px',
    overflow: 'visible',
    border: 'solid 1px rgba(51, 51, 51, 0.1)',
    paddingRight: '0px',
    paddingLeft: '0px',
    display: 'block',
    borderRadius: '2px',
    position: 'absolute',
    zIndex: 6,
    paddingTop: '20px',
    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.06)',
  },
});

export const DEFAULT_CONFIG = {};
