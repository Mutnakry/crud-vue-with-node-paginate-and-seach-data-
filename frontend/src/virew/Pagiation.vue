<template>
  <nav class="flex items-center justify-end py-4">
    <ul class="inline-flex -space-x-px text-sm">
      <li>
        <button
          @click="onPageChange(1)"
          :disabled="currentPage === 1"
          class="px-3 py-1 border border-gray-300 rounded-l-lg"
        >
          &laquo;
        </button>
      </li>
      <li>
        <button
          @click="onPageChange(currentPage - 1)"
          :disabled="currentPage === 1"
          class="px-3 py-1 border border-gray-300"
        >
          &lt;
        </button>
      </li>
      <li v-for="(page, index) in getPages()" :key="index">
        <button
          v-if="page === '...'"
          class="px-3 py-1 border border-gray-300"
        >
          {{ page }}
        </button>
        <button
          v-else
          @click="onPageChange(page)"
          :class="{'bg-blue-500 text-white': currentPage === page}"
          class="px-3 py-1 border border-gray-300"
        >
          {{ page }}
        </button>
      </li>
      <li>
        <button
          @click="onPageChange(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="px-3 py-1 border border-gray-300"
        >
          &gt;
        </button>
      </li>
      <li>
        <button
          @click="onPageChange(totalPages)"
          :disabled="currentPage === totalPages"
          class="px-3 py-1 border border-gray-300 rounded-r-lg"
        >
          &raquo;
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "PaginationComponent",
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    onPageChange: {
      type: Function,
      required: true,
    },
  },
  methods: {
    getPages() {
      const pages = [1];
      const startPage = Math.max(2, this.currentPage - 2);
      const endPage = Math.min(this.totalPages - 1, this.currentPage + 2);

      if (this.currentPage > 3) {
        pages.push(1);
      }

      if (this.currentPage > 4) {
        pages.push('...');
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (this.currentPage < this.totalPages - 3) {
        pages.push('...');
      }

      if (this.currentPage < this.totalPages - 2) {
        pages.push(this.totalPages);
      }

      return pages;
    },
  },
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
