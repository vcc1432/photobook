<template>
  <Spinner v-if="loading" />
  <div>
    <h3 class="text-4xl font-semibold">Album {{ albumName }}</h3>
    <div class="flex w-full mt-10 items-center justify-center bg-grey-lighter">
      <form enctype="multipart/form-data" novalidate>
        <label
          class="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-green-600"
        >
          <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path
              d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"
            />
          </svg>
          <span class="mt-2 text-base leading-normal">Select a file</span>
          <input @change="onFileChange" accept="image/*" type="file" class="hidden" />
        </label>
      </form>
    </div>
    <div class="text-2xl mt-4">List Of Photos</div>
    <div class="flex flex-wrap p-10 justify-center m-auto w-full" v-if="photos">
      <template v-for="(photo, idx) in photos" :key="idx">
        <Photo :photo="photo" @heartClicked="toggleFavorite(idx, photo)" />
      </template>
    </div>
  </div>
</template>

<script>
import Photo from '@/components/Photo.vue';
import Spinner from '@/components/Spinner.vue';

export default {
  components: {
    Photo,
    Spinner,
  },
  async mounted() {
    this.getPhotos();
  },
  data: () => ({
    photos: [],
    albumName: '',
    loading: true,
  }),
  methods: {
    async onFileChange(file) {
      this.loading = true;
      if (!file.target | !file.target.files[0]) {
        return;
      }
      try {
        await this.$store.dispatch('albumInfo/createPhoto', {
          file: file.target.files[0],
          id: this.id,
        });
        this.getPhotos();
      } catch (error) {
        console.log('error create photo:', error);
      } finally {
        this.loading = false;
      }
    },
    async getPhotos() {
      const album = await this.$store.dispatch('albumInfo/getAlbum', this.id);
      this.photos = album.data.getAlbum.photos.items;
      this.albumName = album.data.getAlbum.name;
      this.loading = false;
    },
    async toggleFavorite(index, { id, favorite }) {
      this.photos[index].favorite = !favorite; // Triggers immediate rerender
      try {
        await this.$store.dispatch('albumInfo/updatePhoto', {
          id,
          favorite: !favorite,
        });
      } catch (error) {
        console.error('error adding favorite', error);
      }
    },
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
};
</script>

<style></style>
