import React from "react";
import { NavBar, Icon, List, InputItem, Toast, Button } from "antd-mobile";
import history from "./../../router/history";
import url from "./../../serviceAPI.config";
class Login extends React.Component {
  state = {
    userErrorMsg: "",
    passErrorMsg: "",
    userName: "",
    password: "",
    loading: false
  };
  handleUser(value) {
    if (value.length < 5) {
      this.setState({
        userErrorMsg: "用户名长度不能小于5"
      });
    } else {
      this.setState({
        userErrorMsg: ""
      });
    }
    this.setState({
      userName: value
    });
  }
  handlePass(value) {
    if (value.length < 5) {
      this.setState({
        passErrorMsg: "密码长度不能小于5"
      });
    } else {
      this.setState({
        passErrorMsg: ""
      });
    }
    this.setState({
      password: value
    });
  }

  onErrorClick() {
    this.state.userErrorMsg && Toast.info(this.state.userErrorMsg);
    this.state.passErrorMsg && Toast.info(this.state.passErrorMsg);
  }
  handleSubmit() {
    if (this.checkForm()) {
      this.axiosLogin();
    }
  }
  checkForm() {
    let isOk = false;
    if (this.state.userName.length < 5) {
      this.setState(
        {
          userErrorMsg: "用户名长度不能小于5"
        },
        () => {
          this.onErrorClick();
        }
      );
    } else if (this.state.password.length < 5) {
      this.setState(
        {
          passErrorMsg: "密码长度不能小于5"
        },
        function() {
          this.onErrorClick();
        }
      );
    } else {
      isOk = true;
    }
    return isOk;
  }
  axiosLogin() {
    this.setState({
      loading: true
    });
    React.$axios({
      url: url.login,
      method: "post",
      data: {
        userName: this.state.userName,
        password: this.state.password
      }
    })
      .then(res => {
        console.log(res);
        if (res.data.code === 200 && res.data.message) {
          new Promise((resolve, reject) => {
            localStorage.userInfo = { userName: this.state.userName };
            setTimeout(() => {
              resolve();
            }, 500);
            Toast.success("注册成功，登录自动保存");
          })
            .then(() => {
              history.push("/");
            })
            .catch(err => {
              Toast.fail("登录状态保存失败");
              console.log(err);
            });
        } else {
          Toast.fail("登录失败");
          this.setState({
            loading: false
          });
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({
          loading: false
        });
        Toast.fail("登录失败");
      });
  }
  render() {
    return (
      <div>
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          leftContent="返回"
          onLeftClick={() => history.goBack()}
        >
          用户注册
        </NavBar>
        <List>
          <InputItem
            placeholder="请输入你的用户名"
            onChange={this.handleUser.bind(this)}
            error={!!this.state.userErrorMsg}
            onErrorClick={this.onErrorClick.bind(this)}
            value={this.state.userName}
          >
            用户名
          </InputItem>
          <InputItem
            placeholder="****"
            type="password"
            onChange={this.handlePass.bind(this)}
            error={!!this.state.passErrorMsg}
            onErrorClick={this.onErrorClick.bind(this)}
            value={this.state.password}
          >
            密码
          </InputItem>
        </List>
        <List>
          <Button
            type="primary"
            style={{ marginTop: 80 }}
            onClick={this.handleSubmit.bind(this)}
            loading={this.state.loading}
          >
            注册
          </Button>
        </List>
      </div>
    );
  }
}

export default Login;
