import React from "react";
import classes from "./index.scss";
class Floor extends React.Component {
  render() {
    return (
      <div className={classes.floor}>
        {this.props.floorData.length !== 0 && (
          <div>
            <div className={classes.floorTitle}>{this.props.floorTitle}</div>
            <div className={classes.floorAnomaly}>
              <div className={`${classes.floorOne} ${classes.floorItem}`}>
                <img
                  src={this.props.floorData[0].image}
                  width="100%"
                  alt="商品"
                />
              </div>
              <div className={classes.floorItem}>
                <div className={classes.floorTwo}>
                  <img
                    src={this.props.floorData[1].image}
                    width="100%"
                    alt="商品"
                  />
                </div>
                <div className={classes.floorTwo}>
                  <img
                    src={this.props.floorData[2].image}
                    width="100%"
                    alt="商品"
                  />
                </div>
              </div>
            </div>
            <div className={classes.floorRule}>
              {this.props.floorData.slice(1).map((item, index) => {
                return (
                  <div key={index}>
                    <img src={item.image} width="100%" alt="商品" />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Floor;
