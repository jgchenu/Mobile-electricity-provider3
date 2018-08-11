import React from "react";
import { TabBar } from "antd-mobile";
import classes from "./index.scss";
import history from "./../../router/history";
class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: "main",
      cartCount: 0
    };
  }

  componentDidMount() {
    let cartInfo = JSON.parse(localStorage.cartInfo);
    this.setState({
      cartCount: cartInfo.length
    });
    this.renderSelectedTab();
  }
  componentDidUpdate() {
    this.renderSelectedTab();
  }
  renderSelectedTab() {
    switch (history.location.pathname) {
      case "/":
        this.setState({ selectedTab: "main" });
        break;
      case "/categoryList":
        this.setState({ selectedTab: "categoryList" });
        break;
      case "/cart":
        this.setState({ selectedTab: "cart" });
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <div className={classes.Home}>
        <div className={classes.content}>{this.props.children}</div>
        <div className={classes.bottomMenu}>
          <TabBar
            unselectedTintColor="#949494"
            tintColor="#33A3F4"
            barTintColor="white"
            noRenderContent={false}
          >
            <TabBar.Item
              title="首页"
              key="main"
              icon={
                <div
                  style={{
                    width: "22px",
                    height: "22px",
                    background:
                      "url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat"
                  }}
                />
              }
              selectedIcon={
                <div
                  style={{
                    width: "22px",
                    height: "22px",
                    background:
                      "url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat"
                  }}
                />
              }
              selected={this.state.selectedTab === "main"}
              onPress={() => {
                this.setState({ selectedTab: "main" });
                history.push("/");
              }}
              data-seed="main"
            />
            <TabBar.Item
              icon={
                <div
                  style={{
                    width: "22px",
                    height: "22px",
                    background:
                      "url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat"
                  }}
                />
              }
              selectedIcon={
                <div
                  style={{
                    width: "22px",
                    height: "22px",
                    background:
                      "url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat"
                  }}
                />
              }
              title="列表"
              key="categoryList"
              selected={this.state.selectedTab === "categoryList"}
              onPress={() => {
                this.setState({ selectedTab: "categoryList" });
                history.push("/categoryList");
              }}
              data-seed="categoryList"
            />
            <TabBar.Item
              icon={
                <div
                  style={{
                    width: "22px",
                    height: "22px",
                    background:
                      "url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat"
                  }}
                />
              }
              selectedIcon={
                <div
                  style={{
                    width: "22px",
                    height: "22px",
                    background:
                      "url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat"
                  }}
                />
              }
              title="购物车"
              key="cart"
              badge={this.state.cartCount}
              selected={this.state.selectedTab === "cart"}
              onPress={() => {
                this.setState({ selectedTab: "cart" });
                history.push("/cart");
              }}
            />
            <TabBar.Item
              icon={{
                uri:
                  "https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg"
              }}
              selectedIcon={{
                uri:
                  "https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg"
              }}
              title="会员中心"
              key="info"
              selected={this.state.selectedTab === "info"}
              onPress={() => {
                this.setState({ selectedTab: "info" });
              }}
            />
          </TabBar>
        </div>
      </div>
    );
  }
}

export default Home;
