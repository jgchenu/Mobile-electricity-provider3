import React from "react";
import locationIcon from "./../../resource/images/location.png";
import url from "./../../serviceAPI.config";
import classes from "./index.scss";
import { Button, Carousel } from "antd-mobile";
import Swiper from "./../../components/Swiper";
import Floor from "./../../components/Floor";
import GoodInfo from "./../../components/GoodInfo";
import history from "./../../router/history";

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
            recommendGoods: res.data.data.recommend,
            floor1: res.data.data.floor1,
            floor2: res.data.data.floor2,
            floor3: res.data.data.floor3,
            floorName: res.data.data.floorName,
            hotGoods: res.data.data.hotGoods
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  handleLogin() {
    history.push("/login");
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
            <Button
              size="small"
              className={classes.button}
              onClick={this.handleLogin}
            >
              查找
            </Button>
          </div>
        </div>
        {/* swiper */}

        <div className={classes.swiperArea}>
          {this.state.bannerPicArr.length !== 0 && (
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
          )}
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
          {this.state.adBanner !== "" && (
            <img src={this.state.adBanner} alt="adbanner" width="100%" />
          )}
        </div>
        {/* recommend goods */}
        <Swiper swiperArr={this.state.recommendGoods} />

        {/* floor */}
        <Floor
          floorData={this.state.floor1}
          floorTitle={this.state.floorName.floor1}
        />
        <Floor
          floorData={this.state.floor2}
          floorTitle={this.state.floorName.floor2}
        />
        <Floor
          floorData={this.state.floor3}
          floorTitle={this.state.floorName.floor3}
        />

        {/* hot-area */}
        {this.state.hotGoods.length !== 0 && (
          <div className={classes.hotArea}>
            <div className={classes.hotTitle}>热卖商品</div>
            <div className={classes.hotGoods}>
              {this.state.hotGoods.map((item, index) => {
                return (
                  <GoodInfo
                    goodImage={item.image}
                    goodName={item.name}
                    goodPrice={item.price}
                    goodId={item.goodsId}
                    key={index}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ShoppingMall;
