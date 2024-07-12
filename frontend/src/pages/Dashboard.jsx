import React from 'react'
import { Appbar } from '../components/Appbar'
import SendMoney from './SendMoney'
import { Users } from '../components/Users'
import { Link } from 'react-router-dom';

function Dashboard() {
    let token = localStorage.getItem('token');
  return (
    <div>
        {token ? (<><Appbar></Appbar>
            <Users/></>):(<>
            <div className='flex justify-center items-center w-full h-[90vh]'>

                <p>Please Try To Authorize <Link className='text-blue-500 hover:underline' to={"/signup"}>Create account</Link> or  <Link   className='text-blue-500 hover:underline' to={"/signin"}>LogIn</Link> to see this Content</p>
            </div>
            </>) }
        
    </div>
  )
}

export default Dashboard