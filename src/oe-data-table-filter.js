/**
 * @license
 * ©2018-2019 EdgeVerve Systems Limited (a fully owned Infosys subsidiary),
 * Bangalore, India. All Rights Reserved.
 */

import { html, PolymerElement } from "@polymer/polymer/polymer-element.js";
import { OECommonMixin } from "oe-mixins/oe-common-mixin.js";
import "@polymer/iron-flex-layout/iron-flex-layout-classes.js";
import "@polymer/paper-checkbox/paper-checkbox.js";
import "@polymer/paper-input/paper-input.js";
import "@polymer/paper-item/paper-item.js";
import "@polymer/iron-list/iron-list.js";
import "@polymer/paper-button/paper-button.js";

/**
 * `oe-data-table-filter`
 *  is used in `oe-data-table` component for displayig a column filter data. List of unique items present in a column is shown.
 * 
 * 
 * @customElement
 * @polymer
 * @appliesMixin OECommonMixin
 */
class OeDataTableFilter extends OECommonMixin(PolymerElement) {

  static get is() { return 'oe-data-table-filter'; }

  static get template() {
    return html`
    <style include="iron-flex iron-flex-alignment">
      :host {
        display: block;
        margin: 0 !important;
        padding: 0 !important;
      }
      .input-container {
        padding: 16px;
        border-bottom: 1px solid #ededed;

        @apply --layout;
        @apply --layout-center;
      }

      paper-input {
        width: 100%;

        --paper-input-container: {
          padding: 0;
        }
        --paper-input-container-input: {
          font-size: 13px;
        }
      }

      paper-checkbox {
        --paper-checkbox-size: 14px;
        --paper-checkbox-ink-size: 38px;
      }

      paper-item {
        --paper-item: {
          font-size: 13px;
        }
      }

      paper-button {
        --paper-button: {
          color: #2196f3;
          font-size: 14px;
          letter-spacing: 0.5px;
        }
      }

      .action-buttons {
        padding: 8px 5px;
        font-weight: bold;

        @apply --layout;
        @apply --layout-around-justified;
      }

    </style>

    <div class="input-container">
      <paper-checkbox checked={{_selectAllItems}} hidden$=[[isServerData]] on-change="_toggleSelectAll"> </paper-checkbox>
      <paper-input label="Search [[column.label]]" no-label-float value={{searchText}} on-input="_computeCheckBox"></paper-input>
    </div>
    <template is="dom-if" if=[[!isServerData]]>
      <template is="dom-if" if=[[!searchText.length]] on-dom-change="_updateListSize">
        <iron-list id="unfiltered-list" items=[[_items]]>
          <template>
            <paper-item tabindex="-1">
              <paper-checkbox checked={{_getSelectionState(item,_computeSelection)}} on-change="_toggleCheckboxSelection"> [[item]] </paper-checkbox>
            </paper-item>
          </template>
        </iron-list>
      </template>
      <template is="dom-if" if=[[searchText.length]] on-dom-change="_updateListSize">
        <iron-list id="filtered-list" items=[[_filterItems(_items,searchText)]]>
          <template>
            <paper-item>
              <paper-checkbox checked={{_getSelectionState(item,_computeSelection)}} on-change="_toggleCheckboxSelection"> [[item]] </paper-checkbox>
            </paper-item>
          </template>
        </iron-list>
      </template>
    </template>
    <div class="action-buttons">
      <paper-button on-tap="_resetFilter" disabled=[[!_hasFilterSelected(_computeSelection)]]> Reset </paper-button>
      <paper-button on-tap="_closeFilter"> Cancel </paper-button>
      <paper-button on-tap="_applyFilter"> Apply </paper-button>
    </div>
    `;
  }

  static get properties() {
    return {
      /**
      * The definition of the column of the current cell.
      *
      * @type {{key: string, label: string, uiType: string, type: string, sort: string}}
      */
      column: {
        type: Object,
        notify: true
      },

      /**
       * data object array.
       */
      items: {
        type: Array
      },

      /**
       * Flag denoting if the data is from server.
       */
      isServerData: {
        type: Boolean
      },
      height: {
        type:String,
        observer: '_updateListSize'
      }
    };
    /**
     * Fired when the cell is value is changed.
     * 
     * @event apply-criteria
     * @param Object of filter value to apply on the column
     */
  }

  static get observers() {
    return ['_itemsChanged(items.*)'];
  }

  get _selectedItems() {
    return this._items.filter(function (item) {
      return this._selectionState[item];
    }.bind(this));
  }


