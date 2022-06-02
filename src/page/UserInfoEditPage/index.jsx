import React, {useEffect} from 'react';

import * as S from './style';
import Input from 'component/common/Input';
import theme from 'theme/theme';
import useControlledInput from 'hook/useControlledInput';
import useFetch from 'hook/useFetch';
import {PATH} from 'constant';
import {useNavigate} from 'react-router-dom';

function UserInfoEditPage() {
  const navigation = useNavigate();

  const userInfo = useFetch('get');
  const editInfo = useFetch('put');

  const [onChangeNickname, restNickname] = useControlledInput({
    initialError: false,
    message: '2~10자만 입력 가능합니다.',
    isError: (nickName) => nickName.length < 2 || nickName.length > 10,
  });

  const [onChangeAddress, restAddress] = useControlledInput({
    initialError: false,
    message: '255자 이하로 작성해주세요.',
    isError: (address) => address.length > 255,
  });

  const [onChangeStartNumber, restStartNumber] = useControlledInput({
    initialError: false,
    message: '3자리 숫자',
    isError: (number) => number.length !== 3 || !Number.parseInt(number),
  });

  const [onChangeMiddleNumber, restMiddleNumber] = useControlledInput({
    initialError: false,
    message: '4자리 숫자',
    isError: (number) => number.length !== 4 || !Number.parseInt(number),
  });

  const [onChangeLastNumber, restLastNumber] = useControlledInput({
    initialError: false,
    message: '4자리 숫자',
    isError: (number) => number.length !== 4 || !Number.parseInt(number),
  });

  const submitError =
    restNickname.isError ||
    restAddress.isError ||
    restStartNumber.isError ||
    restMiddleNumber.isError ||
    restLastNumber.isError;

  const getInfo = async () => {
    const response = await JSON.parse(localStorage.getItem('accessToken'));
    const accessToken = response.accessToken;

    userInfo.fetch({
      API_URL: process.env.REACT_APP_GET_INFO_API_URL,
      body: {test: 'test:'},
      headers: {Authorization: `Bearer ${accessToken}`},
    });
  };

  const onSubmit = async (inputs) => {
    // eslint-disable-next-line no-unused-vars
    const [account, nickname, password, address, start, middle, last] = inputs;

    const response = await JSON.parse(localStorage.getItem('accessToken'));
    const accessToken = response.accessToken;

    editInfo.fetch({
      API_URL: process.env.REACT_APP_EDIT_INFO_API_URL,
      headers: {Authorization: `Bearer ${accessToken}`},
      body: {
        nickname: nickname.value || nickname.placeholder,
        address: address.value || address.placeholder,
        phoneNumber: {
          start: start.value || start.placeholder,
          middle: middle.value || middle.placeholder,
          last: last.value || last.placeholder,
        },
      },
      onSuccess: () => {
        navigation(PATH.HOME);
      },
    });
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <S.Layout>
      <S.SignupContainer>
        <S.Header>회원 정보 수정</S.Header>

        {userInfo.data && (
          <S.InputForm
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit(e.target);
            }}
          >
            <Input
              label="아이디"
              size="medium"
              id="id"
              isDisabled={true}
              value={userInfo.data.account}
            />
            <Input
              label="닉네임"
              size="medium"
              id="nickname"
              onChange={(e) => onChangeNickname(e.target.value)}
              placeHolder={userInfo.data.nickname}
              {...restNickname}
              value={restNickname.isChanged ? restNickname.value : userInfo.data.nickname}
            />
            <Input
              label="비밀번호"
              size="medium"
              id="password"
              value="********"
              isDisabled={true}
            />
            <Input
              label="주소"
              size="medium"
              id="address"
              onChange={(e) => onChangeAddress(e.target.value)}
              placeHolder={userInfo.data.address}
              {...restAddress}
              value={restAddress.isChanged ? restAddress.value : userInfo.data.address}
            />
            <S.PhoneNumberContainer>
              <Input
                label="휴대폰"
                size="small"
                id="start-number"
                onChange={(e) => onChangeStartNumber(e.target.value)}
                maxLength="3"
                placeHolder={userInfo.data.phoneNumber.start}
                {...restStartNumber}
                value={
                  restStartNumber.isChanged
                    ? restStartNumber.value
                    : userInfo.data.phoneNumber.start
                }
              />
              <S.Hyphen>-</S.Hyphen>
              <Input
                size="small"
                id="middle-number"
                onChange={(e) => onChangeMiddleNumber(e.target.value)}
                maxLength="4"
                placeHolder={userInfo.data.phoneNumber.middle}
                {...restMiddleNumber}
                value={
                  restMiddleNumber.isChanged
                    ? restMiddleNumber.value
                    : userInfo.data.phoneNumber.middle
                }
              />
              <S.Hyphen>-</S.Hyphen>
              <Input
                size="small"
                id="last-number"
                onChange={(e) => onChangeLastNumber(e.target.value)}
                maxLength="4"
                placeHolder={userInfo.data.phoneNumber.last}
                {...restLastNumber}
                value={
                  restLastNumber.isChanged ? restLastNumber.value : userInfo.data.phoneNumber.last
                }
              />
            </S.PhoneNumberContainer>
            <S.ConfirmButton
              fontSize="14px"
              backgroundColor={theme.MINT_500}
              width="300px"
              height="36px"
              type="submit"
              isDisabled={submitError}
            >
              확인
            </S.ConfirmButton>
          </S.InputForm>
        )}
      </S.SignupContainer>
    </S.Layout>
  );
}

export default UserInfoEditPage;
