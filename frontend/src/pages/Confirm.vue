<template>
  <div class="container">
    <div class="row">
      <div class="col" id="title">주문 확인</div>
    </div>
    <div class="col menu-list">
      <v-card>
        <v-container fill-height fluid>
          <v-layout fill-height>
            <v-flex xs12 align-end flexbox>
              <span class="headline">{{ tableNum }}번 테이블 입니다 !</span>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-title>
          <div>
            <ul v-for="menu in menus" v-bind:key="menu.count">
              <li v-if="menu.count">
                <div class="row order-list">
                  <div class="col">{{ menu.name }}</div>
                  <div class="count">: {{ menu.count }}</div>
                </div>
              </li>
            </ul>
          </div>
        </v-card-title>
      </v-card>
    </div>
    <div class="row">
      <div class="col total-price">총 금액 : {{ totalPrice }}원</div>
    </div>
    <div class="row">
      <div class="col account">카카오뱅크 : 3333-03-2611273 최원주</div>
    </div>
    <div class="row">
      <div class="col">
        <v-btn class="btn-copy" @click="copyNumber()" color="yellow">계좌번호 복사</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    tableNum: 0,
    menus: [],
    totalPrice: 0
  }),
  created() {
    this.tableNum = this.$route.params.tableNum;
    this.menus = this.$route.params.menus;
    this.totalPrice = this.$route.params.totalPrice;
  },
  methods: {
    copyNumber() {
      console.log(this.tableNum)
      var $temp = $("<input>");
      $("body").append($temp);
      $temp.val("카카오뱅크 : 3333-03-2611273 최원주").select();
      document.execCommand("copy");
      $temp.remove();

      alert("복사 되었습니다 !")
    }
  }
};
</script>

<style scoped>
.col {
  text-align: center;
}

#title {
  font-size: 30px;
  margin-top: 30px;
  text-align: center;
}

.total-price {
  margin-top: 20px;
  text-align: right;
  font-size: 30px;
}

.menu-list {
    margin-top: 20px;
}

.order-list {
    font-size : 15px;
}

.v-btn__content {
  background-color: gold;
}

.account {
    margin-top: 20px;
    font-size : 15px;
}

.btn-copy {
    margin-top: 10px;
    font-size: 15px;
}
</style>
