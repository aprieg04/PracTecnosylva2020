<template>
<v-container>
    <div class="notifications" v-if="show">
        <v-layout row wrap>
            <v-toolbar dark color="red accent-2">
                    <v-text-field
                    solo-inverted
                    flat
                    hide-details
                    label="Test"
                   
                ></v-text-field>
                <v-spacer></v-spacer>
                <v-text-field
                    solo-inverted
                    flat
                    hide-details
                    label="Test"
                ></v-text-field>
                <v-spacer></v-spacer>
                <v-text-field
                    solo-inverted
                    flat
                    hide-details
                    label="Test"
                ></v-text-field>
            </v-toolbar>
        </v-layout>
    </div>
  </v-container>
</template>

<script>
export default {
name: 'Mapa'
}
</script>

<style>

</style>