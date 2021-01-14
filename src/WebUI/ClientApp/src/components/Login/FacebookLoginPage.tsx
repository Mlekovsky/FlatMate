import React from 'react';
import FacebookLogin from 'react-facebook-login';

const responseFacebook = (response) => {
  console.log(response);
};

export const FacebookLoginPage = () => {
  return (
    <>
      {/* <FacebookLogin
          appId="399635261114470"
          autoLoad={true}
          fields="name,email,picture"
          onClick={componentClicked}
          callback={responseFacebook} /> */}
      <FacebookLogin appId="399635261114470" autoLoad={true} fields="name,email,picture" callback={responseFacebook} />
    </>
  );
};
