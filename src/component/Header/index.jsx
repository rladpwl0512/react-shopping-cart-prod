import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import Button from 'component/common/Button';
import {ReactComponent as LogoIcon} from 'assets/logoIcon.svg';

import * as S from 'component/Header/style';

import {PATH} from 'constant';
import {BASE_SERVER_URL, SERVER_PATH} from 'constant/server';

import baedale from 'assets/baedale.png';
import baedaleHover from 'assets/baedale_hover.png';

import {AUTH} from 'store/modules/auth';

import useFetch from 'hook/useFetch';

export default function Header() {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const isLogin = useSelector((state) => state.authReducer.isLogin);

  const userInfo = useFetch('get');

  const checkLogin = () => {
    const response = JSON.parse(localStorage.getItem('accessToken'));

    if (!response) {
      dispatch({type: AUTH.LOGOUT});
      return;
    }

    const accessToken = response.accessToken;

    userInfo.fetch({
      API_URL: `${BASE_SERVER_URL}${SERVER_PATH.CUSTOMERS}`,
      headers: {Authorization: `Bearer ${accessToken}`},
      onSuccess: () => {
        dispatch({type: AUTH.LOGIN});
      },
      onFail: (error) => {
        alert(error);
      },
    });
  };

  useEffect(() => {
    checkLogin();
  }, []);

  const handleLogoClick = () => navigation(PATH.HOME);

  const handleClickLogout = () => {
    dispatch({type: AUTH.LOGOUT});
  };

  return (
    <S.HeaderLayout>
      <Button onClick={handleLogoClick}>
        <LogoIcon />
      </Button>
      <S.HeaderNavBox>
        <S.NavText to={PATH.CART}>장바구니</S.NavText>
        <S.NavText to={PATH.ORDER}>구매목록</S.NavText>
        {isLogin ? (
          <>
            <S.Profile>
              <S.ProfileImage src={baedaleHover} alt="프로필 이미지" />
              <S.ProfileImage className="baedale" src={baedale} alt="프로필 이미지" />
              <div className="tooltip-container"></div>
              <div className="tooltip-content">
                <S.ProfileNavContainer>
                  <S.ProfileLinkText to={PATH.HOME} onClick={handleClickLogout}>
                    로그아웃
                  </S.ProfileLinkText>
                  <S.ProfileNavText to={PATH.EDIT_USER_INFO}>회원 정보 수정</S.ProfileNavText>
                  <S.ProfileNavText to={PATH.WITHDRAWAL}>회원탈퇴</S.ProfileNavText>
                </S.ProfileNavContainer>
              </div>
            </S.Profile>
          </>
        ) : (
          <S.NavText to={PATH.LOGIN}>로그인</S.NavText>
        )}
      </S.HeaderNavBox>
    </S.HeaderLayout>
  );
}
