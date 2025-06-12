<template>
  <div>
    <p>{{ currentMenu && currentMenu.name }}</p>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['currentMenu'])
  },
}
</script>
<style scoped>

</style>
