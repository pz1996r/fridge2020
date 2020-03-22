import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Elements connected with Login/Register Form
export const FormWrapper = styled.div`
  padding-top: 80px;
  font-family: sans-serif;
  width: 100vw;
  margin: 0 auto;
  text-align: center;
`;

export const Form = styled.form`
  text-align: left;
  margin: 0 auto;
  max-width: 270px;
`;

export const FormItem = styled.div`
  width: 100%;
  margin: 30px 0;
  position: relative;
  flex-shrink: 0;
  overflow: hidden;
`;

export const Input = styled.input`
  font-size: 16px;
  border: none;
  line-height: 22px;
  width: 100%;
  background: none;
  color: #7d7d7d;

  &:focus {
    outline: none;
  }

  &:focus + label {
    color: #3f51b5;
    top: 50px;
  }
  &:focus ~ div {
    background: #3f51b5;
  }
  &:not(:placeholder-shown) + label {
    left: -70px;
  }
`;

export const InputItemBar = styled.div`
  height: 2px;
  background: ${({ error }) => (error ? 'red' : '#bab7b7')};
  transition: 0.1s all;
`;

export const Label = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  transition: 0.5s ease-out all;
  font-size: 14px;
  color: #7d7d7d;
`;

export const Button = styled.button`
  color: #fff;
  text-transform: uppercase;
  word-wrap: break-word;
  white-space: normal;
  cursor: pointer;
  border: 0;
  border-radius: 0.125rem;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  padding: 0.84rem 2.14rem;
  font-size: 0.81rem;
  background-color: ${({ color }) => color || '#3f51b5'};

  &:hover {
    outline: 0;
    box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15);
  }
  &:focus {
    outline: 0;
    box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15);
  }
`;

export const CenterButton = styled.div`
  text-align: center;
`;
// Redirect Container with information and Link
export const RedirectContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  margin: 24px 0;
`;
export const P = styled.p`
  margin: 0;
  font-size: 12px;
`;

export const LinkTo = styled(Link)`
  font-size: 12px;
  color: gray !important;
  margin-left: 8px;
  text-decoration: none;
`;
// Nagłówek i Error display container (p);
export const H1 = styled.h1`
  margin-bottom: 30px;
  font-size: 20px;
  text-align: center;
`;

export const Span = styled.span`
  color: #3f51b5;
`;

export const Error = styled.p`
  color: red;
  transition: 3s linear;
  transition: max-height 3s ease-out;
  height: auto;
  overflow: hidden;
  max-height: ${({ error }) => (error ? '100px' : '0')};

  /* &:empty{
        max-height:0;
        background: red;
    } */
`;
