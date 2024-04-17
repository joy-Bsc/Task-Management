import React, { Fragment, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { AiOutlineCheckCircle, AiOutlineEdit, AiOutlineLogout, AiOutlineMenuUnfold, AiOutlineUser } from "react-icons/ai";
import { BsHourglass, BsListNested } from "react-icons/bs";
import { MdCancelPresentation } from "react-icons/md";
import { RiDashboardLine } from "react-icons/ri"; // Change the import for RiDashboardLine

import logo from "../../assets/images/logo.svg";
import { getUserDetails, removeSessions } from "../../helper/SessionHelper";
//import { getUserDetails, removeSessions } from "../../helper/SessionHelper";

const MasterLayout = (props) => {
    const contentRef = useRef();
    const sideNavRef = useRef();

    //const userDetails = getUserDetails(); // Get user details once

    const onLogout = () => {
        removeSessions();
    };

    const MenuBarClickHandler = () => {
        const sideNav = sideNavRef.current;
        const content = contentRef.current;
        if (sideNav.classList.contains("side-nav-open")) {
            sideNav.classList.add("side-nav-close");
            sideNav.classList.remove("side-nav-open");
            content.classList.add("content-expand");
            content.classList.remove("content");
        } else {
            sideNav.classList.remove("side-nav-close");
            sideNav.classList.add("side-nav-open");
            content.classList.remove("content-expand");
            content.classList.add("content");
        }
    };

    return (
        <Fragment>
            <Navbar className="fixed-top px-0 shadow-sm">
                <Container fluid={true}>
                    <Navbar.Brand>
                        <a className="icon-nav m-0 h5" onClick={MenuBarClickHandler} href>
                            <AiOutlineMenuUnfold />
                        </a>
                        <img className="nav-logo mx-2" src={logo} alt="logo" />
                    </Navbar.Brand>

                    <div className="float-right h-auto d-flex">
                        <div className="user-dropdown">
                            <img className="icon-nav-img icon-nav" src={getUserDetails()['photo']} alt="" />
                            <div className="user-dropdown-content ">
                                <div className="mt-4 text-center">
                                    <img className="icon-nav-img" src={getUserDetails()['photo']} alt="" />
                                    <h6>{getUserDetails()['firstName']}</h6>
                                    <hr className="user-dropdown-divider  p-0" />
                                </div>
                                <NavLink to="/profile" className="side-bar-item">
                                    <AiOutlineUser className="side-bar-item-icon" />
                                    <span className="side-bar-item-caption">Profile</span>
                                </NavLink>
                                <button onClick={onLogout} className="side-bar-item">
                                    <AiOutlineLogout className="side-bar-item-icon" />
                                    <span className="side-bar-item-caption">Logout</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </Container>
            </Navbar>

            <div ref={sideNavRef} className="side-nav-open">
                <NavLink className="side-bar-item" to="/" end>
                    <RiDashboardLine className="side-bar-item-icon" />
                    <span className="side-bar-item-caption">Dashboard</span>
                </NavLink>

                <NavLink className="side-bar-item" to="/Create">
                    <AiOutlineEdit className="side-bar-item-icon" />
                    <span className="side-bar-item-caption">Create New</span>
                </NavLink>

                <NavLink className="side-bar-item" to="/New">
                    <BsListNested className="side-bar-item-icon" />
                    <span className="side-bar-item-caption">New Task</span>
                </NavLink>

                <NavLink className="side-bar-item" to="/Progress">
                    <BsHourglass className="side-bar-item-icon" />
                    <span className="side-bar-item-caption">In Progress</span>
                </NavLink>

                <NavLink className="side-bar-item" to="/Completed">
                    <AiOutlineCheckCircle className="side-bar-item-icon" />
                    <span className="side-bar-item-caption">Completed</span>
                </NavLink>

                <NavLink className="side-bar-item" to="/Canceled">
                    <MdCancelPresentation className="side-bar-item-icon" />
                    <span className="side-bar-item-caption">Canceled</span>
                </NavLink>
            </div>

            <div ref={contentRef} className="content">
                {props.children}
            </div>
        </Fragment>
    );
};

export default MasterLayout;