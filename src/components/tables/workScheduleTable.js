import { useEffect, useState } from "react";
import "./table.css";

export default function WorkScheduleTable({ data, setItem }) {
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
                        <th>Begin of Shift</th>
                        <th>End of Shift</th>
                        <th>Working Days</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item, index) => (
                        <tr key={index} onClick={() => setItem(item)}>
                            <td>{item?.id}</td>
                            <td>{item?.beginOfShift}</td>
                            <td>{item?.endOfShift}</td>
                            <td>{Array.from(item?.workingDays).join(", ")}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    return <p>No work schedules available.</p>;
}
