import React, { useState, useEffect } from 'react';
import axios from './axios'

const AxiosData = () => {
console.log(axios.get());
const API = 'https://jsonplaceholder.typicode.com';
const [myData, setMyData] = useState([]);
const [isError, setIsError] = useState("");
// Note: using Promises

// useEffect(() => {
//   axios.get(API+'/posts)
//   .then((res) => setMyData(res.data))  
//   .catch((error) => {
//     setIsError(error.message);
//   });
// }, [])

// Note: using async await

const getApiData = async () => {
  try{
    console.log(axios)
  const res = await axios.get('/posts');
  setMyData(res.data);
  } catch(error) {
    setIsError(error.message);
  }
}

useEffect(() => {
  getApiData();
}, []);

return (
  <>
  <h1>Axios</h1>
  {console.log(isError !== "")}
  {isError !== "" && <h2>{isError}</h2>}
  <div className="grid">
    {myData.slice(0, 12).map((post) => {
      const {id, title, body} = post;
      return <div className="card" key={id}>
        <h2>{title.slice(0, 15).toUpperCase()}</h2>
        <p>{body.slice(0, 100)}</p>
      </div>
    })}
  </div>
  </>
);
}

export default AxiosData;