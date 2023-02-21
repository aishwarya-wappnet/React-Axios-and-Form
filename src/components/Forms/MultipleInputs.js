import React, { useState, useEffect } from 'react';

const MultipleInputs = () => {

    const [userRegistration, setUserRegistration] = useState({
        username: '',
        email: '',
        phone: '',
        password: ''
    });
    const [records, setRecords] = useState([]);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        // console.log(name, value);
        setUserRegistration({ ...userRegistration, [name]: value }); // [name] will take name as the key
    }

    const validate = (values) => {
        const errors = {};
        const regex = /[a-zA-Z0-9_\-\.]+[@][a-z]+[\.]+[a-z]{2,3}/;
        if(!values.username) errors.username = "*Username is required";
        if(!values.email) errors.email = "*Email is required";
        else if(!regex.test(values.email)) errors.email = "*This is not a valid email format";
        if(!values.phone) errors.phone = "*Phone is required";
        else if(values.phone.length !== 10) errors.phone = "*Enter a valid phone number"
        if(!values.password) errors.password = "*Password is required";
        else if(values.password.length < 4) errors.password = "*Password must be at least 4 characters";
        else if(values.password.length > 10) errors.password = "*Password must be not more than 10 characters";

        return errors;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(userRegistration));
        setIsSubmit(true);
        const newRecord = { ...userRegistration, id: new Date().getTime().toString() };
        setRecords([...records, newRecord]); // adding current record to the already existing record.
        setUserRegistration({ username: '', email: '', phone: '', password: '' });
    }   

    useEffect(() => {
        if(Object.keys(formErrors).length === 0 && isSubmit){
            console.log(userRegistration);
        }else{
            console.log(formErrors);
        }
    }, [formErrors]);

    return (
        <>
        <h1>User Registration</h1>
        { Object.keys(formErrors).length === 0 && isSubmit ? 
        (
            <p style={{ color: 'green' }}>Registration Successfull!</p>
        ) :
        (
            <p></p>
        )}
        <form action=""  onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Fullname: </label>
                <input type="text" name="username" id="usernameS" autoComplete='off' value={userRegistration.username} onChange={handleInput}/>
            </div>
            <p style={{color: 'red'}}>{ formErrors.username }</p>
            <div>
                <label htmlFor="email">Email: </label>
                <input type="text" name="email" id="email" autoComplete='off' value={userRegistration.email} onChange={handleInput}/>
            </div>
            <p style={{color: 'red'}}>{ formErrors.email }</p>
            <div>
                <label htmlFor="phone">Phone: </label>
                <input type="text" name="phone" id="phone" autoComplete='off' value={userRegistration.phone} onChange={handleInput}/>
            </div>
            <p style={{color: 'red'}}>{ formErrors.phone }</p>

            <div>
                <label htmlFor="password">Password: </label>
                <input type="password" name="password" id="password" autoComplete='off' value={userRegistration.password} onChange={handleInput}/>
            </div>
            <p style={{color: 'red'}}>{ formErrors.password }</p>
            <button type="submit">Submit</button>
        </form>
        {/* display data */}
        <div>
            <pre>{ JSON.stringify(userRegistration, undefined, 2) }</pre>
            {
                records.map((record) => {
                    const { id, username, email, phone, password } = record;
                    return (
                    <div key={id}>
                        <h1>User Details:</h1>
                        <p>Name: { username }, Email: { email }, Phone: { phone }, Password: { password }</p>
                    </div>
                    );
                })
            }
        </div>
        </>
    )
}

export default MultipleInputs;