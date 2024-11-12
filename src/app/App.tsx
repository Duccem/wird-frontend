import Searcher from '@/app/components/searcher'
import pikachu from '../assets/images/pikachu.png'
import { useState } from 'react'
import { addPokemonToCombatList, Pokemon, removePokemonFromCombatList, usePokemons } from '@/states/pokemon.state'
import { useDispatch } from 'react-redux'
import { Button } from '@/libs/shadcn/components/ui/button'
import { ArrowRight, PlusCircle, Trash } from 'lucide-react'
function App() {
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

  return (
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-3">
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
            {pokemons.filter((pokemon => term ? pokemon.name.toLowerCase().includes(term.toLowerCase()) : true)).map((pokemon, index) => (
              <div key={index} className='bg-white p-4 rounded shadow relative'>
                <img src={pokemon.sprites.front_default} alt={pokemon.name} className='w-full h-32 object-cover mb-2' />
                <h2 className='text-xl font-bold'>{pokemon.name}</h2>
                <div className='absolute top-3 right-2'>
                  <Button className='rounded-full' size='icon' onClick={() => add(pokemon)}><PlusCircle /></Button>
                </div>
                <div className='flex justify-between items-center my-2'>

                  <Button onClick={() => alert('details')}><ArrowRight /></Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="col-span-1 bg-blue-300 py-4">
        <p className='text-center text-3xl font-bold mt-3'>Listos para el combate</p>
        <div className='mt-4 grid grid-cols-1 px-5'>
          <div className='grid grid-cols-3 gap-4'>
            {combatList.filter((pokemon => term ? pokemon.name.toLowerCase().includes(term.toLowerCase()) : true)).map((pokemon, index) => (
              <div key={index} className='bg-white p-4 rounded shadow col-span-1 relative'>
                <img src={pokemon.sprites.front_default} alt={pokemon.name} className='w-full h-32 object-cover mb-2' />
                <h2 className='text-xl font-bold'>{pokemon.name}</h2>
                <div className='absolute top-3 right-2'>
                  <Button className='rounded-full' size='icon' onClick={() => remove(pokemon)}>
                    <Trash />
                  </Button>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
