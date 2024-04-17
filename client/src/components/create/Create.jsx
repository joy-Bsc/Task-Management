import React, { useRef } from 'react';
import {useNavigate } from 'react-router-dom';
import { Container,Row } from 'react-bootstrap';
import { errorToast, isEmpty } from '../../helper/FormHelper';
import { NewTaskRequest } from '../../APIRequest/APIRequest';


const Create = () => {
    const titleRef = useRef();
    const descriptionRef = useRef();
    const navigate = useNavigate();

    const onCreate = (e) => {
        e.preventDefault();
        const title = titleRef.current.value;
        const description = descriptionRef.current.value;

        if (isEmpty(title)) {
            errorToast("Title required");
        } else {
            NewTaskRequest(title, description).then((res) => {
                console.log("error"+res);
                if (res === true) {
                    navigate("/new");
                }
            });
        }
    };
    return (
        <Container fluid={true} className='content-body'>
            <Row className='d-flex justify-content-center'>
                <div className='col-12 col-lg-8 col-sm-12 col-md-8 p-2'>
                    <div className='card'>
                        <div className='card-body'>
                            <h4>Create New</h4>
                            <br />
                            <input ref={titleRef} placeholder='Task Name' className='form-control animated fadeInUp' type="text" />
                            <br />
                            <textarea rows={5} ref={descriptionRef} placeholder='Task Description' className='form-control animated fadeInUp' type='text'/>
                            <br />
                            <button onClick={onCreate} className='btn float-end btn-primary'>Create</button>
                        </div>
                    </div>
                </div>
            </Row>
        </Container>
    );
};

export default Create;