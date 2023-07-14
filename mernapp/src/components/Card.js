import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart, useCart } from './ContextReducer';

export default function (props) {
    let dispatch = useDispatchCart();
    const priceRef = useRef();
    let foodItem = props.foodItem;
    let options = props.options;
    let priceOption = Object.keys(options);
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");
    let data = useCart();
    const handleAddToCart = async () => {
        let food = []
        for (const item of data) {
            if (item.id === foodItem._id) {
                food = item;

                break;
            }
        }
        console.log(food)
        console.log(new Date())
        if (food !== []) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty })
                return
            }
            else if (food.size !== size) {
                await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size, img: props.ImgSrc })
                console.log("Size different so simply ADD one more to the list")
                return
            }
            return
        }

        await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size })

    }
    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])
    let finalPrice = qty * options[size];
    return (
        <div>
            <div>
                <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
                    <img src={foodItem.img} className="card-img-top" alt="..." style={{ height: "180px", objectFit: "fill" }} />
                    <div className="card-body">
                        <h5 className="card-title">{foodItem.name}</h5>
                        <div className='container w-100'>
                            <select className='m-0 h-100 bg-success rounded' onChange={(e) => setQty(e.target.value)}>
                                {
                                    Array.from(Array(6), (e, i) => {
                                        return (
                                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                                        )
                                    })
                                }
                            </select>
                            <select className='m-2 h-100 bg-success rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                                {priceOption.map((data) => {
                                    return <option key={data} value={data}>{data}</option>
                                })}
                            </select>
                            <div className='d-inline h-100 fs-5 '>Rs {finalPrice}/-</div>
                        </div>
                        <hr />
                        <div className='btn btn-success justify-content-center ms-2' onClick={handleAddToCart}>Add to Cart</div>
                    </div>
                </div></div>
        </div>
    )
}
