import "./editUserAvatarModalStyle.css";
import { useState, useEffect } from "react";
import pexelClient from './../../axios/pexelClient.js'
import apiClient from './../../axios/apiClient.js'

export default function EditUserAvatarModal({setIsOpen}) {
        const userId = localStorage.getItem("id");
        const userRole = localStorage.getItem("role");

        const storedUserAvatar = localStorage.getItem("userAvatar");
        const userAvatar = storedUserAvatar ? JSON.parse(storedUserAvatar) : null;

        const [photos, setPhotos] = useState([]);
        const [photoIndex, setPhotoIndex] = useState(null);
        const [loading, setLoading] = useState(false);
        const [errors, setErrors] = useState("");

        useEffect(() => {
            const fetchPhotos = async () => {
                try {
                    setLoading(true);
                    const response = await pexelClient.get('');
                    if (!response || response.data.media.length === 0) {
                        throw new Error("Coleção de fotos vazia ou problemas ao carregar as imagens.");
                    }
                    setPhotos(response.data.media); // Salva as fotos no estado
                } catch (error) {
                    console.error(error);
                    setErrors(error.message);
                } finally {
                    setLoading(false);
                }
            };
    
            fetchPhotos();
        }, []);
       
        useEffect(() => {
            if (photoIndex !== null && photos.length > 0) {
                console.log(photoIndex)
                const selectedAvatar = {
                    index: photoIndex,
                    url: photos[photoIndex].src.medium,
                };
                localStorage.setItem("userAvatar", JSON.stringify(selectedAvatar));
            }
        }, [photoIndex]);


        async function handleSaveEdittion() {
            try {
                const response = apiClient.post(`/images/${userRole}/${userId}`, {
                    type: userRole,
                    id: userId,
                    imageUrl: photos[photoIndex].src.medium
                })
                console.log(response);     
                setIsOpen(false);
            } catch (error) {
                console.log("error editting photo:", error.message);

            }
        }
    
        if (errors) {
            return <p className="error">{errors}</p>;
        }
        
        return (
            <div className="edit-avatar-modal__background" onClick={() => setIsOpen(false)}>
                <div className="edit-avatar-modal__container" onClick={(event) => event.stopPropagation()}>
                    <h3 className="edit-avatar-modal__title">Escolha sua foto</h3>
                    <div className="edit-avatar-modal__photos-container">
                        {!loading ? photos.map((photo, index) => (
                            <div className="edit-avatar-modal__photo-container">
                                <img
                                    src={photo.src.medium}
                                    alt={photo.alt || `Imagem ${index}`}
                                    onClick={() => setPhotoIndex(index)}
                                    className={ userAvatar && index === photoIndex
                                            ? "photo-selected  edit-avatar-modal__photo"
                                            : `edit-avatar-modal__photo `
                                    }
                                />
                            </div>
                        ))
                        :
                        <p>carregando fotos...</p>
                        }
                    </div>
                    <p className="warning">Clique nas fotos para selecionar nova foto de perfil</p>
                    <div className="edit-avatar-modal__button-area">
                        <button onClick={() => setIsOpen(false)}>Cancelar</button>
                        <button onClick={handleSaveEdittion}>Salvar</button>
                    </div>
                </div>
            </div>
        );
    
}