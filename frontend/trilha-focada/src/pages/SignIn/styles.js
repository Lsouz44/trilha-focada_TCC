import styled from 'styled-components';
import { Form as FormikForm, Field as FormikField, ErrorMessage as FormikErrorMessage } from 'formik';

export const Container = styled.div`
  width: 200px;
  height: max-content;
  margin: auto;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  padding: 20px 15px;
  margin-top: 120px;
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
  padding: 5px;
`;

export const FormGroup = styled.div`
  margin-top: 20px;
`;

export const FormField = styled(FormikField)`
  display: inline-block;
  padding: 5px;
`;

export const Label = styled.label`
  font-size: 18px;
  font-weight: 500;
  color: ${({ theme }) => theme.COLORS.BLACK};
`;

export const FormError = styled(FormikErrorMessage)`
  display: block;
  color: ${({ theme }) => theme.COLORS.RED};
  font-size: 0.9em;
  font-weight: 400;
`;