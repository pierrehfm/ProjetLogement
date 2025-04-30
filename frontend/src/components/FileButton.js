import { useState, useEffect } from "react";
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

const FileName = styled.p`
    font-size: 0.9rem;
    color: #333;
    margin-top: 5px;
    text-align: center;
`;

const StyledLink = styled.a`
    color: #333;
    text-decoration: none;

    &:hover {
        color: var(--primary-color); 
    }
`;

const FileButton = ({ name, value, onChange, buttonText }) => {
    const [fileName, setFileName] = useState("");

    useEffect(() => {
        if (value) {
            const fileName = typeof value === 'string' ? value.split(/\\|\//).pop() : value.name;
            setFileName(fileName);
        }
    }, [value]);

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setFileName(e.target.files[0].name);
        } else {
            setFileName("");
        }
        onChange(e);
    };

    const fileUrl = fileName ? `${process.env.REACT_APP_URL_BACKEND}/uploads/${fileName.split('_')[0]}/${fileName}` : "";

    return (
        <div>
            <StyledLabel htmlFor={`file-upload-${name}`}>
                <MdOutlineFileUpload />
                {buttonText || "Choisir un fichier"}
            </StyledLabel>
            <HiddenInput 
                type="file" 
                id={`file-upload-${name}`} 
                name={name} 
                onChange={handleFileChange} 
            />
            <FileName>
                <StyledLink href={fileUrl} target="_blank" rel="noopener noreferrer">
                    {fileName}
                </StyledLink>
            </FileName>
        </div>
    );
};

export default FileButton;
