<template>
    <v-container>
        <v-text-field label="Playlist name" v-model="playlistName" :rules="[rules.required]" @change="setPlaylistName" color="#23D061" placeholder="E.g. Best of Madonna" class="ma-2"></v-text-field>
        <v-text-field label="Playlist description" v-model="playlistDescription" @change="setPlaylistDescription" color="#23D061" placeholder="E.g. Playlist contains only Madonna songs" class="ma-2"></v-text-field>
    </v-container>
</template>
<script>
export default {
    data:function() {
        return {
            playlistName:'',
            playlistDescription:'',
            rules: {
                required: value => !!value || 'Required.'
            }
        }
    },
    methods: {
        setPlaylistName:function() {
            this.$emit('update:playlistName', this.playlistName);
        },
        setPlaylistDescription:function() {
            this.$emit('update:playlistDescription', this.playlistDescription);
        }
    }
}
</script>
<style scoped>

</style>