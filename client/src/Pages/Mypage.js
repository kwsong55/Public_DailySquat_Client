import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col, Button, Alert} from 'react-bootstrap';

import styled from 'styled-components';
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
    ${'' /* // background: #76b852;
    // background: -webkit-linear-gradient(right, #76b852, #8DC26F);
    // background: -moz-linear-gradient(right, #76b852, #8DC26F);
    // background: -o-linear-gradient(right, #76b852, #8DC26F);
    // background: linear-gradient(to left, #76b852, #8DC26F); */}
    font-family: "Roboto", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    opacity: 0.5;
`;


class Mypage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      totalCount: null
    }
    this.signout = this.signout.bind(this);
    //this.AlertDismissible = this.AlertDismissible.bind(this);
  }

  getTotalCount = () => {
    fetch('http://localhost:4000/count/getTotalCount/1', {
      method: 'GET',
      headers: {
        accessToken: JSON.stringify(localStorage.getItem('dailySquatToken')),
      }
    })
      .then((data) => {
        return data.json();
      })
      .then((value) => {
        console.log(value.totalCount)
        this.setState({
          totalCount: value.totalCount
        })
      })
  }

  signout = () => {
    fetch('http://localhost:4000/users/signout', {
      headers: {
        'Content-Type': 'application/json',
        'accessToken': JSON.stringify(localStorage.getItem('dailySquatToken')),
      }
    })
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        if (data === 'exist token') {
          localStorage.removeItem('dailySquatToken')
          alert('???????????? ???????????????')
        } else {
          alert('???????????? ??????. ?????? ??? ?????? ??????????????????.')
        }
      })
      .catch((err) => err);
  }

  secession = () => {
    fetch('http://localhost:4000/users/secession', {
      headers: {
        'Content-Type': 'application/json',
        'accessToken': JSON.stringify(localStorage.getItem('dailySquatToken')),
      }
    })
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        if (data === ' success secession') {
          localStorage.removeItem('dailySquatToken')
          alert('?????? ?????? ???????????????')
        } else {
          alert('?????? ??????. ?????? ??? ?????? ??????????????????.')
        }
      })
      .catch((err) => err);
  }

  componentWillMount() {
    fetch('http://localhost:4000/count/getTotalCount/1', {
      method: 'GET',
      headers: {
        accessToken: JSON.stringify(localStorage.getItem('dailySquatToken')),
      }
    })
      .then((data) => {
        return data.json();
      })
      .then((value) => {
        console.log(value.totalCount)
        this.setState({
          totalCount: value.totalCount
        })
      })
  }

  


  render() {
    console.log('props!!!!!!! : ', this.props);

    const { userInfo } = this.props;

    return (
      <Container>
        <Background></Background>
        <Row>
          <Col><br />
          <Button variant="outline-dark" onClick={() => {
            this.props.history.push('/Home');
          }}>Home</Button>&nbsp;&nbsp;&nbsp;
          <span style={{"font-weight": "bold", "font-family": "sans-serif", "color":"green"}}>{JSON.parse(userInfo).name}</span>
          <span> ???, ????????? ??????????????????!</span>
          </Col>
          <Col align="right"><br />
            <Button variant="outline-dark" onClick={async () => {
              this.signout();
              this.props.handleSignOut();
              localStorage.clear();
              this.props.history.push('/')
            }}>????????????</Button>&nbsp;&nbsp;
            <Button variant="outline-danger"onClick={() => {
              let result = window.confirm("????????? ?????????????????????????");
              if (result) {
                this.secession();
                this.props.handleSignOut();
                localStorage.clear();
                this.props.history.push('/')
              }
            }}>????????????</Button>
           
          </Col>
        </Row>
        <Row>
          <Col align="center">
            <br /><br /><br /><br /><br /><br />
            <div style={{"font-size": "1.5em", "font-family": "sans-serif"}}>????????? : {JSON.parse(userInfo).email}</div>
            <div style={{"font-size": "1.5em", "font-family": "sans-serif"}}>???????????? ?????? : {JSON.parse(userInfo).createdAt}</div>
            {/* <span style={{"font-size": "1.0em", "font-family": "sans-serif"}}>?????????</span>&nbsp;&nbsp;
            <span style={{"font-weight": "bold"}}>{JSON.parse(userInfo).email}</span><br />
            <span style={{"font-size": "1.0em", "font-family": "sans-serif"}}>???????????? ??????</span>&nbsp;&nbsp;
            <span style={{"font-weight": "bold"}}>{JSON.parse(userInfo).createdAt}</span> */}
            
            <p />
            <div style={{"font-weight": "bold", "font-style": "italic", "font-size": "2.0em", "font-family": "sans-serif"}}>
            <span>{JSON.parse(userInfo).name}?????? ?????? ????????? ????????? </span>
            <span style={{"color":"navy"}}>{this.state.totalCount}???</span>
            <span> ?????????</span>
            <div>
            <span>??? ?????? ????????????</span> <span style={{"color":"navy"}}>{this.state.totalCount * 0.3}kcal</span><span> ?????????</span>
            </div>
            </div>
            <p />
          </Col>
        </Row>
      </Container>

    )
  }
}

export default withRouter(Mypage);
