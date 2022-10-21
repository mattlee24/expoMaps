import { StyleSheet, Text, View, Pressable, Image, FlatList } from 'react-native'
import { useState, useEffect } from 'react'
import React from 'react'
import axios from 'axios';
import TopList from '../components/topList';

const ListScreen = ({navigation}) => {

    const [ nationalData, setnationalData ] = useState({})
  
    const axiosInstance = axios.create({ baseURL: 'https://www.nationaltrust.org.uk/search/data/all-places' });

    useEffect(() => {
        axiosInstance.get().then((response) => {
            setnationalData(response.data)
        })
    }, [])

  return (
    <View style={styles.container}>
      <TopList />
      <FlatList 
        data={Object.values(nationalData)}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <Pressable style={styles.main} onPress={() => navigation.navigate("DetailsScreen")}>
            <Image source={{ uri: item.imageUrl }} style={styles.image}></Image>
            <View style={styles.card}>
                <Text style={styles.texttitle}>{item.title}</Text>
                <Text style={styles.textsubtitle}>{item.description}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  )
}

export default ListScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    width: "48%",
    margin: 4,
  },
  image: {
    width: "100%",
    height: 130,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  card: {
    backgroundColor: "white",
    height: 200,
    marginBottom: 10,
    shadowColor: "black",
    width: "100%",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowOffset: {
    width: 0,
    height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  texttitle: {
    marginHorizontal: 5, 
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#007A3B"
  },
  textsubtitle: {
      marginHorizontal: 5,
      marginTop: 5,
      textAlign: "center",
      color: "#007A3B"
  },
})