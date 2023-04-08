import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CustomerSignup = () => {
    //const []
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    function handleChange(event, variableToUpdate) {
        if (variableToUpdate === "firstName") {
            setFirstName(event.target.value);
        } else if (variableToUpdate === "lastName") {
            setLastName(event.target.value);
        } else if (variableToUpdate === "email") {
            setEmail(event.target.value);
        }
    }
    let temp = "nil";
    const navigate = useNavigate();
    return (
        <div className="relative bg-white w-full h-[1063px] overflow-hidden text-center text-21xl text-white font-inter">
            <img
                className="absolute top-[0px] left-[0px] w-[1460px] h-[1063px] object-cover"
                alt=""
                src="/960x0-2@2x.png"
            />
            <div className="absolute top-[0px] left-[0px] box-border w-[1460px] h-[1063px] overflow-hidden border-[1px] border-solid border-gray-200">
                <nav className="absolute top-[0px] left-[0px] bg-gainsboro-200 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] box-border w-[1460px] h-[149px] border-[1px] border-solid border-black" />
                <h1 className="m-0 absolute top-[44px] left-[163px] text-[inherit] font-semibold font-inherit text-left inline-block w-[207px] h-[54px]">
                    <p className="m-0">DeEcomm</p>
                </h1>
                <img
                    className="absolute top-[13px] left-[19px] w-[125px] h-[117px] object-cover"
                    alt=""
                    src="/whatsapp-image-20230329-at-621-1@2x.png"
                />
                <div className="absolute top-[180px] left-[520px] bg-aliceblue w-[350px] h-20 hidden" />
                <h1 className="m-0 absolute top-[200px] left-[620px] text-[inherit] font-semibold font-inherit inline-block w-[310px] h-[70px]">
                    Sign-Up
                </h1>
                <input
                    className="cursor-pointer absolute top-[280px] left-[320px] bg-gainsboro-100 w-[30px] h-[30px]"
                    type="checkbox"
                    defaultChecked={false}
                    onClick={() => {
                        temp = "Customer";
                    }}
                />
                <h1 className="m-0 absolute top-[280px] left-[370px] text-[inherit] font-semibold font-inherit text-left inline-block w-[250px] h-[30px]">
                    Customer
                </h1>
                <input
                    className="cursor-pointer absolute top-[280px] left-[700px] bg-gainsboro-100 w-[30px] h-[30px]"
                    type="checkbox"
                    defaultChecked={false}
                    onClick={() => {
                        temp = "Seller";
                    }}
                />
                <h1 className="m-0 absolute top-[280px] left-[760px] text-[inherit] font-semibold font-inherit text-left inline-block w-[210px] h-[39px]">
                    Seller
                </h1>
                <input
                    className="cursor-pointer absolute top-[285px] left-[1046px] bg-gainsboro-100 w-[27px] h-[34px]"
                    type="checkbox"
                    defaultChecked={false}
                    onClick={() => {
                        temp = "Delivery Person";
                    }}
                />
                <h1 className="m-0 absolute top-[281px] left-[1100px] text-[inherit] font-semibold font-inherit text-left inline-block w-[328px] h-[38px]">
                    Delivery Person
                </h1>
                <Form.Group className="w-[264px] [border:none] bg-[transparent] absolute top-[418px] left-[451px]">
                    <Form.Control
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => handleChange(e, "firstName")}
                    />
                </Form.Group>
                <Form.Group className="w-[275px] [border:none] bg-[transparent] absolute top-[418px] left-[771px]">
                    <Form.Control
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => handleChange(e, "lastName")}
                    />
                </Form.Group>
                <h1 className="m-0 absolute top-[374px] left-[458px] text-[inherit] font-semibold font-inherit inline-block w-[257px] h-11">
                    First Name
                </h1>
                <h1 className="m-0 absolute top-[374px] left-[787px] text-[inherit] font-semibold font-inherit inline-block w-[244px] h-[39px]">
                    Last Name
                </h1>
                <Form.Group className="w-[601px] [border:none] bg-[transparent] absolute top-[611px] left-[445px]">
                    <Form.Control
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => handleChange(e, "email")}
                    />
                </Form.Group>
                <h1 className="m-0 absolute top-[532px] left-[571px] text-[inherit] font-semibold font-inherit inline-block w-[380px] h-[79px]">
                    Email
                </h1>
                <button
                    className="cursor-pointer [border:none] p-0 bg-mediumturquoise absolute top-[876px] left-[556px] rounded-[15px] w-[395px] h-[99px]"
                    onClick={() => {
                        if (temp == "Customer") {
                            navigate("/customer-signup-2");
                        }
                        if (temp == "Seller") {
                            navigate("/seller-signup");
                        }
                    }}
                />
                <h1 className="m-0 absolute top-[calc(50%_+_368.5px)] left-[566px] text-[inherit] font-semibold font-inherit text-black inline-block w-[376px] h-[76px]">
                    Continue
                </h1>
            </div>
            <a className="absolute top-[57px] left-[72px] text-4xl font-semibold text-[inherit] text-left inline-block w-[15px] h-[34px] [text-decoration:none]">
                D
            </a>
        </div>
    );
};

export default CustomerSignup;
