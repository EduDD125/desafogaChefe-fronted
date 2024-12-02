import { useEffect, useState } from "react";
import "./table.css";

export default function RepresentantTable({ data, setItem }) {
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
                        <th>ID</th>
                        <th>Name</th>
                        <th>Company</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item, index) => (
                        <tr key={index} onClick={() => setItem(item)}>
                            <td>{item?.id}</td>
                            <td>{item?.name}</td>
                            <td>{item?.company?.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    return <p>No representants available.</p>;
}
