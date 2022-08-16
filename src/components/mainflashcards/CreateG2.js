import React from 'react'
import Grouptitle from './Grouptitle';
import TextField2 from './TextField2';
import { useFormik } from 'formik';
import DynamicBox from './DynamicBox';
import { useDispatch, useSelector } from 'react-redux';
import { addGroup } from '../../redux/action/Action';

const CreateG2 = () => {

  const dispatch = useDispatch();
  const state = useSelector(state => state.Reducer.inputData);

  const initialValues = {
    groupName: "",
    description: "",
    term: "",
    defination: ""
  }

  const onSubmit = values => {
    console.log('subit data: ', values)
    const curentValue ={
      term:formik.values.term,
      defination:formik.values.defination
    }

    state.push(curentValue);
    dispatch(addGroup(
      {
        state,
        group: { groupName: formik.values.groupName, description: formik.values.description }
      }))
    formik.resetForm()
  }

  const validate = values => {
    let errors = {};

    if (values.groupName.length < 3) {
      errors.groupName = 'Please add minimum 3 characters'
    }
    if (values.description.length < 15) {
      errors.description = 'Please add minimum 15 words'
    }
    if (values.term.length < 3) {
      errors.term = "Please add minimum 3 characters"
    }
    if (values.defination.length < 15) {
      errors.defination = "Please add minimum 15 words "
    }
    return errors
  }

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grouptitle formik={formik} />
      {/*-------------------- dynamic box creator ---------- */}
      <div className='mt-6 sm:px-14 px-10 py-7 bg-white rounded-md shadow-lg'>
        <DynamicBox />
        <TextField2 formik={formik} />
      </div>
      <div className='py-20 flex justify-center items-center '>
        <button
          className='focus:outline-none focus:ring focus:ring-blue-200 bg-red-700 text-yellow-50 px-14 py-2 rounded-md'>
          Create
        </button>
      </div>
    </form>
  )
}

export default CreateG2;