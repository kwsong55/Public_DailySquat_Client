import React, { Component } from 'react'

import styled from 'styled-components';

import $ from "jquery";

import image from './image/meghan-holmes-wy_L8W0zcpI-unsplash.jpg';

const Background = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url(${image});
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    // background: #76b852;
    // background: -webkit-linear-gradient(right, #76b852, #8DC26F);
    // background: -moz-linear-gradient(right, #76b852, #8DC26F);
    // background: -o-linear-gradient(right, #76b852, #8DC26F);
    // background: linear-gradient(to left, #76b852, #8DC26F);
    font-family: "Roboto", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;  
`;

const LoginPage = styled.div`
    width: 360px;
    padding: 12% 0 0;
    margin: auto;
    `;

const Headline = styled.h1`
    font-family: "Roboto", sans-serif;
    width: 360px;
    font-size: 60px;
    text-align: center;
    margin: auto;
    color: white;
    text-shadow: 2px 2px 2px black;;
`;

const FormDiv = styled.div`
    position: relative;
    z-index: 1;
    // background: #FFFFFF;
    max-width: 360px;
    margin: 0 auto 100px;
    padding: 45px;
    text-align: center;
    // box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
`;

const Input = styled.input`
    font-family: "Roboto", sans-serif;
    outline: 0;
    background: #f2f2f2;
    width: 100%;
    border: 0;
    margin: 0 0 15px;
    padding: 15px;
    box-sizing: border-box;
    font-size: 14px;
`;

const Select = styled.select`
    font-family: "Roboto", sans-serif;
    outline: 0;
    background: #f2f2f2;
    width: 100%;
    border: 0;
    margin: 0 0 15px;
    padding: 15px;
    color: #787575;
    box-sizing: border-box;
    font-size: 14px;
`;


const Button = styled.button`
    font-family: "Roboto", sans-serif;
    text-transform: uppercase;
    outline: 0;
    background: #5b5959;
    width: 100%;
    border: 0;
    padding: 15px;
    color: #FFFFFF;
    font-size: 14px;
    -webkit-transition: all 0.3 ease;
    transition: all 0.3 ease;
    cursor: pointer;
    &:hover, &:active,&:focus {
    background: #787575;
}
`;

const Message = styled.p`
    margin: 15px 0 0;
    // color: #b3b3b3;
    color: black;
    font-size: 15px;
`;

const MessageLink = styled.a`
    color: #4CAF50;
    text-decoration: none;
`;

const Register = styled.form`
    display: none;
`;

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }

  }
  async componentDidMount() {
    const { naver } = window;
    const props = this.props;

    let info;

    var naverLogin = new naver.LoginWithNaverId(
      {
        clientId: "t84crdEirUVGvCH6Sncf",
        callbackUrl: "http://localhost:3000",
        isPopup: false, /* ????????? ?????? ???????????? ?????? */
        loginButton: { color: "green", type: 3, height: 58 } /* ????????? ????????? ????????? ?????? */
      }
    );

    /* ??????????????? ??????????????? ????????? ?????? */
    naverLogin.init();

    naverLogin.getLoginStatus(async (status) => {
      if (status) {
        info = {
          email: naverLogin.user.getEmail(),
          name: naverLogin.user.getNickName(),
          password: "12345",
          gender: naverLogin.user.getGender(),
          age: naverLogin.user.getAge(),
        }
        console.log("info: ", info);

        let isDuplicate =
          await fetch(`http://localhost:4000/users/isDuplicate/${info.email}`)
            .then(res => res.json());

        // console.log(isDuplicate);

        if (!isDuplicate) {
          console.log("????????? ???????????? ????????????");

          fetch("http://localhost:4000/users/signup", {
            method: 'POST',
            body: JSON.stringify(info),
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(res => {

            if (res.ok) {
              alert("???????????? ??????");
            } else {
              alert("???????????? ??????");
            }
          })

        }

        fetch("http://localhost:4000/users/signin", {
          method: 'POST',
          body: JSON.stringify({ email: info.email, password: info.password }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(res => res.json())
          .then(data => {
            // console.log(data);
            localStorage.setItem('dailySquatToken', data);

            // console.log(props)
            props.handleIsLogin();
          })
      } else {
        console.log("AccessToken??? ???????????? ????????????.");
      }
    });

  }

  toggle = () => {
    $('form').animate({ height: "toggle", opacity: "toggle" }, "slow");
  };

  signup = (e) => {
    e.preventDefault();

    let info = {
      name: $('.name').val(),
      email: $('.email').val(),
      password: $('.password').val(),
      age: $('.age').val(),
      gender: $('.gender').val(),
    }

    // console.log("??????????????? : ", info);

    if (!info.email.match(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i)) {
      alert("???????????? ?????? ??????????????????!");
      return;
    }

    if (!info.name.match(/^[???-???a-zA-Z0-9]{2,10}$/)) {
      alert("????????? ?????? ??????????????????!");
      return;
    }

    fetch("http://localhost:4000/users/signup", {
      method: 'POST',
      body: JSON.stringify(info),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {

      if (res.ok) {
        alert("???????????? ??????");
        $('.name').val('');
        $('.email').val('');
        $('.password').val('');
        $('form').animate({ height: "toggle", opacity: "toggle" }, "slow");

      } else {
        alert("???????????? ??????");
      }
    })



  }

  signin = (e) => {
    e.preventDefault();

    let info = {
      email: $('.login_email').val(),
      password: $('.login_password').val(),
    }

    if (!info.email.match(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i)) {
      alert("???????????? ?????? ??????????????????!");
      return;
    }

    fetch("http://localhost:4000/users/signin", {
      method: 'POST',
      body: JSON.stringify(info),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        localStorage.setItem('dailySquatToken', data);
        if (localStorage.getItem('dailySquatToken')) {
          this.props.handleIsLogin();
        } else {
          alert("????????? ?????? ??????????????? ??????????????????");
        };
      })
      .catch((err) => alert("??? ??? ?????? ?????? ??????"));


  }


  render() {
    // console.log(window)

    return (
      <>
        <Background>
          <LoginPage>
            <Headline>DailySquat</Headline>
            <FormDiv>
              <Register className="register-form" method="post" onSubmit={this.signup}>
                <Input className="email" type="email" placeholder="?????????" />
                <Input className="password" type="password" placeholder="????????????" />
                <Input className="name" type="" placeholder="??????" />
                <Select className="gender">
                  <option value="m">??????</option>
                  <option value="f">??????</option>
                </Select>
                <Select className="age">
                  <option value="10">10???</option>
                  <option value="20">20???</option>
                  <option value="30">30???</option>
                  <option value="40">40???</option>
                  <option value="50">50??? ??????</option>
                </Select>

                <Button type="submit" /* onClick={this.signup} */>create</Button>
                <Message className="message">Already registered? <MessageLink onClick={this.toggle} href="#">Sign In</MessageLink></Message>
              </Register>

              <form className="login-form">
                <Input className="login_email" type="text" placeholder="?????????" />
                <Input className="login_password" type="password" placeholder="????????????" />
                <Button onClick={this.signin}>login</Button>
                <br />
                {/* <br /> */}
                {/* <hr /> */}
                <br />
                <div id="naverIdLogin"></div>
                <Message className="message">Not registered? <MessageLink onClick={this.toggle} href="#">Create an account</MessageLink></Message>

              </form>
            </FormDiv>
          </LoginPage>
        </Background>
      </>
    )
  }
}

export default Login
