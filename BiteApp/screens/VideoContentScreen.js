import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import ReactPlayer from 'react-player';
import { videoContentScreenStyles as styles } from '../styles';

import video_a from '../assets/video_a.mp4';

const videos = [
  video_a,
  // 'path/to/video_b.mp4',
  // 'path/to/video_c.mp4',
];

const VideoContentScreen = ({ content }) => {
  const videoSource = React.useMemo(() => videos[Math.floor(Math.random() * videos.length)], []);

  if (!content || !videoSource) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.wrapper}>
      <ReactPlayer 
        url={videoSource}
        playing
        loop
        width='100%'
        height='100%'
        muted={true}
      />
      <View style={styles.contentBox}>
        <Text style={styles.content}>{content.Tweet}</Text>
      </View>
    </View>
  );
};

export default VideoContentScreen;
