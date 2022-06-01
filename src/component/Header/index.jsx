import React from 'react';
import {useNavigate} from 'react-router-dom';

import Button from 'component/common/Button';
import {ReactComponent as LogoIcon} from 'assets/logoIcon.svg';

import * as S from 'component/Header/style';

import {PATH} from 'constant';

import baedale from 'assets/baedale.png';
import baedaleHover from 'assets/baedale_hover.png';

export default function Header() {
  const navigation = useNavigate();

  const handleLogoClick = () => navigation(PATH.HOME);

  return (
    <S.HeaderLayout>
      <Button onClick={handleLogoClick}>
        <LogoIcon />
      </Button>
      <S.HeaderNavBox>
        <S.NavText to={PATH.CART}>장바구니</S.NavText>
        <S.NavText to={PATH.ORDER}>구매목록</S.NavText>
        <S.Profile>
          <S.ProfileImage src={baedaleHover} alt="프로필 이미지" />
          <S.ProfileImage className="baedale" src={baedale} alt="프로필 이미지" />
          <div className="tooltip-content">
            <S.ProfileNavContainer>
              <S.ProfileNavText to={PATH.LOGIN}>로그아웃</S.ProfileNavText>
              <S.ProfileNavText to={PATH.EDIT_USER_INFO}>회원 정보 수정</S.ProfileNavText>
              <S.ProfileNavText to={PATH.WITHDRAWAL}>회원탈퇴</S.ProfileNavText>
            </S.ProfileNavContainer>
          </div>
        </S.Profile>
      </S.HeaderNavBox>
    </S.HeaderLayout>
  );
}
