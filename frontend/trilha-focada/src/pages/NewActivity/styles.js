import styled from 'styled-components';
import { Form as FormikForm, Field as FormikField, ErrorMessage as FormikErrorMessage } from 'formik';

export const Container = styled.div`
  width: 1000px;
  height: max-content;
  margin: auto;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  padding: 20px 15px;
  margin-top: 120px;
  border-radius: 7px;
  font-family: "Baloo Bhai 2", serif;
  box-shadow: 0px 0px 10px 3px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  margin: 0;
  text-align: center;
  margin-top: 10px;
  font-weight: 500;
`;

export const Form = styled(FormikForm)`
  padding: 5px;
`;

export const FormGroup = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const FormField = styled(FormikField)`
  width: 98.7%;
  display: inline-block;
  padding: 5px;
`;

export const FormError = styled(FormikErrorMessage)`
  display: block;
  color: #ed4337;
  font-size: 0.9em;
  font-weight: 400;
`;

export const RadioLabel = styled.label`
  display: flex;
  align-items: baseline;
  margin-left: 7px;
  font-size: 16px;
`;

export const RadioField = styled(FormikField)`
  margin-right: 9px;
`;

export const Label = styled.label`
  font-size: 18px;
  font-weight: 500;
  color: ${({ theme }) => theme.COLORS.BLACK};

  &.children{
    font-size: 15px;
  }
`;

export const TimeContainer = styled.div`
  display: flex;
  justify-content: baseline;
  gap: 50px;
`;