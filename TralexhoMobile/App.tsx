import React, {useState} from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  Button,
  StyleSheet,
} from 'react-native';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    marginTop: 16,
  },
  input: {
    fontSize: 24,
    height: 40,
    marginTop: 16,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    textAlign: 'center',
  },
  productContainer: {
    flex: 1,
  },
});

export const App = () => {
  const [productId, setProductId] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  // Function to handle API call and update search results
  const performSearch = async () => {
    try {
      // Make your API call using the productId value and update the search results
      // Replace the following code with your actual API call
      const response = await fetch(
        `http://localhost:3001/product/${productId}`,
      );
      let data = await response.json();
      data = data.map((item: any) => {
        return {...item, id: item._id};
      });
      setSearchResults(data); // Assuming the response is an array of results
      console.log(JSON.stringify(data));
    } catch (error) {
      console.error('Error while fetching search results:', error);
    }
  };

  // Handle button press to trigger search
  const handleSearch = () => {
    performSearch();
  };

  // Render item in the list
  const renderItem = ({item}: {item: Product}) => (
    <View style={styles.productContainer}>
      <Text>Product: {item.name}</Text>
      <Text>Owner: {item.owner}</Text>
      <Text>Location: {item.location}</Text>
      <Text>Quantity: {item.quantityInGrams} grams</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text>Tralexho</Text>
      <TextInput
        style={styles.input}
        placeholder="Search for products"
        onChangeText={setProductId}
        value={productId}
      />
      <Button title="Search" onPress={handleSearch} />
      <FlatList
        data={searchResults}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};
