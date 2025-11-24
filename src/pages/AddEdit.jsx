import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, FloatingLabel } from "react-bootstrap";
import { useState } from "react";
import { addEmployeeAPI, getAllEmployeeAPI, getSingleEmployeeAPI, updateEmployeeAPI } from "../services/allAPI";
import { useEffect } from "react";

function AddEdit() {
  const navigate = useNavigate()
  const { id } = useParams();
  const [empDetails,setEmpDetails] = useState({
    empName:"",empMail:"",salary:"",designation:""
  })
  console.log(empDetails);
  useEffect(()=>{
    if(id){
      viewSignleUser()
    }
  },[id])

  const viewSignleUser = async ()=>{
    const result = await getSingleEmployeeAPI(id)
    if(result.status==200){
      setEmpDetails(result.data)
    }
  }

  const handleRest = ()=>{
    setEmpDetails({empName:"",empMail:"",salary:"",designation:""})
  }

  const handleAdd = async()=>{
    const {empMail,empName,salary,designation} = empDetails
    if(!empMail || !empName || !salary || !designation){
      alert("Please fill the form completely!!!")
    }else{
      const result = await addEmployeeAPI(empDetails)
      if(result.status==200){
        alert("Employee added successfully!!!")
        handleRest()
        navigate('/')
      }else if(result.status==409){
        alert(result.response.data)
        handleRest()
      }else{
        alert("Something went wrong!!!")
      }
    }
  }

  const handleUpdate = async()=>{
    const {empMail,empName,salary,designation} = empDetails
    if(!empMail || !empName || !salary || !designation){
      alert("Please fill the form completely!!!")
    }else{
      const result = await updateEmployeeAPI(id,empDetails)
      if(result.status==200){
        alert("Employee updated successfully!!!")
        handleRest()
        navigate('/')
      }else{
        alert("Something went wrong!!!")
      }
    }
  }

  
  return (
    <div className="container">
      <h1 className="text-center my-5">
        {id ? (
          <span className="me-2">Update</span>
        ) : (
          <span className="me-2">Add</span>
        )}
        Employee
      </h1>

      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <div className="border shadow p-4 rounded">
            <FloatingLabel controlId="floatingName" label="Name">
              <Form.Control value={empDetails.empName} onChange={e=>setEmpDetails({...empDetails,empName:e.target.value})} type="text" placeholder="Name" />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInput"
              label="Email address"
              className="my-3"
            >
              <Form.Control value={empDetails.empMail} onChange={e=>setEmpDetails({...empDetails,empMail:e.target.value})} type="email" placeholder="name@example.com" />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingSalary"
              label="Salary"
              className="my-3"
            >
              <Form.Control value={empDetails.salary} onChange={e=>setEmpDetails({...empDetails,salary:e.target.value})} type="text" placeholder="Salary" />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingdesg"
              label="Designation"
              className="my-3"
            >
              <Form.Control value={empDetails.desgnation} onChange={e=>setEmpDetails({...empDetails,designation:e.target.value})} type="text" placeholder="Desgnation" />
            </FloatingLabel>
            <div className="text-center">
              <button onClick={handleRest} className="btn btn-danger me-2">RESET</button>
              {
                id ?
                <button onClick={handleUpdate} className="btn btn-warning">Update</button>
                :
                <button onClick={handleAdd} className="btn btn-primary">Add</button>
              }
            </div>
          </div>
        </div>
        <div className="col-md-4"></div>
      </div>
    </div>
  );
}

export default AddEdit;