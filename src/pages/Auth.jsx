import React, { useState } from 'react';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import styles from '../styles/Auth.module.css';
import backButton from '../img/ArrowLeft.svg';
import axios from 'axios';


const Auth = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [step, setStep] = useState(1);
  const [isCodeValid, setIsCodeValid] = useState(true);
  const [preToken, setPreToken] = useState('');

  const loginForBarman = async () => {
    try {
      const response = await axios.post('https://muha-backender.org.kg/accounts/login-for-client/', {
        phone_number: phoneNumber
      });
      setPreToken(response.data.pre_token);
      setStep(2);
    } catch (error) {
      console.error('Ошибка при попытке войти:', error.response?.data?.detail || error.message);
    }
  };

const confirmLoginForBarmen = async () => {
  try {
    const response = await axios.post('https://muha-backender.org.kg/accounts/confirm-login/', {
      code: verificationCode
    }, {
      headers: {
        'Authorization': `${preToken}`
      }
    });

    localStorage.setItem('accessToken', response.data.access);
    localStorage.setItem('refreshToken', response.data.refresh);

    window.location.href = '/all-orders';
  } catch (error) {
    setIsCodeValid(false);
    console.error('Ошибка при подтверждении кода:', error.response?.data?.detail || error.message);
  }
};




  const handleResendCode = async () => {
    setVerificationCode('');
    setIsCodeValid(true);
    await loginForBarman();
  };

  const handleCodeChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const backAuth = () => {
    setVerificationCode('');
    setIsCodeValid(true);
    setStep(1);
  };

  return (
      <div className={styles.authContainer}>
        {step === 1 && (
            <div className={styles.auth}>
              <div className={styles.card}>
                <div className={styles.header}>
                  Укажите номер телефона
                </div>
                <h2 className={styles.authTheme}>Вход</h2>
                <div className={styles.headerTopic}>
                  Введите номер телефона, на который придет код
                </div>
                <div>
                  <p className={styles.textTopic}>Номер телефона</p>
                </div>
                <div className={styles.body}>
                  <div className={styles.phoneInput}>
                    <PhoneInput
                        className={styles.inputAuth}
                        international
                        defaultCountry="KG"
                        value={phoneNumber}
                        onChange={setPhoneNumber}
                    />
                  </div>
                  <button className={styles.submitBtn} onClick={loginForBarman} disabled={!phoneNumber || phoneNumber.length < 5} >
                    Получить код
                  </button>
                </div>
              </div>
            </div>
        )}

        {step === 2 && (
            <div className={styles.authNumber}>
              <div className={styles.cardNumber}>
                <div className={styles.headerNumber}>
                  <button className={styles.backButtonTest} onClick={backAuth}>
                    <img src={backButton} alt=""/>
                  </button>
                  <p>Введите код подтверждения</p>
                </div>
                <h2 className={styles.authTheme}>Вход</h2>
                <div className={styles.textNumber}>
                  Код подтверждения был отправлен на номер {phoneNumber}
                </div>
                <div>
                  {isCodeValid ? (
                      <p className={styles.textTopic}>Код из СМС</p>
                  ) : (
                      <p className={styles.error}>Код неверный, попробуйте еще раз</p>
                  )}
                </div>
                <div className={styles.body}>
                  <input type="text"
                         placeholder="0000"
                         className={styles.test}
                         maxLength="4"
                         onChange={handleCodeChange}
                         value={verificationCode}
                  />
                  <button
                      className={verificationCode.length === 4 ? styles.submitCode : styles.submitCodeDisabled}
                      onClick={confirmLoginForBarmen}
                      disabled={verificationCode.length !== 4}
                  >
                    Войти
                  </button>
                  <button className={styles.submitCodeBtn} onClick={handleResendCode}>
                    Отправить повторно
                  </button>
                </div>
              </div>
            </div>
        )}
        )}

        {step === 3 && (
            <div className="confirmation-step">
              <p>Код подтвержден, спасибо за регистрацию!</p>
            </div>
        )}
      </div>
  );
};

export default Auth;
