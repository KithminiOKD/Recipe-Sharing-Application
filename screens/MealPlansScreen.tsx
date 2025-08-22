import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

const MealPlansScreen = () => {

  return (
    <View>
      <Text>MealPlansScreenaaa</Text>
    </View>
  )
}

export default MealPlansScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
    marginTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
  },
  headerImage: {
    width: 120,
    height: 120,
    borderRadius: 15,
    marginRight: 15,
  },
  headerText: {
    flex: 1,
    paddingRight: 10,
  },
  unlockText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
  },
  subText: {
    fontSize: 14,
    color: '#666',
    marginVertical: 4,
  },
  collageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    position: 'relative',
    marginBottom: 20,
  },
  collageImage: {
    width: '48%',
    height: 180,
    borderRadius: 15,
  },
  recipesBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#ffd700',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  recipesBadgeText: {color: '#fff', fontWeight: 'bold', fontSize: 12},
  planCard: {
    flexDirection: 'row',
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 5,
    marginHorizontal: 15,
    alignItems: 'center',
  },
  planImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
  },
  planInfo: {
    flex: 1,
    marginLeft: 15,
    paddingRight: 10,
  },
  planName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  planCount: {
    fontSize: 14,
    color: '#666',
  },
  startButton: {
    backgroundColor: '#ff2d55',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    margin: 15,
    alignItems: 'center',
    marginBottom: 30,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
})