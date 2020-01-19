<template>
  <div>
    <button @click="$emit('refetch')">refetch</button>
    <div :class="$style.userCount">User List - {{ totalUsers }}</div>
    <ul :class="$style.userList">
      <User
        v-for="user in allUsers"
        :key="user.githubLogin"
        :name="user.name"
        :avatar="user.avatar"
      />
    </ul>
  </div>
</template>

<script>
import User from './User'

export default {
  components: {
    User,
  },
  props: {
    totalUsers: {
      type: Number,
      required: true,
    },
    allUsers: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss" module>
.userCount {
  margin-top: 4px;
}

.userList {
  margin: 4px 0 0;
  padding: 0;
}
</style>
