import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  BookOpen,
  Play,
  Users,
  ExternalLink,
  Download,
  Star,
  Search,
  Clock,
  Heart,
  DollarSign,
  Building2,
  Phone,
  Globe,
  ChevronRight,
  Shield,
  Utensils,
  Dumbbell,
  Brain,
} from 'lucide-react-native';
import Header from '@/components/Header';
import { colors, layout } from '@/constants/theme';
import { articles, videos, supportGroups, financialSchemes, emergencyContacts } from '@/constants/data';

type TabType = 'guides' | 'videos' | 'community' | 'help';

export default function Learn() {
  const [activeTab, setActiveTab] = useState<TabType>('guides');

  const tabs: { key: TabType; label: string; icon: any }[] = [
    { key: 'guides', label: 'Guides', icon: BookOpen },
    { key: 'videos', label: 'Videos', icon: Play },
    { key: 'community', label: 'Community', icon: Users },
    { key: 'help', label: 'Help', icon: Heart },
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'treatment':
        return Shield;
      case 'nutrition':
        return Utensils;
      case 'lifestyle':
        return Dumbbell;
      case 'mental-health':
        return Brain;
      default:
        return BookOpen;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'treatment':
        return '#3B82F6';
      case 'nutrition':
        return '#10B981';
      case 'lifestyle':
        return '#F59E0B';
      case 'mental-health':
        return '#8B5CF6';
      default:
        return colors.primary;
    }
  };

  const renderGuides = () => (
    <View style={styles.tabContent}>
      {/* Quick Topics */}
      <View style={styles.quickTopics}>
        <Text style={styles.subsectionTitle}>Quick Topics</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[
            { label: 'Transfusions', color: '#DC2626' },
            { label: 'Iron Overload', color: '#F59E0B' },
            { label: 'Nutrition', color: '#10B981' },
            { label: 'Exercise', color: '#3B82F6' },
            { label: 'Mental Health', color: '#8B5CF6' },
          ].map((topic, index) => (
            <Pressable
              key={index}
              style={[styles.topicChip, { backgroundColor: topic.color + '15' }]}
            >
              <Text style={[styles.topicText, { color: topic.color }]}>{topic.label}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Featured Articles */}
      <Text style={styles.subsectionTitle}>Featured Articles</Text>
      {articles.map(article => {
        const CategoryIcon = getCategoryIcon(article.category);
        const categoryColor = getCategoryColor(article.category);

        return (
          <Pressable key={article.id} style={styles.articleCard}>
            <View style={[styles.articleIcon, { backgroundColor: categoryColor + '15' }]}>
              <CategoryIcon size={24} color={categoryColor} />
            </View>
            <View style={styles.articleContent}>
              <Text style={styles.articleTitle}>{article.title}</Text>
              <Text style={styles.articleExcerpt} numberOfLines={2}>
                {article.content}
              </Text>
              <View style={styles.articleMeta}>
                <View style={styles.metaItem}>
                  <Clock size={12} color={colors.textMuted} />
                  <Text style={styles.metaText}>{article.readTime}</Text>
                </View>
                {article.rating && (
                  <View style={styles.metaItem}>
                    <Star size={12} color="#F59E0B" fill="#F59E0B" />
                    <Text style={styles.metaText}>{article.rating}</Text>
                  </View>
                )}
              </View>
            </View>
            <ChevronRight size={20} color={colors.textMuted} />
          </Pressable>
        );
      })}

      {/* Quick Downloads */}
      <Text style={styles.subsectionTitle}>Quick Downloads</Text>
      <View style={styles.downloadsGrid}>
        {[
          { label: 'Medication Tracker', icon: Download, color: '#10B981' },
          { label: 'Emergency Card', icon: Shield, color: '#DC2626' },
          { label: 'Lab Results Log', icon: BookOpen, color: '#3B82F6' },
          { label: 'Dietary Guide', icon: Utensils, color: '#F59E0B' },
        ].map((item, index) => (
          <Pressable key={index} style={styles.downloadCard}>
            <View style={[styles.downloadIcon, { backgroundColor: item.color + '15' }]}>
              <item.icon size={20} color={item.color} />
            </View>
            <Text style={styles.downloadLabel}>{item.label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );

  const renderVideos = () => (
    <View style={styles.tabContent}>
      <Text style={styles.subsectionTitle}>Video Library</Text>
      <View style={styles.videoGrid}>
        {videos.map(video => (
          <Pressable key={video.id} style={styles.videoCard}>
            <View style={styles.videoThumbnail}>
              <View style={styles.playButton}>
                <Play size={24} color="#FFFFFF" fill="#FFFFFF" />
              </View>
              <View style={styles.durationBadge}>
                <Text style={styles.durationText}>{video.duration}</Text>
              </View>
            </View>
            <View style={styles.videoInfo}>
              <Text style={styles.videoTitle} numberOfLines={2}>{video.title}</Text>
              <Text style={styles.videoAuthor}>{video.author}</Text>
              <View style={styles.videoStats}>
                <Text style={styles.viewCount}>{video.views} views</Text>
                {video.rating && (
                  <View style={styles.ratingBadge}>
                    <Star size={10} color="#F59E0B" fill="#F59E0B" />
                    <Text style={styles.ratingValue}>{video.rating}</Text>
                  </View>
                )}
              </View>
            </View>
          </Pressable>
        ))}
      </View>

      {/* Watch More */}
      <Pressable style={styles.watchMoreButton}>
        <Text style={styles.watchMoreText}>Browse All Videos</Text>
        <ExternalLink size={16} color={colors.primary} />
      </Pressable>
    </View>
  );

  const renderCommunity = () => (
    <View style={styles.tabContent}>
      {/* Support Groups */}
      <Text style={styles.subsectionTitle}>Support Groups</Text>
      {supportGroups.map(group => (
        <View key={group.id} style={styles.groupCard}>
          <View style={styles.groupHeader}>
            <View style={[styles.groupIcon, { backgroundColor: colors.primary + '15' }]}>
              <Users size={20} color={colors.primary} />
            </View>
            <View style={styles.groupInfo}>
              <Text style={styles.groupName}>{group.name}</Text>
              <Text style={styles.groupType}>{group.type === 'online' ? 'Online Group' : 'Local Group'}</Text>
            </View>
            <View style={styles.membersBadge}>
              <Text style={styles.membersCount}>{group.members}</Text>
              <Text style={styles.membersLabel}>members</Text>
            </View>
          </View>
          <Text style={styles.groupDescription}>{group.description}</Text>
          <View style={styles.groupFooter}>
            {group.meetingTime && (
              <View style={styles.meetingInfo}>
                <Clock size={14} color={colors.textMuted} />
                <Text style={styles.meetingText}>{group.meetingTime}</Text>
              </View>
            )}
            <Pressable style={styles.joinBtn}>
              <Text style={styles.joinBtnText}>Join</Text>
            </Pressable>
          </View>
        </View>
      ))}

      {/* Forum Discussions */}
      <Text style={styles.subsectionTitle}>Recent Discussions</Text>
      <View style={styles.forumCard}>
        {[
          { title: 'Best practices for iron chelation', replies: 24, time: '2h ago' },
          { title: 'Managing fatigue during treatment', replies: 18, time: '5h ago' },
          { title: 'Preparing for blood transfusions', replies: 31, time: '1d ago' },
        ].map((thread, index) => (
          <Pressable key={index} style={styles.forumThread}>
            <View style={styles.threadContent}>
              <Text style={styles.threadTitle}>{thread.title}</Text>
              <Text style={styles.threadMeta}>{thread.replies} replies • {thread.time}</Text>
            </View>
            <ChevronRight size={18} color={colors.textMuted} />
          </Pressable>
        ))}
        <Pressable style={styles.viewAllBtn}>
          <Text style={styles.viewAllText}>View All Discussions</Text>
        </Pressable>
      </View>

      {/* Helplines */}
      <Text style={styles.subsectionTitle}>24/7 Helplines</Text>
      <View style={styles.helplineCard}>
        <View style={styles.helplineHeader}>
          <Phone size={20} color={colors.primary} />
          <Text style={styles.helplineTitle}>Thalassemia Support Line</Text>
        </View>
        <Text style={styles.helplineNumber}>1800-XXX-XXXX</Text>
        <Text style={styles.helplineNote}>Free, confidential support available 24/7</Text>
        <Pressable style={styles.callNowBtn}>
          <Phone size={16} color="#FFFFFF" />
          <Text style={styles.callNowText}>Call Now</Text>
        </Pressable>
      </View>
    </View>
  );

  const renderHelp = () => (
    <View style={styles.tabContent}>
      {/* Financial Assistance */}
      <Text style={styles.subsectionTitle}>Financial Assistance</Text>
      {financialSchemes.map(scheme => (
        <View key={scheme.id} style={styles.schemeCard}>
          <View style={styles.schemeHeader}>
            <View style={[styles.schemeIcon, { backgroundColor: '#10B981' + '15' }]}>
              <DollarSign size={20} color="#10B981" />
            </View>
            <View style={styles.schemeInfo}>
              <Text style={styles.schemeName}>{scheme.name}</Text>
              <Text style={styles.schemeProvider}>{scheme.provider}</Text>
            </View>
          </View>
          <Text style={styles.schemeDescription}>{scheme.description}</Text>
          <View style={styles.schemeCoverage}>
            <Text style={styles.coverageLabel}>Coverage:</Text>
            <Text style={styles.coverageValue}>{scheme.coverage}</Text>
          </View>
          <View style={styles.schemeFooter}>
            <View style={styles.eligibilityBadge}>
              <Text style={styles.eligibilityText}>
                {scheme.eligibility ? 'You may qualify' : 'Check eligibility'}
              </Text>
            </View>
            <Pressable style={styles.applyBtn}>
              <Text style={styles.applyBtnText}>Learn More</Text>
              <ExternalLink size={14} color={colors.primary} />
            </Pressable>
          </View>
        </View>
      ))}

      {/* Emergency Contacts */}
      <Text style={styles.subsectionTitle}>Emergency Contacts</Text>
      {emergencyContacts.slice(0, 3).map(contact => (
        <View key={contact.id} style={styles.contactCard}>
          <View style={styles.contactInfo}>
            <Text style={styles.contactName}>{contact.name}</Text>
            <Text style={styles.contactNumber}>{contact.phone}</Text>
            {contact.available24x7 && (
              <View style={styles.availableBadge}>
                <Text style={styles.availableText}>24/7 Available</Text>
              </View>
            )}
          </View>
          <Pressable style={styles.contactBtn}>
            <Phone size={18} color="#FFFFFF" />
          </Pressable>
        </View>
      ))}

      {/* Find Treatment Centers */}
      <Text style={styles.subsectionTitle}>Find Care</Text>
      <View style={styles.findCareCard}>
        <Building2 size={32} color={colors.primary} />
        <Text style={styles.findCareTitle}>Thalassemia Treatment Centers</Text>
        <Text style={styles.findCareText}>
          Find specialized healthcare providers and treatment centers near you
        </Text>
        <Pressable style={styles.findCareBtn}>
          <Globe size={16} color="#FFFFFF" />
          <Text style={styles.findCareBtnText}>Search Nearby</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        title="Learn"
        subtitle="Resources & Support"
        icon={Search}
      />

      {/* Tab Bar */}
      <View style={styles.tabBar}>
        {tabs.map(tab => {
          const isActive = activeTab === tab.key;
          const TabIcon = tab.icon;
          return (
            <Pressable
              key={tab.key}
              style={[styles.tab, isActive && styles.tabActive]}
              onPress={() => setActiveTab(tab.key)}
            >
              <TabIcon size={18} color={isActive ? colors.primary : colors.textMuted} />
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'guides' && renderGuides()}
        {activeTab === 'videos' && renderVideos()}
        {activeTab === 'community' && renderCommunity()}
        {activeTab === 'help' && renderHelp()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: layout.scrollContentPadding,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
  },
  tabActive: {
    backgroundColor: colors.primaryLight + '30',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textMuted,
    marginLeft: 6,
  },
  tabTextActive: {
    color: colors.primary,
  },
  tabContent: {
    paddingHorizontal: 20,
  },
  subsectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: 24,
    marginBottom: 12,
  },
  // Quick Topics
  quickTopics: {
    marginTop: 8,
  },
  topicChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  topicText: {
    fontSize: 13,
    fontWeight: '600',
  },
  // Articles
  articleCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  articleIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  articleContent: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  articleTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  articleExcerpt: {
    fontSize: 13,
    color: colors.textMuted,
    lineHeight: 18,
    marginBottom: 8,
  },
  articleMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  metaText: {
    fontSize: 12,
    color: colors.textMuted,
    marginLeft: 4,
  },
  // Downloads
  downloadsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  downloadCard: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  downloadIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  downloadLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  // Videos
  videoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  videoCard: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  videoThumbnail: {
    height: 90,
    backgroundColor: '#1F2937',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  playButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  durationBadge: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  durationText: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  videoInfo: {
    padding: 12,
  },
  videoTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  videoAuthor: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 6,
  },
  videoStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewCount: {
    fontSize: 11,
    color: colors.textMuted,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingValue: {
    fontSize: 11,
    color: '#F59E0B',
    marginLeft: 3,
    fontWeight: '600',
  },
  watchMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginTop: 8,
  },
  watchMoreText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    marginRight: 6,
  },
  // Groups
  groupCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  groupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  groupIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupInfo: {
    flex: 1,
    marginLeft: 12,
  },
  groupName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  groupType: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 2,
  },
  membersBadge: {
    alignItems: 'center',
  },
  membersCount: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  membersLabel: {
    fontSize: 11,
    color: colors.textMuted,
  },
  groupDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  groupFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  meetingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  meetingText: {
    fontSize: 13,
    color: colors.textMuted,
    marginLeft: 6,
  },
  joinBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
  joinBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  // Forum
  forumCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    overflow: 'hidden',
  },
  forumThread: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  threadContent: {
    flex: 1,
  },
  threadTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  threadMeta: {
    fontSize: 12,
    color: colors.textMuted,
  },
  viewAllBtn: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  // Helpline
  helplineCard: {
    backgroundColor: colors.primaryLight + '15',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primaryLight + '30',
  },
  helplineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  helplineTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    marginLeft: 8,
  },
  helplineNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  helplineNote: {
    fontSize: 13,
    color: colors.textMuted,
    marginBottom: 16,
  },
  callNowBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  callNowText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  // Schemes
  schemeCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  schemeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  schemeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  schemeInfo: {
    flex: 1,
    marginLeft: 12,
  },
  schemeName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  schemeProvider: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 2,
  },
  schemeDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  schemeCoverage: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: colors.background,
    padding: 10,
    borderRadius: 8,
  },
  coverageLabel: {
    fontSize: 13,
    color: colors.textMuted,
    marginRight: 8,
  },
  coverageValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10B981',
    flex: 1,
  },
  schemeFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  eligibilityBadge: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  eligibilityText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#059669',
  },
  applyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  applyBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    marginRight: 4,
  },
  // Contacts
  contactCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  contactNumber: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  availableBadge: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 6,
  },
  availableText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#059669',
  },
  contactBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Find Care
  findCareCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
  },
  findCareTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: 12,
    marginBottom: 8,
  },
  findCareText: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  findCareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  findCareBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8,
  },
});
