import React, { useEffect, useState } from 'react';
import './App.css';
import img from "./assets/th.jpeg"
import github_img from "./assets/github.jpg"
import error_img from "./assets/error.png"
import axios from 'axios';


const App = () => {
  const [inputValue , setInputValue] = useState("");
  const [userInfo , setUserInfo] = useState("");
  const [error , setError] = useState(false);
  const [api , setApi] = useState(false);

  useEffect(()=>{
    axios
    .get(`https://api.github.com/users/${inputValue}`)
    .then((res)=>{
      setUserInfo(res.data);
      setError(false);
      setInputValue("")
    })
    .catch((err)=>{
      console.log(err);
      setError(true)
  }) 
  // eslint-disable-next-line
  },[api]);

  const Controller = (e) => {
    e.preventDefault();
    if(!inputValue){
      alert("Filed is empty")
      return;
    }
    setApi(!api)
}
  return (
    <>
<nav className="navbar navbar-expand-lg navbar-light mb-5">
    <a className="navbar-brand" href='_'>
    <i className="fa-brands fa-github"></i>{" "}
      Github
    </a>
    <button
     className="navbar-toggler"
     type="button"
     data-toggle="collapse"
     data-target="#navbarSupportedContent"
     aria-controls="navbarSupportedContent"
     aria-expanded="false"
     aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>

  <div className="collapse navbar-collapse Input-Field" id="navbarSupportedContent">
    <form onSubmit={Controller} className="form-inline">
      <input 
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className={"Input"}
        placeholder="Search or jump to ..."
      />
    </form>    
  </div>
</nav>

         {error === false ? ( 
        <>         
         <section className="card mx-auto Card-Box" style={{ maxWidth: 740}}>
          <div className="row no-gutters">
            <div className="col-md-5">
              <img src={userInfo ? userInfo.avatar_url : img} className="w-100 h-100" alt="..." />
            </div>
            <div className="col-md-7">
              <div className="card-body"> 
              <h3 className="card-title">{userInfo ? userInfo.name : "Github"}</h3>
              <h5 className="card-title">{userInfo.login}</h5>
              <div className='d-flex'>
                <span className="material-symbols-outlined icon">{userInfo ? "location_on" : ""}</span> 
                <h6 className="card-title">{userInfo ? userInfo.location : "" }</h6>
              </div>
              <div className="Follow-Div">
                     <h5 className="card-title">{userInfo.followers} followers  </h5>
                     <h5 className="card-title">{userInfo.following} following  </h5>
              </div>
              <p> <span style={{fontWeight : "bold"}}>Bio</span>  <br /> {userInfo.bio}</p>
             <div className="Bio-Data">
                 <p> <span>Public Repo</span> <br /> {userInfo.public_repos} </p>
                 <p> <span>Public Gists</span>  <br /> {userInfo.public_gists}</p>
                 <p> <span>Blog</span> <br /> {userInfo.blog}</p>
             </div>
             </div>
            </div>
          </div>
         </section>  
         <img src={github_img} className="Github_Img " alt="" />
        </>
        ) : (
        <div>
          <img src={error_img} style={{width : "100%"}} alt="" />
        </div>
        )}
    </>
  )};
export default App;


