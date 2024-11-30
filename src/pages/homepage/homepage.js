import "./homepageStyle.css"
import Logo from "../../components/logo/logo";
import HomepageNavbar from "../../components/navbars/homepageNavbar/homepageNavbar";


export default function Homepage() {
    return (
        <div>
            <HomepageNavbar />
            <main className="homepage">
                <Logo />
            </main>
        </div>
    );
}