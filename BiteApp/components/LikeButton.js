import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LikeButtonStyles as styles } from '../styles';

const LikeButton = ({ onLike, isLiked }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {}}
    >
      <Icon name="heart" style={[styles.icon, isLiked ? styles.liked : null]} />
    </TouchableOpacity>
  );
};

export default LikeButton;
