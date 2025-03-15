import styled from "styled-components";

const StyledLabel = styled.label`
    font-family: 'Lexend Deca', sans-serif;
    font-size: 0.9rem;
    color: #333333;
    margin-bottom: 8px;
    display: block; // Pour s'assurer que le label est sur une nouvelle ligne
    font-weight: bold;
`;

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

const Select = ({ label, name, value, onChange, options, placeholder, disabled }) => {
    return (
        <div>
            {label && <StyledLabel htmlFor={name}>{label}</StyledLabel>}
            <StyledSelect name={name} value={value} onChange={onChange} disabled={disabled}>
                {placeholder && <option value="" disabled hidden>{placeholder}</option>}
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </StyledSelect>
        </div>
    );
};

export default Select;
