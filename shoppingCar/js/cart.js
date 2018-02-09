var vue = new Vue({
    el: "#app",
    data: {
        totalMoney: 0,
        productList: [],
        checkAllFlag: false,
        totalPrice: 0,
        delFlag: false,
        curProduct: {}
    },
    filters: { //局部过滤器
        formatMoney: function(value) {
            return "$" + value.toFixed(2);
        }
    },
    mounted: function() {
        this.$nextTick(function() {
            vue.cartView();
        });
    },
    methods: {
        cartView: function() {
            vue.$http.get("data/cartData.json", {
                "id": 123
            }).then(res => {
                this.productList = res.data.result.list;
                this.totalMoney = res.data.result.totalMoney;
            });
        },
        changeMoney: function(item, way) {
            if (way > 0) {
                item.productQuantity += 1;
            } else {
                if (item.productQuantity >= 1) {
                    item.productQuantity -= 1;
                }
            }
            this.calcTotalPrice();
        },
        selectProduct: function(item) {
            if (typeof item.checked == 'undefined') {
                Vue.set(item, "checked", true);
            } else {
                item.checked = !item.checked;
            }
            this.calcTotalPrice();
        },
        checkAll: function(flag) {
            this.checkAllFlag = flag;
            var _this = this;
            this.productList.forEach(function(item, index) {
                if (typeof item.checked == 'undefined') {
                    Vue.set(item, "checked", _this.checkAllFlag);
                } else {
                    item.checked = _this.checkAllFlag;
                }
            });
            this.calcTotalPrice();
        },
        calcTotalPrice: function() {
            var _this = this;
            this.totalPrice = 0;
            this.productList.forEach(function(item, index) {
                if (item.checked) {
                    _this.totalPrice += item.productPrice * item.productQuantity;
                }
            });
        },
        delConfirm: function(item) {
            this.delFlag = true;
            this.curProduct = item;
        },
        delProduct: function() {
            var index = this.productList.indexOf(this.curProduct);
            this.productList.splice(index, 1);
            this.delFlag = false;
            this.calcTotalPrice();
        }
    }
});
Vue.filter('money', function(value, type) {
    return value.toFixed(2) + type;
}); //全局过滤器