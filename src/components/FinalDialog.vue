<template>
    <v-dialog v-model="shouldShowDialog" persistent width="300">
        <v-card>
            <v-flex>
                <v-card-text v-if="this.status==200" class="text-center">Playlist was successfully created!</v-card-text>
                <v-card-actions class="justify-center">
                    <v-btn color="#23D061" class="white--text" small v-on:click="$router.go()">Nice!</v-btn>
                </v-card-actions>
            </v-flex>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    props:['shouldShowDialog','status'],
    data() {
        return {

        }
    }
}
</script>