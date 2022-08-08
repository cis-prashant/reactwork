import React, { useState, useEffect } from "react";
import axios from "axios";
import Edit_react_modal from "../users/Edit_react_modal";
import View from "../users/View";
import { useDispatch, useSelector } from "react-redux";
import { setloadUsers } from "../Redux/Action/Action";
import { toast } from "react-toastify";

const Home = () => {
  let token = localStorage.getItem("token");
  const products = useSelector((state) => state.callReducer.firstState);
  const dispatch = useDispatch();
  const jsonData = JSON.stringify(products);
  useEffect(() => {
    loadUsers();
  }, [jsonData, setloadUsers]);

  async function loadUsers() {
    try {
      const result = await axios.get("http://localhost:8000/api/v1/bookAll", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setloadUsers(result.data));
    } catch (error) {
      console.log("error =>", error);
    }
  }

  const deleteUserData = async (id) => {
    console.log(id, token);
    if (window.confirm("Do You want to delete!")) {
      await axios
        .delete(
          `http://localhost:8000/api/v1/books/delete/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          toast.success("Deleted Successfully", { autoClose: 2000 });
        })
        .catch((e) => {
          toast.error(e.message, { autoClose: 2000 });
        });
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
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Author</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.resData &&
              products.resData.map((element, index) => {
                return (
                  <>
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{element._id}</td>
                      <td>{element.name}</td>
                      <td>{element.author}</td>
                      <td>
                        <View elements={element} />

                        <Edit_react_modal
                          elements={element}
                          loadUsers={loadUsers}
                        />
                        <a
                          className="btn btn-danger m-2"
                          onClick={() => {
                            deleteUserData(element._id);
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
