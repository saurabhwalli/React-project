import React, { useEffect, useState } from "react";
// import "./Style.css";

//Get data from Local Storage ------------

const getLocalData = () => {
  const lists = localStorage.getItem("mytodolist");

  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputData, setInputData] = useState();
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleBtn, setToggleBtn] = useState(false);

  // AddItems here- --------------

  const AddItems = () => {
    if (!inputData) {
      alert("Please..fill the data");
    } else if (inputData && toggleBtn) {
      setItems(
        items.map((curElem) => {
          if (curElem.id === isEditItem) {
            return { ...curElem, name: inputData };
          }
          return curElem;
        })
      );
      setInputData(""); 
      setIsEditItem(null);
      setToggleBtn(false);
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };

      setItems([...items, myNewInputData]);
      setInputData("");
    }
  };

  //Edit Items ------------------

  const editItem = (index) => {
    const editedData = items.find((curElem) => {
      return curElem.id === index;
    });

    setInputData(editedData.name);
    setIsEditItem(index);
    setToggleBtn(true);
  };

  //Delete Items ---------------

  const deleteItem = (index) => {
    const updatedItems = items.filter((curElem) => {
      return curElem.id !== index;
    });
    setItems(updatedItems);
  };

  //Remove All ------------

  const removeAll = () => {
    return setItems([]);
  };

  //Adding to Local Storage ------

  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="text-center">
        <div>
          <figure>
            <h3 className="mt-3" style={{backgroundColor: "hotpink", width: "fit-content", margin:"0 auto"}}> 
            Todo List By Using Hooks</h3>
            <figcaption className="heading"> Add your List Here</figcaption>
          </figure>

          {/* Add Items */}

          <div className="main-div">
            <input
              type="text"
              placeholder="Add Items..."
              value={inputData}
              className="input"
              onChange={(e) => setInputData(e.target.value)}
            />

            {toggleBtn ? (
              <i
                className="fa-sharp fa-solid fa-pen-to-square icon3"
                title="Add"
                onClick={AddItems}></i>
            ) : (
              <i
                className="fa-solid fa-plus icon1 fa-lg"
                title="Add"
                onClick={AddItems}
              />
            )}
          </div>

          <div className="showItems">
            {/* Edit Itmes */}
            {/* Delete Items */}

            {items.map((curElem) => {
              return (
                <div className="eachItem" key={curElem.id}>
                  <span>{curElem.name}</span>
                  <i
                    className="fa-sharp fa-solid fa-pen-to-square icon3"
                    title="Edit"
                    onClick={() => editItem(curElem.id)}
                  ></i>
                  <i
                    className="fa-solid fa-trash icon2"
                    title="Delete"
                    onClick={() => deleteItem(curElem.id)}
                  ></i>
                </div>
              );
            })}
          </div>

          {/* Remove All */}

          <div>
            <button className="btn btn-primary my-btn" onClick={removeAll}>
              <span>Remove All</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
