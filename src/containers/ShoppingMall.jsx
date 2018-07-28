import React from "react";
import locationIcon from "../assets/images/location.png";
import url from "../serviceAPI.config";
import classes from "../assets/style/ShoppingMall.scss";
import { Button, Carousel } from "antd-mobile";
import sortArr from "../utils/sortArr";
import { toMoney } from "../utils/filter";
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
    React.$axios({
      type: "get",
      url: url.getShoppingMallInfo
    })
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          this.setState({
            category: res.data.data.category,
            adBanner: res.data.data.advertesPicture.PICTURE_ADDRESS,
            bannerPicArr: res.data.data.slides,
            recommendGoods: sortArr(res.data.data.recommend),
            floor1: res.data.data.floor1,
            floor2: res.data.data.floor2,
            floor3: res.data.data.floor3,
            floorName: res.data.data.floorName,
            hotGoods: res.data.data.hotGoods
          });
          console.log(this.state.recommendGoods);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <div className={classes.ShoppingMall}>
        {/* searchBar */}
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
        {/* swiper */}

        <div className={classes.swiperArea}>
          <Carousel autoplay infinite>
            {this.state.bannerPicArr.map(val => (
              <img
                key={val.goodsId}
                src={val.image}
                alt="轮播图"
                style={{
                  width: "100%",
                  verticalAlign: "top",
                  height: this.state.imgHeight
                }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event("resize"));
                  this.setState({ imgHeight: "8rem" });
                }}
              />
            ))}
          </Carousel>
        </div>

        {/* <!-- type-bar --> */}

        <div className={classes.typeBar}>
          {this.state.category.map((cate, index) => {
            return (
              <div key={index}>
                <img src={cate.image} alt="类型图" />
                <span>{cate.mallCategoryName}</span>
              </div>
            );
          })}
        </div>

        {/* addBanner */}
        <div>
          <img src={this.state.adBanner} alt="adbanner" width="100%" />
        </div>
        {/* recommend goods */}
        <div className={classes.recommendArea}>
          <div className={classes.recommendTitle}>商品推荐</div>
          <div>
            <Carousel
              dots={false}
              cellSpacing={10}
              slideWidth={0.8}
              autoplay={false}
              infinite
              afterChange={index => this.setState({ slideIndex: index })}
            >
              {this.state.recommendGoods.map((val, index) => {
                return (
                  <div
                    className={classes.recommendBody}
                    key={index}
                    style={{
                      position: "relative",
                      top: this.state.slideIndex === index ? -10 : 10,
                      oxShadow: "2px 1px 1px rgba(0, 0, 0, 0.2)",
                      height: this.state.recommendHeight
                    }}
                    onLoad={() => {
                      // fire window resize event to change height
                      window.dispatchEvent(new Event("resize"));
                      this.setState({
                        recommendHeight: "auto"
                      });
                    }}
                  >
                    {val.map((item, num) => {
                      return (
                        <div key={num} className={classes.recommendItem}>
                          <img src={item.image} width="80%" alt="推荐商品" />
                          <div>{item.goodsName}</div>
                          <div>
                            ￥{toMoney(item.price)}(￥{toMoney(item.mallPrice)})
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </Carousel>
          </div>
        </div>
      </div>
    );
  }
}

export default ShoppingMall;
