import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useAppSelector } from '../store';
import Modal from 'react-native-modal';
import axios from 'axios';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const CommunityScreen = () => {
  const navigation = useNavigation();
  const { token } = useAppSelector(state => state.auth);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddPost = () => {
    navigation.navigate('AddPost');
  };

  useFocusEffect(
    useCallback(() => {
      fetchPosts();
    }, []),
  );

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/posts');
      setPosts(response.data);
    } catch (error) {
      console.log('Error', error);
    } finally {
      setLoading(false);
    }
  };

  const handleComment = (postId: string) => {
    navigation.navigate('Comment', { postId });
  };

  const handleLike = async (postId: string) => {
    if (!token) {
      setModalVisible(true);
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:3000/api/posts/${postId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setPosts(posts.map(post => (post._id === postId ? response.data : post)));
    } catch (error) {
      console.log('Error', error);
    }
  };

  const renderPost = ({ item }: { item: any }) => (
    <View style={styles.postContainer}>
      <Image
        source={{ uri: `http://localhost:3000${item.imageUrl}` }}
        style={styles.postImage}
      />
      <View style={styles.postInfo}>
        <View style={styles.userRow}>
          <Image
            source={{ uri: item?.userId.avatarUrl || 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }}
            style={styles.avatar}
          />
          <View style={{flex:1}}>
            <Text style={styles.username}>{item?.userId.name}</Text>
            <Text style={styles.time}>{moment(item?.createdAt).fromNow()}</Text>
          </View>
        </View>
        <Text style={styles.recipeName}>{item?.recipeName}</Text>
        <Text style={styles.description}>{item?.description}</Text>
        <View style={styles.interaction}>
          <TouchableOpacity
            onPress={() => handleLike(item._id)}
            style={styles.iconButton}
          >
            <Icon name="heart-outline" size={20} color="#59168b" />
            <Text style={styles.likeText}>{item.likes.length}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleComment(item._id)}
            style={styles.iconButton}
          >
            <Icon name="chatbubble-ellipses-outline" size={20} color="#007AFF" />
            <Text style={styles.commentText}>{item.comments.length}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#59168b" style={styles.loading} />
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient colors={["#c27aff", "#fff"]} style={styles.headerGradient}>
        <Text style={styles.headerText}>Our Community</Text>
      </LinearGradient>
      <View style={styles.container}>
        {posts.length == 0 ? (
          <View style={styles.noPostsContainer}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/1065/1065715.png',
              }}
              style={styles.noPostsImage}
            />
            <Text style={styles.noPostsText}>No posts yet</Text>
          </View>
        ) : (
          <FlatList
            data={posts}
            renderItem={renderPost}
            keyExtractor={item => item._id}
            initialNumToRender={5}
            maxToRenderPerBatch={5}
            windowSize={5}
            contentContainerStyle={styles.list}
            refreshing={loading}
            onRefresh={fetchPosts}
          />
        )}
        <TouchableOpacity style={styles.fab} onPress={handleAddPost}>
          <Icon name="add" size={28} color="white" />
        </TouchableOpacity>
      </View>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#59168b" />
        </View>
      )}
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={styles.modal}
        swipeDirection="down"
        onSwipeComplete={() => setModalVisible(false)}
      >
        <View style={styles.modalContent}>
          <Icon name="lock-closed-outline" size={40} color="#59168b" style={{marginBottom:10}} />
          <Text style={styles.modalTitle}>Please Log In</Text>
          <Text style={styles.modalText}>
            You need to be logged in to like or comment on a post.
          </Text>
          <TouchableOpacity style={styles.modalButton} onPress={() => { setModalVisible(false); navigation.navigate('Profile'); }}>
            <Text style={styles.modalButtonText}>Go To Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalCancelButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.modalCancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default CommunityScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerGradient: {
    paddingTop: 55,
    paddingBottom: 30,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#59168b',
    letterSpacing: 0.5,
  },
  container: {
    flex: 1,
    paddingHorizontal: 0,
    backgroundColor: 'transparent',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 25,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#59168b',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#59168b',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 8,
    zIndex: 10,
  },
  postContainer: {
    marginVertical: 12,
    marginHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: 18,
    elevation: 6,
    overflow: 'hidden',
    shadowColor: '#c27aff',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  postImage: {
    width: '100%',
    height: 220,
    resizeMode: 'cover',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  postInfo: {
    padding: 15,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    marginRight: 10,
    backgroundColor: '#eee',
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  time: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  recipeName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#59168b',
    marginVertical: 8,
  },
  description: {fontSize: 15, color: '#666', lineHeight: 22},
  interaction: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 12,
    paddingVertical: 5,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
    paddingVertical: 4,
  },
  likeText: {fontSize: 15, color: '#59168b', marginLeft: 5},
  commentText: {fontSize: 15, color: '#007AFF', marginLeft: 5},
  noPostsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },
  noPostsImage: {
    width: 90,
    height: 90,
    marginBottom: 18,
    opacity: 0.7,
  },
  noPostsText: {
    fontSize: 18,
    color: '#aaa',
    fontWeight: '600',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 24,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    color: '#59168b',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: '700',
  },
  modalText: {
    fontSize: 15,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#59168b',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalCancelButton: {
    paddingVertical: 10,
  },
  modalCancelButtonText: {
    fontSize: 16,
    color: '#007AFF',
  },
});
