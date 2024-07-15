import { useState } from "react";
import { useSelector } from "react-redux";
import { updateCustomer } from "../../services/Api";
import { useDispatch } from "react-redux";
import { updateSuccess } from "../../redux-setup/reducers/auth"
const Customer = ()=>{ 
    const customer = useSelector(({Auth})=>Auth.login.currentCustomer.customer)
    const [inputsCustomer, setInputsCustomer] = useState(customer)
    const [alertUpdate, setAlertUpdate] = useState(false)
    const [alertCls, setAlertCls] = useState("")
    const dispatch = useDispatch()
    const changeInputCustomer = (e)=>{
        const {name, value} = e.target
        return setInputsCustomer({...inputsCustomer, [name]: value})
    }
    const clickUpdate  = (e)=>{
        e.preventDefault()
        updateCustomer(inputsCustomer)
            .then(()=>{
                dispatch(updateSuccess(inputsCustomer))
                setAlertUpdate("Cập nhật thành công")
                setAlertCls("success")

            })
            .catch(({response})=>{
                if(response.data === "Phone numbers exists"){
                    setAlertUpdate("Số đt tồn tại")
                    setAlertCls("danger")
                }
            });
    }
    return <>
            <div id="customer">
            {
                alertUpdate && <div className={`alert alert-${alertCls} text-center`}>{alertUpdate}</div>
            }
            <h3 className="text-center">Customer Info</h3>
            <form method="post">
                <div className="row">
                <div id="customer-name" className="col-lg-6 col-md-6 col-sm-12">
                    <input onChange={changeInputCustomer} placeholder="Họ và tên (bắt buộc)" type="text" name="fullName" className="form-control" required value={inputsCustomer.fullName || ""} />
                </div>
                <div id="customer-pass" className="col-lg-6 col-md-6 col-sm-12">
                    <input onChange={changeInputCustomer} placeholder="Mật khẩu (bắt buộc)" type="password" name="password" className="form-control" required value="123456" disabled />
                </div>
                <div id="customer-mail" className="col-lg-6 col-md-6 col-sm-12">
                    <input onChange={changeInputCustomer} placeholder="Email (bắt buộc)" type="text" name="email" className="form-control" required value={inputsCustomer.email || ""} disabled/>
                </div>
                <div id="customer-phone" className="col-lg-6 col-md-6 col-sm-12">
                    <input onChange={changeInputCustomer} placeholder="Số điện thoại (bắt buộc)" type="text" name="phone" className="form-control" required value={inputsCustomer.phone || ""}/>
                </div>
                <div id="customer-add" className="col-lg-12 col-md-12 col-sm-12">
                    <input onChange={changeInputCustomer} placeholder="Địa chỉ nhà riêng hoặc cơ quan (bắt buộc)" type="text" name="address" className="form-control" required  value={inputsCustomer.address || ""}/>
                </div>
                </div>
            </form>
            <div className="row">
                <div className="by-now col-lg-6 col-md-6 col-sm-12">
                <a onClick={clickUpdate} href="#">
                    <b>Cập nhật</b>
                </a>
                </div>
                <div className="by-now col-lg-6 col-md-6 col-sm-12">
                <a href="#">
                    <b>Quay về trang chủ</b>
                </a>
                </div>
            </div>
            </div>
        </>
}
export default Customer;