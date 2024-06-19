import React from 'react'
import Menu from './Menu'
import Banner from './Banner'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const DashboardLayout = () => {
  return (
    <div id="body">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <Menu />
          </div>
        </div>
        <Banner />
        <div className="row">
          <div id="main" className="col-lg-8 col-md-12 col-sm-12">
            <Outlet></Outlet>
          </div>
          <Sidebar />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default DashboardLayout