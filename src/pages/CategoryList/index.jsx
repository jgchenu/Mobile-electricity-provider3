import React from "react";
import { Tabs, Toast, NavBar, Icon, PullToRefresh } from "antd-mobile";
import errorimg from "../../resource/images/errorImg.jpg";
import history from "./../../router/history";
import url from "./../../serviceAPI.config";
import classes from "./index.scss";
class CategoryList extends React.Component {
  state = {
    category: [],
    categoryIndex: 0,
    categorySub: [],
    active: 0, //激活标签,
    loading: false,
    finished: false, //上拉加载是否有数据
    isRefresh: false, //下拉刷新
    page: 1, //商品列表的页数
    goodList: [], //商品信息
    categorySubId: "", //商品子分类ID
    errorImg: 'this.src="' + require("../../resource/images/errorImg.jpg") + '"'
  };
  componentDidMount() {
    this.getCategory();
  }
  clickCategory(index, categoryId) {
    console.log(index, categoryId);
    this.setState({
      categoryIndex: index,
      page: 1,
      active: 0,
      finished: false,
      goodList: []
    });
    this.getCategorySubList(categoryId);
  }
  getCategory() {
    React.$axios({
      url: url.getCategoryList,
      method: "get"
    })
      .then(res => {
        console.log("category:", res);
        if (res.data.code === 200 && res.data.message) {
          this.setState({
            category: res.data.message
          });
          this.getCategorySubList(this.state.category[0].ID);
        } else {
          Toast("服务器错误，数据获取失败");
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  getCategorySubList(categoryId) {
    React.$axios({
      url: url.getCategorySubList,
      method: "post",
      data: {
        categoryId: categoryId
      }
    })
      .then(res => {
        if (res.data.code === 200 && res.data.message) {
          this.setState({
            categorySub: res.data.message
          });
          this.setState({
            active: 0,
            categorySubId: this.state.categorySub[0].ID
          });
          console.log("categorySub:", res);
          this.getGoodList();
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  getGoodList() {
    React.$axios({
      url: url.getGoodsListByCategorySubId,
      method: "post",
      data: {
        categorySubId: this.state.categorySubId,
        page: this.state.page
      }
    })
      .then(res => {
        console.log("goodList:", res);
        if (res.data.code === 200 && res.data.message.length) {
          this.setState({
            page: this.state.page + 1,
            goodList: this.state.goodList.concat(res.data.message)
          });
          console.log("goodList:", this.state.goodList);
        } else {
          this.setState({
            finished: true,
            loading: false
          });
        }
        // console.log(this.finished);
      })
      .catch(err => {
        console.log(err);
      });
  }
  onClickCategorySub(data, index) {
    console.log(index, data, this.state.categorySubId);
    this.setState({
      categorySubId: this.state.categorySub[index].ID,
      goodList: [],
      finished: false,
      page: 1
    });
    this.loadMore();
  }
  loadMore() {
    setTimeout(() => {
      this.setState({
        categorySubId: this.state.categorySubId
          ? this.state.categorySubId
          : this.state.categorySub[0].ID
      });
      this.getGoodList();
    }, 1000);
  }
  onRefresh() {
    setTimeout(() => {
      this.setState({
        isRefresh: false,
        finished: false,
        goodList: [],
        page: 1
      });

      this.loadMore();
    }, 500);
  }
  render() {
    return (
      <div className={classes.categoryList}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          leftContent="返回"
          onLeftClick={() => history.push("/")}
        >
          商品详情
        </NavBar>

        <div className={classes.wrap}>
          <div
            className={classes.leftNav}
            id="leftNav"
            style={{ height: document.documentElement.clientHeight - 45 }}
          >
            <ul>
              {this.state.category.map((item, index) => (
                <li
                  onClick={this.clickCategory.bind(this, index, item.ID)}
                  className={
                    this.state.categoryIndex === index
                      ? classes.categoryActive
                      : ""
                  }
                  key={index}
                >
                  {item.MALL_CATEGORY_NAME}
                </li>
              ))}
            </ul>
          </div>

          <div className={classes.rightContent}>
            <div className={classes.list}>
              <div className={classes.categorySub}>
                <Tabs
                  tabs={this.state.categorySub.map(function(item) {
                    return {
                      title: item.MALL_SUB_NAME,
                      ID: item.ID,
                      MALL_CATEGORY_ID: item.MALL_CATEGORY_ID,
                      SORT: item.SORT
                    };
                  })}
                  initialPage={this.state.active}
                  animated={true}
                  useOnPan={true}
                  onChange={this.onClickCategorySub.bind(this)}
                >
                  <PullToRefresh
                    damping={20}
                    ref={el => (this.ptr = el)}
                    style={{
                      height: document.documentElement.clientHeight - 88.5,
                      overflow: "auto"
                    }}
                    direction={"down"}
                    refreshing={this.state.loading}
                    onRefresh={this.onRefresh.bind(this)}
                  >
                    <div>
                      {this.state.goodList.map((item, index) => (
                        <div className={classes.listItem} key={index}>
                          <div className={classes.listItemImage}>
                            <img
                              src={item.IMAGE1}
                              alt="商品图片"
                              width="100%"
                              onError={function(e) {
                                e.target.src = errorimg;
                              }}
                            />
                          </div>
                          <div className={classes.listItemText}>
                            <div>{item.NAME}</div>
                            <div>￥{item.ORI_PRICE}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </PullToRefresh>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CategoryList;
