import React from "react";
import { NavBar, Icon, Tabs, Toast, Button } from "antd-mobile";
import { toMoney } from "../../utils/filter";
import history from "../../router/history";
import classes from "./index.scss";
import url from "../../serviceAPI.config";
import { StickyContainer, Sticky } from "react-sticky";

class Goods extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goodId: this.props.match.params.goodId,
      goodsInfo: {}
    };
  }
  componentDidMount() {
    this.getInfo();
  }
  getInfo() {
    React.$axios({
      url: url.getDetailGoodsInfo,
      method: "post",
      data: { goodId: this.state.goodId }
    })
      .then(res => {
        console.log(res);
        if (res.data.code === 200 && res.data.message) {
          this.setState({
            goodsInfo: res.data.message
          });
        } else {
          Toast("服务器错误，数据获取失败");
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    function renderTabBar(props) {
      return (
        <Sticky>
          {({ style }) => (
            <div style={{ ...style, zIndex: 1 }}>
              <Tabs.DefaultTabBar {...props} />
            </div>
          )}
        </Sticky>
      );
    }
    return (
      <div className={classes.goods}>
        <div className={classes.navBar}>
          <NavBar
            mode="light"
            icon={<Icon type="left" />}
            leftContent="返回"
            onLeftClick={() => history.push("/")}
          >
            商品详情
          </NavBar>
        </div>
        <div className={classes.topImage}>
          <img src={this.state.goodsInfo.IMAGE1} alt="商品图片" width="100%" />
        </div>
        <div className={classes.goodsName}>{this.state.goodsInfo.NAME}</div>
        <div className={classes.goodsPrice}>
          价格:￥{toMoney(this.state.goodsInfo.PRESENT_PRICE)}
        </div>
        <div>
          <StickyContainer>
            <Tabs
              tabs={[{ title: "商品详情" }, { title: "评论" }]}
              initalPage={"t2"}
              renderTabBar={renderTabBar}
            >
              <div
                className={classes.detail}
                dangerouslySetInnerHTML={{
                  __html: this.state.goodsInfo.DETAIL
                }}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "250px",
                  backgroundColor: "#fff"
                }}
              >
                评论制作中
              </div>
            </Tabs>
          </StickyContainer>
        </div>
        <div className={classes.goodsBottom}>
          <div>
            <Button type="primary">加入购物车</Button>
          </div>
          <div>
            <Button type="warning">直接购买</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Goods;
