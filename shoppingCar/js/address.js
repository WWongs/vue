var vue = new Vue({
    el: ".container",
    data: {
        addressList: [],
        limitNum: 3,
        currentIndex: 0,
        shippingMethod: 1,
        delFlag: false,
        curAddress: {},
        addFlag: false,
        addAddress: []
    },
    mounted: function() {
        this.$nextTick(function() {
            this.getAddressList();
        })
    },
    computed: {
        filterAddressList: function() {
            return this.addressList.slice(0, this.limitNum);
        }
    },
    methods: {
        getAddressList: function() {
            var _this = this;
            this.$http.get("data/address.json").then(res => {
                var data = res.data;
                if (data.status === 0) {
                    _this.addressList = data.result;
                }
            });
        },
        loadMore: function() {
            this.limitNum = this.addressList.length;
        },
        setDefult: function(addressId) {
            this.addressList.forEach(function(address, index) {
                if (address.addressId === addressId) {
                    address.isDefault = true;
                } else {
                    address.isDefault = false;
                }
            });
        },
        delConfirm: function(address) {
            this.delFlag = true;
            this.curAddress = address;
        },
        delProduct: function() {
            this.addressList.splice(this.curAddress, 1);
            this.currentIndex = 0;
            this.delFlag = false;
        },
        addNewItem: function() {
            var name = this.$refs.name.value,
                newAddress = this.$refs.newAddress.value,
                telNumber = this.$refs.telNumber.value;
            this.addAddress.userName = name;
            this.addAddress.streetName = newAddress;
            this.addAddress.tel = telNumber;
            this.addressList.push(this.addAddress);
            this.addFlag = false;
        }
    }
});