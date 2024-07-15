import React, {useState} from "react";
import {useSelector} from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loggedOut } from "../../../redux-setup/reducers/auth";
const Header = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const changeKeyword = (e)=>setKeyword(e.target.value);
  const clickSearch = (e)=>{
    e.preventDefault();
    return navigate(`/Search?keyword=${keyword}`);
  }
  const totalCart = useSelector(({Cart})=>{
    return Cart.items.reduce((total, item)=>total + item.qty, 0);
  });

  const logged = useSelector(({Auth})=>Auth.login.logged)
  const customer = useSelector(({Auth})=>Auth.login.currentCustomer?.customer)
  
  const clickLogout = (e)=>{
    e.preventDefault();
    dispatch(loggedOut())
  }
  return (
    <>
      {/*	Header	*/}
      <div id="header">
        <div className="container">
          <div className="row">
            <div id="logo" className="col-lg-3 col-md-12 col-sm-12">
              <h1>
                <Link to="/">
                  <img className="img-fluid" src="images/logo.png" />
                </Link>
              </h1>
            </div>
            <div id="search" className="col-lg-4 col-md-12 col-sm-12">
              <form className="form-inline">
                <input
                  onChange={changeKeyword}
                  className="form-control mt-3"
                  type="search"
                  placeholder="Tìm kiếm"
                  aria-label="Search"
                />
                <button onClick={clickSearch} className="btn btn-danger mt-3" type="submit">
                  Tìm kiếm
                </button>
              </form>
            </div>
            <div id="cart" className="col-lg-5 col-md-12 col-sm-12">
              
                {
                  logged?
                  <>
                  <i class="fa-solid fa-user mr-1"></i>
                  <Link class="mr-2" to="/customer">{customer?.fullName}</Link>|
                  <a  onClick={clickLogout} class="mr-2 ml-2" href="/">Đăng xuất</a>| 
                  </>
                  :
                  <>
                  <Link class="mr-2" to="/login">Đăng nhập</Link>|
                  <Link class="mr-2 ml-2" to="/register">Đăng ký</Link>| 
                  </>
                }
              <a className="mt-4 mr-2" href="#">
                giỏ hàng
                <ul>
                  <li><Link to="/Cart"><i class="fas fa-shopping-cart"></i> Giỏ hàng của bạn</Link></li>
                  <li><Link to={`/Order-${customer?._id}`}><i class="fas fa-file-alt"></i> Đơn hàng đã mua</Link></li>
                </ul>
              </a>

              <span className="mt-3">{totalCart}</span>
            </div>
          </div>
        </div>
        {/* Toggler/collapsibe Button */}
        <button
          className="navbar-toggler navbar-light"
          type="button"
          data-toggle="collapse"
          data-target="#menu"
        >
          <span className="navbar-toggler-icon" />
        </button>
      </div>
      {/*	End Header	*/}
    </>
  );
};
export default Header;
