import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './components/Card';
import Search from './components/Search';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import Login from './components/Login';

export default function App() {
  const [moviesData,setMoviesData]=useState([]);
  const [search, setSearch]=useState("code");
  const [sortGoodBad,setSortGoodBad]=useState("badToGood");

  useEffect(()=>{
    axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=b8bed0e227972da2924cc120b9dfa8a4&query=${search}&language=fr-FR`
      
  ).then((res)=>{
    setMoviesData(res.data.results)});
}, [search]);
  return (
    <Provider store={store}>
     
    <View style={styles.container}>
      <Login style={styles.header}/>
      <Search/>
      <FlatList
        data={moviesData.slice(0,12)
          .sort((a,b)=>{
            if   (sortGoodBad==="goodToBad"){
            return b.vote_average-a.vote_average;}else if (sortGoodBad==="badToGood"){return a.vote_average-b.vote_average;}
          })}
        renderItem={({item}) => <Card movie={item}/>}
      />
      <StatusBar style="auto" />
    </View>
    </Provider>
  );
}
const styles = StyleSheet.create({
  header: {
    height: '50px'
  },
  container: {
    flex: '1',
    backgroundColor: '#212040',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Cochin',
    color: '#eee',
  },
  list: {
    listStyle: 'none',
  },
  result: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
