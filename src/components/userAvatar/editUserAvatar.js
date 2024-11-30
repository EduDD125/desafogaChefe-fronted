import { useEffect, useState } from "react"
import { FaUser } from "react-icons/fa6";
import "./editUserAvatarStyle.css"
import EditAvatarModal from './editUserAvatarModal'

export default function EditUserAvatar({userAvatarUrl}) {
        const [isOpen, setIsOpen] = useState(false); 

        return (
                <div className="edit-user-avatar__photo-container">
                        {userAvatarUrl ? 
                                <div className="edit-user-avatar__edit-photo-container"
                                        onClick={() => setIsOpen(true)}
                                >
                                        <img src={userAvatarUrl} className="edit-user-avatar__edit-photo"/>
                                        <p>Escolha uma nova foto de perfil</p>
                                </div>
                        :
                                <div className="edit-user-avatar__edit-photo-container"
                                        onClick={() => setIsOpen(true)}
                                >
                                        <FaUser />
                                        <p>Escolha uma foto de perfil</p>
                                </div>
                        }
                        {isOpen && <EditAvatarModal setIsOpen={setIsOpen}/>}
                </div>
        );
}