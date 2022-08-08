import React, { useState, useEffect } from "react";
import axios from "axios";
import Edit_react_modal from "../users/Edit_react_modal";
import View from "../users/View";
import { useDispatch, useSelector } from "react-redux";
import { setloadUsers } from "../Redux/Action/Action";
import { toast } from "react-toastify";

const Home = () => {
  const products = useSelector((state) => state.callReducer.firstState);
  const dispatch = useDispatch();
  const jsonData = JSON.stringify(products);
  useEffect(() => {
    loadUsers();
  }, [jsonData, setloadUsers]);

  async function loadUsers() {
    try {
      const result = await axios.get("http://localhost:8000/users");
      dispatch(setloadUsers(result.data));
    } catch (error) {
      console.log("error =>", error.result);
    }
  }

  const deleteUserData = async (id) => {
    if (window.confirm("Do You want to delete!")) {
      await axios.delete(`http://localhost:8000/users/${id}`).then(res => {
        toast.success('Deleted Successfully',{autoClose:2000})
      }).catch(e=> {
        toast.error('Error',{autoClose:2000})
      })
      loadUsers();
    }
  };

  return (
    <>
      <div className=" container">
        <h1>Home</h1>
        <table class="table table-hover shadow border  text-center ">
          <thead className=" table-dark">
            <tr>
              <th scope="col">Sno</th>
              <th scope="col">Title</th>
              <th scope="col">ISBN</th>
              <th scope="col">Status</th>
              <th scope="col">Page Count</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((element, index) => {
                return (
                  <>
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{element.title}</td>
                      <td>{element.isbn}</td>
                      <td>{element.status}</td>
                      <td>{element.pageCount}</td>
                      <td>
                        <View elements={element} />

                        <Edit_react_modal
                          elements={element}
                          loadUsers={loadUsers}
                        />
                        <a
                          className="btn btn-danger m-2"
                          onClick={() => {
                            deleteUserData(element.id);
                          }}
                        >
                          <i class="far fa-trash-alt"></i> Delete
                        </a>
                      </td>
                    </tr>
                  </>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
