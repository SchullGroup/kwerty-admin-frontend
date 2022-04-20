import { getAllCountryData } from '@/api';
import { KDashboardLayout, KButton, KInput } from '@/components';
import Upload from '@/mixins/Upload';
import countries from '@/utils/countries';
import errorHandler from '@/utils/error-handler';
import { addCountryDashboard, getDashboard, updateCountryDashboard } from '@/api/country';

delete countries[''];

export default {
  name: 'AddCountry',
  mixins: [Upload],
  components: {
    KDashboardLayout,
    KButton,
    KInput,
  },
  data: () => ({
    countriesOptions: countries,
    url: '',
    search: '',
    selectedIndicator: '',
    selectedChart: '',
    id: '',
    dashboard: {
      name: '',
      description: '',
      selectedIndicator: '',
      selectedChart: '',
      resource: {},
      imageUrl: '',
    },
    item: '',
    country: '',
    indicators: [],
    charts: [],
    resources: [],
    isUploadingResource: false,
    isUploadingImage: false,
    datasetList: [],
    saving: false,
    isEditView: false,
  }),
  async created() {
    const { $route: { params } } = this;
    if (params.id) {
      this.isEditView = true;
      const { data: { data } } = await getDashboard({ id: params.id });
      this.id = data.id;
      this.country = data.name;
      this.resources = Object.entries(data.resource);
      this.indicators = data.selectedIndicators.map((i) => ({ ...i, nameOfIndicator: i.name }))
        || [];
      this.charts = data.selectedCharts.map((i) => ({ ...i, nameOfIndicator: i.name })) || [];
      this.dashboard = {
        name: data.name,
        description: data.description,
        imageUrl: data.imageUrl,
        resource: data.resource,
        selectedIndicator: '',
        selectedChart: '',
      };
    }
  },
  watch: {
    async country(val) {
      this.dashboard.name = val;

      // fetch initial list of indicators
      await this.searchDatasets({ country: val });
    },
    resources(val) {
      // update dashboard object when resources change
      this.dashboard.resource = val.reduce((obj, [name, url]) => {
        const newObj = { ...obj };
        newObj[name] = url;
        return newObj;
      }, {});
    },
  },
  computed: {
    indicatorOptions() {
      if (!this.datasetList.length) return {};
      return this.datasetList.reduce((obj, cur) => {
        const newObj = { ...obj };
        newObj[cur.nameOfIndicator] = cur.nameOfIndicator;
        return newObj;
      }, {});
    },
    indicatorsShownList() {
      const uniqueItems = new Set(this.indicators.map((i) => i.nameOfIndicator));
      return Array(...uniqueItems);
    },
    chartsShownList() {
      const uniqueItems = new Set(this.charts.map((i) => i.nameOfIndicator));
      return Array(...uniqueItems);
    },
  },
  methods: {
    addIndicator(val) {
      if (val && !this.indicatorsShownList.includes(val)) {
        this.indicators.push(this.datasetList.find((item) => item.nameOfIndicator === val));
      }
      setTimeout(() => {
        this.selectedIndicator = '';
      }, 10);
    },
    addTopChart(val) {
      if (val && !this.chartsShownList.includes(val)) {
        this.charts
          .push(this.datasetList.find((item) => item.nameOfIndicator === val));
      }
      setTimeout(() => {
        this.selectedChart = '';
      }, 10);
    },
    removeItem(index, from) {
      from.splice(index, 1);
    },
    removeResource(thisName) {
      const { resources } = this;
      this.resources = resources.filter(([name]) => name !== thisName);
    },
    async uploadCountryImage(e) {
      try {
        this.isUploadingImage = true;
        const { url } = await this.uploadFile(e);
        this.isUploadingImage = false;
        this.dashboard.imageUrl = url;
        this.$toast.show({ message: 'Image Uploaded' });
      } catch {
        this.$toast.show({ message: "Couldn't upload image" });
      } finally {
        this.isUploadingImage = false;
      }
    },
    async uploadResource(e) {
      this.isUploadingResource = true;
      try {
        const { url, name } = await this.uploadFile(e);
        this.isUploadingResource = false;
        this.resources.push([name, url]);
        this.$toast.show({ message: 'Resource Uploaded' });
      } catch (error) {
        this.$toast.show({ message: 'Invalid file type' });
      } finally {
        this.isUploadingResource = false;
      }
    },
    async searchDatasets({ searchValue }) {
      try {
        const value = searchValue ? searchValue.trim() : '';
        let params;
        if ((value && value.length >= 3)) {
          params = {
            country: this.country,
            search: value,
            category: 'economy',
            limit: 50,
          };
        } else {
        // if no search value get datasets for this country
          params = { country: this.country, limit: 50 };
        }
        // fetch and populate dataset list for indicator dropdowns
        const response = await getAllCountryData(params);
        this.datasetList = response
          .data
          .data
          .dataset.filter((item) => item.country.toLowerCase() === this.country.toLowerCase());
      } catch (e) {
        console.error(e.message);
      }
    },
    async saveDashboard() {
      const { dashboard, indicators, charts } = this;
      try {
        dashboard.selectedIndicator = indicators.map((i) => i.datasetId || i.id).join(',');
        dashboard.selectedChart = charts.map((c) => c.datasetId || c.id).join(',');
        this.saving = true;
        let response;
        if (!this.isEditView) {
          response = await addCountryDashboard(dashboard);
          this.$router.push({ name: 'ManageCountry' });
        } else {
          response = await updateCountryDashboard({ ...dashboard, id: this.id });
        }
        this.$toast.show({ message: response.data.message });
      } catch (e) {
        this.$toast.show({ message: errorHandler(e).error });
      } finally {
        this.saving = false;
      }
    },
  },
};
