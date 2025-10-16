import React from "react";

interface ActivityFiltersProps {
    fromDate: string;
    toDate: string;
    onChange: (field: "fromDate" | "toDate", value: string) => void;
    onSearch: () => void;
}

export class ActivityFilters extends React.Component<ActivityFiltersProps> {
    render() {
        const { fromDate, toDate, onChange, onSearch } = this.props;

        return (
            <div
                style={{
                    display: "flex",
                    gap: "12px",
                    marginBottom: "20px",
                    alignItems: "center",
                }}
            >
                <label>
                    От:
                    <input
                        type="date"
                        value={fromDate}
                        onChange={(e) => onChange("fromDate", e.target.value)}
                        style={{
                            marginLeft: "8px",
                            padding: "6px 8px",
                            borderRadius: "6px",
                            border: "1px solid #555",
                            background: "#2c2c2c",
                            color: "#f5f5f5",
                        }}
                    />
                </label>
                <label>
                    До:
                    <input
                        type="date"
                        value={toDate}
                        onChange={(e) => onChange("toDate", e.target.value)}
                        style={{
                            marginLeft: "8px",
                            padding: "6px 8px",
                            borderRadius: "6px",
                            border: "1px solid #555",
                            background: "#2c2c2c",
                            color: "#f5f5f5",
                        }}
                    />
                </label>
                <button
                    onClick={onSearch}
                    style={{
                        padding: "8px 16px",
                        borderRadius: "8px",
                        border: "none",
                        background: "#4a90e2",
                        color: "white",
                        cursor: "pointer",
                        fontWeight: 500,
                    }}
                >
                    Поиск
                </button>
            </div>
        );
    }
}
