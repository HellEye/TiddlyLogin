import React from 'react'
import { Link } from 'react-router-dom'
import "./Sidebar.css"
type Props = {}

const Sidebar = (props: Props) => {
  return (
    <div className="sidebar">
      <h2>Menu</h2>
      <Link to="/">Home</Link>
      <Link to="/Users">Users</Link>
      <Link to="/Wikis">Wikis</Link>
      <Link to="/testPage">Test Page</Link>
    </div>
  )
}

export {Sidebar}