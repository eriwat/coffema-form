<template>
  <div>
    <section>
      <h3>Artikle</h3>
      <form class="form" @submit.prevent="saveArtEntry">
        <div class="form-control">
          <v-number-input
            :reverse="false"
            controlVariant="stacked"
            label="Menge"
            :hideInput="false"
            :inset="false"
            :min="0"
            :disabled="isUmengeActive"
            v-model="mengeInput"
          ></v-number-input>
        </div>
        <div class="form-control small">
          <v-number-input
            :reverse="false"
            controlVariant="stacked"
            label="U-Menge"
            :hideInput="false"
            :inset="false"
            :min="0"
            :disabled="isMengeActive"
            v-model="umengeInput"
          ></v-number-input>
        </div>
        <div class="form-control">
          <v-autocomplete
            label="Search product"
            :items="searchItems"
            v-model="searchInput"
          ></v-autocomplete>
        </div>
        <div class="form-control">
          <v-text-field
            label="Articles nummer"
            :model-value="articleInput"
            disabled
            v-model="articleInput"
          ></v-text-field>
        </div>
        <div class="form-control">
          <v-text-field
            label="Bezeichnung"
            :model-value="descriptionInput"
            disabled
            v-model="descriptionInput"
          ></v-text-field>
        </div>
        <div class="form-control small">
          <v-number-input
            :reverse="false"
            controlVariant="stacked"
            label="Rabatt (%)"
            :hideInput="false"
            :inset="false"
            :min="0"
            :max="100"
            v-model="discountInput"
          ></v-number-input>
        </div>
        <div class="form-control">
          <v-select
            label="LA"
            :items="laItems"
            v-model="artLaInput"
          ></v-select>
        </div>
        <div class="form-control small">
          <v-text-field
            label="Preis VK"
            v-model="itemPrice"
            disabled
          ></v-text-field>
        </div>
        <div class="form-control small">
          <v-text-field
            label="Summ"
            v-model="calculateSum"
            disabled
          ></v-text-field>
        </div>
        <div class="form-control small">
          <v-btn density="default" color="success" type="submit">Save</v-btn>
        </div>
      </form>
      
    </section>
    <section>
      <h3>Ressource</h3>
      <form class="form" @submit.prevent="saveResEntry">
        <div class="form-control">
          <v-autocomplete
            label="TE"
            :items="consultantItems"
            v-model="consultantInput"
          ></v-autocomplete>
        </div>
        <div class="form-control small">
          <v-number-input
            :reverse="false"
            controlVariant="stacked"
            label="Stunde"
            :hideInput="false"
            :inset="false"
            :min="0"
            v-model="hoursInput"
          ></v-number-input>
        </div>
        <div class="form-control">
          <v-select
            label="LA"
            :items="laItems"
            v-model="resLaInput"
          ></v-select>
        </div>
        <div class="form-control small">
          <v-btn density="default" color="success" type="submit">Save</v-btn>
        </div>
      </form>
      <div v-show="existSavedArtData">
        <h3>Artikle</h3>
        <v-table density="compact">
          <thead>
            <tr>
              <th>Menge</th>
              <th>U-Menge</th>
              <th>Search</th>
              <th>Article</th>
              <th>Desciription</th>
              <th>Discount</th>
              <th>LA</th>
              <th>Price</th>
              <th>Sum</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(item, index) in savedArtData" :key="index">
              <td>{{ item.mengeInput }}</td>
              <td>{{ item.umengeInput }}</td>
              <td>{{ item.searchInput }}</td>
              <td>{{ item.articleInput }}</td>
              <td>{{ item.descriptionInput }}</td>
              <td>{{ item.discountInput }}</td>
              <td>{{ item.artLaInput }}</td>
              <td>{{ item.itemPrice }}</td>
              <td>{{ item.sumInput }}</td>
              <td><v-btn>Delete</v-btn></td>
            </tr>
          </tbody>
        </v-table>
      </div>
      <div v-show="existSavedResData">
        <h3>Ressource</h3>
        <v-table density="compact">
          <thead>
            <tr>
              <th>TE</th>
              <th>Stunde</th>
              <th>LA</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in savedResData" :key="index">
              <td>{{ item.consultantInput }}</td>
              <td>{{ item.hoursInput }}</td>
              <td>{{ item.resLaInput }}</td>
              <td><v-btn>Delete</v-btn></td>
            </tr>
          </tbody>
        </v-table>
      </div>
      
    </section>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      artJsonData: null,
      error: null,
      savedArtData: [],
      savedResData: [],
      //Input for Art
      mengeInput: 0,
      umengeInput: 0,
      searchInput: "",
      articleInput: "Prefilled article input",
      descriptionInput: "Prefilled description",
      discountInput: 20, //Todo: to be preefilled by LA
      artLaInput: "",
      itemPrice: 100, // Client's comment: Price per item. No entry needed
      // Input for Res
      consultantInput: "",
      hoursInput: 0,
      resLaInput: "",
      searchItems: [],
      // Hardcoded dropdown data below
      laItems: [
        "LA option 1",
        "LA option 2",
        "LA option 3",
        "LA option 4",
        "LA option 5",
      ],
      consultantItems: [
        "Consultant 1",
        "Consultant 2",
        "Consultant 3",
        "Consultant 4",
        "Consultant 5",
      ],
    
    };
  },
  methods: {
    saveArtEntry() {
      const submitData = {
        mengeInput: this.mengeInput,
        umengeInput: this.umengeInput,
        searchInput: this.searchInput,
        articleInput: this.articleInput,
        descriptionInput: this.descriptionInput,
        discountInput: this.discountInput, // maybe not needed for submitData
        artLaInput: this.artLaInput,
        itemPrice: this.itemPrice,
        sumInput: this.calculateSum,
      };

      this.savedArtData.push(submitData);

      this.mengeInput = 0;
      this.umengeInput = 0;
      (this.searchInput = ""), (this.discountInput = 0);
      (this.artLaInput = ""), console.log(this.savedArtData);
    },
    saveResEntry() {
      const submitData = {
        consultantInput: this.consultantInput,
        hoursInput: this.hoursInput,
        resLaInput: this.resLaInput,
      };

      this.savedResData.push(submitData);
      console.log(this.savedResData);
    },
    async fetchData() {
      try {
        const response = await fetch('data/artdesc/9657.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        this.artJsonData  = data;

        console.log('fetched artdesc this.jsonData',this.jsonData);
      } catch (error) {
        this.error = error;
        console.error('Error fetching the JSON data:', error);
      }
    },
    getMengItemTitle(item) {
      return `${item.location} - ${item.value}`;
    },
    updateSearchItems(data) {
      this.searchItems = data.map(item => item.concatenated);
    }
  },
  computed: {
    isMengeActive() {
      if (this.mengeInput > 0) {
        return true;
      } else {
        return false;
      }
    },
    isUmengeActive() {
      if (this.umengeInput > 0) {
        return true;
      } else {
        return false;
      }
    },
    calculateSum() {
      let total;
      if (this.isMengeActive) {
        total = this.mengeInput * this.itemPrice;
      } else if (this.isUmengeActive) {
        total = this.umengeInput * this.itemPrice;
      } else {
        total = 0;
      }
      const discount = (this.discountInput / 100) * total;
      return total - discount;
    },
    existSavedArtData() {
      if (this.savedArtData.length > 0) {
        return true;
      } else {
        return false;
      }
    },
    existSavedResData() {
      if (this.savedResData.length > 0) {
        return true;
      } else {
        return false;
      }
    }
  },
  watch: {
    artJsonData(newData) {
      this.updateSearchItems(newData); 
    }
  },
  created() {
    this.fetchData();
  },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

section {
  padding: 10px 0;
}

form {
  display: flex;
  flex-direction: row;
  padding: 10px 10px 0 10px;
}

.form-control {
  display: flex;
  flex-direction: row;
  margin-right: 10px;
  width: 10%;
  flex-grow: 1;
}

.form-control.small {
  width: 8%;
}

v-table {
  width: 100%;
  border-collapse: collapse;
}
v-table,
th,
td {
  border: 1px solid ccc;
}
th,
td {
  padding: 8px;
  text-align: left;
}
th {
  background-color: #f2f2f2;
}
</style>
