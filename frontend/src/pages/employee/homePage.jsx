import React from 'react'
import SidebarNav from '../../components/sidebarNav'
import Header from '../../components/header'
import {useSelector} from 'react-redux'

function HomePage() {

  const position = useSelector((state)=> state.auth.position)

  return (
    <>
    <Header />
    <SidebarNav position={position}/>
    </>
  )
}

export default HomePage