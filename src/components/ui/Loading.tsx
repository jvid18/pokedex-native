import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {useColors} from '../../context/theme/ThemeContext';

const Loading = () => {
  const {primary} = useColors();

  return (
    <View style={styles.activityContainer}>
      <ActivityIndicator size="large" color={primary} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  activityContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
