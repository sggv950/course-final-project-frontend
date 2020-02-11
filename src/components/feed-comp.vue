<template>
  <div class="conversation">
    <div class="conversation-container" ref="conversationRef">
      <div v-for="(msg, idx) in msgs" :key="idx">
        <div class="container" :class="{msgOut: nickName === msg.from, msgIn: nickName !== msg.from}">
          <p class="msg">
            <img class="chat-user-img" :src="'/img/users/'+ msg.from + '.jpg'">
            <span class="chat-user-name">({{msg.from}}): </span> <br>{{msg.txt}}</p>
        </div>
      </div>
    </div>

    <form v-if="nickName" class="conversation-compose">
      <input
        v-model="newMsg.txt"
        class="input-msg"
        name="input"
        placeholder="Type a message"
        autocomplete="off"
        autofocus
      >
      <button @click.prevent="send">send</button>
    </form>
  </div>
</template>

<script>
import ioClient from "socket.io-client";
import msgService from "@/service/msg.service.js";
export default {
  props: ["currEvent"],
  data() {
    return {
      msgs: [],
      nickName: null,
      newMsg: null,
      typeMsg: ""
      // socket: ioClient("http://localhost:3000")
    };
  },
  methods: {
    send() {
      this.$socket.emit("assignMsg", {
        msg: this.newMsg,
        room: this.currEvent._id
      });
      this.pushMsgToHistory(this.newMsg);
      this.newMsg = msgService.createEmptyMsg(this.nickName);
      // this.scrollToEnd();
    },
    scrollToEnd() {
      var container = this.$refs.conversationRef;
      var scrollHeight = container.scrollHeight;
      container.scrollTop = scrollHeight;
    },
    scrollIntoView() {
      var container = this.$refs.conversationRef;
      container.scrollIntoView()
    },
    pushMsgToHistory(msg) {
      this.$emit("pushMsgToHistory", msg);
    }
  },
  created() {
    this.msgs = JSON.parse(JSON.stringify(this.$store.getters.currEvent.msgs));
    this.nickName = this.$store.getters.loggedInUser.name;
    this.newMsg = msgService.createEmptyMsg(this.nickName);

    const room = this.currEvent._id;

    this.$socket.emit("chatJoined", room);
  },
  sockets: {
    renderMsg(msg) {
      this.scrollIntoView()
      this.msgs.push(msg);
      this.$nextTick(() => {
        // this.$refs.conversationRef.lastChild.scrollIntoView();
        this.scrollToEnd();
      })
    }
  },
  mounted() {
    // this.scrollToEnd();
  },
};
</script>

<style scoped lang='scss'>
.conversation {
  border: 1px solid lightgray;
  border-radius: 6px;
}

.conversation-container {
  height: 400px;
  overflow: auto;
  background-color: lighten(lightgray, 8%);
}

.container {
  border: 1px solid black;
  background-color: white;
  border-radius: 5px;
  overflow-wrap: break-word;
  padding: 5px;
  margin: 5px 5px;
}

.container::after {
  content: "";
  clear: both;
  display: table;
}

.msg {
  color: black;
}

.conversation-compose {
  padding: 10px 20px;
}

.chat-user-img {
  height: 30px;
  width: 30px;
  margin-right: 2px;
  border-radius: 50%
}

.chat-user-name {
  font-size: 12px;
  font-weight: bold;
}

.msgOut{
  background-color: lighten(#67c23a, 15%);
  margin: 5px 50px 0px 5px;
}

.msgIn{
  background-color: darken(white, 3%);
  margin: 5px 5px 0px 50px;
}

</style>
