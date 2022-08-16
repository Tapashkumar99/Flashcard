import React, { useState } from "react";
import TextField from "./TextField";
import { useFormik, Form, Field } from "formik";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

// redux -------------
import { deleteInputBox, addGroup } from "../../redux/action/Action";
import { useDispatch, useSelector } from "react-redux";

const CreateGroup = () => {
  // components start

  const dispatch = useDispatch();
  const state = useSelector((state) => state.Reducer);
  // console.log('s ', state)

  // formik initial values---------
  const initialValues = {
    groupName: "",
    description: "",
  };

  // onsubmit form handler
  const onSubmit = (values) => {
    values.groupName = "";
    values.description = "";
  };

  // formik state ----
  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  // const ref = useRef(null);
  const [editInputValue, setEditInputValue] = useState();

  const focusHandler = (value) => {
    // ref.current.focus();
    setEditInputValue(value);
  };

  // clickhandler for create a group
  const [titleErr, setTitleErr] = useState();
  const [descripErr, setDiscripErr] = useState();
  const [termErr, setTermErr] = useState("");

  const createGroup = () => {
    formik.values.groupName.length < 3 ? setTitleErr(true) : setTitleErr(false);
    formik.values.description.length < 20
      ? setDiscripErr(true)
      : setDiscripErr(false);
    // for term alert
    if (state.inputData.length === 0) {
      setTermErr("This field also required");
    } else {
      setTermErr("");
    }
    if (
      !(
        formik.values.groupName.length <= 3 ||
        formik.values.description.length <= 20 ||
        state.inputData.length === 0
      )
    ) {
      dispatch(
        addGroup({
          state: state.inputData,
          group: {
            groupName: formik.values.groupName,
            description: formik.values.description,
          },
        })
      );

      formik.values.groupName = "";
      formik.values.description = "";
      setTermErr("");
    }
  };
  return (
    <>
      <Form>
        <header className="">
          {/* <form onSubmit={formik.handleSubmit}> */}
          {/* --- top group title ------------------*/}
          <div className="mt-5 sm:px-14 px-10 py-7 bg-white rounded-md shadow-lg">
            <div className="flex flex-col mb-4">
              <label
                htmlFor="groupname"
                className="text-gray-600 pb-3 font-medium"
              >
                Create Group*
              </label>
              <Field
                type="text"
                name="groupName"
                id="groupname"
                required
                // value={formik.values.groupName}
                // onChange={formik.handleChange}
                placeholder="Add Group name"
                className="py-2 px-5 outline outline-2 outline-gray-400 rounded border-r-8 md:w-96"
              />
              {titleErr ? (
                <small className="text-red-600 text-sm">
                  Write at least 5 character{" "}
                </small>
              ) : null}
            </div>
            <div className="flex flex-col">
              <label htmlFor="role" className="text-gray-600 pb-3 font-medium">
                Add description
              </label>
              <textarea
                type="textarea"
                name="description"
                id="role"
                required
                // value={formik.values.description}
                // onChange={formik.handleChange}
                placeholder="Add about you"
                className="py-3 px-5 outline outline-2 outline-gray-400 rounded border-r-8 h-35"
              ></textarea>
              {descripErr ? (
                <small className="text-red-600 text-sm">
                  Write at least 5 words{" "}
                </small>
              ) : null}
            </div>
          </div>

          {/*-------------------- dynamic box creator ---------- */}
          <div className="mt-6 sm:px-14 px-10 py-7 bg-white rounded-md shadow-lg">
            <div className="text-red-600 text-sm">{termErr}</div>

            {state.inputData.length >= 0 &&
              state.inputData.map((elem, index) => (
                <div
                  key={index}
                  className="mb-4 flex flex-col sm:justify-start sm:flex-row "
                >
                  <div className="relative flex flex-col mb-3 sm:mb-0 w-full sm:w-2/6 mr-4 ">
                    <span id="num" className="bg-red-600">
                      {index + 1}
                    </span>
                    <label
                      htmlFor="term"
                      className="text-gray-600 pb-3 font-medium"
                    >
                      Enter Term*
                    </label>
                    <Field
                      type="text"
                      id="term"
                      name="term"
                      value={
                        index === editInputValue
                          ? formik.values.term
                          : elem.term
                      }
                      onChange={formik.handleChange}
                      placeholder="Write title here..."
                      className="py-2 px-5 outline outline-2 rounded outline-gray-400 border-r-8"
                    />
                    {formik.errors.term ? (
                      <small className="text-red-600 text-sm">
                        {formik.errors.term}
                      </small>
                    ) : null}
                  </div>
                  <div className="flex flex-col  w-full sm:w-2/6  mr-4">
                    <label
                      htmlFor="define"
                      className="text-gray-600 pb-3 font-medium"
                    >
                      Enter Defination*
                    </label>
                    <textarea
                      id="define"
                      name="defination"
                      value={
                        index === editInputValue
                          ? formik.values.term
                          : elem.defination
                      }
                      onChange={formik.handleChange}
                      placeholder="Write defination here..."
                      className="py-2 px-5 outline outline-2 rounded outline-gray-400 border-r-8"
                    ></textarea>
                    {formik.errors.defination ? (
                      <small className="text-red-600 text-sm">
                        {formik.errors.defination}
                      </small>
                    ) : null}
                  </div>
                  <div className="flex justify-end items-end sm:mt-0 mt-2">
                    <button
                      className="px-5 text-2xl py-2 text-blue-700 rounded-md mr-2"
                      onClick={() => focusHandler(index)}
                    >
                      <AiOutlineEdit />
                    </button>
                    <button
                      className="px-5 py-2 rounded text-2xl text-red-700"
                      onClick={() => dispatch(deleteInputBox(index))}
                    >
                      <AiOutlineDelete />
                    </button>
                  </div>
                </div>
              ))}
            <TextField />
          </div>
          <div className="py-20 flex justify-center items-center ">
            {
              <button
                className="bg-red-700 text-yellow-50 px-14 py-2 rounded-md"
                onClick={createGroup}
              >
                Create
              </button>
            }
          </div>
        </header>
      </Form>
    </>
  );
};

export default CreateGroup;
