export const setAqi = (state, data) => {
  state.aqi = data;
};

export const setArea = (state, data) => {
  const { city_name = null, aqi_name = null } = data;
  if (city_name) {
    state.area.city_name = data.city_name
  }
  if (aqi_name) {
    state.area.aqi_name = data.aqi_name
  }
};

