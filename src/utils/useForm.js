import { useState } from 'react'

const useForm = (callback, initialState) => {
    const [values, setValues] = useState(initialState)

    const onChange = (e, num, updateAndSubmit) => {
        // console.log(values)
        setValues({ ...values, [e.target.name]: num ? parseInt(e.target.value) : e.target.value })
        // console.log(values)
        // updateAndSubmit && onSubmit(e)
    }

    function onSubmit(e) {
        e.preventDefault()
        callback()
    }

    return { onChange, onSubmit, values }
}

export default useForm