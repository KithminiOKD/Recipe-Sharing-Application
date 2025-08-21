import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

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

const DishDetailScreen = () => {
  return (
    <View>
      <Text>DishDetailScreen</Text>
    </View>
  );
};

export default DishDetailScreen;

const styles = StyleSheet.create({});
