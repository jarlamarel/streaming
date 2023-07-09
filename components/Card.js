import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';

const Card = ({ movie }) => {
  const dateFormater = (date) => {
    let [yy, mm, dd] = date.split("-");
    return [dd, mm, yy].join("/");
  };

  const genreFinder = () => {
    let genreArray = [];
    for (let i = 0; i < movie.genre_ids.length; i++) {
      switch (movie.genre_ids[i]) {
        case 28:
          genreArray.push(`Action`);
          break;
        case 12:
          genreArray.push(`Aventure`);
          break;
        case 16:
          genreArray.push(`Animation`);
          break;
        case 35:
          genreArray.push(`Comédie`);
          break;
        case 80:
          genreArray.push(`Policier`);
          break;
        case 99:
          genreArray.push(`Documentaire`);
          break;
        case 18:
          genreArray.push(`Drame`);
          break;
        case 10751:
          genreArray.push(`Famille`);
          break;
        case 14:
          genreArray.push(`Fantasy`);
          break;
        case 36:
          genreArray.push(`Histoire`);
          break;
        case 27:
          genreArray.push(`Horreur`);
          break;
        case 10402:
          genreArray.push(`Musique`);
          break;
        case 9648:
          genreArray.push(`Mystère`);
          break;
        case 10749:
          genreArray.push(`Romance`);
          break;
        case 878:
          genreArray.push(`Science-fiction`);
          break;
        case 10770:
          genreArray.push(`Téléfilm`);
          break;
        case 53:
          genreArray.push(`Thriller`);
          break;
        case 10752:
          genreArray.push(`Guerre`);
          break;
        case 37:
          genreArray.push(`Western`);
          break;
        default:
          break;
      }
    }
    return genreArray.map((genre) => <Text key={genre}>{genre}</Text>);
  };

//   const addStorage = () => {
//     let storedData = window.localStorage.movies
//       ? window.localStorage.movies.split(",")
//       : [];
//     if (storedData.includes(movie.id)) {
//       console.log(movie.id);
//       storedData.push(movie.id);
//       window.localStorage.movie = storedData;
//     }
//     storedData += movie.id;
//     window.localStorage.movies = storedData;
//   };
const addStorage = async () => {
    try {
      let storedData = await AsyncStorage.getItem('movies');
      const movieId = movie.id.toString();
  
      if (storedData) {
        const storedMovies = storedData.split(',');
  
        if (!storedMovies.includes(movieId)) {
          storedMovies.push(movieId);
          await AsyncStorage.setItem('movies', storedMovies.join(','));
        }
      } else {
        await AsyncStorage.setItem('movies', movieId);
      }
  
      console.log(movie.id + ' added to storage successfully');
    } catch (error) {
      console.log('Error storing movie:', error);
    }
  };
  
  
// const storeData = async () => {
//     try {
//       await AsyncStorage.setItem('movies', 'Hello, AsyncStorage!');
//       console.log('Data stored successfully.');
//     } catch (error) {
//       console.log(error);
//     }
//   };

  return (
    <View style={styles.card}>
      <Image
        source={{uri:
            `${movie.poster_path}`?
            "https://image.tmdb.org/t/p/w500"+movie.poster_path : "/img/poster.jpg"
        }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.title}>{movie.title}</Text>
      {movie.release_date ? (
        <Text style={styles.subtitle}>
          Sorti le: {dateFormater(movie.release_date)}
        </Text>
      ) : null}
      <Text style={styles.rating}>
        {movie.vote_average}/10<Text>⭐</Text>
      </Text>
      <View style={styles.genreContainer}>{genreFinder()}</View>
      {movie.overview ? <Text style={styles.heading}>Synopsis</Text> : null}
      <Text style={styles.overview}>{movie.overview}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => addStorage()}
      >
        <Text style={styles.buttonText}>Ajouter Aux Coups De Coeurs</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  rating: {
    fontSize: 18,
    marginBottom: 8,
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  overview: {
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#546fe4',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Card;
