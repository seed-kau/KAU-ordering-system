<template>
  <div class="container">
    <div class="row">
      <div class="col" id="title">카운터</div>
    </div>
    <div class="row orders">
      <v-data-table :headers="headers" :items="orders" hide-actions class="elevation-1">
        <template v-slot:items="props">
          <td v-html="props.item.list"></td>
          <td class="text-xs-right">{{ props.item.table_num }}</td>
          <td class="text-xs-right">{{ props.item.total_price }}</td>
          <td class="justify-center layout px-0">
            <v-icon v-if="props.item.status" small @click="putTable(props.item)">check</v-icon>
            <v-icon v-else small>cancel</v-icon>
          </td>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    headers: [
      {
        text: "주문",
        align: "left",
        sortable: false,
        value: "list"
      },
      { text: "가격", value: "total_price", sortable: false },
      { text: "테이블번호", value: "table_num", sortable: false },
      { text: "확인", value: "name", sortable: false }
    ],
    orders: []
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
    this.getOrder().then(this.getCompletedOrder());
  },
  methods: {
    initialize() {
      this.orders = [];
    },
    getCompletedOrder() {
      return this.$http.get("/admin/complete").then(response => {
        var temp = response.data;
        console.log(temp);
        for (var i = 0; i < temp.length; i++) {
          temp[i].list = this.replaceAll(temp[i].list, "/", "<br>");
          if (temp[i].status == "finish") {
            temp[i].status = 0;
          }
          this.orders.push(temp[i]);
        }
      });
    },
    getOrder() {
      return this.$http.get("/admin").then(response => {
        var temp = response.data;
        console.log(temp);
        for (var i = 0; i < temp.length; i++) {
          temp[i].list = this.replaceAll(temp[i].list, "/", "<br>");
          if (temp[i].status == "ready") {
            temp[i].status = 1;
          }
          this.orders.push(temp[i]);
        }
      });
    },
    replaceAll(str, searchStr, replaceStr) {
      return str.split(searchStr).join(replaceStr);
    },
    putTable(item) {
      return this.$http
        .put("/admin/complete", { id: item.id })
        .then(this.initialize())
        .then(this.getOrder())
        .then(this.getCompletedOrder());
    }
  }
};
</script>

<style scoped>
#title {
  font-size: 30px;
  margin-top: 30px;
  text-align: center;
}
</style>
