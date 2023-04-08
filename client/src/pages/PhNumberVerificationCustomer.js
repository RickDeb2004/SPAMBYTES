import React from "react";
import { useState } from "react";

import OtpInput from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import { CgSpinner } from "react-icons/cg";
import { auth } from "../api/firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import Button from "../components/Button";
import useNavigation from "../hooks/use-navigation";

import "react-phone-input-2/lib/style.css";

const PhNumberVerificationCustomer = ({ contract, signer }) => {
    const [otp, setOtp] = useState("");
    const [ph, setPh] = useState("");
    const [loading, setLoading] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const [user, setUser] = useState(null);

    const { navigate } = useNavigation();

    const onCaptchVerify = () => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(
                "recaptcha-container",
                {
                    size: "invisible",
                    callback: (response) => {
                        onSignup();
                    },
                    "expired-callback": () => {},
                },
                auth
            );
        }
    };

    const onSignup = () => {
        setLoading(true);
        onCaptchVerify();

        const appVerifier = window.recaptchaVerifier;

        const formatPh = "+" + ph;

        signInWithPhoneNumber(auth, formatPh, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                setLoading(false);
                setShowOTP(true);
                toast.success("OTP sent successfully!");
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };

    const onOTPVerify = async () => {
        setLoading(true);
        window.confirmationResult
            .confirm(otp)
            .then(async (res) => {
                console.log(res.user.phoneNumber.toString());
                setUser(res.user);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                setOtp("");
                toast.error("Incorrect OTP!");
            });
    };

    return (
        <section className="bg-emerald-500 flex items-center justify-center h-screen">
            <div>
                <Toaster toastOptions={{ duration: 4000 }} />
                <div id="recaptcha-container"></div>
                {user ? (
                    <h2 className="text-center text-white font-medium text-2xl">
                        👍Login Success
                    </h2>
                ) : (
                    <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
                        {showOTP ? (
                            <>
                                <label
                                    htmlFor="otp"
                                    className="font-bold text-xl text-white text-center"
                                >
                                    Enter your OTP
                                </label>
                                <OtpInput
                                    value={otp}
                                    onChange={setOtp}
                                    OTPLength={6}
                                    otpType="number"
                                    disabled={false}
                                    autoFocus
                                    className="opt-container "
                                    onFocus={(e) => e.currentTarget.select()}
                                ></OtpInput>
                                <Button
                                    primary
                                    onClick={onOTPVerify}
                                    className="mb-5"
                                >
                                    {loading && (
                                        <CgSpinner
                                            size={20}
                                            className="mt-1 animate-spin"
                                        />
                                    )}
                                    <span>Verify OTP</span>
                                </Button>
                            </>
                        ) : (
                            <>
                                <label
                                    htmlFor=""
                                    className="font-bold text-xl text-white text-center"
                                >
                                    Verify your phone number
                                </label>
                                <PhoneInput
                                    country={"in"}
                                    value={ph}
                                    onChange={setPh}
                                />
                                <Button
                                    primary
                                    onClick={onSignup}
                                    className="mb-5"
                                >
                                    {loading && (
                                        <CgSpinner
                                            size={20}
                                            className="mt-1 animate-spin"
                                        />
                                    )}
                                    <span>Send code via SMS</span>
                                </Button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default PhNumberVerificationCustomer;
