import { orderDetails } from "../../services/Api"
import React, { useState, useEffect } from "react";
import { Link,useParams } from "react-router-dom";
import { getImageProduct } from "../../shared/ultils";
const OrderDetails = () => {
    const { id } = useParams();
    const [order, setOrder] = useState([]);
    useEffect(() => {
        orderDetails(id)
            .then(({ data }) => {
                setOrder(data.newItems);
                console.log(data);
            })
            .catch((error) => console.log(error))
    }, [id])
return <>
    <div>
        {/*	Order Details	*/}
        <div id="my-cart">
            <div className="row">
                <div className="cart-nav-item col-lg-7 col-md-7 col-sm-12">
                    Thông tin sản phẩm
                </div>
                <div className="cart-nav-item col-lg-2 col-md-2 col-sm-12">Số lượng</div>
                <div className="cart-nav-item col-lg-3 col-md-3 col-sm-12">Giá</div>
            </div>
            <form method="post">
                {
                    order?.map((item, index)=>{
                        return <>
                            <div key={index} className="cart-item row">
                                <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
                                    <img src={getImageProduct(item.image)} />
                                    <h4>{item.name}</h4>
                                </div>
                                <div className="cart-quantity col-lg-2 col-md-2 col-sm-12">
                                    <p>{item.qty}</p>
                                </div>
                                <div className="cart-price col-lg-3 col-md-3 col-sm-12"><b>{item.price}</b></div>
                            </div>
                        </>
                    })
                }
                
                <div className="row">
                    <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
                    </div>
                    <div className="cart-total col-lg-2 col-md-2 col-sm-12"><b>Tổng cộng:</b></div>
                    <div className="cart-price col-lg-3 col-md-3 col-sm-12"><b>{order.reduce((total,item)=>total = total + item.qty* item.price,0)}</b></div>
                </div>
            </form>
        </div>
        {/*	End Order Details	*/}
        {/*	Customer Info	*/}
        <div id="customer">
            <div className="row">
                <div className="by-now col-lg-6 col-md-6 col-sm-12">
                    <a href="#">
                        <b>Về danh sách đơn hàng</b>
                    </a>
                </div>
                <div className="by-now col-lg-6 col-md-6 col-sm-12">
                    <a href="#">
                        <b>Về trang chủ</b>
                    </a>
                </div>
            </div>
        </div>
        {/*	End Customer Info	*/}
    </div>

</>
}
export default OrderDetails