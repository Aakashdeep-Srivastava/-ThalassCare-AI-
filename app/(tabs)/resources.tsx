import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { BookOpen, Play, Users, ExternalLink, Download, Star } from 'lucide-react-native';

export default function Resources() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <LinearGradient
          colors={['#F59E0B', '#D97706']}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>Learn & Connect</Text>
          <Text style={styles.headerSubtitle}>Educational resources and community support</Text>
        </LinearGradient>

        {/* Featured Articles */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Articles</Text>
          
          <View style={styles.articleCard}>
            <View style={styles.articleContent}>
              <Text style={styles.articleTitle}>Understanding Your Blood Test Results</Text>
              <Text style={styles.articleExcerpt}>
                Learn how to interpret hemoglobin, ferritin, and other key markers in thalassemia management.
              </Text>
              <View style={styles.articleMeta}>
                <View style={styles.rating}>
                  <Star size={16} color="#F59E0B" />
                  <Text style={styles.ratingText}>4.8</Text>
                </View>
                <Text style={styles.readTime}>5 min read</Text>
              </View>
            </View>
            <Pressable style={styles.readButton}>
              <BookOpen size={16} color="#FFFFFF" />
              <Text style={styles.readButtonText}>Read</Text>
            </Pressable>
          </View>

          <View style={styles.articleCard}>
            <View style={styles.articleContent}>
              <Text style={styles.articleTitle}>Iron Chelation Therapy: What You Need to Know</Text>
              <Text style={styles.articleExcerpt}>
                A comprehensive guide to iron chelation treatment, side effects, and monitoring.
              </Text>
              <View style={styles.articleMeta}>
                <View style={styles.rating}>
                  <Star size={16} color="#F59E0B" />
                  <Text style={styles.ratingText}>4.6</Text>
                </View>
                <Text style={styles.readTime}>8 min read</Text>
              </View>
            </View>
            <Pressable style={styles.readButton}>
              <BookOpen size={16} color="#FFFFFF" />
              <Text style={styles.readButtonText}>Read</Text>
            </Pressable>
          </View>
        </View>

        {/* Video Library */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Video Library</Text>
          
          <View style={styles.videoGrid}>
            <View style={styles.videoCard}>
              <View style={styles.videoThumbnail}>
                <Play size={32} color="#FFFFFF" />
              </View>
              <Text style={styles.videoTitle}>Living Well with Thalassemia</Text>
              <Text style={styles.videoDuration}>12:30</Text>
            </View>
            
            <View style={styles.videoCard}>
              <View style={styles.videoThumbnail}>
                <Play size={32} color="#FFFFFF" />
              </View>
              <Text style={styles.videoTitle}>Medication Management Tips</Text>
              <Text style={styles.videoDuration}>8:45</Text>
            </View>
            
            <View style={styles.videoCard}>
              <View style={styles.videoThumbnail}>
                <Play size={32} color="#FFFFFF" />
              </View>
              <Text style={styles.videoTitle}>Exercise and Thalassemia</Text>
              <Text style={styles.videoDuration}>15:20</Text>
            </View>
            
            <View style={styles.videoCard}>
              <View style={styles.videoThumbnail}>
                <Play size={32} color="#FFFFFF" />
              </View>
              <Text style={styles.videoTitle}>Nutrition Guidelines</Text>
              <Text style={styles.videoDuration}>10:15</Text>
            </View>
          </View>
        </View>

        {/* Community Support */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Community Support</Text>
          
          <View style={styles.communityCard}>
            <View style={styles.communityHeader}>
              <Users size={24} color="#7C3AED" />
              <Text style={styles.communityTitle}>Thalassemia Support Group</Text>
            </View>
            <Text style={styles.communityDescription}>
              Connect with other patients and caregivers. Share experiences, ask questions, and find support.
            </Text>
            <View style={styles.communityStats}>
              <Text style={styles.memberCount}>2,847 members</Text>
              <Text style={styles.activityCount}>156 active today</Text>
            </View>
            <Pressable style={styles.joinButton}>
              <Users size={16} color="#FFFFFF" />
              <Text style={styles.joinButtonText}>Join Community</Text>
            </Pressable>
          </View>

          <View style={styles.forumsCard}>
            <Text style={styles.forumsTitle}>Recent Forum Discussions</Text>
            
            <View style={styles.forumItem}>
              <Text style={styles.forumTitle}>Best practices for iron chelation</Text>
              <Text style={styles.forumMeta}>24 replies • 2 hours ago</Text>
            </View>
            
            <View style={styles.forumItem}>
              <Text style={styles.forumTitle}>Managing fatigue during treatment</Text>
              <Text style={styles.forumMeta}>18 replies • 5 hours ago</Text>
            </View>
            
            <View style={styles.forumItem}>
              <Text style={styles.forumTitle}>Preparing for blood transfusions</Text>
              <Text style={styles.forumMeta}>31 replies • 1 day ago</Text>
            </View>
            
            <Pressable style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View All Discussions</Text>
              <ExternalLink size={16} color="#2563EB" />
            </Pressable>
          </View>
        </View>

        {/* Quick Resources */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Resources</Text>
          
          <View style={styles.resourcesGrid}>
            <Pressable style={styles.resourceCard}>
              <Download size={24} color="#059669" />
              <Text style={styles.resourceTitle}>Medication Tracker</Text>
              <Text style={styles.resourceSubtitle}>PDF template</Text>
            </Pressable>
            
            <Pressable style={styles.resourceCard}>
              <Download size={24} color="#DC2626" />
              <Text style={styles.resourceTitle}>Emergency Card</Text>
              <Text style={styles.resourceSubtitle}>Medical ID</Text>
            </Pressable>
            
            <Pressable style={styles.resourceCard}>
              <Download size={24} color="#7C3AED" />
              <Text style={styles.resourceTitle}>Lab Results Log</Text>
              <Text style={styles.resourceSubtitle}>Tracking sheet</Text>
            </Pressable>
            
            <Pressable style={styles.resourceCard}>
              <Download size={24} color="#F59E0B" />
              <Text style={styles.resourceTitle}>Dietary Guide</Text>
              <Text style={styles.resourceSubtitle}>Nutrition tips</Text>
            </Pressable>
          </View>
        </View>

        {/* Healthcare Provider Directory */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Find Specialists</Text>
          
          <View style={styles.directoryCard}>
            <Text style={styles.directoryTitle}>Thalassemia Treatment Centers</Text>
            <Text style={styles.directoryDescription}>
              Find specialized healthcare providers and treatment centers near you.
            </Text>
            <Pressable style={styles.searchButton}>
              <Text style={styles.searchButtonText}>Search by Location</Text>
              <ExternalLink size={16} color="#FFFFFF" />
            </Pressable>
          </View>
        </View>

        {/* Emergency Information */}
        <View style={styles.emergencySection}>
          <Text style={styles.emergencyTitle}>Emergency Information</Text>
          <Text style={styles.emergencyText}>
            Important information to share with healthcare providers in emergency situations.
          </Text>
          <Pressable style={styles.emergencyButton}>
            <Text style={styles.emergencyButtonText}>View Emergency Card</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#FEF3C7',
    textAlign: 'center',
    marginTop: 4,
  },
  section: {
    marginHorizontal: 20,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  articleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  articleContent: {
    flex: 1,
    marginRight: 16,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  articleExcerpt: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  articleMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    color: '#F59E0B',
    fontWeight: '600',
  },
  readTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  readButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  readButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  videoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  videoCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  videoThumbnail: {
    height: 100,
    backgroundColor: '#374151',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    padding: 12,
    paddingBottom: 8,
  },
  videoDuration: {
    fontSize: 12,
    color: '#6B7280',
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  communityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  communityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  communityTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginLeft: 8,
  },
  communityDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  communityStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginBottom: 16,
  },
  memberCount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  activityCount: {
    fontSize: 14,
    color: '#059669',
    fontWeight: '600',
  },
  joinButton: {
    backgroundColor: '#7C3AED',
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  joinButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  forumsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  forumsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  forumItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  forumTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  forumMeta: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    gap: 8,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2563EB',
  },
  resourcesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  resourceCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  resourceTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginTop: 8,
    textAlign: 'center',
  },
  resourceSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  directoryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  directoryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  directoryDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  searchButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  emergencySection: {
    backgroundColor: '#FEF2F2',
    marginHorizontal: 20,
    marginTop: 24,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  emergencyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#DC2626',
    marginBottom: 8,
  },
  emergencyText: {
    fontSize: 14,
    color: '#7F1D1D',
    lineHeight: 20,
    marginBottom: 16,
  },
  emergencyButton: {
    backgroundColor: '#DC2626',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  emergencyButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});