import React, { useState } from "react"
import { FormType } from "../common/types";

function OnForm(callback: Function, initState: FormType) {
    const [values, setValues] = useState(initState);
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        callback();
    };
    return {
        onChange,
        onSubmit,
        values
    }
}

export {
    OnForm
}