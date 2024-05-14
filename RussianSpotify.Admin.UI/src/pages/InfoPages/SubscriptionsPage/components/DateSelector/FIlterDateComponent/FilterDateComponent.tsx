import React, {FC} from "react";
import DateSelector from "../DateSelector";
import './styles/FilterDateComponent.css'

interface IFilterDateComponent {
    startedBefore: Date | null;
    startedAfter: Date | null;
    finishedBefore: Date | null;
    finishedAfter: Date | null;
    setStartedBefore: (date: Date | null) => void;
    setStartedAfter: (date: Date | null) => void;
    setFinishedBefore: (date: Date | null) => void;
    setFinishedAfter: (date: Date | null) => void;
}

const FilterDateComponent: FC<IFilterDateComponent> = ({
                                                           startedBefore,
                                                           startedAfter,
                                                           finishedBefore,
                                                           finishedAfter,
                                                           setStartedBefore,
                                                           setStartedAfter,
                                                           setFinishedBefore,
                                                           setFinishedAfter
                                                       }) => {
    return (
        <div className="date-selector-wrapper">
            <DateSelector
                label="Началась до"
                selectedDate={startedBefore}
                onChange={setStartedBefore}
                className="date-selector"/>
            <DateSelector
                label="Началась после"
                selectedDate={startedAfter}
                onChange={setStartedAfter}
                className="date-selector"/>
            <DateSelector
                label="Кончилась до"
                selectedDate={finishedBefore}
                onChange={setFinishedBefore}
                className="date-selector"/>
            <DateSelector
                label="Кончилась после"
                selectedDate={finishedAfter}
                onChange={setFinishedAfter}
                className="date-selector"/>
        </div>
    );
};

export default FilterDateComponent;
