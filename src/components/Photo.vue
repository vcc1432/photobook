<template>
  <div class="shadow-xl ml-4 mt-4 w-4/12 relative">
    <div @click="$emit('heartClicked')" class="cursor-pointer absolute left-1 p-1 opacity-50 bg-white">
      <img :src="photo.favorite ? heartFill : heart" alt="Favorite" />
    </div>
    <amplify-s3-image
      level="protected"
      :img-key="photo.thumbnail ? photo.thumbnail.key : photo.fullsize.key"
      class="w-4/12"
    ></amplify-s3-image>
    <div v-if="photo.createdAt && photo.gps">
      <ul>
        <li>Created At {{ photo.createdAt }}</li>
        <li>
          latitude
          {{ photo.gps.latitude }}
        </li>
        <li>longitude At {{ photo.gps.longitude }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import heart from '@/assets/icons/heart.svg';
import heartFill from '@/assets/icons/heart-fill.svg';

export default {
  props: ['photo'],
  data: () => ({
    heart,
    heartFill,
  }),
};
</script>
<style lang="scss" scoped>
amplify-s3-image {
  --width: 75%;
}
</style>
