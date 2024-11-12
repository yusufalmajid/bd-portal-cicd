<template>
    <transition name="slide">
    <div class="dropdown">
        <ul>
            <li v-for="item in notifications" :key="item.id">
                <NuxtLink to="/notifications">
                    <h6 class="title" :class="item.is_read ? '' : 'is_read'">{{item.title}}</h6>
                    <p class="description">{{item.description}}</p>
                    <span class="text-green timestamp" :class="item.is_read ? '' : 'is_read'">{{item.timestamp}}</span>
                </NuxtLink>
                <span class="devide"></span>
            </li>
        </ul>
    </div>
    </transition>
</template>
<script>
export default {
    props: {
        notifications: {
            type: Array,
            default: []
        }
    }
}
</script>

<style lang="scss" scoped>
.dropdown {
  position: absolute;
  top: 60px;
  right: -20px;
  background-color: white;
  border: 1px solid #dee2e6;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-width: 400px;
  min-width: 400px;

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    
    li {
      padding: 10px;
      width: 100%;

      &:hover a .title, &:hover a .timestamp{
        color: #4bca9d;
      }

      a {
        background: transparent;
        display: flex;
        flex-direction: column;
        width: 100%;
        padding: 10px 16px;
        cursor: pointer;
        color: #666666;
        border-radius: 4px;
        border: none;
        outline: none;

        .title{
            color: #666666;
            font-weight: 500;
        }

        .title.is_read{
            color: #666666;
            color: #4bca9d;
        }

        .timestamp, .description{
            color: #666666;
            font-weight: 200;
        }

        .timestamp.is_read{
            color: #4bca9d;
            font-weight: 300;
        }
      }
      .devide {
            width: 100%;
            display: flex;
            border-top: 1px solid #666666;
            opacity: .1;
        }
    }
}

}

</style>