/**
 * @license
 * ©2018-2019 EdgeVerve Systems Limited (a fully owned Infosys subsidiary),
 * Bangalore, India. All Rights Reserved.
 */

import { html, PolymerElement } from "@polymer/polymer/polymer-element.js";
import { OECommonMixin } from "oe-mixins/oe-common-mixin.js";
import "@polymer/iron-flex-layout/iron-flex-layout-classes.js";
import "@polymer/paper-icon-button/paper-icon-button.js";
import "@polymer/paper-checkbox/paper-checkbox.js";
import "@polymer/paper-button/paper-button.js";
import "@polymer/iron-icon/iron-icon.js";

import "oe-combo/oe-combo.js";
import "oe-input/oe-input.js";
import "oe-input/oe-decimal.js";
import "sortablejs/Sortable.js";

/**
 * `oe-data-table-column-customizer`
 * is used in `oe-data-table` component for displayig a column data.
 * 
 * 
 * @customElement
 * @polymer
 * @appliesMixin OECommonMixin
 */
class OeDataTableColumnCustomizer extends OECommonMixin(PolymerElement) {

  static get is() { return 'oe-data-table-column-customizer'; }

  static get template() {
    return html`
    <style include="iron-flex iron-flex-alignment">
      .header {
        height: 64px;
        padding: 0 24px;

        @apply --layout-flex;
        @apply --layout-horizontal;
        @apply --layout-justified;
        @apply --layout-center;
      }

      .sub-header {
        padding: 8px 0;

        @apply --layout-flex;
        @apply --layout-horizontal;
        @apply --layout-justified;
        @apply --layout-center;
      }

      .title {
        font-size: 20px;
        font-weight: 400;
        font-style: normal;
        color: var(--primary-text-color, rgba(0, 0, 0, 0.87));
      }

      .column-chooser {
        background: #f5f5f5;
        padding: 0 24px;
      }

      .main-label {
        font-weight: 500;
        font-size: 16px;
      }

      .sub-label {
        font-size: 12px;
        margin: 6px 0;
      }

      .reset-btn {
        color: var(--primary-color);
      }

      .apply-btn {
        color: #fff;
        background: var(--primary-color);
      }

      .column-list {
        overflow-y: hidden;
        overflow-x: auto;

        @apply --layout-flex;
        @apply --layout-horizontal;
      }

      .column-item {
        padding: 24px 16px;
        background-color: #fff;
        cursor: move;

        @apply --layout-vertical;
        @apply --layout-center;
      }

      .column-item > oe-input,
      .column-item > oe-decimal{
        width:100%;
      }

      .column-item + .column-item {
        margin-left: 1px;
      }

      .column-label {
        font-size: 14px;
        padding: 12px 0;
        box-sizing: border-box;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        max-width: 200px;
      }

      .column-item.hide-column-item {
        color: var(--disabled-text-color);
      }

      .column-item.hide-column-item paper-checkbox {
        --paper-checkbox-label-color: var(--disabled-text-color);
      }

    </style>
    <div class="header"><span class="title">{{title}}</span>
      <paper-icon-button icon="close" class="close-icon" on-tap="closeColumnCustomizer"></paper-icon-button>
    </div>
    <div class="column-chooser">
      <div class="sub-header">
        <div>
          <div class="main-label">Customize View</div>
          <div class="sub-label">Customize to hide/unhide, rearrange columns for ease of comparing stuff</div>
        </div>
        <div>
          <paper-button class="reset-btn" on-tap="columnsChanged">RESET</paper-button>
          <paper-button class="apply-btn" on-tap="customizeView">APPLY</paper-button>
        </div>
      </div>
      <div class="column-list" draggable=".column-item">
        <template is="dom-repeat" items={{customColumns}}>
          <div class$="column-item {{computeClass(item.hidden)}}">
            <paper-checkbox checked="{{!item.hidden}}">Show</paper-checkbox>
            <div class="column-label">{{item.label}}<paper-tooltip>[[item.label]]</paper-tooltip> </div>
            <oe-combo label="Type" value={{item.type}} listdata={{dataTypes}}></oe-combo>
            <oe-combo label="Aggregator" value={{item.aggregator}} displayproperty="key" valueproperty="value" listdata={{aggregators}}></oe-combo>
            <oe-input label="Label" value={{item.label}}></oe-input>
            <oe-decimal label="Width (in px)" value={{item.width}}></oe-decimal>
            <oe-decimal label="Min Width (in px)" value={{item.minWidth}}></oe-decimal>
          </div>
        </template>
      </div>
    </div>
    `;
  }

  static get properties() {
    return {
      /**
       * Columns array to be configured
       */
      columns: {
        type: Array,
        notify: true,
        observer: 'columnsChanged'
      },
      /**
       * Default data types
       */
      dataTypes: {
        type: Array,
        value: function () {
          return ['number', 'string', 'date', 'timestamp', 'combo', 'typeahead','object'];
        }
      },
      /**
       * Aggregators list
       */
      aggregators: {
        type: Array,
        value: function () {
          return [{
              key: 'None',
              value: undefined
            },
            {
              key: 'Sum',
              value: 'sum'
            },
            {
              key: 'Average',
              value: 'average'
            },
            {
              key: 'Count',
              value: 'count'
            }
          ];
        }
      }
    };
    /**
     * Fired to ignore the customization changes.
     * 
     * @event close-column-customizer
     */
    /**
     * Fired to apply the customization.
     * 
     * @event customize-view
     * @param the customized columns array
     */
  }

  /**
   * Observer on columns
   */
  columnsChanged() {
    var customColumns = this.columns.map(function (obj) {
      if (!obj.hidden) obj.hidden = false;
      return Object.assign({}, obj);
    });
    this.set('customColumns', customColumns);
  }

  /**
   * Computes a class based on flag
   * @param {boolean} hidden flag to denote column is hidden
   * @return {string} class name based on the hidden flag
   */
  computeClass(hidden) {
    if (hidden) {
      return 'hide-column-item';
    } else {
      return '';
    }
  }

  /**
   * Closes the customizer
   */
  closeColumnCustomizer() {
    this.fire('close-column-customizer');
  }

  /**
   * Applies the customization
   */
  customizeView() {
    this.fire('customize-view', this.customColumns);
  }

}

window.customElements.define(OeDataTableColumnCustomizer.is, OeDataTableColumnCustomizer);