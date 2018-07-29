import React from "react";
import { Carousel } from "antd-mobile";
import { toMoney } from "../utils/filter";
import sortArr from "../utils/sortArr";
import classes from "../assets/style/Swiper.scss";
class Swiper extends React.Component {
  constructor() {
    super();
    this.state = { slideIndex: 0 };
  }
  render() {
    return (
      <div className={classes.recommendArea}>
        {this.props.swiperArr.length !== 0 && (
          <div>
            <div className={classes.recommendTitle}>商品推荐</div>
            <div>
              <Carousel
                dots={false}
                cellSpacing={5}
                slideWidth={0.8}
                autoplay={false}
                infinite
                afterChange={index => this.setState({ slideIndex: index })}
              >
                {sortArr(this.props.swiperArr).map((val, index) => {
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
                              ￥{toMoney(item.price)}(￥{toMoney(
                                item.mallPrice
                              )})
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
        )}
      </div>
    );
  }
}

export default Swiper;
