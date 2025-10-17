import React from "react";
import type {
    GetUserActivityResponseDto,
    GetUserActivityStatisticResponseDto,
} from "../types/activity.ts";
import { ActivityFilters } from "./ActivityFilters.tsx";
import { ActivityTable } from "./ActivityTable.tsx";
import { StatisticTable } from "./StatisticsTable.tsx";
import { getUserActivities, getUserStatistics } from "../services/activity.ts";
import { withUserActivity } from "../decorators/withUserActivity.ts";

export class UserActivityPage extends React.Component<
    {},
    {
        fromDate: string;
        toDate: string;
        data: GetUserActivityResponseDto | null;
        stats: GetUserActivityStatisticResponseDto | null;
    }
> {
    constructor(props: {}) {
        super(props);
        this.state = {
            fromDate: "",
            toDate: "",
            data: null,
            stats: null,
        };
    }

    @withUserActivity("userViewActivity")
    async fetchData() {
        const userId = localStorage.getItem("userId");
        if (!userId) return;

        const data = await getUserActivities(
            userId,
            this.state.fromDate,
            this.state.toDate
        );
        const stats = await getUserStatistics(
            userId,
            this.state.fromDate,
            this.state.toDate
        );
        this.setState({
            ...this.state,
            data,
            stats,
        });
    }

    render() {
        const { fromDate, toDate, data, stats } = this.state;

        return (
            <div
                style={{
                    width: "100vw",
                    minHeight: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "linear-gradient(135deg, #1e1e1e 0%, #2a2a2a 100%)",
                    color: "#f5f5f5",
                    fontFamily: "Inter, sans-serif",
                    padding: "40px 16px",
                    boxSizing: "border-box",
                }}
            >
                <div
                    style={{
                        background: "rgba(44, 44, 44, 0.95)",
                        borderRadius: "20px",
                        padding: "40px",
                        boxShadow: "0 10px 40px rgba(0, 0, 0, 0.5)",
                        backdropFilter: "blur(10px)",
                        maxWidth: "1000px",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "24px",
                    }}
                >
                    <h2
                        style={{
                            fontSize: "24px",
                            fontWeight: 700,
                            textAlign: "center",
                            marginBottom: "8px",
                        }}
                    >
                        Моя активність
                    </h2>

                    <ActivityFilters
                        fromDate={fromDate}
                        toDate={toDate}
                        onChange={(f, v) => this.setState({ [f]: v } as any)}
                        onSearch={() => this.fetchData()}
                    />

                    <div>
                        <h3
                            style={{
                                marginTop: "20px",
                                marginBottom: "10px",
                                fontSize: "18px",
                                fontWeight: 600,
                                borderBottom: "1px solid #555",
                                paddingBottom: "6px",
                            }}
                        >
                            Події
                        </h3>
                        <div
                            style={{
                                background: "#2c2c2c",
                                borderRadius: "10px",
                                padding: "16px",
                                overflowX: "auto",
                            }}
                        >
                            <ActivityTable activities={data?.activities || []} />
                        </div>
                    </div>

                    <div>
                        <h3
                            style={{
                                marginTop: "20px",
                                marginBottom: "10px",
                                fontSize: "18px",
                                fontWeight: 600,
                                borderBottom: "1px solid #555",
                                paddingBottom: "6px",
                            }}
                        >
                            Статистика
                        </h3>
                        <div
                            style={{
                                background: "#2c2c2c",
                                borderRadius: "10px",
                                padding: "16px",
                                overflowX: "auto",
                            }}
                        >
                            <StatisticTable stats={stats?.statistics || []} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
