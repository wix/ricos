import React from 'react';
import FaSmileO from 'react-icons/lib/fa/smile-o';
import FaPaw from 'react-icons/lib/fa/paw';
import FaCutlery from 'react-icons/lib/fa/cutlery';
import FaFutbolO from 'react-icons/lib/fa/futbol-o';
import FaPlane from 'react-icons/lib/fa/plane';
import FaBell from 'react-icons/lib/fa/bell';
import FaHeart from 'react-icons/lib/fa/heart';
import FaFlag from 'react-icons/lib/fa/flag';

export const getEmojiGroups = t => [
  {
    title: t('EmojiPlugin_EmojiGroups_People'),
    icon: <FaSmileO style={{ verticalAlign: '' }} />,
    categories: ['people'],
  },
  {
    title: t('EmojiPlugin_EmojiGroups_Nature'),
    icon: <FaPaw style={{ verticalAlign: '' }} />,
    categories: ['nature'],
  },
  {
    title: t('EmojiPlugin_EmojiGroups_Food'),
    icon: <FaCutlery style={{ verticalAlign: '' }} />,
    categories: ['food'],
  },
  {
    title: t('EmojiPlugin_EmojiGroups_Activity'),
    icon: <FaFutbolO style={{ verticalAlign: '' }} />,
    categories: ['activity'],
  },
  {
    title: t('EmojiPlugin_EmojiGroups_Travel'),
    icon: <FaPlane style={{ verticalAlign: '' }} />,
    categories: ['travel'],
  },
  {
    title: t('EmojiPlugin_EmojiGroups_Objects'),
    icon: <FaBell style={{ verticalAlign: '' }} />,
    categories: ['objects'],
  },
  {
    title: t('EmojiPlugin_EmojiGroups_Symbols'),
    icon: <FaHeart style={{ verticalAlign: '' }} />,
    categories: ['symbols'],
  },
  {
    title: t('EmojiPlugin_EmojiGroups_Flags'),
    icon: <FaFlag style={{ verticalAlign: '' }} />,
    categories: ['flags'],
  },
];
