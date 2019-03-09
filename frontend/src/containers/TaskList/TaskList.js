import React, {Fragment, Component} from 'react'
import {NavLink} from "react-router-dom";
import axios from 'axios';
import './TaskList.css';


// компонент для показа списка задач клиенту
// задачи запрашиваются из API в момент показа компонента на странце (mount)
const TASKS_URL = 'http://localhost:8000/api/v1/tasks';

class TaskList extends Component {
    state = {
        tasks: [],
        backlog: [],
        in_progress: [],
        done: []
    };

    componentDidMount() {
        axios.get(TASKS_URL)
            .then(response => {console.log(response.data); return response.data;})
            .then(tasks => this.setState({tasks}))
            .catch(error => console.log(error));

        let tasks = [...this.state.tasks];

        let backlog = [...this.state.backlog];
        backlog = tasks.filter(function(task) {
            return task.status === 'backlog';
        });

        let in_progress = [...this.state.in_progress];
        in_progress = tasks.filter(function(task) {
            return task.status === 'in_progress';
        });

        let done = [...this.state.done];
        done = tasks.filter(function(task) {
            return task.status === 'done';
        });

        this.setState({...this.state, backlog, in_progress, done});
    }


    render() {

        return <Fragment>
            <p><NavLink to='/tasks/add'>Добавить задачу</NavLink></p>
            <div className='row'>
                {this.state.backlog.map(task => {
                    return <div className='col-xs-12 col-sm-12 col-m-4 col-lg-4 mt-4' key={task.id}>
                        <div className='task-container'>
                            <h4>{task.summary}</h4>
                            <div className='task-text-container'>
                                <p className='task-description'>{task.description}</p>
                            </div>
                            <p>{task.due_date}</p>
                        </div>
                    </div>
                })}
            </div>
        </Fragment>
    }
}

export default TaskList;