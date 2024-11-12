import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../assets/index.css'
import { Provider } from 'react-redux'
import { store } from '@/states/pokemon.state.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/layout.tsx'
import PokemonList from './routes/pokemon-list.tsx'
import PokemonDetail from './routes/pokemon-detail.tsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <PokemonList></PokemonList>,
      },
      {
        path: "/:id",
        element: <PokemonDetail></PokemonDetail>
      }
    ],
  },
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
