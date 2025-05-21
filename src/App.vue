<script setup>
import HelloWorld from "./components/HelloWorld.vue"
import TheWelcome from "./components/TheWelcome.vue"
import { ref } from "vue"
const mainResponse = ref("")
// 使用 ipcRenderer.send() 发送消息到主进程
const sendMessage = () => {
  window.electronAPI.sendMessage(
    "message-from-renderer",
    "Hello from renderer!"
  )
  // 使用 ipcRenderer.on() 接收来自主进程的响应
  window.electronAPI.receiveMessage("response-from-main", (response) => {
    mainResponse.value = response
  })
}
// 使用 ipcRenderer.invoke() 发送同步请求到主进程
const sendRequest = async () => {
  try {
    const response = await window.electronAPI.invokeMain(
      "request-from-renderer",
      "Request from renderer"
    )
    mainResponse.value = response
  } catch (error) {
    console.error("Error invoking main process:", error)
  }
}
</script>

<template>
 <h1>Electron + Vue IPC Communication</h1>
    <button @click="sendMessage">Send Message</button>
    <button @click="sendRequest">Send Request</button>
    <p>Response from main: {{ mainResponse }}</p>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
