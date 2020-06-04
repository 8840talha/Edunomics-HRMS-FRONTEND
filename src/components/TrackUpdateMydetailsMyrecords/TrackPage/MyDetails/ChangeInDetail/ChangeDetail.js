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
            firstname: '',
            lastname: '',
            mobile: '',
            email: '',
            address: '',
            zip: '',
            join: ''

        }
    );
    const handleChange = evt => {
        const name = evt.target.name;
        const newValue = evt.target.value;
        setUserInput({ [name]: newValue });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(userInput)
        var data = {
            "firstname": userInput.firstname,
            "lastname": userInput.lastname,
            "mobile": userInput.mobile,
            "email": userInput.email,
            "address": userInput.address,
            "zip": userInput.zip,
            "join": userInput.join
        }
        var newdata = JSON.stringify(data);
        console.log(newdata)
        alert('requested')
       props.history.push('/mydetails')

    }
   
    return (
        <Paper className={classes.changePaper} elevation={24}>


            <div className="changeDetailContainer">
                <h1>Request For Detail Change</h1>
            </div>
            <div className="changepara">

                <input value={userInput.firstname} className={classes.inpp} onChange={handleChange} name="firstname" placeholder="FirstName" type="Text" />
                <input value={userInput.lastname} className={classes.inpp} onChange={handleChange} name="lastname" placeholder="LastName" type="text" />
                <input value={userInput.mobile} className={classes.inpp} onChange={handleChange} name="mobile" placeholder="Mobile" type="contact" />
                <input value={userInput.email} className={classes.inpp} onChange={handleChange} name="email" placeholder="Email" type="email" />
                <input value={userInput.address} className={classes.inpp} onChange={handleChange} name="address" placeholder="Address" type="Text" />
                <input value={userInput.zip} className={classes.inpp} onChange={handleChange} name="zip" placeholder="Zip Code" type="contact" />
                <input value={userInput.join} className={classes.inpp} onChange={handleChange} name="join" placeholder="Join Date" type="date" />
                <button className={classes.changeDetBtn} onClick={handleSubmit}>Send Requests</button>
            </div>



        </Paper >

    )

}
export default withRouter(ChangeDetails);