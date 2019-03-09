import React, {Fragment, Component} from 'react'
import {NavLink} from "react-router-dom";
import axios from 'axios';
import './TaskList.css';
import TaskCard from "../../components/UI/TaskCard/TaskCard";


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
            .then(response => {
                console.log(response.data);
                return response.data;
            })
            .then(tasks => {
                console.log(tasks, 'RESPONSE');
                let stateTasks = tasks;
                console.log(tasks, 'TASKS');

                let backlog = [];
                backlog = stateTasks.filter((task) => {
                    console.log(task, 'ONE TASK');
                    return task.status === 'backlog';
                });
                console.log(backlog, 'BACKLOG');

                let in_progress = [];
                in_progress = stateTasks.filter(function (task) {
                    return task.status === 'in_progress';
                });
                console.log(in_progress, 'IN PROGRESS');

                let done = [];
                done = stateTasks.filter(function (task) {
                    return task.status === 'done';
                });
                console.log(done, 'DONE');
                this.setState({...this.state, tasks, backlog, in_progress, done})
            })
            // .then()
            .catch(error => console.log(error));
    }


    render() {
        console.log(this.state);

        return <Fragment>
            <p><NavLink to='/tasks/add'>Добавить задачу</NavLink></p>
            <div className='row'>
                <div className='col-4 task-status-field'>
                    <h3 className='task-status-name'>Очередь</h3>
                    {this.state.backlog.map(task => {
                        return <TaskCard task={task}/>
                    })}
                </div>
                <div className='col-4 task-status-field'>
                    <h3 className='task-status-name'>В работе</h3>
                    {this.state.in_progress.map(task => {
                        return <TaskCard task={task}/>
                    })}
                </div>
                <div className='col-4 task-status-field'>
                    <h3 className='task-status-name'>Сделано</h3>
                    {this.state.done.map(task => {
                        return <TaskCard task={task}/>
                    })}
                </div>
            </div>
        </Fragment>
    }
}

export default TaskList;