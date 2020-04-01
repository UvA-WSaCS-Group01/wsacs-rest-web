<template>
  <div class="mt-4">
    <b-container>
      <b-row class="mb-4">
        <b-col cols="7" class="text-left">
          <b-form @submit="onShortendSubmit" v-if="show">
            <b-input-group prepend="Your shortend URL" class>
              <b-form-input required v-model="shortendurlcode"></b-form-input>
              <b-input-group-append>
                <b-button variant="outline-primary" value="open" type="submit">Open</b-button>
                <b-button variant="outline-danger" value="delete" type="submit">Delete</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form>
        </b-col>
        <b-col cols="5" class="text-right">
          <b-button variant="outline-primary" @click="getAll" class="mr-2">List Keys</b-button>
          <b-modal ref="modal-keys" id="modal-keys" title="Allocated URL Keys" ok-only>
            <b-container>
              <b-row v-for="key in keys" :key="key.id">{{key}}</b-row>
            </b-container>
          </b-modal>
          <b-button @click="onDeleteAll" variant="outline-danger">Delete All</b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group
              id="input-group-1"
              label="Shorten this URL:"
              label-for="input-1"
              description="Add your url you want to shorten here."
            >
              <b-form-input id="input-1" v-model="form.url" required placeholder="URL"></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-4">
              <b-form-checkbox v-model="form.checked">using this id:</b-form-checkbox>
            </b-form-group>

            <b-form-group
              id="input-group-2"
              label-for="input-2"
              v-if="form.checked"
              description="Provide the id to shorten your URL to (if available)."
            >
              <b-form-input
                id="input-2"
                :required="form.checked ? true : false"
                v-model="form.code"
                placeholder="Your favoured id"
              ></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Api from "../utils/api.js";

export default {
  name: "UrlShortenerClient",
  data: function() {
    return {
      api: new Api("http://localhost:8081/"),
      form: {
        url: "",
        checked: false,
        code: ""
      },
      shortendurlcode: "",
      keys: [],
      show: true
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      let request;
      let url = this.form.url;
      if (this.form.checked) {
        request = this.api.put_by_id(this.form.code, this.form.url);
      } else {
        request = this.api.post(this.form.url);
      }

      request
        .then(resp => {
          console.log(resp.data)
          let text = `We converted ${url} to the id ${resp.data}`;
          if (this.form.checked)  {text = `Your shortURL was updated to ${url}`}

          this.$bvToast.toast(text, {
            title: "We shortend your URL",
            noAutoHide: false,
            variant: "success",
            toaster: "b-toaster-top-center"
          });
        })
        .catch(err => {
          if (err.response.status == 400) {
            let text = "The URL you entered is not valid.";
            this.$bvToast.toast(text, {
              title: "Shortening your URL was not successful",
              variant: "danger",
              toaster: "b-toaster-top-center"
            });
          } else {
            console.log(err);
            let text = "An error occured on our site.";
            this.$bvToast.toast(text, {
              title: "Shortening your URL was not successful",
              noAutoHide: false,
              variant: "danger",
              toaster: "b-toaster-top-center"
            });
          }
        });
    },
    onShortendSubmit(evt) {
      evt.preventDefault();
      let type = evt.explicitOriginalTarget.value;

      if (type == "delete") {
        let req = this.api.delete_by_id(this.shortendurlcode);
        req
          .then(() => {
            this.$bvToast.toast("Your Entry was removed", {
              title: "Deleted all entires",
              toaster: "b-toaster-top-center"
            });
          })
          .catch(() => {
            this.$bvToast.toast(
              "You tried to delete an entry that does not exist or is already deleted.",
              {
                title: "Entry Missing",
                toaster: "b-toaster-top-center"
              }
            );
          });
        this.resetShortendForm();
      } else if (type == "open") {
        let req = this.api.get_by_id(this.shortendurlcode);
        req
          .then(data => {
            alert(JSON.stringify(data));

            this.$bvToast.toast("Your Entry was removed", {
              title: "Deleted all entires",
              toaster: "b-toaster-top-center"
            });
          })
          .catch(err => {
            // As the specification is a fuckup 301 is failed
            if (err.response.status == 301) {
              // redirect to source
              window.location.href = err.response.data;
            } else {
              this.$bvToast.toast("This is not a valid shortURL", {
                title:
                  "Invalid shortURL - entry might be deleted or is non-existent",
                toaster: "b-toaster-top-center"
              });
            }
          });
        this.resetShortendForm();
      } else {
        console.log("unknown type");
        return;
      }

      // alert(JSON.stringify(this.form));
    },
    resetShortendForm() {
      this.shortendurlcode = "";
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    onReset(evt) {
      evt.preventDefault();
      this.form.url = "";
      this.form.code = "";
      this.form.checked = false;
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    onDeleteAll() {
      let req = this.api.delete();
      req
        .then(() => {
          this.$bvToast.toast("We removed all shorten URLs for you", {
            title: "Deleted all entires",
            toaster: "b-toaster-top-center"
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    getAll() {
      let keysPromise = this.api.get();
      keysPromise.then(result => {
        this.keys = result.data;
        if (this.keys.length > 0) {
          this.$refs["modal-keys"].show();
        } else {
          this.$bvToast.toast("There are not shortend URLs at the moment", {
            title: "No Shortend URLs",
            toaster: "b-toaster-top-center"
          });
        }
      });
    }
  }
};
</script>

<style scoped>
</style>
