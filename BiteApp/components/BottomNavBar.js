// components/BottomNavBar.js

import * as React from 'react';
import { BottomNavigation } from 'react-native-paper';
import SwiperScreen from '../screens/SwiperScreen';
import MindMapScreen from '../screens/MindMapScreen';
import ProfileScreen from '../screens/ProfileScreen';

const BottomNavBar = () => {
  const [index, setIndex] = React.useState(0);

  const routes = [
    { key: 'swiper', title: 'Swiper', icon: 'refresh' },
    { key: 'mindmap', title: 'Mind Map', icon: 'brain' },
    { key: 'profile', title: 'Profile', icon: 'account' },
  ];

  const renderScene = BottomNavigation.SceneMap({
    swiper: SwiperScreen,
    mindmap: MindMapScreen,
    profile: ProfileScreen,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default BottomNavBar;
