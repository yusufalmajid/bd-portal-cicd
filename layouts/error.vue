<template>
  <div class="error-page">
    <div class="title">{{$t('the_page_you_are_looking_for_is_not_available')}}</div>
    <NuxtLink class="button secondary" :to="localePath('/')">{{$t('back_to_home')}}</NuxtLink>
  </div>
</template>

<script>
export default {
  name: 'error'
}
</script>

<style scoped lang="scss">
.error-page{
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 100px;
  .title{
    color: var(--secondary);
    font-size: 50px;
  }
}
</style>
