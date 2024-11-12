import { useNavigate, useParams } from 'react-router-dom'
import { addPokemonToCombatList, Pokemon, removePokemonFromCombatList, RootState, usePokemons } from '@/states/pokemon.state'
import { ArrowLeft, PlusCircle, Trash } from 'lucide-react'
import { Button } from '@/libs/shadcn/components/ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { capitalize } from '@/libs/shadcn/lib/utils'

const PokemonDetail = () => {
  const { id } = useParams()
  const pokemon = useSelector((state: RootState) => state.pokemons).find(p => p.id === Number(id))
  const navigate = useNavigate()
  const { combatList } = usePokemons()
  const dispatch = useDispatch()

  const isInTheList = combatList.find(p => p.id === pokemon?.id)

  const add = () => {
    if (combatList.length >= 6) {
      alert('No puedes tener más de 6 Pokémon en tu equipo')
      return
    }
    if (combatList.find(p => p.id === pokemon?.id)) {
      alert('Este Pokémon ya está en tu equipo')
      return
    }
    dispatch(addPokemonToCombatList(pokemon!))
  }

  const remove = (pokemon: Pokemon) => {
    dispatch(removePokemonFromCombatList(pokemon))
  }

  if (!pokemon) return <div className='col-span-2 h-full justify-center'>Loading...</div>

  return (
    <div className="col-span-2 h-full">
      <div className="p-4 flex flex-col justify-center items-center">
        <div className='flex justify-between items-center w-1/2'>
        <Button variant='ghost' size='icon' onClick={() => navigate('/')}><ArrowLeft /></Button>
        {
          isInTheList ? (<Button className='rounded-full bg-blue-300' onClick={() => remove(pokemon)}>
            <Trash /> Eliminar de la lista
          </Button>) : (<Button className='bg-blue-300 rounded-full' onClick={() => add()}><PlusCircle /> Agregar a la lista</Button>)
        }
       
        </div>
        <img src={pokemon.sprites.front_default} alt="" className='size-32' />
        <div className='flex justify-center items-center'>
          <div className='text-center'>
            <h1 className="text-4xl font-bold ">{capitalize(pokemon.name)}</h1>
            <p className='text-3xl font-semibold'>Nro: {pokemon.id}</p>
            <p className='text-2xl font-semibold'>
              Altura: {pokemon.height}
            </p>
            <p className='flex justify-center items-center gap-2'>
              {
                pokemon.types.map(type => (
                  <img src={type.icon} key={type.name}
                    alt={type.name} className='aspect-auto h-5 my-3' />
                ))
              }
            </p>
            
          </div>
        </div>
        
      </div>


      <div className='px-10 flex flex-col items-center'>
        <p className='text-3xl font-semibold mb-3'>Estadísticas</p>
        <ul className='w-1/2 flex flex-col gap-4'>
          {pokemon.stats.map(stat => (
            <li key={stat.stat.name} className='p-2 w-full flex justify-between items-center bg-blue-300 rounded'>
              <span className='text-lg font-semibold'>{statMap[stat.stat.name]}:</span> <span>{stat.base_stat}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

const statMap: Record<string, string> = {
  'hp': 'Puntos de vida',
  'attack': 'Ataque',
  'defense': 'Defense',
  'special-attack': 'Ataque especial',
  'special-defense': 'Defensa especial',
  'speed': 'Velocidad'
}

export default PokemonDetail;

