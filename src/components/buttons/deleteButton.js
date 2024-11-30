import { FaTrashAlt } from "react-icons/fa";
import useDeleteData from "../../hooks/deleteData/deleteData";

export default function DeleteButton({entityType, id, onDelete={onDelete}}) {
    const deleteData = useDeleteData();

    function handleClick(event) {
        event.stopPropagation(); // Impede a propagação do evento de clique para a linha
        onDelete(id);
    }

    async function deleteItem(id) {
        const result = await deleteData(entityType, id);
        onDelete(id);
    }

    return (
        <FaTrashAlt className="delete-button" onClick={(event) => {handleClick(event); deleteItem(id)}}/>
    );
}