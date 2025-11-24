import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteEmployeeAPI, getAllEmployeeAPI } from '../services/allAPI'
import { Button, Modal } from 'react-bootstrap'

function Home() {

  const [allEmployees, setallEmployees] = useState([])
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedId, setSelectedId] = useState("")

  const navigate = useNavigate()

  useEffect(() => {
    viewAllEMployess()
  }, [])

  const viewAllEMployess = async () => {
    const result = await getAllEmployeeAPI()
    if (result.status === 200) {
      setallEmployees(result.data)
    }
  }

  const removeEmp = async () => {
    const result = await deleteEmployeeAPI(selectedId)
    if (result.status === 200) {
      viewAllEMployess()
    }
    setShowDeleteModal(false)
  }

  return (
    <div className='container'>
      <h1 className="text-center my-5">Employees</h1>

      <div className="float-end mb-5">
        <button onClick={() => navigate('/add')} className="btn btn-success">+ Add</button>
      </div>

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
            allEmployees?.length > 0 ?
              allEmployees?.map((emp, index) => (
                <tr key={emp._id}>
                  <td>{index + 1}</td>
                  <td>{emp.empName}</td>
                  <td>{emp.empMail}</td>
                  <td>{emp.salary}</td>
                  <td>{emp.designation}</td>
                  <td>
                    <div className='d-flex align-items-center'>
                      <button
                        onClick={() => navigate(`/${emp._id}/edit`)}
                        className="btn text-warning"
                      >
                        <i className="fa-solid fa-user-edit"></i>
                      </button>

                      <button
                        onClick={() => {
                          setSelectedId(emp._id)
                          setShowDeleteModal(true)
                        }}
                        className="btn text-danger"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
              :
              <p>No Employees</p>
          }
        </tbody>
      </table>

      {/* DELETE CONFIRMATION MODAL - OUTSIDE MAP */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Are you sure you want to delete this employee?
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>

          <Button variant="danger" onClick={removeEmp}>
            Delete
          </Button>
        </Modal.Footer>

      </Modal>

    </div>
  )
}

export default Home
