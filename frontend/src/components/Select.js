import styled from "styled-components";

const StyledSelect = styled.select`
    font-family: 'Lexend Deca', sans-serif;
    width: 100%;
    padding: 12px;
    border-radius: 5px;
    font-size: 1rem;
    border: 2px solid #CCCCCC;
    transition: border-color 0.3s ease-in-out;
    box-sizing: border-box;
    color: #333333;
    background-color: white;
    cursor: pointer;
  
    &:focus {
        border-color: var(--primary-color);
        outline: none;
    }
`;

const Select = ({ name, value, onChange, options, placeholder, disabled }) => {
    return (
        <StyledSelect name={name} value={value} onChange={onChange} disabled={disabled}>
            {placeholder && <option value="" disabled hidden>{placeholder}</option>}
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </StyledSelect>
    );
};

export default Select;
