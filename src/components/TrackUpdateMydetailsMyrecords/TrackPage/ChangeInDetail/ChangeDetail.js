import React, { useReducer } from 'react'
import { Paper, InputBase, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import './ChangeDetail.css';
import { withRouter } from 'react-router';

const userStyle = makeStyles(theme => ({
    form: {

        padding: theme.spacing(2),

        display: 'flex',
        flexDirection: 'column'
    },
    inpp: {
        border: '1px solid Green',
        width: '100%',
        marginTop: '5px',
        height: '35px'
    },
    saveBtn: {
        width: '100%',
        marginTop: theme.spacing(1),
        textDecoration: 'none',
        backgroundColor: 'green',
        textAlign: 'center'
    },
    changePaper: {
        marginTop: theme.spacing(24),
        margin: theme.spacing(35),
        width: '700px',
        height: '500px',
        paddingTop: theme.spacing(2)
    },
    changeDetBtn: {
        textAlign: 'center',
        margin: theme.spacing(3),
        marginLeft: theme.spacing(22),
        height: '40px',
        backgroundColor: 'green',
        color: '#fff',
        width: '150px',
        border: 'none',
    }

}))
const ChangeDetails = (props) => {
    const classes = userStyle();


    const [userInput, setUserInput] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
            name: '',
            email: '',

            phone: '',
            category: '',
            role: ''

        }
    );
    const handleChange = evt => {
        const name = evt.target.name;
        const newValue = evt.target.value;
        setUserInput({ [name]: newValue });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log(userInput)

        var data = {

        }
        if (userInput.name !== "") {
            data.name = userInput.name
        }
        if (userInput.email !== "") {
            data.email = userInput.email
        }
        if (userInput.phone !== "") {
            data.phone = userInput.phone
        }
        if (userInput.category !== "") {
            data.category = userInput.category
        }
        if (userInput.role !== "") {
            data.role = userInput.role
        }


        console.log(data)
        var newdata = JSON.stringify(data);
        console.log(newdata)
        alert('requested')
        //  props.history.push('/mydetails')

    }

    return (
        <Paper className={classes.changePaper} elevation={24}>


            <div className="changeDetailContainer">
                <h1>Request For Detail Change</h1>
            </div>
            <div className="changepara">

                <input value={userInput.name} className={classes.inpp} onChange={handleChange} name="name" placeholder="FirstName" type="Text" />
                {/* <input value={userInput.lastname} className={classes.inpp} onChange={handleChange} name="lastname" placeholder="LastName" type="text" /> */}
                <input value={userInput.email} className={classes.inpp} onChange={handleChange} name="email" placeholder="Email" type="email" />
                <input value={userInput.phone} className={classes.inpp} onChange={handleChange} name="phone" placeholder="Phone" type="contact" />
                <input value={userInput.category} className={classes.inpp} onChange={handleChange} name="category" placeholder="Category" type="Text" />
                <input value={userInput.role} className={classes.inpp} onChange={handleChange} name="role" placeholder="Role" type="contact" />
                {/* <input value={userInput.join} className={classes.inpp} onChange={handleChange} name="join" placeholder="Join Date" type="date" /> */}
                <button className={classes.changeDetBtn} onClick={handleSubmit}>Send Requests</button>
            </div>



        </Paper >

    )

}
export default ChangeDetails;