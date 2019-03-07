/**
 * @license
 * ©2018-2019 EdgeVerve Systems Limited (a fully owned Infosys subsidiary),
 * Bangalore, India. All Rights Reserved.
 */
import { dedupingMixin } from "@polymer/polymer/lib/utils/mixin.js";

import "oe-utils/oe-utils.js";

import { OEAjaxMixin } from "oe-mixins/oe-ajax-mixin.js";

var OEUtils = window.OEUtils || {};
/**
 * `OEDataTableMixin`
 * This Mixin contains methods used by data-table like.
 * * Default controller used to fetch data based on restUrl provided.
 * * CRUD operation methods for column configuration on GridConfig model.
 * * Form handler event listeners to update the data list.
 * 
 * @param {class} BaseClass class to apply mixin
 * @return {class} extended class
 * @polymer
 * @mixinFunction
 */
const DataTableMixin = function (BaseClass) {

  /**
   * @polymer
   * @mixinClass
   */
  return class extends OEAjaxMixin(BaseClass) {

    /**
     * Makes a server call based on the resturl provided and 
     * the filter/sort information to fetch data for the current page
     * 
     * @param {number} pageNumberToFetch page number to fetch
     * @param {number} pageSize page size to fetch
     * @param {Object} filterSort filter and sort options
     * @param {function} done callback function
     */
    __defaultController(pageNumberToFetch, pageSize, filterSort, done) {

      if (!this.restUrl) {
        done('"restUrl" property needs to be provided to use built-in pagination option');
      }

      var filter = {
        skip: (pageNumberToFetch - 1) * pageSize,
        limit: (pageSize + 2)
      };
      var userPassedFilter = this.userFilter;
      var columnWhere = {};

      if (userPassedFilter) {
        Object.keys(userPassedFilter).forEach(function (key) {
          filter[key] = userPassedFilter[key];
        });
      }

      if (filterSort) {
        //sort filter
        if (filter.order || filterSort.sort.length) {
          filter.order = filter.order || filterSort.sort;
        }
        if (filterSort.filter) {
          var columnFilter = filterSort.filter;

          columnWhere.and = Object.keys(columnFilter).filter(function (key) {
            return columnFilter[key] && columnFilter[key].length;
          }).map(function (prop) {
            var query = {};
            var pattern = '/.*' + columnFilter[prop] + '.*/i';
            query[prop] = {
              "regexp": pattern
            };
            return query;
          });

          if (filter.where || columnWhere.and.length) {
            filter.where = filter.where || {};
            filter.where = Object.assign(filter.where, columnWhere);
          }
        }
      }

      this.makeAjaxCall(this.restUrl, "GET", null, null, { filter: filter }, null, function (err, data) {
        if (err) {
          this.set('_loadingData', false);
          done(OEUtils.extractErrorMessage(err));
          return;
        }
        this._fetchRowCount(filter);
        var isLastPage = data.length <= pageSize;
        done(null, data.slice(0, pageSize), isLastPage);
      }.bind(this));
      this.set('_loadingData', true);
    }

    /**
     * Fetches the Row count for total number of rows
     * @param {Object} filter filter on resturl
     */
    _fetchRowCount(filter) {
      var url = this.restUrl;
      //check if the filter is appended as a part of the url. eg: /api/cars?filter[where][carClass]=fullsize
      //if appended , remove the filter to avoid incorrect count
      var index = url.indexOf("?");
      if (index > -1) {
        url = url.slice(url, index);
      }
      url += '/count';

      var ajaxFilter = {};
      if (filter.where) {
        ajaxFilter.where = filter.where;
      }

      this.makeAjaxCall(url, "GET", null, null, { filter: ajaxFilter }, null, function (err, data) {
        this.set('_loadingData', false);
        if (err) {
          this.fire('oe-show-error', OEUtils.extractErrorMessage(err));
        } else {
          this.set('rowCount', data.count);
        }
      }.bind(this));
    }



    /**
     * Observer called on 'configCode' changed to fetch and set
     * column configurations from the model 'GridConfig' and saves it in localstorage
     */
    _configCodeChanged() {
      if (this.configCode) {
        this.async(function () {
          var restApiRoot = window.OEUtils && window.OEUtils.restApiRoot ? window.OEUtils.restApiRoot : '/api';
          var url = restApiRoot + '/GridConfigs/config/' + this.configCode;
          this.makeAjaxCall(url, 'get', null, null, null, null, function (err, config) {
            if (err) {
              var gridConfig = this._getConfigLocal(this.configCode);
              if (gridConfig) {
                this.set('config', gridConfig);
                return;
              }
              this.resolveError(err);
            } else {
              this._saveConfigLocal(this.configCode, config);
              this.set('config', config);
            }
          }.bind(this));
        }.bind(this));
      }
    }

    /**
     * Saves grid configuration into localstorage of the browser.
     * @param {string} configCode config code 
     * @param {Object} gridConfig grid configuration
     */
    _saveConfigLocal(configCode, gridConfig) {
      var savedGridConfigs = localStorage.gridConfigs;
      if (savedGridConfigs) {
        savedGridConfigs = JSON.parse(savedGridConfigs);
      } else {
        savedGridConfigs = {};
      }
      savedGridConfigs[configCode] = gridConfig;
      localStorage.gridConfigs = JSON.stringify(savedGridConfigs);
    }

    /**
     * Gets the grid configuration from browser localstorage.
     * @param {string} configCode config code.
     * @return {Object} grid configuration.
     */
    _getConfigLocal(configCode) {
      var savedGridConfigs = localStorage.gridConfigs;
      if (savedGridConfigs) {
        savedGridConfigs = JSON.parse(savedGridConfigs);
        return savedGridConfigs[configCode];
      }
      return undefined;
    }

    /**
     * Saves current grid configuration to the server model 'GridConfig' 
     */
    _saveGridConfig() {
      if (this.configCode) {

        var config = this.config || {};
        config.code = this.configCode;
        config.columns = this.columns;

        this._saveConfigLocal(this.configCode, config);

        var url = OEUtils.geturl('/GridConfigs');
        var method = config.id ? 'PUT' : 'POST';

        this.makeAjaxCall(url, method, config, null, null, null, function (err, resp) {
          if (err) {
            this.resolveError(err);
          } else {
            this.set('config', resp);
            this.fire('oe-show-success', 'Grid config saved successfully');
          }
        }.bind(this));
      }
    }

    /**
     * Computes the variable holding the data .
     * If a dataController or a restUrl is specified on the data-table the data is present in '_items' array.
     * Else the data is set be client on 'items' array.
     * @return {string} variable name holding all the data.
     */
    get computedItems() {
      return (this.dataController || this.restUrl) ? '_items' : 'items';
    }

    connectedCallback() {
      super.connectedCallback();
      this.addEventListener('delete-selected-rows', this._deleteSelectedRows.bind(this));
      this.addEventListener('save-grid-config', this._saveGridConfig.bind(this));
      this.addEventListener('show-add-form', this._showAddForm.bind(this));
      this.addEventListener('show-edit-form', this._showEditForm.bind(this));
      this.addEventListener('oe-data-table-row-form-load', this._loadFormAction.bind(this));


      //Attach event listeners to lazy-component
      this.async(function () {
        var form = this.$['form-component'];
        form.addEventListener('oe-action-add', this._formHandleAdd.bind(this));
        form.addEventListener('oe-action-update', this._formHandleUpdate.bind(this));

        form.addEventListener('oe-formdata-inserted', this._formHandleRemoteAdd.bind(this));
        form.addEventListener('oe-formdata-updated', this._formHandleRemoteUpdate.bind(this));
        form.addEventListener('oe-formdata-deleted', this._formHandleRemoteDelete.bind(this));

        //listens for click event in document.
        document.addEventListener('tap', this._resetActiveCell.bind(this));
        this._updateRowWidth();
      });
    }


    /**
     * Launches the form view for user to add data.
     */
    _showAddForm() {
      var form = this.$['form-component'];

      function addNewRecord(ev) {
        ev && ev.stopPropagation();
        form.newRecord(this.defaultRecord);
        if (this.recordHandling !== 'remote') {
          form.set('emitOnSave', 'oe-action-add');
        } else {
          form.set('emitOnSave', '');
        }
        this._showFormView();
        form.removeEventListener('lazy-component-loaded', addNewRecord);
      }

      if (this.dataTableFormUrl !== this.editorFormUrl) {
        form.addEventListener('lazy-component-loaded', addNewRecord.bind(this));
        this.set('dataTableFormUrl', this.editorFormUrl);
      } else {
        addNewRecord.call(this);
      }
    }

    /**
     * Launches the form view for user to edit the selected record.
     */
    _showEditForm() {
      var form = this.$['form-component'];

      function editRecord(ev) {
        ev && ev.stopPropagation();
        form.set('model', JSON.parse(JSON.stringify(this.selectedItems[0])));
        if (this.recordHandling !== 'remote') {
          form.set('emitOnSave', 'oe-action-update');
        } else {
          form.set('emitOnSave', '');
        }
        this._showFormView();
        this.set('_modelBeingUpdated', this.selectedItems[0]);
        form.removeEventListener('lazy-component-loaded', editRecord);
      }

      if (this.selectedItems.length) {
        if (this.dataTableFormUrl !== this.editorFormUrl) {
          form.addEventListener('lazy-component-loaded', editRecord.bind(this));
          this.set('dataTableFormUrl', this.editorFormUrl);
        } else {
          editRecord.call(this);
        }
      }
    }

    /**
     * Lanuches the form view for user to see the record in the form ,
     * provided by user in the formUrl for the row-action.
     * 
     * @param {Event} event event containing the row and formUrl.
     */
    _loadFormAction(event) {
      var formUrl = event.detail.url;
      var row = event.detail.model;

      var form = this.$['form-component'];

      var _setRecord = function (ev) {
        ev && ev.stopPropagation();
        form.set('model', JSON.parse(JSON.stringify(row)));
        this._showFormView();
        this.set('_modelBeingUpdated', row);
        form.removeEventListener('lazy-component-loaded', _setRecord);
      };

      var _showGridView = function (ev) {
        this._showGridView();
        form.removeEventListener('show-grid-view', _showGridView);
      };

      form.addEventListener('show-grid-view', _showGridView.bind(this));
      if (this.dataTableFormUrl !== formUrl) {
        form.addEventListener('lazy-component-loaded', _setRecord.bind(this));
        this.set('dataTableFormUrl', formUrl);
      } else {
        _setRecord.call(this);
      }
    }

    /**
     * Pushes the new record into the data array.
     * 
     * @param {Event} event event containing the record to add
     */
    _formHandleAdd(event) {
      event.stopPropagation();
      var items = this.computedItems;
      var newRecord = event.detail;
      if (this.recordHandling === 'localex') {
        newRecord.__row_status = 'added';
      }
      if (!this[items]) {
        this.set(items, []);
      }
      this.async(function () {
        this.push(items, newRecord);
      }, 300);
      this._showGridView();
    }

    /**
     * Updates the record in the data array.
     * 
     * @param {Event} event event containing the record data of update
     */
    _formHandleUpdate(event) {
      event.stopPropagation();
      var items = this.computedItems;
      if (this._modelBeingUpdated) {
        var index = this[items].indexOf(this._modelBeingUpdated);
        this.deselectItem(this._modelBeingUpdated);
        var newRecord = event.detail;
        if (this.recordHandling === 'localex') {
          newRecord.__row_status = newRecord.__row_status || 'modified';
        }
        (index >= 0) && this.splice(items, index, 1, newRecord);
        this.set('_modelBeingUpdated', null);
      }
      this._showGridView();
    }

    /**
     * Pushes the new record into the data array once the data is saved on the server.
     * 
     * @param {Event} event event containing the record to add.
     */
    _formHandleRemoteAdd(event) {
      var items = this.computedItems;
      if (!this[items]) {
        this.set(items, []);
      }
      this.push(items, event.detail.data);
      if (this.dataController || this.restUrl) {
        this._organizeData();
      }
      this._showGridView();
    }

    /**
     * Updates the record in the data array once data is saved on the server.
     * 
     * @param {Event} event event containing the record data of update.
     */
    _formHandleRemoteUpdate(event) {
      var items = this.computedItems;
      if (this._modelBeingUpdated) {
        var index = this[items].indexOf(this._modelBeingUpdated);
        this.deselectItem(this._modelBeingUpdated);
        var newRecord = event.detail.data;
        (index >= 0) && this.splice(items, index, 1, newRecord);
        this.set('_modelBeingUpdated', null);
      }
      if (this.dataController) {
        this._organizeData();
      }
      this._showGridView();
    }

    /**
     * Deletes the record from data array once it is deleted from server.
     * 
     * @param {Event} event event containing the record to delete.
     */
    _formHandleRemoteDelete(event) {
      var items = this.computedItems;
      var model = event.detail.data;
      this.splice(items, this[items].indexOf(model), 1);
      if (this.dataController) {
        this.cancelAsync(this._organizeDataTaskOnDelete);
        this._organizeDataTaskOnDelete = this.async(function () {
          this._organizeData();
        }, 300);
      }
    }

    /**
     * Deletes the selected records from data array.
     * If the record-handling is set to remote uses the form components 'doDelete' method to trigger delete on server side.
     * 
     * @param {Event} event event containing the records to delete.
     */
    _deleteSelectedRows(event) {
      var items = this[this.computedItems];
      var form;
      var emobj = {};
      function deleteRecord(ev) {
        form.element.doDelete(event);
        form.removeEventListener('lazy-component-loaded', deleteRecord);
      }
      var indexesToDelete = this.selectedItems.map(function (item) {
        return items.indexOf(item);
      }.bind(this)).sort(function (a, b) {
        return b - a;
      });

      if (indexesToDelete.length) {
        form = this.$['form-component'];
        indexesToDelete.forEach(function (index) {
          var deletedRecord = items[index];
          this.deselectItem(deletedRecord);
          if (this.recordHandling === 'localex' && deletedRecord.id) {
            this.set('items.' + index + '.__row_status', 'deleted');
          } else if (this.recordHandling === 'remote') {
            Object.assign(emobj, deletedRecord);
            this.set('modelToEdit', emobj);
            if (form.element && form.element.doDelete) {
              form.element.doDelete(event);
            } else {

              form.addEventListener('lazy-component-loaded', deleteRecord.bind(this));
              this.set('dataTableFormUrl', this.editorFormUrl);
            }
          } else {
            this.splice(this.computedItems, index, 1);
          }
        }.bind(this));
      }
    }

  };
};

export const OEDataTableMixin = dedupingMixin(DataTableMixin);
