import React from 'react'


const Input = ({name, value, onChange, label, type, required}) => {
    return (
        <>
            <label className="block">{label}</label>
            <input
                name={name}
                value={value}
                onChange={onChange}
                className="border"
                type={type}
                required={required}
            />
        </>
    )
}

export default Input
