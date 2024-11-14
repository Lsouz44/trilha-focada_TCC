import styled from 'styled-components';
import { Form as FormikForm, Field as FormikField, ErrorMessage as FormikErrorMessage } from 'formik';

export const Container = styled.div`
  width: 200px;
  height: max-content;
  margin: auto;
  background-color: #ebebeb;
  padding: 20px 15px;
  margin-top: 120px;
  border-radius: 7px;
  font-family: sans-serif;
  box-shadow: 3px 3px rgba(0, 0, 0, 0.7);
`;

export const Title = styled.h1`
  font-size: 25px;
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

export const FormError = styled(FormikErrorMessage)`
  display: block;
  color: #ed4337;
  font-size: 0.9em;
  font-weight: 400;
`;