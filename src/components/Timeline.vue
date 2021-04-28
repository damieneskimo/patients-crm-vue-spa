<template>
    <div class="w-full px-20 py-8 bg-gray-200 overflow-hidden">
        <ul v-if="data.length > 0" class="list-none">
            <li v-for="item in data" :key="item.id">
                <div class="flex items-center">
                    <div class="border-r-2 border-green-400 py-8 px-4 h-full w-1/4 relative flex items-center justify-end">
                        <p class="mr-5">{{ item.created_at }}</p>
                        <div class="bg-green-500 rounded-full h-8 w-8 absolute -right-4"></div>
                    </div>
                    <div class="text-left w-3/4 ml-10">
                        {{ item.content }}
                    </div>
                </div>
            </li>
        </ul>
        <p v-else>There is no data found.</p>
    </div>
</template>

<script>
export default {
    name: 'Timeline',
    props: ['data']
}
</script>
