import React, { useCallback, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, Image, Alert, SafeAreaView, } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { getData, storeData } from '../utils/storage';
import { useTheme } from '../context/ThemeContext';
import { darkTheme, lightTheme } from '../styles/themeStyles';
import HomeStyle from '../styles/HomeStyle';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeScreen = () => {
  const [entries, setEntries] = useState([]);
  const { toggleTheme, theme } = useTheme();
  const navigation = useNavigation();
  const themedStyles = theme === 'dark' ? darkTheme : lightTheme;

  useFocusEffect(
    useCallback(() => {
      const fetchEntries = async () => {
        const data = await getData();
        setEntries(data);
      };
      fetchEntries();
    }, [])
  );

  const removeEntry = async (index: number) => {
    const updatedEntries = [...entries];
    updatedEntries.splice(index, 1);
    setEntries(updatedEntries);
    await storeData(updatedEntries);
  };

  const confirmAndRemove = (index: number) => {
    Alert.alert(
      'Confirm Removal',
      'Are you sure you want to remove this entry?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', style: 'destructive', onPress: () => removeEntry(index) },
      ],
      { cancelable: true }
    );
  };

  const renderItem = ({ item, index }) => (
    <View
      style={[
        HomeStyle.postContainer,
        { backgroundColor: theme === 'dark' ? '#333' : '#fff' },
        themedStyles.card,
      ]}
    >
      <TouchableOpacity
        onPress={() => confirmAndRemove(index)}
        style={[
          HomeStyle.removeButton,
          { backgroundColor: theme === 'dark' ? '#FF4D4D' : '#FF3333' },
        ]}
      >
        <Icon name="trash" size={20} color="#fff" />
      </TouchableOpacity>

      <View style={HomeStyle.imageContainer}>
        <Image source={{ uri: item.imageUri }} style={HomeStyle.image} />
        <Text style={HomeStyle.addressOverlay}>{item.address}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={themedStyles.container}>
      <FlatList
        data={entries}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={HomeStyle.flatListContainer}
        ListEmptyComponent={
          <View style={HomeStyle.centered}>
            <Text style={themedStyles.text}>No Entries yet.</Text>
          </View>
        }
      />

      <TouchableOpacity
        onPress={toggleTheme}
        style={HomeStyle.themeToggle}
      >
        <Icon
          name={theme === 'dark' ? 'sun-o' : 'moon-o'}
          size={24}
          color={theme === 'dark' ? '#FFD700' : '#333'}
        />
      </TouchableOpacity>

      <View style={HomeStyle.addButtonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddEntry')}
          style={HomeStyle.addButton}
        >
          <Text style={HomeStyle.addButtonText}>Add Travel Entry</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
