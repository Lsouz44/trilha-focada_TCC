import styled from 'styled-components';
import { Form as FormikForm, Field as FormikField, ErrorMessage as FormikErrorMessage } from 'formik';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  top: 190px;
  width: 500px;
  height: max-content;
  min-width: 290px;
  margin: auto;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  padding: 20px 30px;
  border-radius: 7px;
  font-family: "Baloo Bhai 2", serif;
  box-shadow: 0px 0px 10px 3px rgba(0, 0, 0, 0.1);
`;

export const Img = styled.img`
  position: absolute;
  height: 50px;
  top: -80px;
`

export const Title = styled.h1`
  margin: 0;
  margin-top: 10px;
  margin-left: 10px;
  font-weight: 600;
  text-align: left;
  width: 100%;
`;

export const Form = styled(FormikForm)`
  padding: 5px;
`;

export const FormGroup = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;

  h1 {
    font-size: 25px;
    font-weight: 400;
    line-height: 1.2;
  }
`;

export const FormField = styled(FormikField)`
  width: 475px;
  height: 20px;
  margin-bottom: 8px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.COLORS.GRAY_LIGHT};
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1);
  display: inline-block;
  outline: none;
  transition: border 0.2s;

  &:focus {
    border: 1px solid ${({ theme }) => theme.COLORS.BLUE_DARK};
  }
`;

export const FormError = styled(FormikErrorMessage)`
  display: block;
  color: #ed4337;
  font-size: 0.9em;
  font-weight: 400;
`;

export const Label = styled.label`
  font-size: 18px;
  font-weight: 500;
  color: ${({ theme }) => theme.COLORS.BLACK};

  &.children{
    font-size: 15px;
  }
`;