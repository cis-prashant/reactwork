import React, { useState ,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {  toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setloadUsers } from "../Redux/Action/Action";

const AddUser = () => {
  const products = useSelector((state) => state.callReducer.firstState);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [addUser, setAddUser] = useState({
    title: " ",
    isbn: " ",
    status: " ",
    pageCount: " ",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddUser({ ...addUser, [name]: value });
  };
  async function submitForm(e) {
    // e.preventDefault()
    if (
      addUser.title === " " ||
      addUser.status === " " ||
      addUser.isbn === "" ||
      addUser.pageCount === ""
    ) {
      alert("plz fill all require fields");
    } else {
     const updateData= await axios.post("http://localhost:8000/users", addUser);
      
      toast.success('🦄 New data added!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      const result = await axios.get("http://localhost:8000/users");
      dispatch(setloadUsers(result.data));

      setAddUser({
        title: " ",
        isbn: " ",
        status: " ",
        pageCount: " ",
      });

    }
  };
  return (
    <>
      <button
        type="button"
        className="btn btn-success m-2"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        <i className="fas fa-plus-circle"></i> Add Book
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered ">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add Book Form
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="row g-3 needs-validation" novalidate>
                <div className="col-md-12">
                  <label for="validationCustom01" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationCustom01"
                    name="title"
                    value={addUser.title}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    required
                  />
                  <div className="valid-feedback">Looks good!</div>
                </div>
                <div className="col-md-12">
                  <label for="validationCustom02" className="form-label">
                    ISBN
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationCustom02"
                    name="isbn"
                    value={addUser.isbn}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    required
                  />
                  <div className="valid-feedback">Looks good!</div>
                </div>
                <div className="col-md-12">
                  <label for="validationCustomUsername" className="form-label">
                    Status
                  </label>
                  <div className="input-group has-validation">
                    <input
                      type="text"
                      className="form-control"
                      id="validationCustomUsername"
                      aria-describedby="inputGroupPrepend"
                      name="status"
                      value={addUser.status}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      required
                    />
                    <div className="invalid-feedback">
                      Please choose a username.
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <label for="validationCustomUsername" className="form-label">
                    Page Count
                  </label>
                  <div className="input-group has-validation">
                    <input
                      type="text"
                      className="form-control"
                      id="validationCustomUsername"
                      aria-describedby="inputGroupPrepend"
                      name="pageCount"
                      value={addUser.pageCount}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      required
                    />
                    <div className="invalid-feedback">
                      Please choose a username.
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <button
                    type="button"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    className="btn btn-primary"
                    onClick={(e) => {
                      submitForm(e);
                    }}
                  >
                  <i class="fas fa-plus-circle"></i> Add Book
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUser;
