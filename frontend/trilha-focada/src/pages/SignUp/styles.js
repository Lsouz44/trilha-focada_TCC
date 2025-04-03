import styled from 'styled-components';
import { Form as FormikForm, Field as FormikField, ErrorMessage as FormikErrorMessage } from 'formik';

export const Container = styled.div`
  width: 400px;
  height: max-content;
  margin: auto;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  padding: 20px 15px;
  margin-top: 150px;
  border-radius: 7px;
  font-family: 'Baloo Bhai 2', serif;
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.1);
`;

export const Img = styled.img`
  position: absolute;
  height: 100px;
  top: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
`

export const Title = styled.h1`
  margin: 0;
  text-align: center;
  margin-top: 0.2rem;
  font-weight: 500;
  font-size: 25px;
`;

export const Form = styled(FormikForm)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;

  > label {
    margin-top: 5px;
    font-size: 14px;
    align-self: center;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 220px; 
  margin: 0 auto;
`;

export const FormField = styled(FormikField)`
  width: 95%;
  margin-bottom: 7px;
  padding: 5px;
  border: 1px solid #dedede;
  border-radius: 8px;
  box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.1);
  outline: none;

  &:focus {
    border-color: #aaa;
  }
`;

export const Label = styled.label`
  font-size: 18px;
  font-weight: 500;
  color: ${({ theme }) => theme.COLORS.BLACK};
  margin-bottom: 5px;
`;

export const FormError = styled(FormikErrorMessage)`
  display: block;
  color: #ed4337;
  font-size: 0.9em;
  font-weight: 400;
`;

export const SelectWrapper = styled.div`
  position: relative;
  width: 100%;

  select {
    width: 100%;
    height: 28px;
    padding: 5px;
    border: 1px solid #dedede;
    border-radius: 8px;
    box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.1);
    font-size: 14px;
    cursor: pointer;
  }
`;

export const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; 
  gap: 10px;
  margin-top: 10px;
  width: 80%;
`;

export const Info = styled.label`
  display: flex;
  align-items: flex-start;
  font-size: 12px;
  color: ${({ theme }) => theme.COLORS.BLACK};
  cursor: pointer;
  width: 100%;
  text-align: justify;
  gap: 10px;

  input {
    appearance: none; /* Remove estilo padrão */
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    border: 2px solid #ccc; /* Borda cinza claro */
    border-radius: 4px; /* Arredondamento da caixinha */
    margin-top: 2px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease-in-out;

    &:checked {
      background-color: #007bff; /* Azul quando selecionado */
      border-color: #007bff;
      position: relative;
    }

    &:checked::after {
      content: '✔';
      font-size: 12px;
      color: white;
      font-weight: bold;
      display: block;
      text-align: center;
      line-height: 16px;
    }

    span {
      flex: 1; /* Faz o texto ocupar o restante do espaço */
      text-align: justify;
    }
  }
`;