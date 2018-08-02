import React from "react";
import { toMoney } from "../../utils/filter";
import history from "./../../router/history";
import classes from "./index.scss";
class GoodInfo extends React.Component {
  goGoodPage(id) {
    history.push(`/detail/${id}`);
  }

  render() {
    return (
      <div
        className={classes.goodInfo}
            onClick={this.goGoodPage.bind(this, this.props.goodId)}
      >
        <div className={classes.goodImage}>
          <img src={this.props.goodImage} width="90%" alt="商品" />
        </div>
        <div className={classes.goodName}>{this.props.goodName}</div>
        <div className={classes.goodPrice}>
          ￥{toMoney(this.props.goodPrice)}
        </div>
      </div>
    );
  }
}

export default GoodInfo;
