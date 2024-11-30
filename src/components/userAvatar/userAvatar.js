import "./userAvatarStyle.css"
import { FaUser } from "react-icons/fa6";

export default function UserAvatar({userAvatarUrl}) {
        const storedUserAvatar = localStorage.getItem("userAvatar");
        const userAvatar = storedUserAvatar ? JSON.parse(storedUserAvatar) : null;

        //puxa do backend
    
        return (
            <div className="user-avatar__photo-container">
                {userAvatarUrl ? (
                    <img src={userAvatarUrl} alt="User Avatar" className="user-avatar__photo"/>
                ) : (
                    <FaUser />
                )}
            </div>
        );
    }