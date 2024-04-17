import React, { Fragment, useEffect } from 'react';
import {Container} from 'react-bootstrap';
import { AiOutlineCalendar,AiOutlineDelete } from 'react-icons/ai';
import { AiOutlineEdit } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { TaskListByStatus } from '../../APIRequest/APIRequest';

const Completed = () => {

    useEffect(()=>{
        TaskListByStatus("Completed")
    },[])

    const CompletedList = useSelector((state)=>state.task.Completed)
    return (
        <Fragment>
            <Container fluid={true} className='content-body'>
                <div className='row p-0 m-0'>
                    <div className='col-12 col-md-6 col-lg-8 px-3'>
                        <h5>Task Completed</h5>

                    </div>
                    <div className='col-12 float-end col-md-6 col-lg-4 px-2'>
                        <div className='row'>
                            <div className='col-8'>
                                <input className='form-control w-100' />
                            </div>
                            <div className='col-4'>
                                <button className='btn btn-primary w-100'>Search</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row p-0 m-0'>
                {
                    CompletedList.map((item,i) => (
                        <div key={i.toString()} className='col-12 col-lg-4 col-sm-6 col-md-4 p2'>
                        <div className='card h-100'>
                            <div className='card-body'>
                                <h6 className='animated fadeInUp'>{item.title}</h6>
                                <p className='animated fadeInUp'>{item.description}</p>
                                <p className='m-0 animated fadeInUp'>
                                    <AiOutlineCalendar/>{item.createdDate}
                                    <a className='icon-nav text-primary mx-1'href><AiOutlineEdit/></a>
                                    <a className='icon-nav text-danger mx-1'href><AiOutlineDelete/></a>
                                    <a className='badge float-end bg-dark' href>{item.status}</a>
                                </p>
                            </div>
                        </div>
                    </div>
                    ))
                  }
                </div>
            </Container>
        </Fragment>
    );
};

export default Completed;