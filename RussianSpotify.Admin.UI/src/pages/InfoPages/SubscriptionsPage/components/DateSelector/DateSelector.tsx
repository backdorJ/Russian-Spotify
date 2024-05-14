import React, {FC} from "react";
import "./styles/DateSelector.css";

interface IDateSelector {
    selectedDate: Date | null;
    onChange: (date: Date) => void;
    label: string;
    className?: string;
}

const DateSelector: FC<IDateSelector> = ({selectedDate, onChange, label, className = "",}) => {
    return (
        <div className={`date-selector-container ${className}`}>
            <label>{label}</label>
            <input
                type="date"
                value={selectedDate ? selectedDate.toISOString().split("T")[0] : ""}
                onChange={(e) => {
                    const newDate = e.target.value ? new Date(e.target.value) : null;
                    // @ts-ignore
                    onChange(newDate);
                }}
            />
        </div>
    );
};

export default DateSelector;
