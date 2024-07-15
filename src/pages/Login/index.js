import { useState } from "react";
import {loginCustomer} from "../../services/Api"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {loginSuccess} from "../../redux-setup/reducers/auth"
const Login = () => {
  const [inputsCustomer, setInputsCustomer] = useState({})
  const [errorLogin, setErrorLogin] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const changeInputsCustomer = ({target: {value,name}}) => {
    setInputsCustomer({
     ...inputsCustomer,
      [name] : value
    })
    setErrorLogin(false)
  }
  const clickLogin = (e)=>{
    e.preventDefault();
    loginCustomer(inputsCustomer)
    .then(({data})=>{
        dispatch(loginSuccess(data))
        return navigate("/")
    })
    .catch((error)=>{
        setErrorLogin(true)
    })
  }
  return (
    <>
    {/*	Register Form	*/}
    <div id="customer">
        
        {
            errorLogin && <div className="alert alert-danger text-center">Thông tin Email hoặc Password không hợp lệ!</div>
        }
    <h3 className="text-center">Đăng nhập</h3>
    <form method="post">
        <div className="row">
        <div id="customer-mail" className="col-lg-6 col-md-6 col-sm-12">
            <input onChange={changeInputsCustomer} placeholder="Email (bắt buộc)" type="text" name="email" className="form-control" required value={inputsCustomer.email || ""} />
        </div>
        <div id="customer-pass" className="col-lg-6 col-md-6 col-sm-12">
            <input onChange={changeInputsCustomer} placeholder="Mật khẩu (bắt buộc)" type="text" name="password" className="form-control" required  value={inputsCustomer.password || ""} />
        </div> 
        </div>
    </form>
    <div className="row">
        <div className="by-now col-lg-6 col-md-6 col-sm-12">
        <a href="#">
            <b onClick={clickLogin}>Đăng nhập ngay</b>
        </a>
        </div>
        <div className="by-now col-lg-6 col-md-6 col-sm-12">
        <a href="#">
            <b>Quay về trang chủ</b>
        </a>
        </div>
    </div>
    </div>
    {/*	End Register Form	*/}

    </>
  );
};
export default Login;
