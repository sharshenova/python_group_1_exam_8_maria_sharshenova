import React, {Component, Fragment} from 'react';
import axios from 'axios';
import './TaskDetails.css';
import {NavLink} from "react-router-dom";


class TaskDetails extends Component {

    state = {
        task: null
    };

    componentDidMount() {

        const match = this.props.match;
        const TASKS_URL = 'http://localhost:8000/api/v1/tasks/';

        axios.get(TASKS_URL + match.params.id)
            .then(response => {
                console.log(response.data);
                return response.data;
            })
            .then(task => this.setState({task}))
            .catch(error => console.log(error));
    }

    render() {
        if (this.state.task) {

            let date = this.state.task.due_date.split('T')[0];
            let time = this.state.task.due_date.split('T').pop().split('Z');

            return (
                <div>
                    <div className="card task-detail-container">
                        <div className="card-body">
                            <h5 className="card-title">{this.state.task.summary}</h5>
                            <p className="card-text">{this.state.task.description}</p>
                            <h6 className="card-subtitle mb-3">Статус: {this.state.task.status_display}</h6>
                            <span>Выполнить до: <b>{date}, {time}</b></span>
                            <div>
                               {this.state.task.time_planned ?
                                   <span>Примерное время выполнения (часов): <b>{this.state.task.time_planned}</b></span>
                                    : null}
                            </div>
                        </div>
                    </div>
                    <div className='mt-3'>
                        <NavLink className="nav-link" to='/'><button className='btn btn-info'>На главную</button></NavLink>
                    </div>
                </div>
            )
        } return null;
    }
}

export default TaskDetails;