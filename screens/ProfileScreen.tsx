import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { logout, useAppSelector } from '../store';
import { useDispatch } from 'react-redux';

const ProfileScreen = () => {
  const { user, token } = useAppSelector(state => state.auth);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  if (user) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerBg} />
        <View style={styles.profileSection}>
          <Image
            source={{ uri: user?.avatarUrl || 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }}
            style={styles.avatar}
          />
          <Text style={styles.profileName}>{user?.name}</Text>
          <Text style={styles.profileEmail}>{user?.email}</Text>
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>34</Text>
              <Text style={styles.statLabel}>Likes</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>56</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editProfileButton} onPress={() => navigation.navigate('EditProfile')}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => dispatch(logout())} style={styles.logoutButton}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerBg} />
      <View style={styles.profileSection}>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/128/9481/9481394.png' }}
          style={styles.avatar}
        />
        <Text style={styles.title}>Log in or create an account to save your favourite recipes</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.signInButton}>
          <Text style={styles.signText}>Sign In</Text>
        </TouchableOpacity>
        <Text style={styles.terms}>
          By signing up, you are agreeing to our
          <Text style={styles.link}> User Agreement</Text> and
          <Text style={styles.link}> Privacy Policy</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerBg: {
    height: 140,
    backgroundColor: '#59168b',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  profileSection: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 100,
    zIndex: 2,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 4,
    borderColor: 'white',
    marginTop: -70,
    backgroundColor: '#eee',
    marginBottom: 10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 8,
  },
  profileEmail: {
    fontSize: 15,
    color: '#666',
    marginBottom: 18,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 18,
  },
  statBox: {
    alignItems: 'center',
    marginHorizontal: 18,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#59168b',
  },
  statLabel: {
    fontSize: 13,
    color: '#666',
  },
  editProfileButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#59168b',
    borderRadius: 22,
    paddingVertical: 8,
    paddingHorizontal: 32,
    marginBottom: 12,
  },
  editProfileText: {
    color: '#59168b',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#c10007',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginTop: 8,
  },
  logoutText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 26,
    marginTop: 20,
  },
  signInButton: {
    backgroundColor: '#59168b',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 15,
    marginTop: 10,
  },
  signText: {
    color: 'white',
    fontSize: 17,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  terms: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 10,
  },
  link: {
    color: '#59168b',
    fontWeight: '600',
  },
});
