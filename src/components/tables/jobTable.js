import { useEffect, useState } from "react";
import "./table.css";

export default function JobTable({ data, setItem }) {
    const [tableItensList, setTableItensList] = useState([]);
    console.log(data);
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
                        <th>Title</th>
                        <th>Brute Cost Per Hour</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} onClick={() => setItem(item)}>
                            <td>{item.title}</td>
                            <td>{item.bruteCostPerHour}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    return <p>No jobs available.</p>;
}
