import styled from "styled-components";

const StyledLabel = styled.label`
    font-family: 'Lexend Deca', sans-serif;
    font-size: 0.9rem;
    color: #333333;
    margin-bottom: 8px;
    display: block; // Pour s'assurer que le label est sur une nouvelle ligne
    font-weight: bold;
`;

const StyledInput = styled.input`
    font-family: 'Lexend Deca', sans-serif;
    width: 100%;
    padding: 12px;
    border-radius: 5px;
    font-size: 1rem;
    border: 2px solid #CCCCCC;
    transition: border-color 0.3s ease-in-out;
    box-sizing: border-box;
    color: #333333;
  
    &:focus {
        border-color: var(--primary-color);
        outline: none;
    }

    &::placeholder {
        color: #CCCCCC;
    }
`;

const Input = ({ label, type, name, placeholder, value, onChange, disabled }) => {
    return (
        <div>
            {label && <StyledLabel htmlFor={name}>{label}</StyledLabel>}
            <StyledInput
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
            />
        </div>
    );
};

export default Input;