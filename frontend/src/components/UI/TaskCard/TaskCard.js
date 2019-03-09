import React from 'react';


const TaskCard = props => (
    <div className='mt-4' key={props.task.id}>
        <div className='task-container'>
            <h5>{props.task.summary}</h5>
            <div className='task-text-container'>
                <p className='task-description'>{props.task.description}</p>
            </div>
            <p>{props.task.due_date}</p>
        </div>
    </div>
);

export default TaskCard;



