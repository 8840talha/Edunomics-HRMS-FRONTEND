import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import './project.css';

const User = (props) => {

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    loadProject();
  }, []);
  // getting a view of an specific employee by id
  const loadProject = async () => {
    var token = localStorage.getItem('token');
    fetch(`https://hrms-project.herokuapp.com/api/project/all`, { method: 'get', headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}`} })
    .then(res => {
        if (res.status !== 200 && res.status !== 201) {
            console.log('hellllo');
            throw new Error(res.status);
        }
        return res.json();

      })
      .then(response => {
        console.log(response.project);
        setProjects(response.project);
        
        
    })
      .catch(err => {
        console.log(err.message);
        if(err.message == 404) {
            // console.log('No projects found')
            alert('No projects Found')
        } else {
            // console.log('Some error occurred');
            alert('Some error occurred');
            
        }
        
      })

  };
  return (
    <div style={{ marginTop: '100px', backgroundColor: '#fff' }} className="container py-4">
      <table style={{ backgroundColor: '#fff', width: '80%', marginLeft: '10%' }} className="table table-bordered shadow table-striped ">
                    <thead className="thead">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Project Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((user, index) => (
                          
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{user.name}</td>
                                <td>
                                <Link className="btn btn-primary btn-block mr-2" 
                                to={{pathname: "/kanban",
                                state: {project: user}
                                }}>
                                        View Tasks
                </Link>
                                </td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>

    </div>
  );
};

export default User;
