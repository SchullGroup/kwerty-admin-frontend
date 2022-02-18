import { getAllCountryData } from '@/api';
import { KDashboardLayout, KButton, KInput } from '@/components';
import Upload from '@/mixins/Upload';
import countries from '@/utils/countries';
import { addCountryDashboard, getDashboard } from '@/api/country';

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
      getDashboard({ id: params.id });
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
    removeResource(index) {
      const { resources } = this;
      this.resources = resources.filter((item, i) => i !== index);
    },
    async uploadCountryImage(e) {
      this.isUploadingImage = true;
      const { url } = await this.uploadFile(e);
      this.isUploadingImage = false;
      this.dashboard.imageUrl = url;
      this.$toast.show({ message: 'Image Uploaded' });
    },
    async uploadResource(e) {
      this.isUploadingResource = true;
      const { url, name } = await this.uploadFile(e);
      this.isUploadingResource = false;
      this.resources.push([name, url]);
      this.$toast.show({ message: 'Resource Uploaded' });
    },
    async searchDatasets({ searchValue, country }) {
      try {
        let params;
        if ((searchValue && searchValue.length && searchValue.length >= 3) || country) {
          const paramsWithSearchValue = {
            country: this.dashboard.name,
            search: searchValue,
            category: 'economy',
          };
          params = country ? { country } : paramsWithSearchValue;
        } else {
        // if no search value get datasets for this country
          params = { country };
        }
        // fetch and populate dataset list for indicator dropdowns
        const response = await getAllCountryData(params);
        this.datasetList = response
          .data
          .data
          .dataset.filter((item) => item.country === this.dashboard.name);
      } catch (e) {
        console.error(e.message);
      }
    },
    async saveDashboard() {
      const { dashboard, indicators, charts } = this;
      try {
        dashboard.selectedIndicator = indicators.map((i) => i.id).join(',');
        dashboard.selectedChart = charts.map((c) => c.id).join(',');
        this.saving = true;
        const response = await addCountryDashboard(dashboard);
        this.$toast.show({ message: response.data.message });
        if (!this.isEditView) this.$router.push({ name: 'ManageCountry' });
      } catch (e) {
        const message = e.response ? e.response.data.message : e.message;
        this.$toast.show({ message });
      } finally {
        this.saving = false;
      }
    },
  },
};
