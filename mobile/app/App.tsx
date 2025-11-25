import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
  Alert,
  SafeAreaView,
  StatusBar,
  Image,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';

const LearnAbleApp = () => {
  const [currentView, setCurrentView] = useState('home');
  const [quizData, setQuizData] = useState({
    categories: ['Math', 'Science', 'Colors'],
    currentCategory: 'Math',
    currentQuestion: 0,
    score: 0,
    questions: {
      Math: [
        { 
          question: 'What is 2 + 2?', 
          options: ['3', '4', '5'], 
          correct: 1, 
          image: 'https://static.vecteezy.com/system/resources/previews/001/942/017/non_2x/group-of-four-animals-cartoon-characters-vector.jpg',
          explanation: 'Two plus two equals four. This is a basic addition problem.'
        },
        { 
          question: 'What is 5 - 3?', 
          options: ['1', '2', '3'], 
          correct: 1, 
          image: 'https://i.pinimg.com/736x/75/42/dc/7542dcbf7fdaf4402b7a089da29c4d32.jpg',
          explanation: 'Five minus three equals two. This is a basic subtraction problem.'
        },
        { 
          question: 'What is 3 × 2?', 
          options: ['5', '6', '7'], 
          correct: 1, 
          image: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Dissected_rectangle-3x2.png',
          explanation: 'Three times two equals six. This is a basic multiplication problem.'
        }
      ],
      Science: [
        { 
          question: 'What color is the sky?', 
          options: ['Red', 'Blue', 'Green'], 
          correct: 1, 
          image: 'https://i.pinimg.com/originals/24/08/73/240873ffd25b81318a3093f4560787ca.gif',
          explanation: 'The sky appears blue due to the scattering of sunlight by molecules in the atmosphere.'
        },
        { 
          question: 'How many legs does a cat have?', 
          options: ['2', '4', '6'], 
          correct: 1, 
          image: 'https://assets.dochipo.com/editor/animations/cat/7f35e703-ad26-45cd-8f4f-62da09bb22e4.gif',
          explanation: 'Cats are mammals with four legs, which help them walk, run, and climb.'
        },
        { 
          question: 'What do plants need to grow?', 
          options: ['Water', 'Fire', 'Ice'], 
          correct: 0, 
          image: 'https://media.giphy.com/media/d9Hhu2N1KTF0uW76WQ/giphy.gif',
          explanation: 'Plants need water, sunlight, and nutrients from soil to grow through photosynthesis.'
        }
      ],
      Colors: [
        { 
          question: 'What color do you get mixing red and blue?', 
          options: ['Purple', 'Green', 'Yellow'], 
          correct: 0, 
          image: 'https://i.pinimg.com/originals/9b/36/b6/9b36b69686dbfc694ec7cb567fa6356b.gif',
          explanation: 'When you mix red and blue paint or light, you get purple or violet.'
        },
        { 
          question: 'What color is the sun?', 
          options: ['Blue', 'Yellow', 'Green'], 
          correct: 1, 
          image: 'https://i.pinimg.com/originals/46/86/f3/4686f30f3b88a46402b5dcd14bd6d777.gif',
          explanation: 'The sun appears yellow to us on Earth, though it actually emits white light.'
        },
        { 
          question: 'What color are most leaves?', 
          options: ['Red', 'Blue', 'Green'], 
          correct: 2, 
          image: 'https://i.pinimg.com/originals/3e/41/9d/3e419de254373fda06cd9a8213f77366.gif',
          explanation: 'Most leaves are green because of chlorophyll, which helps plants make food from sunlight.'
        }
      ]
    }
  });

  const [signLanguage, setSignLanguage] = useState({
    currentCategory: 'daily',
    currentWordIndex: 0,
    categories: {
      daily: [
        { 
          word: 'Good Morning', 
          description: 'Place your right hand on your forehead, then wave forward',
          image: 'https://www.tokyoforward2025.metro.tokyo.lg.jp/wp-content/themes/anothemes/manabou_deaflympics/img/01-2in.gif',
          stepByStep: 'Step 1: Place hand on forehead\nStep 2: Move hand forward\nStep 3: Smile warmly',
          internationalSL: 'Place right hand on chin, bring forward, cross hands open bottom to top'
        },
        { 
          word: 'Hello', 
          description: 'Wave your hand in a friendly greeting gesture',
          image: 'https://www.tokyoforward2025.metro.tokyo.lg.jp/wp-content/themes/anothemes/manabou_deaflympics/img/02-2in.gif',
          stepByStep: 'Step 1: Raise your hand\nStep 2: Wave back and forth\nStep 3: Maintain eye contact',
          internationalSL: 'Place right hand over forehead and bring forward'
        },
        { 
          word: 'Thank You', 
          description: 'Touch your chin and move hand forward in gratitude',
          image: 'https://www.tokyoforward2025.metro.tokyo.lg.jp/wp-content/themes/anothemes/manabou_deaflympics/img/04-2in.gif',
          stepByStep: 'Step 1: Touch chin with fingertips\nStep 2: Move hand forward\nStep 3: Show sincere expression',
          internationalSL: 'Remove right hand from mouth (blowing kiss)'
        },
        { 
          word: 'Please', 
          description: 'Rub your chest in a circular motion with your palm',
          image: 'https://www.tokyoforward2025.metro.tokyo.lg.jp/wp-content/themes/anothemes/manabou_deaflympics/img/05-2in.gif',
          stepByStep: 'Step 1: Place palm on chest\nStep 2: Rub in circular motion\nStep 3: Look expectant',
          internationalSL: 'Right hand open, rub like circle on chest'
        }
      ],
      emotions: [
        { 
          word: 'Happy', 
          description: 'Both hands open, brush upward on chest repeatedly with bright smile',
          image: 'https://www.tokyoforward2025.metro.tokyo.lg.jp/wp-content/themes/anothemes/manabou_deaflympics/img/07.gif',
          stepByStep: 'Step 1: Place both open hands on chest\nStep 2: Brush upward repeatedly\nStep 3: Smile brightly and show joy',
          internationalSL: 'Similar brushing motion on chest with upward movement and smile'
        },
        { 
          word: 'Sad', 
          description: 'Index fingers trace down from eyes like tears falling',
          image: 'https://www.tokyoforward2025.metro.tokyo.lg.jp/wp-content/themes/anothemes/manabou_deaflympics/img/09.gif',
          stepByStep: 'Step 1: Point index fingers near corners of eyes\nStep 2: Slowly draw down cheeks\nStep 3: Show sad facial expression',
          internationalSL: 'Index fingers trace downward from eyes representing tears falling'
        },
        { 
          word: 'Angry', 
          description: 'Claw-shaped hands move forcefully upward from stomach showing frustration',
          image: 'https://www.tokyoforward2025.metro.tokyo.lg.jp/wp-content/themes/anothemes/manabou_deaflympics/img/08.gif',
          stepByStep: 'Step 1: Make claw shapes with both hands\nStep 2: Start at stomach level\nStep 3: Push upward forcefully with stern expression',
          internationalSL: 'Strong upward claw motion from torso showing rising anger and frustration'
        },
      ],
      sports: [
        { 
          word: 'Go For It', 
          description: 'Make fists with both hands and pump down twice',
          image: 'https://www.tokyoforward2025.metro.tokyo.lg.jp/wp-content/themes/anothemes/manabou_deaflympics/img/10.gif',
          stepByStep: 'Step 1: Make fists with both hands\nStep 2: Pump down twice\nStep 3: Show encouraging expression',
          internationalSL: 'Strong downward pumping motion for encouragement'
        },
        { 
          word: 'Congratulations', 
          description: 'Clasp hands at stomach, lift up and open quickly',
          image: 'https://www.tokyoforward2025.metro.tokyo.lg.jp/wp-content/themes/anothemes/manabou_deaflympics/img/11.gif',
          stepByStep: 'Step 1: Clasp hands at stomach\nStep 2: Lift upward\nStep 3: Open hands quickly',
          internationalSL: 'Celebratory upward opening gesture'
        },
        { 
          word: 'Clapping', 
          description: 'Raise both hands above head and flutter them',
          image: 'https://www.tokyoforward2025.metro.tokyo.lg.jp/wp-content/themes/anothemes/manabou_deaflympics/img/14.gif',
          stepByStep: 'Step 1: Raise both hands above head\nStep 2: Flutter hands rapidly\nStep 3: Show appreciation',
          internationalSL: 'Visual applause gesture for deaf community'
        }
      ]
    }
  });

  const [routines, setRoutines] = useState([
    { id: 1, task: 'Brush teeth', time: '08:00', completed: false },
    { id: 2, task: 'Take medicine', time: '12:00', completed: false },
    { id: 3, task: 'Study time', time: '15:00', completed: false }
  ]);

  const [newRoutine, setNewRoutine] = useState({ task: '', time: '' });
  const [editingRoutine, setEditingRoutine] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showQuizExplanation, setShowQuizExplanation] = useState(null);

  // TTS Helper Function
  const speak = async (text, options = {}) => {
    try {
      await Speech.stop();
      setIsSpeaking(true);
      
      await Speech.speak(text, {
        language: 'en-US',
        pitch: 1.0,
        rate: 0.9,
        onDone: () => setIsSpeaking(false),
        onStopped: () => setIsSpeaking(false),
        onError: () => setIsSpeaking(false),
        ...options
      });
    } catch (error) {
      console.error('Speech error:', error);
      setIsSpeaking(false);
    }
  };

  useEffect(() => {
    return () => {
      Speech.stop();
    };
  }, [currentView]);

  useEffect(() => {
    speak('Welcome to LearnAble, your inclusive learning companion!', { rate: 0.8 });
  }, []);

  // Quiz functions
  const handleAnswerSelect = async (answerIndex) => {
    const currentQ = quizData.questions[quizData.currentCategory][quizData.currentQuestion];
    const isCorrect = answerIndex === currentQ.correct;
    
    setShowQuizExplanation({ correct: isCorrect, explanation: currentQ.explanation });
    
    if (isCorrect) {
      await speak('Correct! ' + currentQ.explanation, { pitch: 1.1, rate: 0.9 });
    } else {
      await speak('Incorrect. ' + currentQ.explanation, { pitch: 0.9, rate: 0.9 });
    }
    
    setTimeout(() => {
      setQuizData(prev => ({
        ...prev,
        score: isCorrect ? prev.score + 1 : prev.score,
        currentQuestion: prev.currentQuestion + 1
      }));
      setShowQuizExplanation(null);
    }, 3000);
  };

  const resetQuiz = () => {
    setQuizData(prev => ({
      ...prev,
      currentQuestion: 0,
      score: 0
    }));
    setShowQuizExplanation(null);
    speak('Quiz reset. Let\'s try again!');
  };

  // Home View 
  const HomeView = () => (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.mascotContainer}>
            <View style={styles.mascotCircle}>
              <Ionicons name="school" size={60} color="#0066CC" />
            </View>
            <Text style={styles.mascotText}>Click on LearnAble to hear welcome message!</Text>
            <TouchableOpacity 
              style={styles.mascotButton}
              onPress={() => speak('Welcome to LearnAble! Let\'s start learning together with accessible technology for everyone!')}
            >
              <Text style={styles.mascotButtonText}>🎯 Welcome Message</Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.mainTitle}>LearnAble</Text>
          <Text style={styles.subtitle}>Inclusive Learning Platform</Text>
          <Text style={styles.description}>
            Empowering children and persons with disabilities through accessible technology
          </Text>
        </View>

        {/* Learning Sections */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeader}>Let's start with interactive learning!</Text>
          
          {/* Quiz Section */}
          <View style={styles.learningCard}>
            <View style={styles.cardHeader}>
              <View style={styles.iconBadge}>
                <Ionicons name="book" size={24} color="#0066CC" />
              </View>
              <Text style={styles.cardTitle}>Learning Quiz</Text>
            </View>
            <Text style={styles.cardDescription}>
              Interactive quizzes with detailed explanations and audio support
            </Text>
            <View style={styles.previewImages}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=100&h=80&fit=crop' }}
                style={styles.previewImage}
              />
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=100&h=80&fit=crop' }}
                style={styles.previewImage}
              />
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=100&h=80&fit=crop' }}
                style={styles.previewImage}
              />
            </View>
            <TouchableOpacity 
              style={styles.startButton}
              onPress={() => {
                speak('Opening Learning Quiz');
                setCurrentView('quiz');
              }}
            >
              <Text style={styles.startButtonText}>Start Learning Quiz</Text>
              <Ionicons name="arrow-forward" size={20} color="white" />
            </TouchableOpacity>
          </View>

          {/* Sign Language Section */}
          <View style={styles.learningCard}>
            <View style={styles.cardHeader}>
              <View style={[styles.iconBadge, { backgroundColor: '#F3E5F5' }]}>
                <Ionicons name="hand-left" size={24} color="#7B1FA2" />
              </View>
              <Text style={styles.cardTitle}>Sign Language Learning</Text>
            </View>
            <Text style={styles.cardDescription}>
              Learn essential sign language with step-by-step visual guides
            </Text>
            <View style={styles.categoryTabs}>
              <View style={styles.categoryTab}>
                <Text style={styles.tabText}>Daily Life</Text>
              </View>
              <View style={styles.categoryTab}>
                <Text style={styles.tabText}>Emotions</Text>
              </View>
              <View style={styles.categoryTab}>
                <Text style={styles.tabText}>Sports</Text>
              </View>
            </View>
            <TouchableOpacity 
              style={[styles.startButton, { backgroundColor: '#7B1FA2' }]}
              onPress={() => {
                speak('Opening Sign Language Learning');
                setCurrentView('signLanguage');
              }}
            >
              <Text style={styles.startButtonText}>Learn Sign Language</Text>
              <Ionicons name="arrow-forward" size={20} color="white" />
            </TouchableOpacity>
          </View>

          {/* Daily Routine Section */}
          <View style={styles.learningCard}>
            <View style={styles.cardHeader}>
              <View style={[styles.iconBadge, { backgroundColor: '#E8F5E8' }]}>
                <Ionicons name="calendar" size={24} color="#388E3C" />
              </View>
              <Text style={styles.cardTitle}>Daily Routine Manager</Text>
            </View>
            <Text style={styles.cardDescription}>
              Organize daily tasks with helpful reminders and audio support
            </Text>
            <View style={styles.routinePreview}>
              <View style={styles.routineItem}>
                <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                <Text style={styles.routineText}>Morning routine</Text>
              </View>
              <View style={styles.routineItem}>
                <Ionicons name="time" size={20} color="#FF9800" />
                <Text style={styles.routineText}>Study time</Text>
              </View>
            </View>
            <TouchableOpacity 
              style={[styles.startButton, { backgroundColor: '#388E3C' }]}
              onPress={() => {
                speak('Opening Daily Routine Manager');
                setCurrentView('routine');
              }}
            >
              <Text style={styles.startButtonText}>Manage Routines</Text>
              <Ionicons name="arrow-forward" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Accessibility Features */}
        <View style={styles.accessibilitySection}>
          <Text style={styles.sectionHeader}>Accessibility by Design</Text>
          <View style={styles.featureGrid}>
            <TouchableOpacity 
              style={styles.featureCard}
              onPress={() => speak('Audio Support: Text-to-speech for all content')}
            >
              <Ionicons name="volume-high" size={32} color="#0066CC" />
              <Text style={styles.featureTitle}>Audio Support</Text>
              <Text style={styles.featureText}>Text-to-speech for all content</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.featureCard}
              onPress={() => speak('Large Buttons: Easy-to-tap interface elements')}
            >
              <Ionicons name="hand-right" size={32} color="#7B1FA2" />
              <Text style={styles.featureTitle}>Large Buttons</Text>
              <Text style={styles.featureText}>Easy-to-tap interface</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.featureCard}
              onPress={() => speak('Visual Learning: Images and animations for better understanding')}
            >
              <Ionicons name="eye" size={32} color="#388E3C" />
              <Text style={styles.featureTitle}>Visual Learning</Text>
              <Text style={styles.featureText}>Images and animations</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.featureCard}
              onPress={() => speak('Simple Navigation: Clear and intuitive interface design')}
            >
              <Ionicons name="compass" size={32} color="#FF9800" />
              <Text style={styles.featureTitle}>Simple Navigation</Text>
              <Text style={styles.featureText}>Clear and intuitive</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* TTS Status */}
        {isSpeaking && (
          <View style={styles.speakingIndicator}>
            <Ionicons name="volume-high" size={20} color="#0066CC" />
            <Text style={styles.speakingText}>Speaking...</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );

  // Quiz View
  const QuizView = () => {
    const currentQ = quizData.questions[quizData.currentCategory][quizData.currentQuestion];
    const isQuizComplete = quizData.currentQuestion >= quizData.questions[quizData.currentCategory].length;

    if (isQuizComplete) {
      return (
        <SafeAreaView style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.headerWithBack}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => {
                  speak('Returning to home');
                  setCurrentView('home');
                }}
              >
                <Ionicons name="arrow-back" size={24} color="#0066CC" />
                <Text style={styles.backText}>Back</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.resultCard}>
              <View style={styles.resultBadge}>
                <Text style={styles.resultEmoji}>🎉</Text>
              </View>
              <Text style={styles.resultTitle}>Quiz Complete!</Text>
              <Text style={styles.resultSubtitle}>
                Great job on completing the {quizData.currentCategory} quiz!
              </Text>
              <View style={styles.scoreCard}>
                <Text style={styles.scoreText}>Your Score</Text>
                <Text style={styles.scoreBig}>
                  {quizData.score} / {quizData.questions[quizData.currentCategory].length}
                </Text>
                <Text style={styles.scorePercent}>
                  {Math.round((quizData.score / quizData.questions[quizData.currentCategory].length) * 100)}%
                </Text>
              </View>
              
              <View style={styles.buttonGroup}>
                <TouchableOpacity style={styles.primaryButton} onPress={resetQuiz}>
                  <Text style={styles.buttonText}>Try Again</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.secondaryButton} 
                  onPress={() => {
                    speak('Returning to home');
                    setCurrentView('home');
                  }}
                >
                  <Text style={styles.secondaryButtonText}>Back to Home</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      );
    }

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.headerWithBack}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => {
                speak('Returning to home');
                setCurrentView('home');
              }}
            >
              <Ionicons name="arrow-back" size={24} color="#0066CC" />
              <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>
            <Text style={styles.pageTitle}>Learning Quiz</Text>
          </View>

          {/* Category Selection */}
          <View style={styles.categorySection}>
            <Text style={styles.sectionTitle}>Choose Category:</Text>
            <View style={styles.categoryButtons}>
              {quizData.categories.map(category => (
                <TouchableOpacity
                  key={category}
                  onPress={() => {
                    speak(`${category} category selected`);
                    setQuizData(prev => ({ ...prev, currentCategory: category, currentQuestion: 0, score: 0 }));
                  }}
                  style={[
                    styles.categoryButton,
                    quizData.currentCategory === category && styles.activeCategoryButton
                  ]}
                >
                  <Text style={[
                    styles.categoryButtonText,
                    quizData.currentCategory === category && styles.activeCategoryButtonText
                  ]}>
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Question Card */}
          <View style={styles.questionCard}>
            <Text style={styles.questionNumber}>
              Question {quizData.currentQuestion + 1} of {quizData.questions[quizData.currentCategory].length}
            </Text>
            
            <View style={styles.questionImageContainer}>
              <Image
                source={{ uri: currentQ.image }}
                style={styles.questionImage}
                resizeMode="cover"
              />
            </View>
            
            <Text style={styles.questionText}>{currentQ.question}</Text>
            
            <TouchableOpacity
              style={styles.audioButton}
              onPress={() => speak(`Question: ${currentQ.question}. The options are: ${currentQ.options.join(', ')}`)}
            >
              <Ionicons name="volume-high" size={20} color="#0066CC" />
              <Text style={styles.audioButtonText}>Listen to Question</Text>
            </TouchableOpacity>

            {!showQuizExplanation ? (
              <View style={styles.optionsContainer}>
                <Text style={styles.optionsLabel}>Click on the answer you think is correct:</Text>
                {currentQ.options.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleAnswerSelect(index)}
                    style={styles.optionButton}
                  >
                    <Text style={styles.optionText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <View style={styles.explanationCard}>
                <View style={styles.resultBadge}>
                  <Text style={styles.resultSymbol}>
                    {showQuizExplanation.correct ? '○' : '×'}
                  </Text>
                </View>
                <Text style={styles.resultLabel}>
                  {showQuizExplanation.correct ? 'CORRECT' : 'INCORRECT'}
                </Text>
                <Text style={styles.explanationText}>
                  {showQuizExplanation.explanation}
                </Text>
                {!showQuizExplanation.correct && (
                  <Text style={styles.tryAgainText}>Let's try the next question!</Text>
                )}
              </View>
            )}
          </View>

          {isSpeaking && (
            <View style={styles.speakingIndicator}>
              <Ionicons name="volume-high" size={20} color="#0066CC" />
              <Text style={styles.speakingText}>Speaking...</Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  };

  // Sign Language View
  const SignLanguageView = () => {
    const currentWords = signLanguage.categories[signLanguage.currentCategory];
    const currentWord = currentWords[signLanguage.currentWordIndex];

    const handleCategoryChange = (category) => {
      setSignLanguage(prev => ({ 
        ...prev, 
        currentCategory: category,
        currentWordIndex: 0 
      }));
      speak(`${category} category selected`);
    };

    const handlePreviousSign = () => {
      if (signLanguage.currentWordIndex > 0) {
        setSignLanguage(prev => ({
          ...prev,
          currentWordIndex: prev.currentWordIndex - 1
        }));
        speak('Previous sign');
      }
    };

    const handleNextSign = () => {
      if (signLanguage.currentWordIndex < currentWords.length - 1) {
        setSignLanguage(prev => ({
          ...prev,
          currentWordIndex: prev.currentWordIndex + 1
        }));
        speak('Next sign');
      }
    };

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.headerWithBack}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => {
                speak('Returning to home');
                setCurrentView('home');
              }}
            >
              <Ionicons name="arrow-back" size={24} color="#7B1FA2" />
              <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>
            <Text style={styles.pageTitle}>Sign Language Learning</Text>
          </View>

          {/* Category Selection */}
          <View style={styles.signCategorySection}>
            <Text style={styles.sectionTitle}>Choose Category:</Text>
            <View style={styles.signCategoryButtons}>
              <TouchableOpacity
                style={[styles.signCategoryButton, signLanguage.currentCategory === 'daily' && styles.activeSignCategory]}
                onPress={() => handleCategoryChange('daily')}
              >
                <Text style={[styles.signCategoryText, signLanguage.currentCategory === 'daily' && styles.activeSignCategoryText]}>
                  Daily Life
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.signCategoryButton, signLanguage.currentCategory === 'emotions' && styles.activeSignCategory]}
                onPress={() => handleCategoryChange('emotions')}
              >
                <Text style={[styles.signCategoryText, signLanguage.currentCategory === 'emotions' && styles.activeSignCategoryText]}>
                  Emotions
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.signCategoryButton, signLanguage.currentCategory === 'sports' && styles.activeSignCategory]}
                onPress={() => handleCategoryChange('sports')}
              >
                <Text style={[styles.signCategoryText, signLanguage.currentCategory === 'sports' && styles.activeSignCategoryText]}>
                  Sports
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Sign Language Card */}
          <View style={styles.signCard}>
            <View style={styles.signHeader}>
              <Text style={styles.signWord}>{currentWord.word}</Text>
              <TouchableOpacity
                style={styles.audioButton}
                onPress={() => speak(`${currentWord.word}. ${currentWord.description}. ${currentWord.stepByStep}`)}
              >
                <Ionicons name="volume-high" size={20} color="#7B1FA2" />
                <Text style={styles.audioButtonText}>Listen</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.signImageContainer}>
              <Image
                source={{ uri: currentWord.image }}
                style={styles.signImage}
                resizeMode="cover"
              />
            </View>

            <View style={styles.signDescription}>
              <Text style={styles.signDescriptionTitle}>How to sign:</Text>
              <Text style={styles.signDescriptionText}>{currentWord.description}</Text>
            </View>

            <View style={styles.stepByStep}>
              <Text style={styles.stepByStepTitle}>Step by Step Instructions:</Text>
              <Text style={styles.stepByStepText}>{currentWord.stepByStep}</Text>
            </View>

            {/* Comparison Section */}
            <View style={styles.comparisonSection}>
              <View style={styles.comparisonCard}>
                <Text style={styles.comparisonTitle}>International Sign Language</Text>
                <Text style={styles.comparisonText}>{currentWord.internationalSL}</Text>
              </View>
            </View>

            {/* Navigation */}
            <View style={styles.navigationContainer}>
              <TouchableOpacity
                onPress={handlePreviousSign}
                disabled={signLanguage.currentWordIndex === 0}
                style={[styles.navButton, signLanguage.currentWordIndex === 0 && styles.disabledButton]}
              >
                <Ionicons name="arrow-back" size={20} color={signLanguage.currentWordIndex === 0 ? "#ccc" : "#7B1FA2"} />
                <Text style={[styles.navButtonText, signLanguage.currentWordIndex === 0 && styles.disabledText]}>
                  Previous
                </Text>
              </TouchableOpacity>
              
              <Text style={styles.cardProgress}>
                {signLanguage.currentWordIndex + 1} of {currentWords.length}
              </Text>

              <TouchableOpacity
                onPress={handleNextSign}
                disabled={signLanguage.currentWordIndex === currentWords.length - 1}
                style={[styles.navButton, signLanguage.currentWordIndex === currentWords.length - 1 && styles.disabledButton]}
              >
                <Text style={[styles.navButtonText, signLanguage.currentWordIndex === currentWords.length - 1 && styles.disabledText]}>
                  Next
                </Text>
                <Ionicons name="arrow-forward" size={20} color={signLanguage.currentWordIndex === currentWords.length - 1 ? "#ccc" : "#7B1FA2"} />
              </TouchableOpacity>
            </View>
          </View>

          {isSpeaking && (
            <View style={styles.speakingIndicator}>
              <Ionicons name="volume-high" size={20} color="#7B1FA2" />
              <Text style={styles.speakingText}>Speaking...</Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  };

  // Routine View
  const RoutineView = () => {
    const addRoutine = async () => {
      if (newRoutine.task && newRoutine.time) {
        if (editingRoutine) {
          setRoutines(prev => prev.map(r => 
            r.id === editingRoutine.id 
              ? { ...r, task: newRoutine.task, time: newRoutine.time }
              : r
          ));
          setEditingRoutine(null);
          await speak('Routine updated successfully!');
        } else {
          setRoutines(prev => [...prev, {
            id: Date.now(),
            task: newRoutine.task,
            time: newRoutine.time,
            completed: false
          }]);
          await speak('New routine added successfully!');
        }
        setNewRoutine({ task: '', time: '' });
      } else {
        await speak('Please fill in both task and time');
        Alert.alert('Please fill in both fields', 'Both task name and time are required.');
      }
    };

    const editRoutine = (routine) => {
      setNewRoutine({ task: routine.task, time: routine.time });
      setEditingRoutine(routine);
      speak('Editing routine');
    };

    const deleteRoutine = (id) => {
      const routine = routines.find(r => r.id === id);
      Alert.alert(
        'Delete Task',
        `Are you sure you want to delete "${routine.task}"?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Delete', 
            style: 'destructive',
            onPress: () => {
              setRoutines(prev => prev.filter(r => r.id !== id));
              speak('Task deleted');
            }
          }
        ]
      );
    };

    const cancelEdit = () => {
      setEditingRoutine(null);
      setNewRoutine({ task: '', time: '' });
      speak('Edit cancelled');
    };

    const toggleRoutine = async (id) => {
      const routine = routines.find(r => r.id === id);
      const newStatus = !routine.completed;
      
      setRoutines(prev => prev.map(r => 
        r.id === id ? { ...r, completed: newStatus } : r
      ));
      
      if (newStatus) {
        await speak(`Great job! ${routine.task} completed!`);
      } else {
        await speak(`${routine.task} marked as not completed`);
      }
    };

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.headerWithBack}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => {
                speak('Returning to home');
                setCurrentView('home');
              }}
            >
              <Ionicons name="arrow-back" size={24} color="#388E3C" />
              <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>
            <Text style={styles.pageTitle}>Daily Routine Manager</Text>
          </View>

          {/* Progress Overview */}
          <View style={styles.progressCard}>
            <Text style={styles.progressTitle}>Today's Progress</Text>
            <View style={styles.progressStats}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{routines.filter(r => r.completed).length}</Text>
                <Text style={styles.statLabel}>Completed</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{routines.filter(r => !r.completed).length}</Text>
                <Text style={styles.statLabel}>Remaining</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{routines.length}</Text>
                <Text style={styles.statLabel}>Total</Text>
              </View>
            </View>
          </View>

          {/* Add New Routine */}
          <View style={styles.addRoutineCard}>
            <Text style={styles.sectionTitle}>
              {editingRoutine ? 'Edit Task' : 'Add New Task'}
            </Text>
            {editingRoutine && (
              <View style={styles.editingNotice}>
                <Text style={styles.editingText}>Editing: {editingRoutine.task}</Text>
                <TouchableOpacity onPress={cancelEdit} style={styles.cancelButton}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            )}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Task Name:</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter task name (e.g., Brush teeth)"
                value={newRoutine.task}
                onChangeText={(text) => setNewRoutine(prev => ({ ...prev, task: text }))}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Time:</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter time (e.g., 08:00)"
                value={newRoutine.time}
                onChangeText={(text) => setNewRoutine(prev => ({ ...prev, time: text }))}
              />
            </View>
            
            <TouchableOpacity style={styles.addButton} onPress={addRoutine}>
              <Ionicons name={editingRoutine ? "checkmark" : "add"} size={24} color="white" />
              <Text style={styles.addButtonText}>
                {editingRoutine ? 'Update Task' : 'Add Task'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Routine List */}
          <View style={styles.routineSection}>
            <Text style={styles.sectionTitle}>Your Daily Tasks</Text>
            <View style={styles.routineList}>
              {routines.map(routine => (
                <TouchableOpacity
                  key={routine.id}
                  onLongPress={() => speak(`${routine.task} at ${routine.time}. ${routine.completed ? 'Completed' : 'Not completed'}`)}
                  activeOpacity={0.9}
                >
                  <View style={[styles.routineItem, routine.completed && styles.completedRoutine]}>
                    <TouchableOpacity
                      onPress={() => toggleRoutine(routine.id)}
                      style={[styles.checkbox, routine.completed && styles.checkedBox]}
                    >
                      {routine.completed && <Ionicons name="checkmark" size={16} color="white" />}
                    </TouchableOpacity>
                    
                    <View style={styles.routineContent}>
                      <Text style={[styles.routineTask, routine.completed && styles.completedTask]}>
                        {routine.task}
                      </Text>
                      <Text style={styles.routineTime}>{routine.time}</Text>
                    </View>
                    
                    <View style={styles.routineActions}>
                      <TouchableOpacity
                        onPress={() => speak(`Reminder: ${routine.task} at ${routine.time}`)}
                        style={styles.actionButton}
                      >
                        <Ionicons name="notifications-outline" size={20} color="#388E3C" />
                      </TouchableOpacity>
                      
                      <TouchableOpacity
                        onPress={() => editRoutine(routine)}
                        style={styles.actionButton}
                      >
                        <Ionicons name="create-outline" size={20} color="#FF9800" />
                      </TouchableOpacity>
                      
                      <TouchableOpacity
                        onPress={() => deleteRoutine(routine.id)}
                        style={styles.actionButton}
                      >
                        <Ionicons name="trash-outline" size={20} color="#F44336" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {isSpeaking && (
            <View style={styles.speakingIndicator}>
              <Ionicons name="volume-high" size={20} color="#388E3C" />
              <Text style={styles.speakingText}>Speaking...</Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  };

  // Render current view
  const renderView = () => {
    switch (currentView) {
      case 'quiz': return <QuizView />;
      case 'signLanguage': return <SignLanguageView />;
      case 'routine': return <RoutineView />;
      default: return <HomeView />;
    }
  };

  return renderView();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  
  // Hero Section Styles
  heroSection: {
    alignItems: 'center',
    paddingVertical: 30,
    borderBottomWidth: 2,
    borderBottomColor: '#E3F2FD',
    marginBottom: 30,
  },
  mascotContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  mascotCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  mascotText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  mascotButton: {
    backgroundColor: '#0066CC',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  mascotButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  mainTitle: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#0066CC',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 300,
  },

  // Section Styles
  sectionContainer: {
    marginBottom: 30,
  },
  sectionHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },

  // Learning Card Styles
  learningCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#e9ecef',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  cardDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
    marginBottom: 16,
  },
  previewImages: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  previewImage: {
    width: 60,
    height: 50,
    borderRadius: 8,
  },
  categoryTabs: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  categoryTab: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  tabText: {
    fontSize: 12,
    color: '#0066CC',
    fontWeight: '600',
  },
  startButton: {
    backgroundColor: '#0066CC',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  startButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Header Styles
  headerWithBack: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    marginBottom: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 16,
    gap: 8,
  },
  backText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0066CC',
  },

  // Quiz Styles
  categorySection: {
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  categoryButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  categoryButton: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e9ecef',
  },
  activeCategoryButton: {
    backgroundColor: '#0066CC',
    borderColor: '#0066CC',
  },
  categoryButtonText: {
    textAlign: 'center',
    fontWeight: '600',
    color: '#666',
  },
  activeCategoryButtonText: {
    color: 'white',
  },
  questionCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    padding: 24,
    borderWidth: 2,
    borderColor: '#e9ecef',
  },
  questionNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0066CC',
    textAlign: 'center',
    marginBottom: 16,
  },
  questionImageContainer: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
    backgroundColor: '#ffffff',
  },
  questionImage: {
    width: '100%',
    height: '100%',
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 28,
  },
  audioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E3F2FD',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 20,
    gap: 8,
  },
  audioButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0066CC',
  },
  optionsContainer: {
    gap: 12,
  },
  optionsLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  optionButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e9ecef',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },

  // Explanation Styles
  explanationCard: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e9ecef',
  },
  resultBadge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  resultSymbol: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#0066CC',
  },
  resultLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  explanationText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  tryAgainText: {
    fontSize: 14,
    color: '#0066CC',
    fontWeight: '600',
    marginTop: 8,
  },

  // Result Styles
  resultCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e9ecef',
  },
  resultEmoji: {
    fontSize: 48,
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 8,
  },
  resultSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  scoreCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#e9ecef',
  },
  scoreText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  scoreBig: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#0066CC',
  },
  scorePercent: {
    fontSize: 18,
    color: '#4CAF50',
    fontWeight: '600',
  },

  // Button Styles
  buttonGroup: {
    width: '100%',
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#0066CC',
    paddingVertical: 16,
    borderRadius: 12,
    width: '100%',
  },
  secondaryButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e9ecef',
    width: '100%',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  secondaryButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    textAlign: 'center',
  },

  // Sign Language Styles
  signCategorySection: {
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  signCategoryButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  signCategoryButton: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e9ecef',
  },
  activeSignCategory: {
    backgroundColor: '#7B1FA2',
    borderColor: '#7B1FA2',
  },
  signCategoryText: {
    textAlign: 'center',
    fontWeight: '600',
    color: '#666',
    fontSize: 14,
  },
  activeSignCategoryText: {
    color: 'white',
  },
  signCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    padding: 24,
    borderWidth: 2,
    borderColor: '#e9ecef',
  },
  signHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  signWord: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  signImageContainer: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
    backgroundColor: '#ffffff',
  },
  signImage: {
    width: '100%',
    height: '100%',
  },
  signDescription: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#e9ecef',
  },
  signDescriptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  signDescriptionText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
  stepByStep: {
    backgroundColor: '#F3E5F5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  stepByStepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7B1FA2',
    marginBottom: 8,
  },
  stepByStepText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  comparisonSection: {
    gap: 12,
    marginBottom: 20,
  },
  comparisonCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#e9ecef',
  },
  comparisonTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#7B1FA2',
    marginBottom: 6,
  },
  comparisonText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },

  // Navigation Styles
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 2,
    borderTopColor: '#e9ecef',
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 8,
    borderWidth: 2,
    borderColor: '#e9ecef',
  },
  disabledButton: {
    backgroundColor: '#f8f9fa',
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  disabledText: {
    color: '#ccc',
  },
  cardProgress: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7B1FA2',
  },

  // Routine Styles
  progressCard: {
    backgroundColor: '#E8F5E8',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  progressTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#388E3C',
    textAlign: 'center',
    marginBottom: 16,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#388E3C',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  addRoutineCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#e9ecef',
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 2,
    borderColor: '#e9ecef',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  routineSection: {
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: '#e9ecef',
  },
  routineList: {
    gap: 12,
  },
  routineItem: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e9ecef',
  },
  completedRoutine: {
    backgroundColor: '#E8F5E8',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ccc',
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBox: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  routineContent: {
    flex: 1,
  },
  routineTask: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#4CAF50',
  },
  routineTime: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  editingNotice: {
    backgroundColor: '#FFF3E0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF9800',
  },
  editingText: {
    fontSize: 14,
    color: '#F57C00',
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#FF9800',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  cancelText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  routineActions: {
    flexDirection: 'row',
    gap: 4,
  },
  actionButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },

  // Accessibility Features
  accessibilitySection: {
    marginBottom: 30,
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  featureCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e9ecef',
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
    marginBottom: 4,
    textAlign: 'center',
  },
  featureText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 16,
  },
  routinePreview: {
    gap: 8,
    marginBottom: 16,
  },
  routineText: {
    fontSize: 14,
    color: '#666',
  },

  // Speaking Indicator
  speakingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E3F2FD',
    padding: 12,
    borderRadius: 20,
    marginTop: 16,
    gap: 8,
  },
  speakingText: {
    fontSize: 16,
    color: '#0066CC',
    fontWeight: '600',
  },
});

export default LearnAbleApp;