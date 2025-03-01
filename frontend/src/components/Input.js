import styled from "styled-components";

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

const Input = ({ type, name, placeholder, value, onChange, disabled }) => {
    return (
        <StyledInput
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
        />
    );
};

export default Input;