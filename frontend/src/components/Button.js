import styled from "styled-components";

const StyledButton = styled.button`
    font-family: 'Lexend Deca', sans-serif;
    width: 100%;
    padding: 12px;
    background-color: var(--primary-color);
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
`;

const Button = ({ text, onClick }) => (
    <StyledButton onClick={onClick}>
      {text}
    </StyledButton>
  );
  
export default Button;