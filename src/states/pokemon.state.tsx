import { createSlice, configureStore } from '@reduxjs/toolkit'
import axios from 'axios';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export interface Pokemon {
  id: number;
  name: string;
  url: string;
  sprites: {
    front_default: string;
  },
  stats: { base_stat: number, stat: { name: string } }[];
  types: {  name: string, icon: string } [];
  height: number;
}

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    pokemons: [] as Pokemon[],
    combatList: [] as Pokemon[]
  },
  reducers: {
    setPokemons(state, action: { payload: Pokemon[] }) {
      state.pokemons = action.payload
    },
    addPokemonToCombatList(state, action: { payload: Pokemon }) {
      state.combatList.push(action.payload)
    },
    removePokemonFromCombatList(state, action: { payload: Pokemon }) {
      state.combatList = state.combatList.filter(pokemon => pokemon.id !== action.payload.id)
    }
  },
})

export const { setPokemons, addPokemonToCombatList, removePokemonFromCombatList } = pokemonSlice.actions

export const store = configureStore({
  reducer: pokemonSlice.reducer
})

export type RootState = ReturnType<typeof store.getState>

export const usePokemons = () => {
  const pokemons = useSelector((state: RootState) => state.pokemons)
  const combatList = useSelector((state: RootState) => state.combatList)
  useEffect(() => {
    const fetchPokemons = async () => {
      const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=150');
      const pokemonData = data.results.map(async (pokemon: { url: string }) => {
        const { data } = await axios.get(pokemon.url);
        const image = data.sprites.other.dream_world.front_default ?? "";
        const types = await Promise.all(data.types.map(async (type: { type: { url: string } }) => {
          const { data } = await axios.get(type.type.url)
          return {
            name: data.name,
            icon: data.sprites['generation-ix']['scarlet-violet'].name_icon
          }
        }))
        return { id: data.id, name: data.name, image: image, sprites: data.sprites, stats: data.stats, height: data.height, types };
      });
      const results = await Promise.all(pokemonData);
      store.dispatch(setPokemons(results))
    }
    fetchPokemons()
  }, [])
  return {
    pokemons,
    combatList
  }
}

