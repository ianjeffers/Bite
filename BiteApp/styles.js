import { StyleSheet, Dimensions } from 'react-native';

const COLORS = {
  BACKGROUND_LIGHT: '#F5FCFF',
  BACKGROUND_DARK: '#e0e0e0',
  GREEN: '#006400',
  RED: '#8B0000',
  DARK_GRAY: '#444444',
  LIGHT_GRAY: '#f9f9f9',
  WHITE: '#FFFFFF',
  BLACK: '#000000',
};

export const CommonStyles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.BACKGROUND_LIGHT,
    width: '100%',
  },
  phoneScreen: {
    aspectRatio: 0.5625,
    width: '100%',
    maxWidth: 425,
    backgroundColor: '#FFF',
  },
  contentContainer: {
    padding: 20,
    backgroundColor: '#e0e0e0',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  correctIncorrect: {
    fontSize: 22,  
    fontWeight: 'bold',
    marginTop: 20 
  },
  correct: {
    color: '#006400', 
  },
  incorrect: {
    color: '#8B0000', 
  },
  text: {
    fontSize: 18,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.WHITE,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  shadow: {
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  }
});

export const LikeButtonStyles = StyleSheet.create({
  container: {
    zIndex:100,
    position: 'absolute',
    right: 15,
    top: '75%',
    padding: 10,
    borderRadius: 50,
    backgroundColor: COLORS.WHITE,
    ...CommonStyles.shadow
  },
  icon: {
    fontSize: 30,
    color: "#444444",
  },
  liked: {
    color: "#FF0000",
  },
});

export const FillInTheBlanksScreenStyles = StyleSheet.create({
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
});

export const FlashcardScreenStyles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'space-around',
    paddingVertical: '20%',
    paddingHorizontal: '5%',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
});

export const FlashcardStyles = StyleSheet.create({
  card: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: '10%',
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

export const MatchingGameStyles = StyleSheet.create({
  gameContainer: {
    flexDirection: 'row',
    paddingVertical: '30%',
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
      bottom: 100, 
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      zIndex: 1,
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
export const quizStyles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#1e90ff',
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
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
  scoreText: {
    fontSize: 25,
    color: '#1e90ff',
  },
  questionText: {
    fontSize: 22,
    color: '#000',
  },
});
  export const quizScreenStyles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
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

  export const trueOrFalseScreenStyles = StyleSheet.create({
    wrapper: {
      flex: 1,
      justifyContent: 'center',
      padding: 16,
    },
    questionText: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
    },
    correctAnswer: {
      backgroundColor: 'lightgreen',
    },
    wrongAnswer: {
      backgroundColor: 'salmon',
    },
    finalScoreText: {
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
    buttonText: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#FFFFFF',
      backgroundColor: '#2196F3',
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
    },
  });
  

  export const videoContentScreenStyles = StyleSheet.create({
    wrapper: {
      flex: 1,
      position: 'absolute',
    },
    container: {
      flex: 1,
    },
    video: {
      position: 'relative',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    contentBox: {
      position: 'absolute',
      top: 80, 
      left: '10%', 
      right: '10%', 
      padding: 10,
      backgroundColor: 'rgba(255,255,255,0.9)',
      borderRadius: 10, 
    },
    content: {
      fontSize: 16,
    },
  });