    import React, { useState } from "react";;

const BasicForm = () => {

    // we directly cannot change email, password, allEntry. These are state values which are constants.
    // Thats why we have function to modify value.
    const [email, setEmail] = useState(""); // users value is getting stored in this state.
    const [password, setPassword] = useState("");
    const [allEntry, setAllEntry] = useState([]);


    const submitForm = (e) => {
        e.preventDefault();

        if(email && password){
        const newEntry = { id: new Date().getTime().toString(), email, password }; // added data in new object
        setAllEntry([...allEntry, newEntry]); // added the object to array. [...allEntry] beacause we want all the data to be stored that entered before.
        // console.log(allEntry)
        setEmail("");
        setPassword("");
        }else{
            alert("Please fill all the fields!");
        }
    }

    return(
        <>
        <form action="" onSubmit={submitForm}>
            <div>
                <label htmlFor="email">Email</label>
                <input type="text" name="email" id="email" autoComplete="off" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" autoComplete="off" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button type="submit">Login</button>
        </form>
        {/* display data */}
        {
            allEntry.map((curElement) => {
                const { id, email, password } = curElement;
                return (
                    <div className="showDataStyle" key={id}>
                        <p>{email}</p>
                        <p>{password}</p>
                    </div>
                )
            })
        }
        </>
    )
}

export default BasicForm;