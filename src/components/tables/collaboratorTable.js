import { useEffect, useState } from "react";
import "./table.css";

export default function CollaboratorTable({ data, setItem }) {
    const [tableItensList, setTableItensList] = useState([]);

    useEffect(() => {
        if (data && data.length > 0) {
            setTableItensList(data);
        }
    }, [data]);

    if (Array.isArray(data) && data.length > 0) {
        return (
            <table className="table_style">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>CPF</th>
                        <th>Job</th>
                        <th>Work Schedule</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} onClick={() => setItem(item)}>
                            <td>{item.name}</td>
                            <td>{item.CPF}</td>
                            <td>{item?.job?.title}</td>
                            <td>{item.workSchedule}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    return <p>No collaborators available.</p>;
}
