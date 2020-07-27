<template>
  <div class="image-container img my-2">
    <div class="image-input-group input-group">
      <button type="button" class="close mr-1" aria-label="Close" @click="deleteImage">
        <span aria-hidden="true">&times;</span>
      </button>
      <div ref="spinner" class="spinner-border text-success mx-2 d-none"></div>
      <input
        v-if="!image.path"
        type="file"
        name="input-file"
        id="input-file"
        accept="image/*"
        @input="uploadImage"
      />
    </div>
    <div v-if="source" class="image-preview ml-3 mt-1">
      <img :src="source" alt="No Image Selected" class="img-thumbnail image-preview__image" />
    </div>
    <textarea
      v-if="source"
      v-model="image.notes"
      class="ml-3 form-control image-notes"
      rows="1"
      placeholder="Image Notes"
    ></textarea>
    <p class="text-danger mt-3" v-if="feedback">{{ feedback }}</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { db, storage } from "@/firebase/init";
import expand from "@/mixins";

export default {
  name: "Img",
  props: ["image", "index"],
  mixins: [expand],
  data() {
    return {
      feedback: null,
      source: null,
    };
  },
  computed: mapGetters(["user", "jobData"]),
  methods: {
    async uploadImage(e) {
      this.$refs.spinner.classList.remove("d-none");
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        const path =
          this.user.uid +
          "/" +
          Math.floor(Math.random() * 100000) +
          "_" +
          file.name;
        reader.readAsDataURL(file);

        const storageRef = storage.ref(path);
        const task = storageRef.put(file);
        task.on(
          "state_changed",
          function (snapshot) {
            this.feedback = null;
          },
          function (err) {
            this.feedback = err.message;
          },
          () => {
            this.image.path = path;
            task.snapshot.ref.getDownloadURL().then((url) => {
              this.source = url;
            });
            const event = document.createEvent("HTMLEvents");
            event.initEvent("input", true, true);
            e.path[0].dispatchEvent(event);
            this.$refs.spinner.classList.add("d-none");
          }
        );
      }
    },
    setSource(path) {
      storage
        .ref(path)
        .getDownloadURL()
        .then((url) => {
          this.source = url;
          setTimeout(() => {
            this.expandTextAreas();
          }, 0);
        });
    },
    deleteImage(e) {
      this.jobData.images.splice(this.index, 1);
      const event = document.createEvent("HTMLEvents");
      event.initEvent("input", true, true);
      e.target.dispatchEvent(event);
    },
  },
  created() {
    if (this.image.path) {
      this.setSource(this.image.path);
    }
  },
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