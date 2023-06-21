import { StyleSheet, Dimensions } from 'react-native';


export const flashcardScreenStyles = StyleSheet.create({
    wrapper: {
      justifyContent: 'center',
    },
    slide: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#9DD6EB',
    },
  });

export const flashcardStyles = StyleSheet.create({
  card: {
    width: '80%', // fill 80% of the screen width
    height: '80%', // fill 80% of the screen height
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
  },
});


  
export const homeScreenStyles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    phoneScreen: {
      aspectRatio: 0.5625, // Aspect ratio for most phones (9:16)
      width: '100%',
      maxWidth: 425, // The typical width of a phone screen
      backgroundColor: '#FFF',
    },
  });

