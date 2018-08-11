import React from "react";
import { NavBar, Icon, Button, Stepper } from "antd-mobile";
import history from "../../router/history";
import classes from "./index.scss";
import { toMoney } from "../../utils/filter";
class Cart extends React.Component {
  state = { cartInfo: [], isEmpty: false };
  componentDidMount() {
    this.getCartInfo();
  }
  clearCart() {
    localStorage.removeItem("cartInfo");
    this.setState({
      cartInfo: []
    });
  }
  onChange(index, val) {
    let newCartInfo = this.state.cartInfo.concat();
    newCartInfo[index].count = val;
    this.setState({ cartInfo: newCartInfo });
    localStorage.cartInfo = JSON.stringify(this.state.cartInfo);

  }
  getCartInfo() {
    if (localStorage.cartInfo) {
      this.setState({
        cartInfo: JSON.parse(localStorage.cartInfo)
      });
      console.log("this.cartInfo", JSON.stringify(this.state.cartInfo));
      this.setState({
        isEmpty: this.state.cartInfo.length > 0 ? true : false
      });
    }
  }
  getAllMoney() {
    
    let allMoney = 0;
    this.state.cartInfo.forEach((item, index) => {
      allMoney += item.price * item.count;
    });
    return allMoney;
  }
  render() {
    return <div className={classes.cart}>
        <NavBar mode="dark" icon={<Icon type="left" />} leftContent="返回" onLeftClick={() => history.goBack()}>
          购物车
        </NavBar>
        <div className={classes.cartTitle}>
          <Button onClick={this.clearCart.bind(this)} type="warning" size="small" inline className={classes.Button}>
            清空购物车
          </Button>
        </div>
        <div className={classes.cartList}>
          {this.state.cartInfo.map((item, index) => (
            <div className={classes.cartRow} key={index}>
              <div className={classes.goodImage}>
                <img src={item.image} alt="商品图片" width="100%" />
              </div>
              <div className={classes.cartText}>
                <div className={classes.goodName}>{item.name}</div>
                <div className={classes.goodControl}>
                  <Stepper
                    style={{ width: "160px", minWidth: "100px" }}
                    showNumber
                    max={10}
                    min={1}
                    value={item.count}
                    onChange={this.onChange.bind(this, index)}
                  />
                </div>
              </div>
              <div className={classes.goodPrice}>
                <div className={classes.singlePrice}>
                  ￥{toMoney(item.price)}
                </div>
                <div className={classes.count}>￥{item.count}</div>
                <div className={classes.allPrice}>
                  ￥{toMoney(item.count * item.price)}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={classes.allMoney}>
          总价:￥{toMoney(this.getAllMoney.call(this))}
        </div>
      </div>;
  }
}

export default Cart;
