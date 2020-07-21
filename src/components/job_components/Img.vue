<template>
  <div class="image-container img my-2">
    <div class="image-input-group input-group">
      <button type="button" class="close mr-1" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      <input
        v-if="!image.source"
        class="file-input"
        type="file"
        name="input-file"
        id="input-file"
        accept="image/*"
      />
    </div>
    <div v-if="image.source" class="image-preview ml-3 mt-1 d-none" :data-id="image.imagePath">
      <img :src="image.source" alt="No Image Selected" class="img-thumbnail image-preview__image" />
    </div>
    <textarea
      v-if="image.source"
      v-model="image.imageNotes"
      class="ml-3 form-control image-notes d-none"
      rows="1"
      placeholder="Image Notes"
    >${imageNotes}</textarea>
  </div>
</template>

<script>
export default {
  name: "Img",
  props: ["image"]
};
</script>

<style lang="scss">
.img {
  .image-preview__image,
  .image-notes {
    @media (min-width: 768px) {
      max-width: 500px;
    }
  }

  .file-input {
    font-family: arial;
  }

  .images-button {
    background-color: rgb(103, 38, 156);
  }

  .images-label {
    color: rgb(103, 38, 156);
  }
}
</style>