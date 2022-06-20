<template>
  <div>
    <v-card-title>
      請填寫居住的縣市
    </v-card-title>
    <v-card-text>
      <v-select
        v-model="area.city_name"
        :items="cities"
        label="請選擇縣市"
        item-text="city_name"
        @input="getAqis(computedCityId)"
      ></v-select>
    </v-card-text>
    <v-card-title>
        請選擇空氣品質測量站
    </v-card-title>
    <v-card-text>
      <v-select
        v-model="area.aqi_name"
        :items="aqis"
        label="請選擇測量站"
        item-text="sitename"
        @input="getAqi($event)"
      ></v-select>
    </v-card-text>
  </div>
</template>
<script>
import { cities } from '../libs/cities.js';
import { aqi } from '../libs/aqi.js';
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'LocationSelector',
    data() {
    return {
      dialog: false,
      cities: [],
      districts: [],
      aqis: [],
      point: null,
    };
  },
  methods: {
    ...mapMutations([
      'setAqi',
      'setArea',
      'setWeather',
    ]),
    /* ===== 取得縣市資料 ======= */
    getCities() {
      return cities.getCities().then((res) => {
        if (res.status) {
          this.cities = res.data;
          return this.cities;
        }
        this.cities = [];
      });
    },
    /* ===== 取得空氣品質資料 ======= */
    getAqis(city_id) {
      return aqi.getAqis(city_id).then((res) => {
        if (res.status) {
          this.aqis = res.data;
          const [aqi] = this.aqis;
          this.setAqi(aqi);
          this.setArea({ aqi_name: aqi.sitename });
          return res.data;
        }
        this.setAqi(null);
      });
    },
    getAqi(sitename) {
      const data = this.aqis.find((item) => item.sitename === sitename);
      this.setAqi(data);
      this.setArea({ aqi_name: sitename });
    },
  },
  computed: {
    ...mapState([
      'area',
    ]),
    computedCityId() {
      let cityId = null;
      if (this.area.city_name && this.cities.length > 0) {
        cityId = this.cities.find((city) => city.city_name === this.area.city_name).id;
      }
      return cityId;
    },
  },
  async mounted() {
    await this.setArea(this.area);
    await this.getCities();
    await this.getAqis(this.computedCityId);
  },
}
</script>