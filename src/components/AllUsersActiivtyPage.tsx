import React from "react";
import type {
    GetUsersActivityResponseDto,
    GetUsersActivityStatisticResponseDto,
} from "../types/activity";
import { ActivityFilters } from "./ActivityFilters";
import { StatisticTable } from "./StatisticsTable";
import {getUsersActivity, getUsersStatistic} from "../services/activity.ts";

interface AllUsersActivityState {
    fromDate: string;
    toDate: string;
    data: GetUsersActivityResponseDto | null;
    stats: GetUsersActivityStatisticResponseDto | null;
}

export class AllUsersActivityPage extends React.Component<{}, AllUsersActivityState> {
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
        const data = await getUsersActivity(this.state.fromDate, this.state.toDate)
        const stats = await getUsersStatistic(this.state.fromDate, this.state.toDate)
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
                fontFamily: "Inter, sans-serif"}}>
        <h2>Активность всех пользователей</h2>

        <ActivityFilters
        fromDate={fromDate}
        toDate={toDate}
        onChange={(f, v) => this.setState({ [f]: v } as any)}
        onSearch={() => this.fetchData()}
        />

        {data ? (
            Object.entries(data.userActivities).map(([id, activities]) => (
                <div key={id} style={{ marginBottom: "32px" }}>
            <h3>User ID: {id}</h3>
        <p>{activities.length} событий</p>
        </div>
        ))
        ) : (
            <p style={{ opacity: 0.6 }}>Нет данных</p>
        )}

        <h3 style={{ marginTop: "32px" }}>Статистика</h3>

        {stats ? (
            Object.entries(stats.userActivities).map(([id, statList]) => (
                <div key={id} style={{ marginBottom: "24px" }}>
            <h4>User ID: {id}</h4>
        <StatisticTable stats={statList} />
        </div>
        ))
        ) : (
            <p style={{ opacity: 0.6 }}>Нет статистики</p>
        )}
        </div>
    );
    }
}
