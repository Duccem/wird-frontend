import { Button } from '@/libs/shadcn/components/ui/button';
import { capitalize } from '@/libs/shadcn/lib/utils';
import { Pokemon, removePokemonFromCombatList, usePokemons } from '@/states/pokemon.state';
import { Trash } from 'lucide-react';
import { useDispatch } from 'react-redux';

const CombatList = () => {
  const { combatList } = usePokemons()
  const dispatch = useDispatch()
  const remove = (pokemon: Pokemon) => {
    dispatch(removePokemonFromCombatList(pokemon))
  }
  return (
    <div className="col-span-1 bg-blue-300 py-4">
      <p className='text-center text-3xl font-bold mt-3'>Listos para el combate</p>
      <div className='mt-4 grid grid-cols-1 px-5'>
        {
          combatList.length > 0 ? (<div className='grid grid-cols-3 gap-4'>
            {combatList.map((pokemon, index) => (
              <div key={index} className='bg-white p-4 rounded shadow col-span-1 relative'>
                <img src={pokemon.sprites.front_default} alt={pokemon.name} className='w-full h-32 object-cover mb-2' />
                <h2 className='text-xl font-bold'>{capitalize(pokemon.name)}</h2>
                <div className='absolute top-3 right-2'>
                  <Button className='rounded-full bg-blue-300' size='icon' onClick={() => remove(pokemon)}>
                    <Trash />
                  </Button>
                </div>
  
              </div>
            ))}
          </div>) : <p className='text-center italic'>No hay Pokémon en tu equipo</p>
        }
      </div>
    </div>
  );
}

export default CombatList;
