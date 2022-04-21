import store from "@/store";
import axios from "axios";

export default async function getCustomers() {
  const res = await axios.get("/user/allUsers");
  store.commit("setCustomersList", res.data.data);
}