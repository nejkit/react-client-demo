import React from "react";
import type {GetUserActivityResponseDto, GetUserActivityStatisticResponseDto} from "../types/activity.ts";
import {ActivityFilters} from "./ActivityFilters.tsx";
import {ActivityTable} from "./ActivityTable.tsx";
import {StatisticTable} from "./StatisticsTable.tsx";
import {getUserActivities, getUserStatistics} from "../services/activity.ts";


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

    async fetchData() {
        const userId = localStorage.getItem("userId");
        if (!userId) return;

        const data = await getUserActivities(userId, this.state.fromDate, this.state.toDate)
        const stats = await getUserStatistics(userId, this.state.fromDate, this.state.toDate)
        this.setState({
            ...this.state,
            data,
            stats
        })
    }

    render() {
        const { fromDate, toDate, data, stats } = this.state;
        return (
            <div
                style={{
                    padding: "24px",
                    color: "#f5f5f5",
                    fontFamily: "Inter, sans-serif",
                }}
            >
                <h2>Моя активность</h2>

                <ActivityFilters
                    fromDate={fromDate}
                    toDate={toDate}
                    onChange={(f, v) => this.setState({ [f]: v } as any)}
                    onSearch={() => this.fetchData()}
                />

                <h3>События</h3>
                <ActivityTable activities={data?.activities || []} />

                <h3 style={{ marginTop: "32px" }}>Статистика</h3>
                <StatisticTable stats={stats?.statistics || []} />
            </div>
        );
    }
}
