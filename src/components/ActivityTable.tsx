import React from "react";
import type {UserActivityEventDto} from "../types/activity.ts";

interface ActivityTableProps {
    activities: UserActivityEventDto[];
}

export class ActivityTable extends React.Component<ActivityTableProps> {
    render() {
        const { activities } = this.props;

        if (!activities.length)
            return <p style={{ opacity: 0.6 }}>Нет данных для отображения</p>;

        return (
            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    background: "#2c2c2c",
                    borderRadius: "8px",
                    overflow: "hidden",
                }}
            >
                <thead>
                <tr style={{ background: "#3a3a3a" }}>
                    <th style={{ padding: "10px" }}>Дата</th>
                    <th style={{ padding: "10px" }}>Action</th>
                    <th style={{ padding: "10px" }}>Metadata</th>
                </tr>
                </thead>
                <tbody>
                {activities.map((a) => (
                    <tr>
                        <td style={{ padding: "10px", borderBottom: "1px solid #444" }}>
                            {a.actionDate}
                        </td>
                        <td style={{ padding: "10px", borderBottom: "1px solid #444" }}>
                            {a.action}
                        </td>
                        <td
                            style={{
                                padding: "10px",
                                borderBottom: "1px solid #444",
                                fontSize: "12px",
                                opacity: 0.8,
                            }}
                        >
                            {JSON.stringify(a.metadata)}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        );
    }
}
