<template>
  <div class="archive-job">
    <Job :identifier="id" />
  </div>
</template>

<script>
import Job from "@/components/Job";
export default {
  name: "ArchiveJob",
  props: ["id"],
  components: {
    Job,
  },
};
</script>

<style>
</style>