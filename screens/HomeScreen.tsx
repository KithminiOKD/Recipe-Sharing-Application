import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Pressable,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Icon from '@react-native-vector-icons/ionicons';
import LinearGradient from 'react-native-linear-gradient';

const HomeScreen = () => {
  interface Recipe {
    id: number;
    title: number;
    image: string;
    readyInMinutes: number;
    healthScore: number;
    type?: string;
  }
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          'https://api.spoonacular.com/recipes/complexSearch',
          {
            params: {
              apiKey: '3b743256e59f4613bc9580268e2a0b78',
              cuisine: 'indian',
              number: 10,
              addRecipeInformation: true,
            },
          },
        );
        console.log('Data', response);
        const data = response.data.results.map((recipe: any) => ({
          id: recipe.id,
          title: recipe.title,
          image: recipe.image,
          readyInMinutes: recipe.readyInMinutes,
          healthScore: recipe.healthScore,
          type: Math.random() > 0.5 ? 'One-pot' : 'Easy',
        }));
        setRecipes(data);
      } catch (error) {
        console.log('Error', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) {
    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#fff'}}>
        <Text style={{fontSize:18, color:'#59168b'}}>Loading recipes...</Text>
      </View>
    );
  }

  const renderRecipeCard = ({ item }: { item: Recipe }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Detail', {
          recipeId: item?.id,
          title: item?.title,
          image: item?.image,
        })
      }
      activeOpacity={0.9}
      style={styles.card}
    >
      <View style={styles.cardImageWrapper}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.typeBadge}>
          <Text style={styles.typeText}>{item.type}</Text>
        </View>
        <TouchableOpacity style={styles.bookmarkIcon}>
          <Icon name="bookmark-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.details}>
        {item.readyInMinutes} min • {Math.round(item.healthScore)}%
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#c27aff", "#fff"]} style={styles.headerGradient}>
        <Text style={styles.welcome}>Welcome to Tasty App</Text>
        <Text style={styles.subtitle}>Here's what we recommend for you!</Text>
      </LinearGradient>
      <FlatList
        data={recipes}
        renderItem={renderRecipeCard}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={{paddingBottom: 120}}
      />
      <Pressable
        onPress={() => navigation.navigate("Meal")}
        style={styles.fab}
      >
        <Icon
          style={{textAlign: 'center'}}
          name="add"
          size={28}
          color="white"
        />
      </Pressable>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerGradient: {
    paddingTop: 55,
    paddingBottom: 30,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 10,
  },
  header: { display: 'none' }, // Hide old header
  welcome: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#59168b',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#59168b',
    marginTop: 2,
  },
  card: {
    flex: 1,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 18,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: '#c27aff',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.12,
    shadowRadius: 8,
    minHeight: 240,
  },
  cardImageWrapper: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 140,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  typeBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#007AFF',
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 8,
    zIndex: 2,
  },
  typeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  bookmarkIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#59168b',
    padding: 6,
    borderRadius: 16,
    zIndex: 2,
    elevation: 2,
  },
  row: {
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 12,
    paddingTop: 10,
    color: '#222',
  },
  details: {
    fontSize: 13,
    color: '#666',
    paddingHorizontal: 12,
    paddingBottom: 12,
    paddingTop: 2,
  },
  fab: {
    width: 62,
    height: 62,
    borderRadius: 31,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 35,
    right: 25,
    backgroundColor: '#c27aff',
    elevation: 8,
    shadowColor: '#c27aff',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
});
