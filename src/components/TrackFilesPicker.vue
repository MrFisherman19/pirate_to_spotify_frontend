<template>
    <v-container>
        <v-flex>
            <v-file-input validate-on-blur
                v-model="userTracks"
                multiple
                counter
                small-chips
                prepend-icon="mdi-music-circle-outline"
                color="#23D061"
                label="Your tracks:"
                placeholder="Select your tracks!"
                outlined
                dense
                v-on:change="filesNamesToArr">
                <!-- dodac tutaj filter dla audio -->
                <template v-slot:selection="{ index, text }">
                <v-chip
                    class="mt-2 mr-0"
                    small 
                    color="#23D061" 
                    text-color="#FFF"
                    v-if="index < 6">
                    {{ text }}
                </v-chip>
                <span class="ma-2 green--text"
                    v-else-if="index === 6">
                    + {{ userTracks.length - 6}} File(s)
                </span>
            </template>
            </v-file-input>
        </v-flex>
    </v-container>
</template>
<script>
export default {
    name: 'TrackFilesPicker',
    data: function() {
        return {
            userTracks:[],
            show: true
        }
    },
    methods: {
        filesNamesToArr: function () {
            if (this.userTracks.length > 0) {
                this.$emit('update:listLoadingShow', true);
                this.$emit('update:shouldShow', true);
                this.$emit('findSpotifyTracksByNames', this.userTracks.map((track) => { 
                    return {
                        //replacing spaces with '+' and remove file extension
                        title: track.name.replace(/ /g,'+').replace(/\..+$/, '')
                }}));
            } else {
                this.$emit('findSpotifyTracksByNames', []);
            }
        }
    }
}

</script>
<style scoped>
    .v-btn {
        text-transform: none;
    }
</style>