import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";

const SellerHome = () => {
    return (
        <div className="bg-[url('../public/960x0-1@2x.png')] bg-cover h-screen" >

            <h1 className="absolute top-[200px] left-[600px]">Register Product</h1>
            <Form.Group className="w-[88px] [border:none] absolute top-[300px] left-[600px] form-control-lg">
                <Form.Control type="text" placeholder="Product Name" className="input-large w-[300px]" />
            </Form.Group>

            <Form.Group className="w-[98px] [border:none]  absolute top-[450px] left-[650px]">
                <Form.Control type="number" min="0" placeholder=" Product Price" />
            </Form.Group>
            <Form.Group className="w-[58px] [border:none]  absolute top-[450px] left-[800px]">
                <Form.Control type="number" min="0"  placeholder="Available quantity" />
            </Form.Group>
            <button className="absolute top-[640px] left-[700px] rounded bg-blue-400">
                Register Product
            </button>

        </div>

    );
};
export default SellerHome;