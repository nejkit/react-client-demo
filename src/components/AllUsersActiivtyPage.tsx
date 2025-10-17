import React from "react";
import type {
    GetUsersActivityResponseDto,
    GetUsersActivityStatisticResponseDto,
} from "../types/activity";
import { ActivityFilters } from "./ActivityFilters";
import { StatisticTable } from "./StatisticsTable";
import { ActivityTable } from "./ActivityTable";
import { getUsersActivity, getUsersStatistic } from "../services/activity.ts";
import { withUserActivity } from "../decorators/withUserActivity.ts";

interface AllUsersActivityState {
    fromDate: string;
    toDate: string;
    data: GetUsersActivityResponseDto | null;
    stats: GetUsersActivityStatisticResponseDto | null;
    selectedUserId: string | null;
}

export class AllUsersActivityPage extends React.Component<{}, AllUsersActivityState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            fromDate: "",
            toDate: "",
            data: null,
            stats: null,
            selectedUserId: null,
        };
    }

    @withUserActivity("userViewGroupActivity")
    async fetchData() {
        const { fromDate, toDate } = this.state;
        const data = await getUsersActivity(fromDate, toDate);
        const stats = await getUsersStatistic(fromDate, toDate);
        this.setState({ data, stats });
    }

    handleSelectUser(userId: string) {
        this.setState({
            selectedUserId: userId === "all" ? null : userId,
        });
    }

    render() {
        const { fromDate, toDate, data, stats, selectedUserId } = this.state;

        const userIds =
            data && data.userActivities
                ? Object.keys(data.userActivities)
                : stats && stats.userActivities
                    ? Object.keys(stats.userActivities)
                    : [];

        const filteredActivities =
            selectedUserId && data
                ? { [selectedUserId]: data.userActivities[selectedUserId] }
                : data?.userActivities || {};

        const filteredStats =
            selectedUserId && stats
                ? { [selectedUserId]: stats.userActivities[selectedUserId] }
                : stats?.userActivities || {};

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
                    padding: "40px 20px",
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
                        }}
                    >
                        Активність усіх користувачів
                    </h2>

                    <ActivityFilters
                        fromDate={fromDate}
                        toDate={toDate}
                        onChange={(f, v) => this.setState({ [f]: v } as any)}
                        onSearch={() => this.fetchData()}
                    />

                    {userIds.length > 0 && (
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "10px",
                            }}
                        >
                            <label style={{ fontSize: "14px", opacity: 0.9 }}>
                                Користувач:
                            </label>
                            <select
                                value={selectedUserId || "all"}
                                onChange={(e) =>
                                    this.handleSelectUser(e.target.value)
                                }
                                style={{
                                    padding: "8px 10px",
                                    borderRadius: "8px",
                                    border: "1px solid #555",
                                    background: "#2c2c2c",
                                    color: "#f5f5f5",
                                    fontSize: "14px",
                                    outline: "none",
                                    transition:
                                        "border-color 0.2s ease, box-shadow 0.2s ease",
                                }}
                                onFocus={(e) => {
                                    e.currentTarget.style.borderColor = "#4a90e2";
                                    e.currentTarget.style.boxShadow =
                                        "0 0 5px rgba(74,144,226,0.5)";
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.borderColor = "#555";
                                    e.currentTarget.style.boxShadow = "none";
                                }}
                            >
                                <option value="all">Усі користувачі</option>
                                {userIds.map((id) => (
                                    <option key={id} value={id}>
                                        {id}
                                    </option>
                                ))}
                            </select>

                            {selectedUserId && (
                                <button
                                    onClick={() =>
                                        this.setState({ selectedUserId: null })
                                    }
                                    style={{
                                        background: "none",
                                        border: "none",
                                        color: "#ff6b6b",
                                        fontSize: "18px",
                                        cursor: "pointer",
                                        fontWeight: 600,
                                        transition: "color 0.2s ease",
                                    }}
                                    onMouseOver={(e) =>
                                        (e.currentTarget.style.color = "#ff8585")
                                    }
                                    onMouseOut={(e) =>
                                        (e.currentTarget.style.color = "#ff6b6b")
                                    }
                                    title="Скинути фільтр"
                                >
                                    ✖
                                </button>
                            )}
                        </div>
                    )}

                    <div>
                        <h3
                            style={{
                                marginTop: "10px",
                                marginBottom: "10px",
                                fontSize: "18px",
                                fontWeight: 600,
                                borderBottom: "1px solid #555",
                                paddingBottom: "6px",
                            }}
                        >
                            Події
                        </h3>
                        {data ? (
                            Object.entries(filteredActivities).length > 0 ? (
                                Object.entries(filteredActivities).map(
                                    ([id, activities]) => (
                                        <div
                                            key={id}
                                            style={{
                                                marginBottom: "24px",
                                                background: "#2c2c2c",
                                                borderRadius: "12px",
                                                padding: "16px",
                                                boxShadow:
                                                    "0 4px 12px rgba(0,0,0,0.3)",
                                            }}
                                        >
                                            <h4
                                                style={{
                                                    marginBottom: "8px",
                                                    fontWeight: 600,
                                                }}
                                            >
                                                Користувач ID: {id}
                                            </h4>
                                            {selectedUserId ? (
                                                <ActivityTable
                                                    activities={activities}
                                                />
                                            ) : (
                                                <p style={{ opacity: 0.8 }}>
                                                    {activities.length} подій
                                                </p>
                                            )}
                                        </div>
                                    )
                                )
                            ) : (
                                <p style={{ opacity: 0.6 }}>
                                    Немає даних
                                </p>
                            )
                        ) : (
                            <p style={{ opacity: 0.6 }}>Немає даних</p>
                        )}
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
                        {stats ? (
                            Object.entries(filteredStats).length > 0 ? (
                                Object.entries(filteredStats).map(
                                    ([id, statList]) => (
                                        <div
                                            key={id}
                                            style={{
                                                marginBottom: "24px",
                                                background: "#2c2c2c",
                                                borderRadius: "12px",
                                                padding: "16px",
                                                boxShadow:
                                                    "0 4px 12px rgba(0,0,0,0.3)",
                                            }}
                                        >
                                            <h4
                                                style={{
                                                    marginBottom: "8px",
                                                    fontWeight: 600,
                                                }}
                                            >
                                                Користувач ID: {id}
                                            </h4>
                                            <StatisticTable stats={statList} />
                                        </div>
                                    )
                                )
                            ) : (
                                <p style={{ opacity: 0.6 }}>
                                    Немає статистики
                                </p>
                            )
                        ) : (
                            <p style={{ opacity: 0.6 }}>Немає статистики</p>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
