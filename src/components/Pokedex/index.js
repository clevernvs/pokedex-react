import React, { useEffect, useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import { toFirstCharUppercase } from '../../helpers/constants';

// ======================

const useStyles = makeStyles((theme) => (
  {
    pokedexContainer: {
      paddingTop: '20px',
      paddingLeft: '50px',
      paddingRight: '50px',
    },
    cardMedia: {
      margin: 'auto',
    },
    cardContent: {
      textAlign: 'center',
    },
    searchContainer: {
      display: 'flex',
      backgroundColor: fade(theme.palette.common.white, 0.15),
      paddingLeft: "20px",
      paddingRight: "20px",
      MarginTop: "5px",
      MarginBottom: "5px",
    },
    searchIcon: {
      alignSelf: 'flex-end',
      MarginBottom: "5px",
    },
    searchInput: {
      width: '200px',
      margin: '5px'
    }
  }
));

const Pokedex = (props) => {
  const { history } = props;
  const classes = useStyles();

  const [pokemonData, setPokemonData] = useState({});
  const [filter, setFilter] = useState('');

  const handleSearchChange = (e) => {
    setFilter(e.target.value);
  }

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=807`)
      .then((res) => {
        const { data } = res;
        const { results } = data;
        const newPokemonData = {};
        results.forEach((pokemon, index) => {
          newPokemonData[index + 1] = {
            id: index + 1,
            name: pokemon.name,
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
          }
        });
        setPokemonData(newPokemonData);
      });
  }, []);

  const getPokemonCard = (pokemonId) => {

    const { id, name, sprite } = pokemonData[pokemonId];

    return (
      <Grid item xs={4} key={pokemonId}>
        <Card onClick={() => history.push(`/${id}`)}>
          < CardMedia className={classes.cardMedia} image={sprite} style={{ width: "130px", height: "130px" }} />
          <CardContent className={classes.cardContent}>
            <Typography>{`#${id} - ${toFirstCharUppercase(name)}`}</Typography>
          </CardContent>
        </Card>
      </Grid >
    )
  };

  // ======================

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <div classeName={classes.searchContainer}>
            <SearchIcon classeName={classes.searchIcon} />
            <TextField classeName={classes.searchInput} onChange={handleSearchChange} />
          </div>
        </Toolbar>
      </AppBar>

      {pokemonData ? (
        <Grid container spacing={2} className={classes.pokedexContainer}>
          {Object.keys(pokemonData).map(
            (pokemonId) =>
              pokemonData[pokemonId].name.includes(filter) &&
              getPokemonCard(pokemonId)
          )}
        </Grid>
      ) : (
          <CircularProgress />
        )}

    </>
  )
}

export default Pokedex;
