<template>
    <div class="">
		<ul class="pagination bg-white p-2 shadow-sm rounded flex justify-center">
			<li class="pagination-item">
				<span
					class="rounded-l rounded-sm px-3 py-2 cursor-not-allowed no-underline text-gray-600 h-10"
					v-if="isInFirstPage"
				>&laquo;</span>
				<a
					v-else
					@click.prevent="onClickFirstPage"
					class="rounded-l rounded-sm px-3 py-2 text-gray-600 hover:bg-gray-100 no-underline"
					href="#"
					role="button"
					rel="prev"
				>
					&laquo;
				</a>
			</li>

			<li class="pagination-item">
				<button
					type="button"
					@click="onClickPreviousPage"
					:disabled="isInFirstPage"
					aria-label="Go to previous page"
					class="rounded-sm px-3 py-2 hover:bg-gray-100 text-gray-600 no-underline mx-2 text-sm"
					:class="{'cursor-not-allowed': isInFirstPage}"
				>Prev</button>
			</li>

			<li
				v-for="page in pages"
				class="pagination-item"
				:key="page.name"
			>
				<span
					class="rounded-sm px-3 py-2 bg-green-300 no-underline text-gray-500 cursor-not-allowed mx-2"
					v-if="isPageActive(page.name)"
				>{{ page.name }}</span>
				<a
					class="rounded-sm px-3 py-2 hover:bg-gray-100 text-gray-600 no-underline mx-2"
					href="#"
					v-else
					@click.prevent="onClickPage(page.name)"
					role="button"
				>{{ page.name }}</a>
			</li>

			<li class="pagination-item">
				<button
					type="button"
					@click="onClickNextPage"
					:disabled="isInLastPage"
					aria-label="Go to next page"
					class="rounded-sm px-3 py-2 hover:bg-gray-100 text-gray-600 no-underline mx-2 text-sm"
					:class="{'cursor-not-allowed': isInLastPage}"
				>Next</button>
			</li>

			<li class="pagination-item">
				<a
					class="rounded-r rounded-sm px-3 py-2 hover:bg-gray-100 text-gray-600 no-underline"
					href="#"
					@click.prevent="onClickLastPage"
					rel="next"
					role="button"
					v-if="hasMorePages"
				>&raquo;</a>
				<span
					class="rounded-r rounded-sm px-3 py-2 hover:bg-gray-100 text-gray-600 no-underline cursor-not-allowed"
					v-else
				>&raquo;</span>
			</li>
		</ul>
	</div>
</template>

<script>
    export default {
        name: 'Pagination',
        props: {
            maxVisibleButtons: {
                type: Number,
                required: false,
                default: 5
            },

            totalPages: {
                type: Number,
                required: true
            },

            total: {
                type: Number,
                required: true
            },

            perPage: {
                type: Number,
                required: true
            },

            currentPage: {
                type: Number,
                required: true
            },

            hasMorePages: {
                type: Boolean,
                required: true
            }
        },
        computed: {
            startPage() {
                if (this.currentPage === 1) {
                    return 1;
                }

                if (this.currentPage === this.totalPages) {
                    if (this.totalPages <= this.maxVisibleButtons) {
                        return 1;
                    }
                    return this.totalPages - this.maxVisibleButtons + 1;
                }

                return this.currentPage - 1;
            },
            endPage() {
                return Math.min(
                    this.startPage + this.maxVisibleButtons - 1,
                    this.totalPages
                );
            },
            pages() {
                const range = [];

                for (let i = this.startPage; i <= this.endPage; i += 1) {
                    range.push({
                        name: i,
                        isDisabled: i === this.currentPage
                    });
                }

                return range;
            },
            isInFirstPage() {
                return this.currentPage === 1;
            },
            isInLastPage() {
                return this.currentPage === this.totalPages;
            }
        },
        methods: {
            onClickFirstPage() {
                this.$emit("pagechanged", 1);
            },
            onClickPreviousPage() {
                this.$emit("pagechanged", this.currentPage - 1);
            },
            onClickPage(page) {
                this.$emit("pagechanged", page);
            },
            onClickNextPage() {
                this.$emit("pagechanged", this.currentPage + 1);
            },
            onClickLastPage() {
                this.$emit("pagechanged", this.totalPages);
            },
            isPageActive(pageName) {
                return this.currentPage === pageName;
            }
        }
    }
</script>

<style scoped>

</style>