import React, { useState } from "react"
import { AuthFormType, ItemFormType } from "../common/types";

function OnForm(callback: Function, initState: AuthFormType | ItemFormType) {
    const [values, setValues] = useState(initState);
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Naive attempt to solve for numeric input
        let val: string | number = "";

        // A better option would be to return our stuff depending on the type
        if (e.target.name === "price" || e.target.name === "cost") {
            val = parseFloat(e.target.value);
            if (isNaN(val)) {
                val = 0.0
            }
        } else val = e.target.value;

        setValues({ ...values, [e.target.name]: val });
    };
    const onSubmit = (e: React.FormEvent) => {
        console.log(values)
        e.preventDefault();
        callback();
    };
    const clearValues = () => {
        setValues(initState)
    }
    return {
        onChange,
        onSubmit,
        clearValues,
        values
    }
}

export {
    OnForm
}