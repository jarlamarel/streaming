import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import Card from './Card';
import axios from 'axios';

const Search = () => {
  const [moviesData, setMoviesData] = useState([]);
  const [search, setSearch] = useState('code');
  const [sortGoodBad, setSortGoodBad] = useState('badToGood');

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=b8bed0e227972da2924cc120b9dfa8a4&query=${search}&language=fr-FR`
      )
      .then((res) => setMoviesData(res.data.results));
  }, [search]);

  return (
    <View style={styles.formComponent}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="ENTREZ UN FILM"
          onChangeText={(text) => setSearch(text)}
        />
        <Button title="Rechercher" onPress={() => {}} />
      </View>
      <View style={styles.btnSortContainer}>
        <View
          style={styles.btnSort}
          id="goodToBad"
          onPress={() => setSortGoodBad('goodToBad')}
        >
          <Text>Top</Text>
          <Text>➡️</Text>
        </View>
        <View
          style={styles.btnSort}
          id="badToGood"
          onPress={() => setSortGoodBad('badToGood')}
        >
          <Text>Flop</Text>
          <Text>⬅️</Text>
        </View>
      </View>
      <View style={styles.result}>
        {moviesData
          .slice(0, 12)
          .sort((a, b) => {
            if (sortGoodBad === 'goodToBad') {
              return b.vote_average - a.vote_average;
            } else if (sortGoodBad === 'badToGood') {
              return a.vote_average - b.vote_average;
            }
          })
          .map((movie) => (
            <Card key={movie.id} movie={movie} />
          ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formComponent: {
    flex: 1,
  },
  formContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 16,
    paddingHorizontal: 8,
    backgroundColor: 'white',
  },
  btnSortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  btnSort: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  result: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});

export default Search;
