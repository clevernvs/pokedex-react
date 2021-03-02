import React, { useState, useEffect } from 'react';
import {
  Button,
  CircularProgress,
  Link,
  Typography
} from '@material-ui/core';

import axios from 'axios';
import { toFirstCharUppercase } from '../../helpers/constants';

// ======================

const Pokemon = (props) => {
  const { history, match } = props;
  const { params } = match;
  const { pokemonId } = params;

  const [pokemon, setPokemon] = useState(undefined);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      .then((res) => {
        const { data } = res;
        setPokemon(data);
      })
      .catch((error) => {
        setPokemon(false);
      });

  }, [pokemonId]);

  const generatePokemonJSX = () => {
    const { name, id, species, height, weight, types, sprites } = pokemon;
    const fullImgUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
    const { front_default } = sprites;

    return (
      <>
        <Typography variant="h1">
          {`#${id} -`} {toFirstCharUppercase(name)}
          <img src={front_default} />
        </Typography>

        <img style={{ width: "300px", height: "300px" }} src={fullImgUrl} />

        <Typography variant="h3">Pokemon Info</Typography>

        <Typography variant="h3">
          {"Species: "}
          <Link href={species.url}>
            {species.name}
          </Link>
        </Typography>

        <Typography>Height: {height}</Typography>
        <Typography>Weight: {weight}</Typography>
        <Typography variant="h6">Types: </Typography>
        {types.map((typeInfo) => {
          const { type } = typeInfo;
          const { name } = type;
          return <Typography key={name}>{`${name}`}</Typography>;
        })}
      </>
    );
  };

  // ======================

  return (
    <>
      {pokemon === undefined && <CircularProgress color="secondary" />}
      {pokemon !== undefined && pokemon && generatePokemonJSX()}
      {pokemon === false && <Typography>Pokemon não encontrado.</Typography>}
      {pokemon !== undefined && (
        <Button variant="contained" onClick={() => history.push("/")}>
          Volte para a Pokedex.
        </Button>
      )}
    </>
  )

};

export default Pokemon;
