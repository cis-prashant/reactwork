import Modal from "react-modal";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
Modal.setAppElement("#root");

const Edit_react_modal = ({ elements, loadUsers }) => {
  let navigate = useNavigate();
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  useEffect(()=>{

  },[])
  const EditId = elements.id;
  const [editUser, setEditUser] = useState({
    title: elements.title,
    id : elements.id,
    isbn: elements.isbn,
    status: elements.status,
    pageCount: elements.pageCount,
  });
  const handleChange = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });
  };
  const EditApiCall = async (EditId, loadUsers) => {
    await axios.put(`http://localhost:8000/users/${EditId}`, editUser).then((res)=> {
      console.log(res);
      toast.success("Data updated successfully!", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/");
      setEditUser(editUser);
      loadUsers();
    }).catch((e)=> {
      console.log(e);
      toast.error(e.message, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    })
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-outline-primary "
        onClick={openModal}
      >
        <i class="far fa-edit"></i> Edit
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
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
              value={editUser.title}
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
              value={editUser.isbn}
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
                value={editUser.status}
                onChange={(e) => {
                  handleChange(e);
                }}
                required
              />
              <div className="invalid-feedback">Please enter a status.</div>
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
                value={editUser.pageCount}
                onChange={(e) => {
                  handleChange(e);
                }}
                required
              />
              <div className="invalid-feedback">Please enter page Count.</div>
            </div>
          </div>

          <div className="col-12  text-center">
            <button
              type="button"
              data-bs-dismiss="modal"
              aria-label="Close"
              className="btn btn-success m-2"
              onClick={() => {
                EditApiCall(EditId, loadUsers);
                closeModal();
              }}
            >
              Edit Book Data
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="btn btn-danger m-2"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Edit_react_modal;
