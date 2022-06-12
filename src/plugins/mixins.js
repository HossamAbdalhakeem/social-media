export default {
  data() {
    return {
      newtest: "fffffffffffffffffffff",
      socket: "",
    };
  },
  methods: {
    AddToArr(dataObj, arr) {
      console.log("start");
      arr.push(dataObj);
      console.log("done Add");
    },
  },
};
