import { API } from "src/app/configs/env";

export async function fetchTokenPrice() {
  try {
    const response = await fetch(`${API.COINGECKO}/simple/price?vs_currencies=usd&ids=weth`);
    const data = await response.json();
    console.log(data['weth'].usd);
  } catch (e) {
    console.log(e);
  }
}