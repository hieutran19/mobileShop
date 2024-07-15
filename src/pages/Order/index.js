import { orderCustomer, cancaledOrder} from "../../services/Api"
import React, { useState, useEffect } from "react";
import {Link, useParams } from "react-router-dom";
const Order = () => {
    const [orders, setOrders] = useState([]);
    const [sttOrder, setSttOrder] = useState("");
    const { id } = useParams();
    const clickCancaled = (id)=>{
        const isComfirm = "Bạn có muốn huỷ đơn hàng này không ?";
        if(isComfirm){
            return cancaledOrder(id)
                .then(({data})=>setSttOrder(data))
                .catch((error)=>console.log(error))
        }
    }
    useEffect(() => {
        orderCustomer(id)
            .then(({ data }) => {
                setOrders(data.orders)
            })
            .catch((error) => console.log(error))
    }, [sttOrder])
    return <>
        {/*	Cart	*/}
        <div id="my-cart">
            <div className="row">
                <div className="cart-nav-item col-lg-7 col-md-7 col-sm-12">Đơn hàng của bạn</div>
                <div className="cart-nav-item col-lg-5 col-md-5 col-sm-12">Tổng tiền</div>
            </div>
            <form method="post">
                {
                    orders.map((order, index) => {
                        return (
                            <div key={index} className={`cart-item row alert-${order.status === 1? "success" :order.status === 0? "danger": "primary"}`}>
                                <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
                                    <h4>Đơn hàng đã mua vào ngày: <span className="text-secondary">{order.createdAt}</span></h4>
                                    <p>Mã Đơn (MĐ): {order._id}</p>
                                </div>
                                <div className="cart-price col-lg-2 col-md-2 col-sm-12"><b>{order.totalPrice}</b></div>
                                <div className="cart-quantity col-lg-3 col-md-3 col-sm-12">
                                    <Link to={`/OrderDetails-${order._id}`} className="btn btn-outline-dark mb-1">Chi tiết đơn hàng</Link>
                                    {
                                        order.status == 1 ?
                                            <button type="button" className="btn btn-success mb-1">Đơn đã giao</button>
                                            : null
                                    }
                                    {
                                        order.status == 0 ?
                                            <button type="button" className="btn btn-danger mb-1">Đơn đã huỷ</button>
                                            : null
                                    }
                                    {
                                        order.status == 2 ?
                                            <>
                                                <button type="button" className="btn btn-warning mb-1">Đơn đang giao</button>
                                                <button onClick={()=>clickCancaled(order._id)} type="button" className="btn btn-outline-danger mb-1">Huỷ đơn</button>
                                            </>
                                            : null
                                    }




                                </div>
                            </div>
                        )
                    })
                }
                <div className="row">
                    <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
                        <button id="update-cart" className="btn btn-success" type="submit" name="sbm">Quay về
                            trang chủ</button>
                    </div>
                    <div className="col-lg-5 col-md-5 col-sm-12">
                        <ul className="pagination mt-4">
                            <li className="page-item disabled">
                                <span className="page-link">Trang trước</span>
                            </li>
                            <li className="page-item"><a className="page-link" href="#">1</a></li>
                            <li className="page-item active" aria-current="page">
                                <span className="page-link">2</span>
                            </li>
                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                            <li className="page-item">
                                <a className="page-link" href="#">Trang sau</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </form>
        </div>
        {/*	End Cart	*/}

    </>
}
export default Order