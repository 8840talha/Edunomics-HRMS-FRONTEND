import React, { useReducer } from 'react'
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import './ChangeDetail.css';


const userStyle = makeStyles(theme => ({
    form: {

        padding: theme.spacing(2),

        display: 'flex',
        flexDirection: 'column'
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

        // making request for editting detail to admin
        const tokenKey = localStorage.getItem('token');
        fetch('https://hrms-project.herokuapp.com/api/editdetail',
            {
                method: 'post', body: newdata,
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ` + tokenKey }
            })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    console.log('hellllo');
                    throw new Error(res.status);
                }
                return res.json();
            })
            .then(response => {
                alert('request for Change In Detail successfully sent');
                props.history.push('/mydetails')
            })
            .catch(err => {
                alert('Some error occurred. Try again later')
            })

    }

    return (
        <Paper className={classes.changePaper} elevation={24}>


            <div className="changeDetailContainer">
                <h1 >Request For Detail Change</h1>
            </div>
            <div className="changepara">

                <input value={userInput.name} className='inpp' onChange={handleChange} name="name" placeholder="FirstName" type="Text" />

                <input value={userInput.email} className='inpp' onChange={handleChange} name="email" placeholder="Email" type="email" />
                <input value={userInput.phone} className='inpp' onChange={handleChange} name="phone" placeholder="Phone" type="contact" />
                <input value={userInput.category} className='inpp' onChange={handleChange} name="category" placeholder="Category" type="Text" />
                <input value={userInput.role} className='inpp' onChange={handleChange} name="role" placeholder="Role" type="contact" />

                <button className='changeDetBtn' onClick={handleSubmit}>Send Requests</button>
            </div>



        </Paper >

    )

}
export default ChangeDetails;