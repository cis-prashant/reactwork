import Modal from "react-modal";
import React, { useState } from "react";
import axios from "axios";
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

const View = ({ elements }) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  const EditId = elements.isbn;
  const [editUser, setEditUser] = useState({
    title: elements.title,
    isbn: elements.isbn,
    status: elements.status,
    pageCount: elements.pageCount,
  });
  return (
    <>
      <button
        type="button"
        class="btn btn-outline-primary m-2 "
        onClick={openModal}
      >
       <i class="fas fa-eye"></i> View
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">ISBN</th>
              <th scope="col">Status</th>
              <th scope="col">Page Count</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{elements.title}</td>
              <td>{elements.isbn}</td>
              <td>{elements.status}</td>
              <td>{elements.pageCount}</td>
            </tr>
          </tbody>
        </table>
        <button
              type="button"
              onClick={closeModal}
              class="btn btn-danger m-2"
            >
              Cancel
            </button>
      </Modal>
    </>
  );
};

export default View;
