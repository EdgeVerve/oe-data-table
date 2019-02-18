/**
 * @license
 * ©2018-2019 EdgeVerve Systems Limited (a fully owned Infosys subsidiary),
 * Bangalore, India. All Rights Reserved.
 */

import { html, PolymerElement } from "@polymer/polymer/polymer-element.js";
import { OECommonMixin } from "oe-mixins/oe-common-mixin.js";
import "@polymer/iron-flex-layout/iron-flex-layout-classes.js";
import "@polymer/paper-dropdown-menu/paper-dropdown-menu.js";
import "@polymer/paper-listbox/paper-listbox.js";
import "@polymer/paper-item/paper-item.js";
import "@polymer/paper-icon-button/paper-icon-button.js";
import "@polymer/iron-icons/image-icons.js";

/**
 * `oe-data-table-pagination-panel`
 *  Pagination panel used in oe-data-table
 * 
 * ### Styling
 * 
 * The following custom properties and mixins are available for styling:
 * 
 * CSS Variable | Description | Default
 * ----------------|-------------|----------
 * `--oe-pagination-panel` | Mixin applied on the entire panel | {}
 * 
 * 
 * @customElement
 * @polymer
 * @appliesMixin OECommonMixin
 */
class OeDataTablePaginationPanel extends OECommonMixin(PolymerElement) {

  static get is() { return 'oe-data-table-pagination-panel'; }

  static get template() {
    return html`
    <style include="iron-flex">
    
      .pagination-panel {
          width: 100%;
          height: 56px;
          font-size: 12px;
          font-family: Roboto;
          font-weight: 600;
          padding: 0 14px;
          box-sizing: border-box;
          color: rgba(0, 0, 0, 0.54);
          -webkit-user-select: none;
          border-top: 1px solid #ededed;
    
          @apply --layout-horizontal;
          @apply --layout-center;
          @apply --layout-end-justified;
          @apply --oe-pagination-panel
        }
    
        .row-details {
          padding: 0 32px;
        }
    
        .pagination-dropdown-title {
          margin-left: 32px;
        }
    
        paper-dropdown-menu {
          padding: 0 10px;
          padding-top: 2px;
    
          --paper-dropdown-menu-input: {
            width: 50px;
          }
          --paper-input-container-underline: {
            display: none;
          }
          --paper-input-container-input: {
            font-size: 12px;
            text-align: center;
          }
        }
    </style>
    <div class="pagination-panel">
        <div class="pagination-dropdown-title"> Rows per page: </div>
        <paper-dropdown-menu no-animations no-label-float vertical-align="bottom" horizontal-align="left">
            <paper-listbox slot="dropdown-content" attr-for-selected="value" selected={{pageSize}}>
                <template is="dom-repeat" items=[[rowsPerPageItems]]>
                    <paper-item value=[[item]]>[[item]]</paper-item>
                </template>
            </paper-listbox>
        </paper-dropdown-menu>
        <div class="row-details">
            <span> [[_startRow]]-[[_endRow]] of [[_totalRowsCount(rowCount)]] </span>
        </div>
        <paper-icon-button disabled$="[[_disablePrevious(currentPage)]]" icon="image:navigate-before" on-tap="_previousPage"></paper-icon-button>
        <paper-icon-button disabled$="[[_isLastPage]]" icon="image:navigate-next" on-tap="_nextPage"> </paper-icon-button>
    </div>
    `;
  }

  static get properties() {
    return {
      /**
       * page size value
       */
      pageSize: {
        type: Number,
        notify: true
      },
      /**
       * Array containing different page sizes
       */
      rowsPerPageItems: {
        type: Array
      },

      /**
       * Current page index
       */
      currentPage:{
          type:Number,
          notify:true
      },

      /**
       * Length of items in this page
       */
      itemsLength:{
          type:Number
      },

      /**
       * Total count of items
       */
      rowCount:{
        type:Number
      }
    };
  }

  static get observers() {
    return ['_computeRowIndex(currentPage,pageSize,itemsLength,rowCount)'];
  }

  /**
   * Computes the value for '_startRow' and '_endRow'
   * @param {number} currentPage current page number
   * @param {number} pageSize total page size
   * @param {number} itemsLength length of items displayed
   * @param {number} rowCount total number of rows in data.
   */
  _computeRowIndex(currentPage,pageSize,itemsLength,rowCount) {
        var startIndex = (currentPage - 1) * pageSize;
        this.set('_startRow',startIndex+1);
        this.set('_endRow', startIndex + itemsLength);
        this.set('_isLastPage',this._endRow == rowCount);
  }

  /**
   * Computes total row count display
   * @param {number} itemsLength length of items displayed
   * @return {string|number} total rows
   */
  _totalRowsCount(itemsLength){
    return itemsLength == Infinity ? 'More' : itemsLength;
  }

  /**
   * Checks if the previous button should be disabled
   * @param {number} currentPage current page index
   * @return {boolean} flag to disable the previous page button
   */
  _disablePrevious(currentPage){
    return currentPage && currentPage == 1;
  }
 
  /**
   * Navigates to previous page
   * @param {Event} event HTML click event
   */
  _previousPage(event) { // eslint-disable-line no-unused-vars
    this.async(function () {
      this.set('currentPage', this.currentPage - 1);
    });
  }

  /**
   * Navigates to next page
   * @param {Event} event  HTML click event
   */
  _nextPage(event) { // eslint-disable-line no-unused-vars
    this.async(function () {
      this.set('currentPage', this.currentPage + 1);
    });
  }

}

window.customElements.define(OeDataTablePaginationPanel.is, OeDataTablePaginationPanel);