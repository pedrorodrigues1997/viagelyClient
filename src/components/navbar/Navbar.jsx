import React, { useEffect, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import "./Navbar.scss";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom"

function Navbar() {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [openCurrency, setOpenCurrency] = useState(false);
  const [openLanguages, setOpenLanguages] = useState(false);

  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (pathname === "/") {
        window.scrollY > 0 ? setActive(true) : setActive(false);
      }else{
        setActive(true);
      }
    };

    handleScroll(); //Chamo aqui para ir buscar um estado inicial(Na home page será branco (Active a false) e noutra pagina qq é active true(logo preto),
    // assim a funcionalidade de mudar de cor apenas resulta na Homepage)
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);


  const navigate = useNavigate();

  const handleLogout = async () =>{

          try{
              await newRequest.post("/auth/logout");
              localStorage.setItem("currentUser", null);
              navigate("/");
          }catch(err){
            console.log(err);
          }


  }

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link className="links" to="/">
          {active ? (
              <img className="logoImage" src="/img/ViagelyBlack.svg" alt="Navbar Icon"/>
            ) : (
              <img className="logoImage" src="/img/ViagelyWhite2.svg" alt="Navbar Icon"/>
            )}
          </Link>
          
        </div>
        <div className="links">
          <span>English</span>
          <Link className="link" to= "/ads"><span>Explore</span></Link>
          {currentUser ? (
            <div className="user" onClick={()=>setOpen(!open)}>
              <img
                src={currentUser.image || "/img/noavatar.png"}
                alt=""
              />
              <span>{currentUser?.username}</span>
              {open && <div className="options">
                
                  
                    <Link className="link" to="/mygigs">
                      Ads
                    </Link>
                    <Link className="link" to="/add">
                      Create a new Add
                    </Link>
                  <Link className="link" to="/orders">
                    Purchased Iteneraries
                  </Link>
                  <Link className="link" onClick={handleLogout}>
                    Logout
                  </Link>
              </div>}
            </div>
          ) : (
            <>
              <Link to = "/login" className="link">Sign in</Link>
              <Link className="link" to="/register">
                <button>Join</button>
              </Link>
            </>
          )}
        </div>
      </div>
      {(active || pathname !== "/") && (
        <>
          <hr />
          <div className="menu">
            <Link className="link menuLink" to="/">
              Graphics & Design
            </Link>
            <Link className="link menuLink" to="/">
              Video & Animation
            </Link>
            <Link className="link menuLink" to="/">
              Writing & Translation
            </Link>
            <Link className="link menuLink" to="/">
              AI Services
            </Link>
            <Link className="link menuLink" to="/">
              Digital Marketing
            </Link>
            <Link className="link menuLink" to="/">
              Music & Audio
            </Link>
            <Link className="link menuLink" to="/">
              Programming & Tech
            </Link>
            <Link className="link menuLink" to="/">
              Business
            </Link>
            <Link className="link menuLink" to="/">
              Lifestyle
            </Link>
          </div>
          <hr />
        </>
      )}
    </div>
  );
}

export default Navbar;
