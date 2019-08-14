<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" clipped app>
      <v-list>
        <v-list-tile class="py-2" to="/">
          <v-list-tile-action>
            <v-icon size="26">mdi-home-outline</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-group prepend-icon="mdi-table-edit">
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-title>Planning</v-list-tile-title>
            </v-list-tile>
          </template>
          <v-list-tile class="ml-5 pl-2" to="/plan/product">
            <v-list-tile-title>Production</v-list-tile-title>
          </v-list-tile>
          <v-list-tile class="ml-5 pl-2" to="/plan/downtime">
            <v-list-tile-title>Downtime</v-list-tile-title>
          </v-list-tile>
        </v-list-group>
        <v-list-tile class="py-2" to="/production">
          <v-list-tile-action>
            <v-icon size="26">mdi-cube-send</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Production</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile class="py-2" to="/analysis">
          <v-list-tile-action>
            <v-icon size="26">mdi-chart-line</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Analysis</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile class="py-2" to="/report">
          <v-list-tile-action>
            <v-icon size="26">mdi-cloud-print-outline</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Report</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-group prepend-icon="mdi-settings">
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-title>Setting</v-list-tile-title>
            </v-list-tile>
          </template>
          <v-list-tile class="ml-5 pl-2" to="/setting/sku">
            <v-list-tile-title>SKU</v-list-tile-title>
          </v-list-tile>
          <v-list-tile class="ml-5 pl-2" to="/setting/downtimeCategory">
            <v-list-tile-title>Downtime Category</v-list-tile-title>
          </v-list-tile>
          <v-list-tile class="ml-5 pl-2" to="/setting/downtimeReason">
            <v-list-tile-title>Downtime Reason</v-list-tile-title>
          </v-list-tile>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="white" app>
      <v-toolbar-side-icon class="hidden-md-and-up" @click="drawer = !drawer" />
      <v-toolbar-title>
        <v-img src="/logo.png" width="80" height="45" />
      </v-toolbar-title>
      <v-toolbar-items class="hidden-sm-and-down ml-5">
        <v-btn flat class="text-none subheading" to="/">Home</v-btn>
        <v-menu offset-y>
          <template slot="activator">
            <v-btn flat class="text-none subheading">
              Planning <v-icon class="ml-2">mdi-menu-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-tile to="/plan/product">
              <v-list-tile-title>Production</v-list-tile-title>
            </v-list-tile>
            <v-list-tile to="/plan/downtime">
              <v-list-tile-title>Downtime</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
        <v-btn flat class="text-none subheading" to="/production">
          Production
        </v-btn>
        <v-btn flat class="text-none subheading" to="/analysis">Analysis</v-btn>
        <v-btn flat class="text-none subheading" to="/report">Report</v-btn>
        <v-menu offset-y>
          <template slot="activator">
            <v-btn flat class="text-none subheading">
              Setting <v-icon class="ml-2">mdi-menu-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-tile to="/setting/sku">
              <v-list-tile-title>SKU</v-list-tile-title>
            </v-list-tile>
            <v-list-tile to="/setting/downtimeCategory">
              <v-list-tile-title>Downtime Category</v-list-tile-title>
            </v-list-tile>
            <v-list-tile to="/setting/downtimeReason">
              <v-list-tile-title>Downtime Reason</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-toolbar-items>
      <v-spacer />
      <v-btn icon to="/profile">
        <v-icon>mdi-account-outline</v-icon>
      </v-btn>
      <v-btn icon @click="logoutDialog = true">
        <v-icon color="orange darken-3">mdi-export</v-icon>
      </v-btn>
    </v-toolbar>
    <v-dialog v-model="logoutDialog" max-width="400">
      <v-card>
        <v-card-text>
          <span class="subheading">
            Are you sure want to logout ?
          </span>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn
            color="orange darken-1"
            flat
            class="text-none"
            @click="logoutDialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="green darken-1"
            class="text-none"
            flat
            @click="logout()"
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-content class="pb-0">
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      logoutDialog: false,
      drawer: false,
      menus: [
        { icon: 'mdi-home-outline', text: 'Home', route: '/' },
        { icon: 'mdi-table-edit', text: 'Planning', route: 'plan' },
        { icon: 'mdi-cube-send', text: 'Production', route: 'production' },
        { icon: 'mdi-chart-line', text: 'Analysis', route: 'analysis' },
        { icon: 'mdi-cloud-print-outline', text: 'Report', route: 'report' },
        { icon: 'mdi-account-outline', text: 'Profile', route: 'profile' }
      ]
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.$router.push('/login')
    }
  }
}
</script>
