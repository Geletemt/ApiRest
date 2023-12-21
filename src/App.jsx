import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import { useEffect } from 'react';
import { useState } from 'react';
import StudentUpdate from './components/StudentUpdate';

function App() {
  const [students, setStudents] = useState();
  const [selectedStudent, setSelectedStudent] = useState({
    name: '',
    surname: '',
    age: '',
    score: '',
  });


  // CARGA DE TODOS LOS ALUMNOS
  const getStudents = () => {
    axios
      .get('http://localhost:3000/students')
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => console.log('ERROR', error.message));
       console.log(students);
  };

  useEffect(() => {
    getStudents();
  }, []);

  

  // ELIMINAR UN ALUMNO
  const deleteStudent = (studentID) => {
    axios
      .delete(`http://localhost:3000/students/${studentID}`)
      .then(() => {
        getStudents();
      })
      .catch((error) => console.log('ERROR', error.message));
  };

  // AÑADIR UN ALUMNO
  const handleAddStudent = (payload) => {
    axios
      .post('http://localhost:3000/students/', payload)
      .then(() => {
        getStudents();
      })
      .catch((error) => console.log('ERROR', error.message));
  };

  // EDITAR UN ALUMNO
  const handleEditStudent = (studentID) => {
    axios
      .get(`http://localhost:3000/students/${studentID}`)
      .then((response) => {
        setSelectedStudent(response.data);
       
      })
      .catch((error) => console.log('ERROR', error.message));

      
  };
  
 
  return (
    <>
      <h1>Alumnos</h1>
      {students === undefined ? (
        <div className="spinner-border m-5" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Apellidos</th>
              <th scope="col">Edad</th>
              <th scope="col">Nota media</th>
              <th scope="col">Opciones</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <th scope="row">{student.id}</th>
                <td>{student.name}</td>
                <td>{student.surname}</td>
                <td>{student.age}</td>
                <td>{student.score}</td>
                <td>
                  <button onClick={() => deleteStudent(student.id)}>DEL</button>
                  <button onClick={() => handleEditStudent(student.id)}>
                    EDIT
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Formik
        
        initialValues={{
          name: '',
          surname: '',
          age: '',
          score: '',
        }}
        onSubmit={(values, { resetForm }) => {
          handleAddStudent(values);
          resetForm();
        }}
      >
        {() => (
          <Form>
            <div className="card m-5">
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">Nombre</label>
                  <Field name="name" className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Apellidos</label>
                  <Field name="surname" className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Edad</label>
                  <Field name="age" className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Media</label>
                  <Field name="score" className="form-control" />
                </div>
              </div>
              <button type="submit">Añadir</button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default App;
