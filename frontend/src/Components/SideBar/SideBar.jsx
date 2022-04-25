import React, { useContext } from 'react'
import {Context} from '../../Services/ApiServices'
import s from './sideBar.module.css'
//s is short for styles

const SideBar = () => {

  const {clientSelec, setClientSelec, clients} = useContext(Context)
    
  return (
    <nav className={s.nav}>
      <div className={s.Container}>
        <h3 className={s.h3} >CUSTOMERS</h3>
        <div className={s.menu}>
         { clients?.map(client =>{
              return (
                <div key={client.id}>
                  <label 
                    id={client.id} 
                    className={`${Number(clientSelec) === Number(client.id) && 'active'}`} 
                    onClick={(e)=>setClientSelec(e.target.id)}
                    >
                    {client.name.toUpperCase()}                
                 </label>
                </div>
              )
            })}
        </div>
      </div>
    </nav>
  )
}
export default SideBar

