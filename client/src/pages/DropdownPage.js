import React from "react";
import { useState } from "react";
import Dropdown from "../components/Dropdown";

const DropdownPage = () => {
    const [selected, setSelected] = useState(null);

    const setSelectedOption = (option) => {
        setSelected(option);
    };

    const options = [
        { label: "Red", value: "red" },
        { label: "Blue", value: "blue" },
        { label: "Green", value: "green" },
    ];

    return (
        <div className="flex">
            <Dropdown
                options={options}
                onChange={setSelectedOption}
                value={selected}
            />
        </div>
    );
};

export default DropdownPage;
