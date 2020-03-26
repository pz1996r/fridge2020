import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Input = styled.input`
  background: #e9e9e9;
  border-radius: 0.125rem;
  padding: 10px 20px;
  width: 220px;
  border: none;
  color: #333333;
  margin: 0 0 20px 0;
  &:focus {
    background: #ffaca6;
    background: #dae9f8;
    outline: none;
  }
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

export const H1 = styled.h1`
  margin-bottom: 30px;
  font-size: 20px;
  text-align: center;
`;

export const Span = styled.span`
  color: #3f51b5;
`;

export const RedirectContainer = styled.div`
  width: 100%;
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
