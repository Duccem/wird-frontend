import { addPokemonToCombatList, Pokemon, removePokemonFromCombatList, usePokemons } from "@/states/pokemon.state";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Searcher from "../components/searcher";
import { Button } from "@/libs/shadcn/components/ui/button";
import { PlusCircle, Trash } from "lucide-react";
import pikachu from '../../assets/images/pikachu.png'
import { useNavigate } from "react-router-dom";
import { capitalize } from "@/libs/shadcn/lib/utils";

const PokemonList = () => {
  const [term, setTerm] = useState('')
  const { pokemons, combatList } = usePokemons()
  const dispatch = useDispatch()
  const add = (pokemon: Pokemon) => {
    if (combatList.length >= 6) {
      alert('No puedes tener más de 6 Pokémon en tu equipo')
      return
    }
    if (combatList.find(p => p.id === pokemon.id)) {
      alert('Este Pokémon ya está en tu equipo')
      return
    }
    dispatch(addPokemonToCombatList(pokemon))
  }

  const remove = (pokemon: Pokemon) => {
    dispatch(removePokemonFromCombatList(pokemon))
  }

  const navigation = useNavigate()

  return (
    <div className="col-span-2">
      <header className="p-4 flex justify-center items-center">
        <div className='text-center'>
          <h1 className="text-4xl font-bold ">Pokémon Searcher</h1>
          <p className="text-lg ">Find your favorite Pokémon</p>
        </div>
        <div className='size-36'>
          <img src={pikachu} alt="" />
        </div>
      </header>
      <div className='px-10 flex flex-col items-center'>
        <Searcher term={term} setTerm={setTerm} />
        <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4  gap-4'>
          {pokemons.filter((pokemon => term ? pokemon.name.toLowerCase().includes(term.toLowerCase()) || pokemon.id.toString().includes(term) : true)).map((pokemon, index) => (
            <div key={index} className='bg-white p-4 rounded shadow relative ' >
              <div className="cursor-pointer" onClick={() => navigation(`/${pokemon.id}`)}>
                <img src={pokemon.sprites.front_default} alt={pokemon.name} className='w-full h-32 object-cover mb-2' />
                <h2 className='text-xl font-bold'>{capitalize(pokemon.name)}</h2>
                <p className="text-xl font-bold">
                  Nro:
                  <span className="ml-2">
                    {
                      pokemon.id
                    }
                  </span>
                </p>
              </div>
              <div className='absolute top-3 right-2 z-10'>
                {
                  combatList.find(p => p.id === pokemon?.id) ? <Button className='rounded-full bg-blue-300' size='icon' onClick={() => remove(pokemon)}><Trash /></Button> : <Button className='rounded-full bg-blue-300' size='icon' onClick={() => add(pokemon)}><PlusCircle /></Button>
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PokemonList;
