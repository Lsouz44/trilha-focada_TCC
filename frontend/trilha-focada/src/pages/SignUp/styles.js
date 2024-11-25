import styled from 'styled-components';
import { Form as FormikForm, Field as FormikField, ErrorMessage as FormikErrorMessage } from 'formik';

export const Container = styled.div`
  width: 500px;
  height: max-content;
  text-align: center;
  height: auto;
  margin: auto;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  padding: 20px 15px;
  margin-top: 140px;
  border-radius: 7px;
  font-family: 'Baloo Bhai 2', serif;
  box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.3);
`;


export const Title = styled.h1`
  margin: 0;
  text-align: center;
  margin-top: 10px;
`;

export const Form = styled(FormikForm)`
  padding: 9px;

  
  
`;

export const FormGroup = styled.div`
  margin-top: 0px;
  label {
  display: block;
  margin-bottom: 5px;
  margin: auto
}
`;

export const FormField = styled(FormikField)`
font-family: 'Baloo Bhai 2', serif;
  padding: 7px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  color: ${({ theme }) => theme.COLORS.BLACK};

`;

export const Label = styled.label`
  font-size: 18px;
  font-weight: 300;
  color: ${({ theme }) => theme.COLORS.BLACK};
  
`;

export const FormError = styled(FormikErrorMessage)`
  display: block;
  color: ${({ theme }) => theme.COLORS.RED};
  font-size: 0.9em;
  font-weight: 400;
  
`;

export const Button = styled.button`
  background-color: ${({ theme }) => theme.COLORS.BLUE};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  margin-bottom: 30px;
  transition: background-color 0.3s ease;
  &:hover {
  background-color: ${({ theme }) => theme.COLORS.DARK_BLUE};
 
  }
`;