import styled from "styled-components";

const StyledLabel = styled.label`
    font-family: 'Lexend Deca', sans-serif;
    font-size: 0.9rem;
    color: #333333;
    margin-bottom: 8px;
    display: block; // Pour s'assurer que le label est sur une nouvelle ligne
    font-weight: bold;
`;

const StyledTextarea = styled.textarea`
    font-family: 'Lexend Deca', sans-serif;
    width: 100%;
    height: 200px; // Vous pouvez ajuster la hauteur ici
    padding: 12px;
    border-radius: 5px;
    font-size: 1rem;
    border: 2px solid #CCCCCC;
    transition: border-color 0.3s ease-in-out;
    box-sizing: border-box;
    color: #333333;
    resize: vertical; // Permet à l'utilisateur d'ajuster la hauteur
  
    &:focus {
        border-color: var(--primary-color);
        outline: none;
    }

    &::placeholder {
        color: #CCCCCC;
    }
`;

const Textarea = ({ label, name, placeholder, value, onChange, disabled }) => {
    return (
        <div>
            {label && <StyledLabel htmlFor={name}>{label}</StyledLabel>}
            <StyledTextarea
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

export default Textarea;
