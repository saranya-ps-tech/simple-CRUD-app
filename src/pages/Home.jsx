import React from 'react'
import AddEdit from './AddEdit'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { deleteEmployeeAPI, getAllEmployeeAPI } from '../services/allAPI'
import { useEffect } from 'react'

function Home() {

  const [allEmployees,setallEmployees] = useState([])

  const navigate = useNavigate()

  
  useEffect(()=>{
    viewAllEMployess()
  },[])

  const removeEmp = async(id)=>{
    const result = await deleteEmployeeAPI(id)
    if(result.status==200){
      viewAllEMployess()
    }
  }

  const hanldeAddUser = ()=>{
    navigate('/add')
  }
  const hanldeEdit = (id)=>{
    navigate(`/${id}/edit`)
  }

  const viewAllEMployess = async()=>{
    const result = await getAllEmployeeAPI()
    if(result.status==200){
      setallEmployees(result.data)
    }
  }
  return (
    <div className='container'>
      <h1 className="text-center my-5">Employees</h1>
      <div className="float-end mb-5"><button onClick={hanldeAddUser} className="btn btn-success">+ Add</button></div>
      <table className="table table-stripped my-5">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Salary</th>
            <th>Designation</th>
            <th>...</th>
          </tr>
        </thead>
        <tbody>
          {
            allEmployees?.length>0?
              allEmployees?.map((emp,index)=>(
                <tr>
                  <td>{index+1}</td>
                  <td>{emp?.empName}</td>
                  <td>{emp?.empMail}</td>
                  <td>{emp?.salary}</td>
                  <td>{emp?.designation}</td>
                  <td>
                    <div className='d-flex align-items-center'>
                      <button onClick={()=>hanldeEdit(emp?._id)} className="btn text-warning"><i className="fa-solid fa-user-edit"></i></button>
                      <button onClick={()=>removeEmp(emp?._id)} className="btn text-danger"><i className="fa-solid fa-trash"></i></button>
                    </div>
                  </td>
                </tr>
              ))
            :
            <p>No Employess</p>
          }
        </tbody>
      </table>
    </div>
  )
}

export default Home