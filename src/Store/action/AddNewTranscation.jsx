const AddNewTransaction = (data) => {
    return (dispatch) => {
        dispatch({ type: 'AddNewTrasaction', data: data })
    }
}

export default AddNewTransaction
