<template>
  <div class="container">
    <div class="row">
      <div class="col" id="title">은익체전 주문 시스템 {{ tableNum }}</div>
    </div>
    <div class="row menus">
      <v-data-table 
        :headers="headers" 
        :items="menus" 
        hide-actions
        class="elevation-1">
        <template v-slot:items="props">
          <td>{{ props.item.name }}</td>
          <td class="text-xs-right">{{ props.item.price }}</td>
          <td class="justify-center layout px-0">
            <v-icon small @click="minusCount(props.item)">remove</v-icon>
            <span id="count">{{ props.item.count }}</span>
            <v-icon small @click="plusCount(props.item)">add</v-icon>
          </td>
        </template>
      </v-data-table>
    </div>
    <div class="row">
        <div class="col total-price">
            총 금액 : {{ totalPrice }}원
        </div>
    </div>
    <div class="row">
        <v-btn class="btn-order" block color="#49C0EE" @click="order()">주문 하기</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    tableNum : 0,
    headers: [
      {
        text: "메뉴",
        align: "left",
        sortable: false,
        value: "name"
      },
      { text: "가격", value: "price", sortable: false },
      { text: "수량", value: "name", sortable: false }
    ],
    menus: [],
    totalPrice : 0,
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  created() {
    this.initialize();
  },
  methods: {
    order () {
        var orderMenu = {
            "tableNum" : this.tableNum,
            "menus" : this.menus,
            "totalPrice" : this.totalPrice,
        }
        this.$http.post('/order/menus', orderMenu).then ((response) => {
            if (response.status == 200) {
                this.$router.push('/confirm')
            }
        })
    },
    minusCount (item) {
        if (item.count > 0) {
            item.count -= 1
            this.totalPrice -= item.price
        }
    },
    plusCount (item) {
        item.count += 1
        this.totalPrice += item.price
    },
    initialize() {
      this.tableNum = this.$route.params.tableNum
      this.menus = [
        {
          name: "모듬꼬치 (닭꼬치4 + 염통꼬치4)",
          price : 5000,
          count : 0,
        },
        {
          name: "닭강정 + 감자튀김 + 치즈가루",
          price : 8000,
          count : 0,
        },
        {
          name: "제육볶음",
          price : 7000,
          count : 0,
        },
        {
          name: "주먹밥 추가",
          price : 2000,
          count : 0,
        },
        {
          name: "오뎅탕",
          price : 4000,
          count : 0,
        },
        {
          name: "물",
          price : 3000,
          count : 0,
        },
        {
          name: "토닉워터",
          price : 2000,
          count : 0,
        },
      ];
    },
  }
};
</script>

<style>
#title {
  font-size: 30px;
  margin-top: 30px;
  text-align: center;
}

.menus {
    margin-top: 30px;
}

#count {
    padding-top : 15px ;
    margin-left : 10px;
    margin-right : 10px;
}

.total-price {
    margin-top: 20px;
    text-align : right;
    font-size: 30px;
}

button {
    background-color : #49C0EE;
}

.v-btn__content {
    font-size : 20px;
}
</style>
