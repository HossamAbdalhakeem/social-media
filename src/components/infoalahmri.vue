<template>
  <v-app>
    <v-row class="ma-3">
      <v-col cols="4" class="mt-3">
        <h4 class="text-center mb-5">بيان تفصيلي بالرحلات</h4>
        <v-col cols="6" class="font-weight-bolder">رقم الرحلة</v-col>
        <v-col cols="6"> 3000515</v-col>
        <v-col cols="6" class="font-weight-bolder">وصف الرحلة</v-col>
        <v-col cols="6">ةدج/ بردلاء نازيج-ابيص</v-col>
        <v-col cols="6" class="font-weight-bolder">اسم السائق</v-col>
        <v-col cols="6">؟؟؟؟؟؟؟</v-col>
        <v-col cols="6" class="font-weight-bolder">السيارة</v-col>
        <v-col cols="6">فولفو أرص 9948</v-col>
      </v-col>
      <v-col cols="4">
        <h2 class="text-center mb-5 data">الاحمري للنقل</h2>
      </v-col>
      <v-col cols="4" class="mt-5">
        <v-col cols="6" class="font-weight-bolder">تاريخ الطباعة</v-col>
        <v-col cols="6">21/5/2021</v-col>
        <v-col cols="6" class="font-weight-bolder">التوقيت</v-col>
        <v-col cols="6">9:35:01 pm</v-col>
        <v-col cols="6" class="font-weight-bolder">تاريخ الرحلة</v-col>
        <v-col cols="6">03/04/2021</v-col>
        <v-col cols="6" class="font-weight-bolder">ايجار السيارة</v-col>
        <v-col cols="6">0.00</v-col>
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="data"
      :items-per-page="17"
      class="elevation-1"
    ></v-data-table>
    <div class="aa">
      <div class="tottalPrecels text-center">28</div>
      <div class="tottalOrder text-center">368.50</div>
    </div>
    <v-row class="ma-5">
      <v-col cols="8">
        <h4 class="text-center">مدير التشغيل</h4>
        <v-col cols="3" class="data font-weight-bolder">طريقة الدفع</v-col>
        <v-col cols="3" class="data font-weight-bolder">عدد الطرود</v-col>
        <v-col cols="3" class="data font-weight-bolder">الاجمالي</v-col>
        <v-col cols="3" class="data font-weight-bolder"
          >اجمالي السندات النقدية</v-col
        >
        <v-col cols="3" class="data">نقدي</v-col>
        <v-col cols="3" class="data">1</v-col>
        <v-col cols="3" class="data">12.00</v-col>
        <v-col cols="3" class="data">12.00</v-col>

        <v-col cols="3" class="data">دفع عند الاستلام</v-col>
        <v-col cols="3" class="data">27</v-col>
        <v-col cols="3" class="data">256.50</v-col>
        <v-col cols="3" class="data">.</v-col>

        <v-col cols="3" class="data mt-0">اجل</v-col>
        <v-col cols="3" class="data">0</v-col>
        <v-col cols="3" class="data">0.00</v-col>
        <v-col cols="3" class="data">.</v-col>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          text: "م",
          align: "start",
          sortable: false,
          value: "name",
        },

        { text: "رقم البوليصة", value: "رقم البوليصة" },
        { text: "الرقم اليدوي", value: "الرقم اليدوي" },
        { text: "المرسل", value: "المرسل" },
        { text: "المرسل اليه", value: "المرسل اليه" },
        { text: "نوع البضاعة", value: "نوع البضاعة" },
        { text: "عدد الطرود", value: "عدد الطرود" },
        { text: "طريقة السداد", value: "طريقة السداد" },
        { text: "قيمة الامر", value: "قيمة الامر" },
        { text: "الملاحظات", value: "الملاحظات" },
      ],
      data: [],
    };
  },
};
</script>

<style lang="scss" scoped>
.tottalPrecels {
  max-width: 80px;
  border: 2px solid black;
  position: relative;
  left: 615px;
}
.tottalOrder {
  max-width: 80px;
  border: 2px solid black;
  position: relative;
  left: 850px;
  bottom: 28px;
}
.data {
  border: 2px solid black;
}
</style>