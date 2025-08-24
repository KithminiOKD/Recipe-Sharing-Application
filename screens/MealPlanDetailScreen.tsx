import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import axios from 'axios';

type DishDetailParam = {
  DishDetail: {
    recipeId: number;
    title: string;
    image: string;
  };
};

interface RecipeDetail {
  id: number;
  title: string;
  image: string;
  extendedIngredients: { original: string }[];
  analyzedInstructions: { steps: { number: number; step: string }[] }[];
}

const MealPlanDetailScreen = () => {
  const route = useRoute<RouteProp<DishDetailParam, 'DishDetail'>>();
  const { recipeId, title, image } = route.params;
  const [recipe, setRecipe] = useState<RecipeDetail | null>(null);
  const [loading, setLoading] = useState(true);

  return (
    <View>
      <Text>MealPlanDetailScreen</Text>
    </View>
  );
};

export default MealPlanDetailScreen;

const styles = StyleSheet.create({});
