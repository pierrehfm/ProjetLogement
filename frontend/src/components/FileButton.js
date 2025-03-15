import styled from "styled-components";
import { MdOutlineFileUpload } from "react-icons/md";

const StyledLabel = styled.label`
    font-family: 'Lexend Deca', sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 0;
    background-color: var(--primary-color);
    color: white;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    width: 100%;
    text-align: center;
    gap: 10px;
`;

const HiddenInput = styled.input`
    display: none;
`;

const FileButton = ({ name, value, onChange, buttonText }) => {
    return (
        <div>
            <StyledLabel htmlFor="file-upload">
                <MdOutlineFileUpload />
                {buttonText || "Choisir un fichier"}
            </StyledLabel>
            <HiddenInput 
                type="file" 
                id="file-upload" 
                name={name} 
                value={value} 
                onChange={onChange} 
            />
        </div>
    );
};

export default FileButton;
