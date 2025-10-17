import React from "react";
import type { UserActivityStatisticDto } from "../types/activity.ts";

interface StatisticTableProps {
    stats: UserActivityStatisticDto[];
}

export class StatisticTable extends React.Component<StatisticTableProps> {
    render() {
        const { stats } = this.props;

        if (!stats.length)
            return <p style={{ opacity: 0.6 }}>Немає статистики за вибраний період</p>;

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
                    <th style={{ padding: "10px" }}>З</th>
                    <th style={{ padding: "10px" }}>По</th>
                    <th style={{ padding: "10px" }}>Дій</th>
                </tr>
                </thead>
                <tbody>
                {stats.map((s, i) => (
                    <tr key={i}>
                        <td style={{ padding: "10px", borderBottom: "1px solid #444" }}>
                            {new Date(s.fromDate).toLocaleString("uk-UA", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                                timeZone: "UTC",
                            })}
                        </td>
                        <td style={{ padding: "10px", borderBottom: "1px solid #444" }}>
                            {new Date(s.toDate).toLocaleString("uk-UA", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                                timeZone: "UTC",
                            })}
                        </td>
                        <td style={{ padding: "10px", borderBottom: "1px solid #444" }}>
                            {s.actionsCount}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        );
    }
}
