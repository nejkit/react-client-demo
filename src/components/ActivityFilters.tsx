import React from "react";

interface ActivityFiltersProps {
    fromDate: string;
    toDate: string;
    onChange: (field: "fromDate" | "toDate", value: string) => void;
    onSearch: () => void;
}

export class ActivityFilters extends React.Component<ActivityFiltersProps> {
    formatToGoTime(localDate: string, endOfDay = false): string {
        if (!localDate) return "";
        const [year, month, day] = localDate.split("-").map(Number);
        const date = new Date(
            Date.UTC(
                year,
                month - 1,
                day,
                endOfDay ? 23 : 0,
                endOfDay ? 59 : 0,
                endOfDay ? 59 : 0
            )
        );
        return date.toISOString();
    }

    render() {
        const { fromDate, toDate, onChange, onSearch } = this.props;

        return (
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "16px",
                    marginBottom: "30px",
                    background: "rgba(44,44,44,0.9)",
                    padding: "20px 24px",
                    borderRadius: "16px",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.4)",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "6px",
                    }}
                >
                    <label style={{ fontSize: "14px", opacity: 0.9 }}>Від</label>
                    <input
                        type="date"
                        value={fromDate ? fromDate.split("T")[0] : ""}
                        onChange={(e) =>
                            onChange("fromDate", this.formatToGoTime(e.target.value))
                        }
                        style={{
                            padding: "8px 10px",
                            borderRadius: "8px",
                            border: "1px solid #555",
                            background: "#2c2c2c",
                            color: "#f5f5f5",
                            fontSize: "14px",
                            outline: "none",
                            transition: "border-color 0.2s ease, box-shadow 0.2s ease",
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
                    />
                </div>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "6px",
                    }}
                >
                    <label style={{ fontSize: "14px", opacity: 0.9 }}>До</label>
                    <input
                        type="date"
                        value={toDate ? toDate.split("T")[0] : ""}
                        onChange={(e) =>
                            onChange("toDate", this.formatToGoTime(e.target.value, true))
                        }
                        style={{
                            padding: "8px 10px",
                            borderRadius: "8px",
                            border: "1px solid #555",
                            background: "#2c2c2c",
                            color: "#f5f5f5",
                            fontSize: "14px",
                            outline: "none",
                            transition: "border-color 0.2s ease, box-shadow 0.2s ease",
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
                    />
                </div>

                <button
                    onClick={onSearch}
                    style={{
                        marginTop: "22px",
                        padding: "10px 20px",
                        borderRadius: "10px",
                        border: "none",
                        background: "#4a90e2",
                        color: "white",
                        fontWeight: 600,
                        cursor: "pointer",
                        transition:
                            "background 0.25s ease, transform 0.1s ease, box-shadow 0.2s ease",
                        boxShadow: "0 4px 12px rgba(74,144,226,0.3)",
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.background = "#5aa0f2";
                        e.currentTarget.style.boxShadow =
                            "0 6px 14px rgba(74,144,226,0.4)";
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.background = "#4a90e2";
                        e.currentTarget.style.boxShadow =
                            "0 4px 12px rgba(74,144,226,0.3)";
                    }}
                    onMouseDown={(e) =>
                        (e.currentTarget.style.transform = "scale(0.97)")
                    }
                    onMouseUp={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                    }
                >
                    🔍 Пошук
                </button>
            </div>
        );
    }
}
