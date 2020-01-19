<template>
  <div>
    <div>User List - {{ totalUsers }}</div>
    <ul>
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

<style lang="scss" module></style>
