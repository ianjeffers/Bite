import { StyleSheet, Dimensions } from 'react-native';

export const likeButtonStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 15,
    top: '65%',
    padding: 10,
    borderRadius: 50,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icon: {
    fontSize: 30,
    color: "#444444",
  },
  liked: {
    color: "#FF0000",
  },
});


export const fillInTheBlanksScreenStyles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#e0e0e0'
  },
  sentence: {
    fontSize: 24,  
    fontWeight: 'bold',
    marginBottom: 20,
  },
  wordBank: {
    flexDirection: 'row', 
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 20,
    width: '90%', 
  },
  correct: {
    color: '#006400',  
    fontSize: 22,  
    fontWeight: 'bold',
    marginTop: 20 
  },
  incorrect: {
    color: '#8B0000', 
    fontSize: 22,  
    fontWeight: 'bold',
    marginTop: 20 
  }
});

export const flashcardScreenStyles = StyleSheet.create({
    wrapper: {
      flex: 1,  
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
    width: '80%', 
    height: '80%', 
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
    likeButtonContainer: {
      position: 'absolute',
      right: 15,
      bottom: 15,
    },
  });
  

  export const matchingGameStyles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: '#F5FCFF',
    },
    gameContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    column: {
      flex: 1,
    },
    gameOverContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      margin: 5,
      padding: 10,
      backgroundColor: '#DDDDDD',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 5,
    },
    correct: {
      backgroundColor: '#AED581',
    },
    text: {
      fontSize: 18,
    },
    timerText: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
    },
    scoreText: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
    },
    gameOverText: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });

  export const mindMapStyles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    inputContainer: {
      position: 'absolute',
      bottom: 10,
      left: 10,
      right: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#fff',
      borderRadius: 30,
      borderWidth: 1,
      borderColor: 'gray',
    },
    textInput: {
      flex: 1,
      marginRight: 10,
    },
    button: {
      padding: 10,
    },
    bubblesContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      padding: 10,
      marginTop: 20,
      justifyContent: 'center',
    },
    bubble: {
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 30,
      padding: 10,
      margin: 5,
      backgroundColor: 'white',
    },
    selectedBubble: {
      borderColor: 'green',
    },
    bubbleText: {
      color: 'gray',
    },
    selectedBubbleText: {
      color: 'green',
    },
    loadingContainer: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 100, // position adjusted above input box
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      zIndex: 1, // ensures the loading indicator is placed above other elements
    },
  });
  
  
  

  export const profileStyles = StyleSheet.create({
    profileContainer: {
        width: '100%',
        maxWidth: 600,
        padding: 20,
        backgroundColor: '#f6f6f6',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowRadius: 10,
    },
    profileInfo: {
        marginBottom: 20,
    },
    profileText: {
        fontSize: 18,
    },
    signOutBtn: {
        padding: 10,
        backgroundColor: '#007bff',
        color: 'white',
        borderRadius: 5,
    },
    signOutBtnText: {
        color: 'white',
        fontSize: 16,
    },
});

  export const quizScreenStyles = StyleSheet.create({
    wrapper: {
      flex: 1,
      padding: 10,
      backgroundColor: '#fff',
    },
    button: {
      alignItems: 'center',
      backgroundColor: '#DDDDDD',
      padding: 10,
      marginTop: 20,
      borderRadius: 5,
    },
    buttonText: {
      fontSize: 20,
    },
    option: {
      backgroundColor: '#f9f9f9',
      padding: 10,
      marginTop: 10,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#ddd',
    },
    optionText: {
      fontSize: 18,
    },
  });

  export const trueOrFalseScreenStyles = {
    wrapper: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
    },
    questionText: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
    },
    scoreText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 20,
    },
  };

  export const videoContentScreenStyles = StyleSheet.create({
    wrapper: {
      flex: 1,
    },
    video: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    contentBox: {
      position: 'absolute', // this positions the view on top of the video
      top: 80, // these values can be adjusted to fit your needs
      left: '20%', // adjust this to make the tweet thinner
      right: '20%', // adjust this to make the tweet thinner
      padding: 10,
      backgroundColor: 'rgba(255,255,255,0.9)',
      borderRadius: 10, 
    },
    content: {
      fontSize: 16,
    },
  });