  constructor() {
    super();
    this.set('_selectionState', {});
    this.set('_computeSelection', true);
  }

  /**
   * Applies the filter
   * @param {Event} evt tap event
   */
  _applyFilter(evt) { // eslint-disable-line no-unused-vars
    if (this.isServerData) {
      var filter = {
        key: this.column.key,
        value: this.searchText
      };
      this.fire('apply-criteria', { filterColumn: filter });
      return;
    }
    this.set('column.selectedItems', this._selectedItems);
    this.fire('apply-criteria');
    this.fire('close-filter-dialog');
  }

  /**
   * Resets the filter
   * @param {Event} evt tap event
   */
  _resetFilter(evt) { // eslint-disable-line no-unused-vars
    if (this.isServerData) {
      this.searchText = "";
      var filter = {
        key: this.column.key,
        value: null
      };
      this.fire('apply-criteria', { filterColumn: filter });
      return;
    }
    this._selectedItems.forEach(function (item) {
      this.set('_selectionState.' + item, false);
    }.bind(this));
    this.set('_selectAllItems', false);
    this.set('_computeSelection', !this._computeSelection);
    this.set('column.selectedItems', this._selectedItems);
    this.fire('apply-criteria');
    this.fire('close-filter-dialog');
  }

  /**
   * Closes the filter dialog
   * @param {Event} event tap event
   */
  _closeFilter(event) { // eslint-disable-line no-unused-vars
    this.fire('close-filter-dialog');
  }

  /**
   * Checks if a filter is selected
   * @param {Object} change change data on _completeselection
   * @return {boolean} flag denoting filter is selected
   */
  _hasFilterSelected(change) {
    var selection = this._selectionState;
    if (!selection) {
      return false;
    }
    var selected = Object.keys(selection).find(function (s) {
      return selection[s];
    }.bind(this));
    return !!selected;
  }

  /**
   * Popultes a unique value list
   * @param {Object} change change data on items
   */
  _itemsChanged(change) { // eslint-disable-line no-unused-vars
    if (this.items && this.items.length) {
      var uniqueData = [];

      this.items.forEach(function (d) {
        var val = d[this.column.key || this.column.field];
        if (uniqueData.indexOf(val) == -1) {
          uniqueData.push(val);
        }
      }.bind(this));

      this.set('_items', uniqueData.length ? uniqueData : []);
    }
  }

  /**
   * Filters the items array based on searchText
   * @param {Array} items array of items
   * @param {string} searchText string to search
   * @return {Array} filtered items array
   */
  _filterItems(items, searchText) {
    var search = searchText.toLowerCase();
    return search.length ? items.filter(function (item) {
      return item.toString().toLowerCase().indexOf(search) > -1;
    }) : items;
  }

  /**
   * Checks if the item is selected
   * @param {Object} item item for filter
   * @return {boolean} flag if the item is selected.
   */
  _getSelectionState(item) {
    return this._selectionState[item] ? true : false;
  }

  /**
   * Toggles the selection on all items
   * @param {Event} event tap event
   */
  _toggleSelectAll(event) {
    var state = event.target.checked;
    var items = this.searchText.length ? this._filterItems(this._items, this.searchText) : this._items;
    items.forEach(function (item) {
      state ? this._selectionState[item] = state : delete this._selectionState[item];
    }.bind(this));
    this.set('_computeSelection', !this._computeSelection);
  }

  /**
   * Updates the selectionState object
   * @param {Event} event change event of checkbox
   */
  _toggleCheckboxSelection(event) {
    var item = event.model.item;
    if (event.target.checked) {
      //this.set('_selectionState.' + item, true);
      this._selectionState[item] = true;
    } else {
      delete this._selectionState[item];
      this.set('_selectAllItems', false);
    }
    this.set('_computeSelection', !this._computeSelection);
  }

  /**
   * Sets `_selectAllItems` to false when entering on filter input
   * @param {Event} event change event
   */
  _computeCheckBox(event) { // eslint-disable-line no-unused-vars
    this.set('_selectAllItems', false);
  }

  /**
   * Updates the iron-list based on dom-if change
   * @param {Event} event dom-change-event
   */
  _updateListSize(event) { // eslint-disable-line no-unused-vars
    var lists = this.shadowRoot.querySelectorAll('iron-list');
    for (var i = 0, l = lists.length; i < l; i++) {
      if(this.height){
        lists[i].style['max-height'] = (this.height.match(/\d+/)[0] - 115) + 'px';
      }
      lists[i]._render();
    }
  }

}

window.customElements.define(OeDataTableFilter.is, OeDataTableFilter);