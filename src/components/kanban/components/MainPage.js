import React, { Component } from "react";
import { Button, Container, Row, Col, Card, Alert } from "react-bootstrap";
import axios from "axios";
import "./style.css";
import { Link, useParams, withRouter } from 'react-router-dom'
import Header from "./Header";
import Footer from "./Footer";
import AddBucket from "./AddBucket";
import EditBucket from "./EditBucket";
import EditTask from "./EditTask";
import AddTask from "./AddTask";
import Settings from "./Settings";
import { backendUrl as url } from '../backendUrl/url'
const reloadPage = () => {
  // window.location.reload(false)
  // The last "domLoading" Time //
  var currentDocumentTimestamp =
    new Date(performance.timing.domLoading).getTime();
  // Current Time //
  var now = Date.now();
  // Ten Seconds //
  var tenSec = 10 * 1000;
  // Plus Ten Seconds //
  var plusTenSec = currentDocumentTimestamp + tenSec;
  if (now > plusTenSec) {
    window.location.reload();
  } else { }
}
const EmpId = () => {
  const { E_id } = useParams();
}

const token = localStorage.getItem('token')
class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //data

      projectName: '',
      buckets_array: [],
      tasks: {},
      bucketName: "",
      showBucketModal: false,
      remountVar: false,
      ideaId: null,
      newBucketRank: -1,

      //Helper Variables
      hasBeenFetched: false,
      bucket: "",
      priority: "",

      //Modal Show props.
      showAddModal: false,
      editModal: {},
      showEditModal: false,
      showSettings: false,
      showEditBucketModal: false,

      //Dragging variables for buckets.
      draggedBucketIndex: -1,
      targetBucketIndex: -1,
      isBucketDragged: false,
      isBucketEntered: false,

      //Dragging variables for tasks
      draggedTask: null,
      targetTask: null,
      isTaskDragged: false,
      isTaskEntered: false,
      draggedTaskTargetBucket: null,
      targetBucketForTask: null,

      autoSave: true,
    };
    this.saveData = this.saveData.bind(this)
  }

  smoothScroll() {
    window.scrollTo({
      top: document.body.scrollHeight,
      left: document.body.scrollWidth,
      behavior: "smooth",
    });
  }
  saveData = async () => {
    this.setState({ showSettings: false });
    await axios
      .post(
        url + "api/user/buckets/save",
        { buckets: Object.assign({}, this.state.buckets_array), ideaId: this.state.ideaId },
        {
          headers: {
            'x-access-token': token
          }
        }
      )
      .then(
        (response) => {
          console.log(response.data);
        },
        (error) => {
          console.log(error);
          alert("Error. Can not Load Data.");
        }
      );
    await axios
      .post(
        url + "api/user/tasks/save",
        { tasks: this.state.tasks, ideaId: this.state.ideaId },
        {
          headers: {
            'x-access-token': token
          }
        }
      )
      .then(
        (response) => {
          console.log(response.data);
        },
        (error) => {
          console.log(error);
          alert("Error. Can not Load Data.");
        }
      );
    this.setState({ showSettings: false });
  };
  fetchAllData = () => {
    if (this.props.location.state) {
      const _id = this.props.location.state.project._id
      axios.get(url + "bucket/" + _id, {
        headers: {
          "Content-Type": "application/json", "Authorization": `Bearer ${token}`
        }
      }).then(
        (response) => {
          console.log(response.data)
          this.setState({ newBucketRank: response.data.length + 1 })
          this.setState({ buckets_array: response.data });
        },
        (error) => {
          console.log(error);
        }
      );

      axios
        .get(url + "tasks/" + _id, {
          headers: {
            "Content-Type": "application/json", "Authorization": `Bearer ${token}`
          }
        })
        .then((response) => {
          console.log(response.data)
          var tasks = response.data;
          for (var i in tasks) {
            //console.log(new Date(tasks[i].start_date));

            tasks[i].start_date = Date.parse(tasks[i].start_date);
            tasks[i].due_date = Date.parse(tasks[i].due_date);
          }

          this.setState({ tasks: tasks, hasBeenFetched: true });
        });
    }

  }
  callEditBucket(bucket) {
    console.log(bucket);

    axios.put(`${url}bucket/edit`, { bucket: bucket }, {
      headers: {
        "Content-Type": "application/json", "Authorization": `Bearer ${token}`
      }
    }).then(res => {
      console.log("Edited")
      this.setState({ showEditBucketModal: false })
      this.fetchAllData()
    }).catch(err => {
      console.log(err)
    })
  }
  async componentDidMount() {

    // await this.setState({ E_id: id })
    console.log(this.props.match.params)
    // const id = this.props.match.params.id;
    // console.log(this.props);
    if (this.props.location.state) {
      await this.setState({ ideaId: this.props.location.state.project._id });
      await this.setState({ projectName: this.props.location.state.project.name });
    }
    this.setState({ remountVar: false })
    this.setState({
      autoSave:
        window.localStorage.getItem("autoSave") === "true" ? true : false,
    });
    this.fetchAllData()
  }

  orderTask = async (task, b_Id) => {
    console.log("Bucket id " + b_Id)
    var tasks = this.state.tasks;
    var bucketId = task.bucket._id ? task.bucket._id : task.bucket
    if (b_Id) {
      bucketId = b_Id
    }
    var rank = -1
    //Find new rank for new task
    let tasks_ = Object.keys(tasks).filter(id => { return tasks[id]['bucket']['_id'] === bucketId })
    if (tasks_.length === 0) {
      rank = 1
    }
    else {
      let ranks = tasks_.map(bucket => tasks[bucket].rank)
      rank = Math.max.apply(0, ranks) + 1
    }
    return rank
  }

  // This function is used to add a new task
  addTask = async (task, fileForm) => {
    task.rank = await this.orderTask(task)
    console.log(task);

    //Call Add task API
    axios.post(`${url}tasks/add`, { task: task }, {
      headers: {
        "Content-Type": "application/json", "Authorization": `Bearer ${token}`
      }
    }).then(res => {
      console.log(res.data)
      this.setState({ showAddModal: false })
      this.fetchAllData()
    }).catch(err => {
      console.log(err)
    })

    // this.setState({
    //   tasks: tasks,
    //   showAddModal: false,
    // });

    // if (fileForm.get("attachments")) {
    //   await this.saveData()
    //   fileForm.append("id", n)
    //   const config = {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //       'x-access-token': token
    //     }
    //   }
    //   axios.post(url + 'files', fileForm, config).then((res) => {
    //     console.log(res)
    //     this.fetchAllData()
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // }
  };

  editTask(task) {
    this.setState({ editModal: task });
    this.setState({
      name: task.name,
      description: task.description,
      bucket: task.bucket,
      assignees: task.assignees,
      start_date: task.start_date,
      due_date: task.due_date,
      progress: task.progress,
      label_color: task.label_color,
      priority: task.priority,
      showEditModal: true,
      attachments: task.attachments
    });
  }

  saveEditTask = async (task, fileForm) => {
    task.rank = await this.orderTask(task, "edit")
    axios.put(`${url}tasks/edit`, { task: task }, {
      headers: {
        "Content-Type": "application/json", "Authorization": `Bearer ${token}`
      }
    }).then(res => {
      console.log(res.data)
      this.fetchAllData()
      this.setState({ showEditModal: false })
    }).catch(err => {
      console.log(err)
    })
    //var tasks = this.state.tasks;
    //tasks[task.id] = task;
    //this.setState({ tasks: tasks, showEditModal: false });


    // if (fileForm.get("attachments")) {
    //   await this.saveData()
    //   fileForm.append("id", task.id)
    //   const config = {
    //     headers: {
    //       'Content-Type': 'multipart/form-data'
    //     }
    //   }
    //   axios.post(url + 'files', fileForm, config).then((res) => {
    //     console.log(res)
    //     this.fetchAllData()
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // } else {
    //   await this.saveData()
    //   this.fetchAllData()
    // }
  };
  deleteTask = (task) => {
    console.log(task)
    axios.delete(`${url}tasks/delete`, {
      data: { task: task },
      headers: {
        "Content-Type": "application/json", "Authorization": `Bearer ${token}`
      }
    }).then(res => {
      if (res.data.message === "Deleted") {
        console.log(res.data)
        this.fetchAllData()
      }
      else {
        console.log(res.data)
      }
      this.setState({ showEditModal: false });
    }).catch(err => {
      console.log(err)
    })
  };
  //bucket
  deleteBucket = (bucket) => {
    axios.delete(`${url}bucket/delete`, {
      data: { bucket: bucket },
      headers: {
        "Content-Type": "application/json", "Authorization": `Bearer ${token}`
      }
    }).then(res => {
      if (res.data.message === "Deleted") {
        this.fetchAllData()
      }
      else {
        console.log(res.data)
      }
    }).catch(err => {
      console.log(err)
    })
  }

  // This is the render function
  render() {
    if (this.state.ideaId === null) {
      return (<div>No Idea specified</div>)
    }
    return (
      <div className="App">
        {/* <Header /> */}
        {/* ----------------------------------------------Container-------------------------------------------- */}
        <Container className="board" fluid>
          {/* ---------------------Add Task Button------------------- */}
          <Row className="mt-2 mb-2">
            <Col>
              <h1>Project Name: {this.state.projectName}</h1>
            </Col>
            <Col style={{ width: '60%' }}>
              <Button
                variant="outline-dark"
                className="float-right ml-2 "
                onClick={() => this.setState({ showSettings: true })}
              >
                Settings<i className="fas fa-cog  settings-icon ml-2"></i>
              </Button>
              <Button
                variant="outline-dark"
                className="float-right ml-2 "
                onClick={reloadPage}
              >
                LoadBucket<i className="fas fa-cog  settings-icon ml-2"></i>
              </Button>
              <Link style={{ height: '38px', }} className="btn btn-outline-dark" to="/projectsEmp">
                Back to Employee
      </Link>
              <Link style={{ height: '38px', }} className="btn btn-outline-dark ml-2" to="/projects/add">
                Back to AdminProjects
      </Link>

            </Col>
          </Row>

          {/* ---------------------Task Lists------------------- */}

          <Row className="flex-row flex-nowrap bucket-container" fluid="true" xs="6">
            {/* ---------------------Buckets------------------- */}
            {this.state.buckets_array.sort((a, b) => { return a.rank > b.rank }).map((bucket, idx) => (
              <Col
                key={idx}
                id={bucket._id}
                className="bucket"
                draggable={true}
                //All drag event handlers for buckets below
                onDragStart={() => {
                  this.setState({ isBucketDragged: true })
                  this.setState({ draggedBucketIndex: this.state.buckets_array.indexOf(bucket) })
                }}
                onDragOver={() => {
                  if (bucket !== this.state.targetBucketForTask) {
                    this.setState({ targetBucketForTask: bucket })
                  }
                }}
                onDragEnter={async () => {
                  if (this.state.isBucketDragged) {
                    if (this.state.draggedBucketIndex !== this.state.buckets_array.indexOf(bucket)) {
                      this.setState({ isBucketEntered: true })
                    }
                    await this.setState({ targetBucketIndex: this.state.buckets_array.indexOf(bucket) })
                  }
                  else if (this.state.isTaskDragged) {
                    this.setState({ draggedTaskTargetBucket: bucket })
                  }
                }}
                onDragEnd={async (e) => {
                  if (this.state.isBucketDragged) {
                    if (this.state.isBucketEntered) {
                      const buckets = this.state.buckets_array
                      const draggedRank = buckets[this.state.draggedBucketIndex].rank
                      const targetRank = buckets[this.state.targetBucketIndex].rank
                      buckets[this.state.draggedBucketIndex].rank = targetRank
                      buckets[this.state.targetBucketIndex].rank = draggedRank
                      this.setState({ buckets_array: buckets })
                      axios.put(`${url}bucket/bucketswap`, {
                        bucket1: buckets[this.state.draggedBucketIndex],
                        bucket2: buckets[this.state.targetBucketIndex]
                      }, {
                        headers: {
                          "Content-Type": "application/json", "Authorization": `Bearer ${token}`
                        }
                      }).then(res => {
                        console.log(res.data)
                        this.setState({ draggedBucketIndex: -1, targetBucketIndex: -1, isBucketDragged: false })
                      }).catch(err => {
                        console.log(err)
                      })
                    }
                  }
                  else if (this.state.isTaskDragged && this.state.isTaskEntered) {
                    const tasks = this.state.tasks
                    console.log(this.state.draggedTask.bucket)
                    console.log(this.state.targetBucketForTask)
                    if (this.state.draggedTask.bucket._id !== this.state.targetBucketForTask._id) {
                      let rank = await this.orderTask(this.state.draggedTask, this.state.targetBucketForTask._id)
                      tasks[this.state.draggedTask._id].bucket = this.state.targetBucketForTask
                      tasks[this.state.draggedTask._id].rank = rank

                      axios.put(`${url}tasks/edit`, { task: tasks[this.state.draggedTask._id] }, {
                        headers: {
                          "Content-Type": "application/json", "Authorization": `Bearer ${token}`
                        }
                      }).then(res => {
                        console.log(res.data)
                        this.fetchAllData()
                      }).catch(err => {
                        console.log(err)
                      })
                    }
                    else {
                      const tasks = this.state.tasks
                      const draggedRank = this.state.draggedTask.rank
                      console.log(this.state.draggedTask)
                      console.log(this.state.targetTask)
                      tasks[this.state.draggedTask._id].rank = this.state.targetTask.rank
                      tasks[this.state.targetTask._id].rank = draggedRank

                      axios.put(`${url}tasks/taskswap`, {
                        task1: tasks[this.state.draggedTask._id],
                        task2: tasks[this.state.targetTask._id]
                      }, {
                        headers: {
                          "Content-Type": "application/json", "Authorization": `Bearer ${token}`
                        }
                      }).then(res => {
                        console.log(res.data)
                        this.setState({ isTaskDragged: false, isTaskEntered: false, targetTask: null, draggedTask: null, targetBucketForTask: null })
                      }).catch(err => {
                        console.log(err)
                      })
                    }
                    this.setState({ tasks: tasks })
                  }
                }
                }
              >
                <div className="paper-list" id={idx + 'bc'}>
                  <div
                    className="bucket-title"
                    style={{ padding: "5px" }}
                  >
                    <Row>
                      <Col>
                        <h6
                          id={bucket._id}
                          style={{ margin: "0" }}
                          className="float-left ml-2"
                        >
                          {bucket.name}
                        </h6>
                      </Col>
                      <Col>
                        <span style={{ cursor: "pointer" }}>
                          <i
                            className="fas fa-trash float-right bucket-edit" //Delete Bucket
                            onClick={() => {
                              if (
                                window.confirm("Are you sure to delete bucket?")
                              ) {
                                this.deleteBucket(bucket)
                              }
                            }}
                          ></i>
                          <i
                            className="fas fa-pen float-right mr-3 bucket-edit"
                            onClick={() =>
                              this.setState({
                                showEditBucketModal: true,
                                bucket: bucket,
                              })
                            }
                          ></i>
                        </span>
                      </Col>
                    </Row>
                  </div>
                  {Object.values(this.state.tasks).sort((a, b) => { return a.rank > b.rank }).map((task, idx) =>
                    task.bucket._id === bucket._id ? (
                      <Card
                        key={idx}
                        style={{
                          maxWidth: "100%"
                        }}
                        id={task._id}
                        className={'mt-2 task-card'}
                        draggable={true}
                        onDragStart={(e) => {
                          e.stopPropagation()
                          this.setState({ draggedTask: task, isTaskDragged: true })
                        }}
                        onDragEnter={(e) => {
                          console.log("Task entered")
                          if (this.state.draggedTask !== task) {
                            console.log(task)
                            this.setState({ targetTask: task, isTaskEntered: true })
                          }
                          // Must be set to true even if task is same 
                          this.setState({ isTaskEntered: true })

                        }}
                        onDragEnd={(e) => {
                          console.log("Task drag Ended")


                        }}
                      >
                        <Card.Body
                          className='task-card-body'
                          onClick={() => this.editTask(task)}
                        >
                          <Card.Text>
                            <svg
                              style={{ color: task.label_color }}
                              className="bi bi-bookmark-fill"
                              width="1em"
                              height="1em"
                              viewBox="0 0 16 16"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M3 3a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v12l-5-3-5 3V3z"
                              />
                            </svg>{" "}
                            {task.name}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    ) : null
                  )}
                  {/* <Card
                    className="mt-2 task-card"
                  >
                    <Card.Body>
                      <Card.Text className="float-left mb-0 mt-1"></Card.Text>
                    </Card.Body>
                  </Card> */}

                  <Alert
                    className="add-task"
                    onClick={() =>
                      this.setState({
                        showAddModal: true,
                        bucket: bucket,
                      })
                    }
                  >
                    <Row>
                      <Col align="center" className="add-task-content">
                        + Add another task
                      </Col>
                    </Row>
                  </Alert>
                </div>
              </Col>
            ))}
            <Col id="i-add-bucket">
              <div
                className="add-bucket"
                onClick={() => this.setState({ showBucketModal: true })}
              >
                + Add Bucket
                </div>
            </Col>

          </Row>
        </Container>

        {/* ---------------------Pop Up Modal for Adding NEW Bucket------------------- */}
        <AddBucket
          visibility={this.state.showBucketModal}
          toggleVisibility={() => { this.setState({ showBucketModal: !this.state.showBucketModal }) }}
          buckets={this.state.buckets_array}
          ideaId={this.state.ideaId}
          saveFunction={this.saveBucket}
          refetch={this.fetchAllData}
          token={token}
          rank={this.state.newBucketRank}
          hideModal={() => {
            this.setState({ showBucketModal: false });
          }}
        />

        {/* ---------------------Pop Up Modal for EDITING Bucket------------------- */}
        <EditBucket
          visibility={this.state.showEditBucketModal}
          bucket={this.state.bucket}
          saveFunction={(bucket) => {
            this.callEditBucket(bucket)
          }}
          hideModal={() => {
            this.setState({ showEditBucketModal: false });
          }}
        />

        {/* ---------------------Pop Up Modal for EDITING TASK details------------------- */}
        <EditTask
          visibility={this.state.showEditModal}
          buckets={this.state.buckets_array}
          taskData={this.state.editModal}
          saveFunction={this.saveEditTask}
          deleteFunction={this.deleteTask}
          hideModal={() => this.setState({ showEditModal: false })}
        />

        {/* ---------------------Pop Up Modal for ADDING NEW TASK details------------------- */}

        <AddTask
          visibility={this.state.showAddModal}
          bucket={this.state.bucket}
          buckets={this.state.buckets_array}
          ideaId={this.state.ideaId}
          // callingBucket={this.state.bucketCallingAddTask}
          saveFunction={this.addTask}
          hideModal={() => this.setState({ showAddModal: false })}
        />

        {/* ---------------------Pop Up Modal for SETTINGS------------------- */}

        <Settings
          visibility={this.state.showSettings}
          autoSave={this.state.autoSave}
          toggleAutoSave={(checked) => this.setState({ autoSave: checked })}
          saveFunction={this.saveData}
          hideModal={() => this.setState({ showSettings: false })}
        />

        <Footer />
      </div >
    );
  }
}

export default withRouter(MainPage);