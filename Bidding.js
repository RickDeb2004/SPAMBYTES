import React from "react";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
const Bidding = () => {
    return (
        <div >
        <img
          className="absolute top-[0px] left-[0px] w-full h-[1063px] object-cover"
          alt=""
          src="/960x0-1@2x.png"
          />

            <h1 className="absolute top-[200px] left-[600px] text-3xl">Bidding Page</h1>
            
            <Form.Group className="w-[88px] [border:none] absolute top-[300px] left-[600px] form-control-lg">
                <Form.Control type="text" placeholder="Product Name" className="input-large w-[300px]" />
            </Form.Group>
            <Form.Group className="w-[88px] [border:none] absolute top-[400px] left-[600px] form-control-lg">
                <Form.Control type="number" min="0" placeholder="Money " className="input-large w-[300px]" />
            </Form.Group>
            <Form.Group className="w-[88px] [border:none] absolute top-[500px] left-[600px] form-control-lg">
                <Form.Control type="number"  min="0" placeholder="Time" className="input-large w-[300px]" />
            </Form.Group>
            <button className="absolute top-[640px] left-[900px] rounded bg-blue-400">
                Bidding on Time
            </button>

            
            <button className="absolute top-[640px] left-[500px] rounded bg-blue-400">
                Bid on Money
            </button>

        </div>

    );
};
export default Bidding;

