import styled from 'styled-components';
import {FlexColumn} from 'style/common';
import Button from 'component/common/Button';

const Layout = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: ${({theme}) => theme.GRAY_400};
`;

const SignupContainer = styled.div`
  margin: 200px auto 0;
  width: 600px;
  height: 680px;
  background-color: ${({theme}) => theme.WHITE};
`;

const Header = styled.header`
  font-size: 34px;
  font-weight: 700;
  margin-bottom: 51px;
  text-align: center;
  padding-top: 40px;
`;

const InputCol = styled(FlexColumn)`
  gap: 10px;
  align-items: center;
`;

const ConfirmButton = styled(Button)`
  margin-top: 34px;
`;

export {Layout, SignupContainer, Header, InputCol, ConfirmButton};
