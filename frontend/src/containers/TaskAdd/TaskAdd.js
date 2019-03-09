import React, {Component} from 'react';
import DatePicker from "react-datepicker";
import Select from 'react-select';
import axios from 'axios';


class TaskAdd extends Component {
    state = {
        // задача, которую мы редактируем
        task: {
            summary: "",
            description: "",
            due_date: "",
            status: "",
            time_planned: ""
        },

        // сообщение об ошибке
        alert: null,

        // индикатор отключения кнопки submit, если запрос выполняется
        submitDisabled: false
    };


    // функция, обновляющая поля в this.state.task
    updateTaskState = (fieldName, value) => {
        this.setState(prevState => {
            let newState = {...prevState};
            let task = {...prevState.task};
            task[fieldName] = value;
            newState.task = task;
            return newState;
        });
    };
    selectChanged = (field) => {
        const status = "backlog";
        this.updateTaskState(field, status);
    };
    // обработчик ввода в поля ввода
    inputChanged = (event) => {
        const value = event.target.value;
        const fieldName = event.target.name;
        this.updateTaskState(fieldName, value);
    };

    // обработчик изменения дат
    dateChanged = (field, date) => {
        this.updateTaskState(field, date.toISOString());
    };


    // обработчик отправки формы
    formSubmitted = (event) => {
        event.preventDefault();

        // блокировка отправки формы на время выполнения запроса
        this.setState(prevState => {
            let newState = {...prevState};
            newState.submitDisabled = true;
            return newState;
        });
        const TASKS_URL = 'http://localhost:8000/api/v1/tasks/';
        // отправка запроса
        axios.post(TASKS_URL, this.state.task)
            .then(response => {
                console.log(response.data);
                if (response.status === 201) return response.data;
                throw new Error('Movie was not created');
            })
            // если всё успешно, переходим на просмотр страницы задачи с id,
            // указанным в ответе
            .then(task => this.props.history.replace('/task/' + task.id))
            .catch(error => {
                console.log(error);
                this.setState(prevState => {
                    let newState = {...prevState};
                    newState.alert = {type: 'danger', message: `Task was not added!`};
                    newState.submitDisabled = false;
                    return newState;
                });
            });
    };

    render() {
        // распаковка данных задачи, чтобы было удобнее к ним обращаться
        const {summary, description, due_date, status, time_planned} = this.state.task;

        // создание разметки для алерта, если он есть
        let alert = null;
        if (this.state.alert) {
            alert = <div className={"alert alert-" + this.state.alert.type}>{this.state.alert.message}</div>
        }

        // форматирование дат для DatePicker'ов
        const due_date_selected = due_date ? new Date(due_date) : null;
        const select_options = [{value: "backlog", label: "Очередь"}];

        return <div>
            {alert}
            <form className='mt-5' onSubmit={this.formSubmitted}>
                <div className="form-group">
                    <label className="font-weight-bold">Задача</label>
                    <input type="text" className="form-control" name="summary" value={summary} onChange={this.inputChanged}/>
                </div>
                <div className="form-group">
                    <label>Подробности</label>
                    <input type="text" className="form-control" name="description" value={description}
                           onChange={this.inputChanged}/>
                </div>
                <div className="form-group">
                    <label className="font-weight-bold">Крайний срок</label>
                    <div>
                    <DatePicker dateFormat="yyyy-MM-dd HH:MM:ss" showTimeSelect timeFormat="HH:mm" selected={due_date_selected} className="form-control"
                                    name="release_date" onChange={(date) => this.dateChanged('due_date', date)}/>
                    </div>
                </div>
                <div className="form-group">
                    <label>Примерное время выполнения</label>
                    <input type="number" className="form-control" name="time_planned" value={time_planned}
                           onChange={this.inputChanged}/>
                </div>
                <div className="form-group">
                    <label>Статус</label>
                    <Select options={select_options} name='status'
                            onChange={() => this.selectChanged('status')}/>
                </div>
                <button disabled={this.state.submitDisabled} type="submit"
                        className="btn btn-info">Сохранить</button>
            </form>
        </div>;
    };
}


export default TaskAdd;