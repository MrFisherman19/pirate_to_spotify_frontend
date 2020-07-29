<template>
    <v-card class="ma-2">
        <v-card-title>
            List of your tracks!  
        </v-card-title>
        <v-card-subtitle>Are these the tracks of your choice?</v-card-subtitle>
        <v-divider></v-divider>
        <v-list>
            <v-list-item outlined v-for="(item,index) in visiblePages" :key="item.index">
                <v-list-item-avatar><v-img :src="item.imageUrl"></v-img></v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title>
                        <a :href="item.uri">{{ item.title }}</a>
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        <a :href="item.mainAuthor.uri">{{ item.mainAuthor.name }}</a>
                    </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                    <v-icon v-on:click="removeTrack(index)">mdi-close</v-icon>
                </v-list-item-action>
            </v-list-item>
        </v-list>
        
        <v-card-actions>
            <v-row>
                <v-col cols="12" lg="12">
                    <v-flex>
                        <v-alert class="ma-2" type="error" v-show="isPlaylistNameEmpty" dense outlined>Playlist name cannot be empty!</v-alert>
                    </v-flex>
                    <v-flex>
                        <v-alert class="ma-2" type="error" v-show="this.list.length==0" dense outlined>Playlist must have at least 1 track!</v-alert>
                    </v-flex>
                </v-col>
            </v-row>
            <v-spacer></v-spacer>
            <v-btn :disabled='this.list.length==0 || isPlaylistNameEmpty' color="#23D061" class="white--text" small v-on:click="createPlaylist">
                Create with {{ this.list.length }} tracks!
            </v-btn>  
        </v-card-actions>
        <v-divider></v-divider>
        <template>
            <div class="text-center">
                <v-pagination color="#23D061"
                    v-model="page"
                    :length="Math.ceil(this.list.length/this.perPage)"
                    :disabled="visiblePages.length == 0">
                </v-pagination>
            </div>
        </template>
        <template>
            <v-dialog v-model="shouldShowDialog" persistent width="300">
                <v-card color="#23D061">
                    <v-flex>
                        <v-card-text class="white--text">Please wait a few seconds
                            <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                        </v-card-text>
                    </v-flex>
                </v-card>
            </v-dialog>
        </template>
    </v-card>
</template>
<script>
export default {
    name:'TrackList',
    props:['list','shouldShowLoadingDialog','isPlaylistNameEmpty'],
    data: function() {
        return {
            page: 1,
            perPage: 7,
        }
    },
    computed: {
        visiblePages() {
            var trackDetails = this.list;
            trackDetails = this.list.slice((this.page - 1) * this.perPage, this.page * this.perPage);
            this.$emit('update:listLoadingShow', false);
            return trackDetails;
        },
        shouldShowDialog: {
            get:function() {
                return this.shouldShowLoadingDialog;
            },
        }
    },
    methods: {
        removeTrack(index) {
            this.list.splice(index, 1);
        },
        createPlaylist:function() {
            this.$emit('createPlaylistEvent');
        }
    }
}
</script>
<style scoped>
    a {
        text-decoration: none;
    }
</style>