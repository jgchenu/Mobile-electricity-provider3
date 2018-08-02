import React from "react";
import {
  Tabs,
  Toast,
  NavBar,
  Icon,
  ListView,
  PullToRefresh
} from "antd-mobile";
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
    this.setState({
      categoryIndex: index,
      page: 1,
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
          this.setState({ active: 0 });
          this.categorySubId = this.state.categorySub[0].ID;
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
        // console.log('goodList:',res);
        if (res.data.code === 200 && res.data.message.length) {
          this.page++;
          this.goodList = this.goodList.concat(res.data.message);
          console.log("goodList:", this.goodList);
        } else {
          this.finished = true;
        }
        this.loading = false;
        // console.log(this.finished);
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    const tabs = [
      { title: "FirstTab" },
      { title: "SecondTab" },
      { title: "ThirdTab" },
      { title: "ThirdTab" },
      { title: "ThirdTab" },
      { title: "ThirdTab" }
    ];
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
            <div id="list">
              <div className="categorySub">
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
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: document.documentElement.clientHeight-88.5,
                      backgroundColor: "#fff"
                    }}
                  >
                    Content of first tab
                  </div>
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
