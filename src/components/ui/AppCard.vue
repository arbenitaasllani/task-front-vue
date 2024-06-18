
<script setup>
defineProps({
  hasShadow: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="card" :class="{'shadow-lg': hasShadow}" v-bind="$attrs">
    <div class="card-body">
      <slot name="title" />

      <slot />
    </div>
  </div>
</template>

<style scoped>

</style>
