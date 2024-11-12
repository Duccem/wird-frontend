import { Outlet } from 'react-router-dom'
import CombatList from './combat-list'
function Layout() {
  return (
    <div className="w-full h-screen grid grid-cols-1 md:grid-cols-3">
      <Outlet></Outlet>
      <CombatList></CombatList>
    </div>
  )
}

export default Layout
