import "./homepageNavbarStyle.css"
import Logo from "../../logo/logo";
import NavButton from "../subcomponents/navButton";
import { useState } from "react";
import LoginModal from "../../modais/login/loginModal";
import SignUpModal from "../../modais/signUp/signUpModal";

export default function HomepageNavbar() {
    const [isModalLoginOpen, setIsModalLoginOpen] = useState(false);
    const [isModalSignInOpen, setIsModalSignInOpen] = useState(false);

    function handleLogin() {
        setIsModalLoginOpen(true);
        setIsModalSignInOpen(false);
    }

    function handleSignIn() {
        setIsModalSignInOpen(true);
        setIsModalLoginOpen(false);
    }

    return (
        <nav className="nav">
            <Logo />

            <div className="nav__buttons-container">
                <NavButton text="Login" action={handleLogin}/>
                <NavButton text="Sign up" action={handleSignIn}/>
            </div>

            {isModalLoginOpen ?
                <LoginModal setIsModalLoginOpen={setIsModalLoginOpen}/>
                :
                <></>
            }

            {isModalSignInOpen ?
                <SignUpModal setIsModalSignInOpen={setIsModalSignInOpen}/>
                :
                <></>
            }
        </nav>
    );
}