import { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Modal, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  Gamepad2,
  Brain,
  Heart,
  Users,
  Trophy,
  Star,
  ArrowLeft,
  Grid3X3,
  Sparkles,
  Timer,
  RotateCcw,
  X,
  CheckCircle,
  Puzzle,
  Wind,
} from 'lucide-react-native';
import { colors, layout, shadows, borderRadius } from '@/constants/theme';

const { width } = Dimensions.get('window');

// Game Card Component
function GameCard({ title, description, icon: Icon, color, onPress, players, badge }: any) {
  return (
    <Pressable style={styles.gameCard} onPress={onPress}>
      <View style={[styles.gameIconContainer, { backgroundColor: color + '15' }]}>
        <Icon size={28} color={color} />
      </View>
      <View style={styles.gameInfo}>
        <Text style={styles.gameTitle}>{title}</Text>
        <Text style={styles.gameDescription}>{description}</Text>
        {players && (
          <View style={styles.playersRow}>
            <Users size={12} color={colors.textMuted} />
            <Text style={styles.playersText}>{players} playing now</Text>
          </View>
        )}
      </View>
      {badge && (
        <View style={[styles.badge, { backgroundColor: color }]}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      )}
    </Pressable>
  );
}

// Memory Match Game Component
function MemoryMatchGame({ onClose }: { onClose: () => void }) {
  const emojis = ['❤️', '🩸', '💪', '🏥', '💊', '🌟', '🎯', '🏆'];
  const [cards, setCards] = useState<string[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    initGame();
  }, []);

  const initGame = () => {
    const shuffled = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setGameWon(false);
  };

  const handleCardPress = (index: number) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      if (cards[newFlipped[0]] === cards[newFlipped[1]]) {
        setMatched(m => [...m, ...newFlipped]);
        setFlipped([]);
        if (matched.length + 2 === cards.length) {
          setGameWon(true);
        }
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return (
    <View style={styles.gameModalContent}>
      <View style={styles.gameModalHeader}>
        <Pressable onPress={onClose} style={styles.closeButton}>
          <ArrowLeft size={24} color={colors.textPrimary} />
        </Pressable>
        <Text style={styles.gameModalTitle}>Memory Match</Text>
        <Pressable onPress={initGame} style={styles.resetButton}>
          <RotateCcw size={20} color={colors.primary} />
        </Pressable>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Timer size={16} color={colors.primary} />
          <Text style={styles.statText}>Moves: {moves}</Text>
        </View>
        <View style={styles.statItem}>
          <Star size={16} color={colors.warning} />
          <Text style={styles.statText}>Matched: {matched.length / 2}/{emojis.length}</Text>
        </View>
      </View>

      {gameWon ? (
        <View style={styles.winContainer}>
          <Trophy size={64} color={colors.warning} />
          <Text style={styles.winText}>Congratulations!</Text>
          <Text style={styles.winSubtext}>You won in {moves} moves!</Text>
          <Pressable style={styles.playAgainButton} onPress={initGame}>
            <Text style={styles.playAgainText}>Play Again</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.cardGrid}>
          {cards.map((card, index) => (
            <Pressable
              key={index}
              style={[
                styles.memoryCard,
                (flipped.includes(index) || matched.includes(index)) && styles.memoryCardFlipped,
                matched.includes(index) && styles.memoryCardMatched,
              ]}
              onPress={() => handleCardPress(index)}
            >
              <Text style={styles.cardEmoji}>
                {flipped.includes(index) || matched.includes(index) ? card : '?'}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

// Health Quiz Game Component
function HealthQuizGame({ onClose }: { onClose: () => void }) {
  const questions = [
    {
      question: 'What is thalassemia?',
      options: ['A blood disorder', 'A skin condition', 'A bone disease', 'A lung infection'],
      correct: 0,
    },
    {
      question: 'Which vitamin is important for blood production?',
      options: ['Vitamin A', 'Vitamin C', 'Folic Acid', 'Vitamin D'],
      correct: 2,
    },
    {
      question: 'How often do thalassemia major patients need transfusions?',
      options: ['Once a year', 'Every 2-4 weeks', 'Daily', 'Once a month'],
      correct: 1,
    },
    {
      question: 'What does chelation therapy help with?',
      options: ['Weight loss', 'Iron overload', 'Muscle building', 'Skin care'],
      correct: 1,
    },
    {
      question: 'Which organ is most affected by iron overload?',
      options: ['Lungs', 'Stomach', 'Heart & Liver', 'Kidneys'],
      correct: 2,
    },
  ];

  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (index: number) => {
    if (answered !== null) return;
    setAnswered(index);
    if (index === questions[currentQ].correct) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(c => c + 1);
      setAnswered(null);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQ(0);
    setScore(0);
    setAnswered(null);
    setShowResult(false);
  };

  return (
    <View style={styles.gameModalContent}>
      <View style={styles.gameModalHeader}>
        <Pressable onPress={onClose} style={styles.closeButton}>
          <ArrowLeft size={24} color={colors.textPrimary} />
        </Pressable>
        <Text style={styles.gameModalTitle}>Health Quiz</Text>
        <View style={styles.quizScore}>
          <Star size={16} color={colors.warning} />
          <Text style={styles.quizScoreText}>{score}/{questions.length}</Text>
        </View>
      </View>

      {showResult ? (
        <View style={styles.winContainer}>
          <Trophy size={64} color={score >= 3 ? colors.success : colors.warning} />
          <Text style={styles.winText}>Quiz Complete!</Text>
          <Text style={styles.winSubtext}>You scored {score} out of {questions.length}</Text>
          <Text style={styles.resultMessage}>
            {score === 5 ? 'Perfect! You\'re a health expert!' :
             score >= 3 ? 'Great job! Keep learning!' :
             'Keep practicing! Knowledge is power!'}
          </Text>
          <Pressable style={styles.playAgainButton} onPress={resetQuiz}>
            <Text style={styles.playAgainText}>Try Again</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.quizContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${((currentQ + 1) / questions.length) * 100}%` }]} />
          </View>

          <Text style={styles.questionNumber}>Question {currentQ + 1} of {questions.length}</Text>
          <Text style={styles.questionText}>{questions[currentQ].question}</Text>

          <View style={styles.optionsContainer}>
            {questions[currentQ].options.map((option, index) => (
              <Pressable
                key={index}
                style={[
                  styles.optionButton,
                  answered === index && (index === questions[currentQ].correct
                    ? styles.optionCorrect
                    : styles.optionWrong),
                  answered !== null && index === questions[currentQ].correct && styles.optionCorrect,
                ]}
                onPress={() => handleAnswer(index)}
              >
                <Text style={[
                  styles.optionText,
                  answered !== null && index === questions[currentQ].correct && styles.optionTextCorrect,
                  answered === index && index !== questions[currentQ].correct && styles.optionTextWrong,
                ]}>
                  {option}
                </Text>
                {answered !== null && index === questions[currentQ].correct && (
                  <CheckCircle size={20} color={colors.success} />
                )}
                {answered === index && index !== questions[currentQ].correct && (
                  <X size={20} color={colors.error} />
                )}
              </Pressable>
            ))}
          </View>

          {answered !== null && (
            <Pressable style={styles.nextButton} onPress={nextQuestion}>
              <Text style={styles.nextButtonText}>
                {currentQ < questions.length - 1 ? 'Next Question' : 'See Results'}
              </Text>
            </Pressable>
          )}
        </View>
      )}
    </View>
  );
}

// Breathing Exercise Game
function BreathingGame({ onClose }: { onClose: () => void }) {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'rest'>('rest');
  const [count, setCount] = useState(0);
  const [cycles, setCycles] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      interval = setInterval(() => {
        setCount(c => {
          if (phase === 'inhale' && c >= 4) {
            setPhase('hold');
            return 0;
          } else if (phase === 'hold' && c >= 4) {
            setPhase('exhale');
            return 0;
          } else if (phase === 'exhale' && c >= 4) {
            setCycles(cy => cy + 1);
            setPhase('inhale');
            return 0;
          }
          return c + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, phase]);

  const startExercise = () => {
    setIsActive(true);
    setPhase('inhale');
    setCount(0);
    setCycles(0);
  };

  const stopExercise = () => {
    setIsActive(false);
    setPhase('rest');
    setCount(0);
  };

  const getCircleSize = () => {
    if (phase === 'inhale') return 150 + (count * 12);
    if (phase === 'hold') return 198;
    if (phase === 'exhale') return 198 - (count * 12);
    return 150;
  };

  const getPhaseText = () => {
    if (phase === 'inhale') return 'Breathe In';
    if (phase === 'hold') return 'Hold';
    if (phase === 'exhale') return 'Breathe Out';
    return 'Ready?';
  };

  return (
    <View style={styles.gameModalContent}>
      <View style={styles.gameModalHeader}>
        <Pressable onPress={onClose} style={styles.closeButton}>
          <ArrowLeft size={24} color={colors.textPrimary} />
        </Pressable>
        <Text style={styles.gameModalTitle}>Calm Breathing</Text>
        <View style={styles.cyclesContainer}>
          <Heart size={16} color={colors.error} />
          <Text style={styles.cyclesText}>{cycles}</Text>
        </View>
      </View>

      <View style={styles.breathingContainer}>
        <Text style={styles.breathingInstruction}>
          Deep breathing helps reduce stress during transfusions
        </Text>

        <View style={styles.circleContainer}>
          <View
            style={[
              styles.breathCircle,
              {
                width: getCircleSize(),
                height: getCircleSize(),
                borderRadius: getCircleSize() / 2,
              },
            ]}
          >
            <Text style={styles.phaseText}>{getPhaseText()}</Text>
            {isActive && <Text style={styles.countText}>{4 - count}</Text>}
          </View>
        </View>

        <Pressable
          style={[styles.breathButton, isActive && styles.breathButtonStop]}
          onPress={isActive ? stopExercise : startExercise}
        >
          <Text style={styles.breathButtonText}>
            {isActive ? 'Stop' : 'Start'}
          </Text>
        </Pressable>

        <Text style={styles.breathingTip}>
          4-4-4 Pattern: Inhale 4s, Hold 4s, Exhale 4s
        </Text>
      </View>
    </View>
  );
}

// Tic Tac Toe Game
function TicTacToeGame({ onClose }: { onClose: () => void }) {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);
  const [scores, setScores] = useState({ X: 0, O: 0 });

  const checkWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handlePress = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      setScores(s => ({ ...s, [gameWinner]: s[gameWinner as keyof typeof s] + 1 }));
    } else {
      setIsXNext(!isXNext);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  const isDraw = !winner && board.every(cell => cell !== null);

  return (
    <View style={styles.gameModalContent}>
      <View style={styles.gameModalHeader}>
        <Pressable onPress={onClose} style={styles.closeButton}>
          <ArrowLeft size={24} color={colors.textPrimary} />
        </Pressable>
        <Text style={styles.gameModalTitle}>Tic Tac Toe</Text>
        <Pressable onPress={resetGame} style={styles.resetButton}>
          <RotateCcw size={20} color={colors.primary} />
        </Pressable>
      </View>

      <View style={styles.tttScoreBoard}>
        <View style={[styles.tttScoreItem, isXNext && !winner && styles.tttScoreActive]}>
          <Text style={styles.tttScoreLabel}>Player X</Text>
          <Text style={styles.tttScoreValue}>{scores.X}</Text>
        </View>
        <View style={styles.tttVs}>
          <Text style={styles.tttVsText}>VS</Text>
        </View>
        <View style={[styles.tttScoreItem, !isXNext && !winner && styles.tttScoreActive]}>
          <Text style={styles.tttScoreLabel}>Player O</Text>
          <Text style={styles.tttScoreValue}>{scores.O}</Text>
        </View>
      </View>

      {(winner || isDraw) && (
        <View style={styles.tttResult}>
          <Text style={styles.tttResultText}>
            {isDraw ? "It's a Draw!" : `Player ${winner} Wins!`}
          </Text>
        </View>
      )}

      <View style={styles.tttBoard}>
        {board.map((cell, index) => (
          <Pressable
            key={index}
            style={[
              styles.tttCell,
              index % 3 !== 2 && styles.tttCellRight,
              index < 6 && styles.tttCellBottom,
            ]}
            onPress={() => handlePress(index)}
          >
            <Text style={[
              styles.tttCellText,
              cell === 'X' && styles.tttCellX,
              cell === 'O' && styles.tttCellO,
            ]}>
              {cell}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.tttTurn}>
        {winner ? 'Game Over' : isDraw ? 'No more moves' : `${isXNext ? 'X' : 'O'}'s Turn`}
      </Text>
    </View>
  );
}

// Main Games Screen
export default function GamesScreen() {
  const router = useRouter();
  const [activeGame, setActiveGame] = useState<string | null>(null);

  const games = [
    {
      id: 'memory',
      title: 'Memory Match',
      description: 'Match pairs of cards to test your memory',
      icon: Brain,
      color: colors.accentPurple,
      badge: 'Popular',
    },
    {
      id: 'quiz',
      title: 'Health Quiz',
      description: 'Learn about thalassemia while having fun',
      icon: Sparkles,
      color: colors.info,
      badge: 'New',
    },
    {
      id: 'breathing',
      title: 'Calm Breathing',
      description: 'Relaxing breathing exercises during transfusion',
      icon: Wind,
      color: colors.success,
      players: 23,
    },
    {
      id: 'tictactoe',
      title: 'Tic Tac Toe',
      description: 'Classic game - play with a friend!',
      icon: Grid3X3,
      color: colors.warning,
      players: 47,
    },
  ];

  const renderGame = () => {
    switch (activeGame) {
      case 'memory':
        return <MemoryMatchGame onClose={() => setActiveGame(null)} />;
      case 'quiz':
        return <HealthQuizGame onClose={() => setActiveGame(null)} />;
      case 'breathing':
        return <BreathingGame onClose={() => setActiveGame(null)} />;
      case 'tictactoe':
        return <TicTacToeGame onClose={() => setActiveGame(null)} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </Pressable>
        <View>
          <Text style={styles.headerTitle}>Game Zone</Text>
          <Text style={styles.headerSubtitle}>Relax & Play</Text>
        </View>
        <View style={styles.trophyContainer}>
          <Trophy size={22} color="#FFFFFF" />
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Card */}
        <View style={styles.welcomeCard}>
          <Gamepad2 size={32} color={colors.primary} />
          <View style={styles.welcomeText}>
            <Text style={styles.welcomeTitle}>Time to Relax!</Text>
            <Text style={styles.welcomeSubtitle}>
              Enjoy these games while you wait. Playing helps reduce stress!
            </Text>
          </View>
        </View>

        {/* Games List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Games</Text>
          {games.map((game) => (
            <GameCard
              key={game.id}
              {...game}
              onPress={() => setActiveGame(game.id)}
            />
          ))}
        </View>

        {/* Community Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Community</Text>
          <View style={styles.communityCard}>
            <Users size={24} color={colors.primary} />
            <View style={styles.communityInfo}>
              <Text style={styles.communityTitle}>Play with Others</Text>
              <Text style={styles.communitySubtitle}>
                70+ patients are gaming right now
              </Text>
            </View>
            <View style={styles.liveIndicator}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>Live</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Game Modal */}
      <Modal
        visible={activeGame !== null}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          {renderGame()}
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: colors.primary,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
  },
  trophyContainer: {
    marginLeft: 'auto',
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: layout.scrollContentPadding,
  },
  welcomeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryGlow,
    margin: 20,
    padding: 16,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.primary + '30',
  },
  welcomeText: {
    marginLeft: 12,
    flex: 1,
  },
  welcomeTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  welcomeSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  gameCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },
  gameIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameInfo: {
    flex: 1,
    marginLeft: 14,
  },
  gameTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  gameDescription: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  playersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 4,
  },
  playersText: {
    fontSize: 11,
    color: colors.textMuted,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  communityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },
  communityInfo: {
    flex: 1,
    marginLeft: 12,
  },
  communityTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  communitySubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.successGlow,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.success,
  },
  liveText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.success,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  gameModalContent: {
    flex: 1,
    padding: 20,
  },
  gameModalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameModalTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
    marginLeft: 12,
  },
  resetButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryGlow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginBottom: 20,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  winContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  winText: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.textPrimary,
    marginTop: 16,
  },
  winSubtext: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 8,
  },
  resultMessage: {
    fontSize: 14,
    color: colors.primary,
    marginTop: 12,
    textAlign: 'center',
  },
  playAgainButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: borderRadius.md,
    marginTop: 24,
  },
  playAgainText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginTop: 20,
  },
  memoryCard: {
    width: (width - 80) / 4,
    height: (width - 80) / 4,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  memoryCardFlipped: {
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  memoryCardMatched: {
    backgroundColor: colors.successGlow,
    borderColor: colors.success,
  },
  cardEmoji: {
    fontSize: 24,
  },
  // Quiz styles
  quizScore: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.warningGlow,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  quizScoreText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.warning,
  },
  quizContainer: {
    flex: 1,
  },
  progressBar: {
    height: 6,
    backgroundColor: colors.border,
    borderRadius: 3,
    marginBottom: 20,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  questionNumber: {
    fontSize: 13,
    color: colors.textMuted,
    marginBottom: 8,
  },
  questionText: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 24,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: 16,
    borderWidth: 2,
    borderColor: colors.border,
  },
  optionCorrect: {
    borderColor: colors.success,
    backgroundColor: colors.successGlow,
  },
  optionWrong: {
    borderColor: colors.error,
    backgroundColor: colors.errorGlow,
  },
  optionText: {
    fontSize: 15,
    color: colors.textPrimary,
    flex: 1,
  },
  optionTextCorrect: {
    color: colors.success,
    fontWeight: '600',
  },
  optionTextWrong: {
    color: colors.error,
    fontWeight: '600',
  },
  nextButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 24,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  // Breathing styles
  breathingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  breathingInstruction: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  circleContainer: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  breathCircle: {
    backgroundColor: colors.primaryGlow,
    borderWidth: 3,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  phaseText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  countText: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.primary,
    marginTop: 4,
  },
  breathButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 48,
    paddingVertical: 14,
    borderRadius: borderRadius.full,
  },
  breathButtonStop: {
    backgroundColor: colors.error,
  },
  breathButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  breathingTip: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 24,
  },
  cyclesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.errorGlow,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  cyclesText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.error,
  },
  // Tic Tac Toe styles
  tttScoreBoard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  tttScoreItem: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surfaceLight,
  },
  tttScoreActive: {
    backgroundColor: colors.primaryGlow,
  },
  tttScoreLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  tttScoreValue: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  tttVs: {
    paddingHorizontal: 16,
  },
  tttVsText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textMuted,
  },
  tttResult: {
    alignItems: 'center',
    marginBottom: 16,
  },
  tttResultText: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
  },
  tttBoard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: width - 80,
    alignSelf: 'center',
  },
  tttCell: {
    width: (width - 80) / 3,
    height: (width - 80) / 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  tttCellRight: {
    borderRightWidth: 3,
    borderRightColor: colors.border,
  },
  tttCellBottom: {
    borderBottomWidth: 3,
    borderBottomColor: colors.border,
  },
  tttCellText: {
    fontSize: 48,
    fontWeight: '800',
  },
  tttCellX: {
    color: colors.primary,
  },
  tttCellO: {
    color: colors.accentPurple,
  },
  tttTurn: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 24,
  },
});
