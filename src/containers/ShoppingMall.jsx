import React from "react";
import locationIcon from "../assets/images/location.png";
import url from "../serviceAPI.config";
import classes from "../assets/style/ShoppingMall.scss";
import { Button, Carousel, WingBlank } from "antd-mobile";
// import axios from "axios";
class ShoppingMall extends React.Component {
  constructor() {
    super();
    this.state = {
      bannerPicArr: [],
      category: [],
      adBanner: "",
      recommendGoods: [],
      floor1: [],
      floor2: [],
      floor3: [],
      floorName: {},
      hotGoods: []
    };
    console.log(this);
  }
  componentDidMount() {
    const _this = this;
    React.$axios({
      type: "get",
      url: url.getShoppingMallInfo
    })
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          _this.setState({ adBanner: "1121212" });
          // category: res.data.data.category,
          //   adBanner: res.data.data.advertesPicture.PICTURE_ADDRESS,
          //     bannerPicArr: res.data.data.slides,
          //       recommendGoods: res.data.data.recommend,
          //         floor1: res.data.data.floor1,
          //           floor2: res.data.data.floor2,
          //             floor3: res.data.data.floor3,
          //               floorName: res.data.data.floorName,
          //                 hotGoods: res.data.data.hotGoods
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <div className={classes.ShoppingMall}>
        <div className={classes.searchBar}>
          <div className={classes.locationDiv}>
            <img
              src={locationIcon}
              alt="location"
              width="100%"
              className={classes.locationIcon}
            />
          </div>
          <div className={classes.inputDiv}>
            <input type="text" className={classes.searchInput} />
          </div>
          <div className={classes.buttonDiv}>
            <Button size="small" className={classes.button}>
              查找
            </Button>
          </div>
        </div>

        <div className="swiperArea">
          <WingBlank>
            <Carousel infinite />
          </WingBlank>
        </div>
      </div>
    );
  }
}

export default ShoppingMall;
