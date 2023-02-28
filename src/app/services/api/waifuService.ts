import { API } from "src/app/configs/env";

export async function fetchWaifuImg(prompt: string) {
  try {
    const data = {
      prompt
    }
    const response = await fetch(`${API.WAIFU_API}/api/core/waifu`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    const jsonRes = await response.json()
    if (!jsonRes.success) {
      return {
        src: '',
        err: jsonRes.messages.join(', ')
      }
    }
    const imageBase64Src = 'data:image/png;base64,' + jsonRes.data;
    
    return {
      src: imageBase64Src,
      err: null
    }
  } catch (e) {
    return {
      src: '',
      err: e
    }
  }
}