/**
 * @license
 * ©2018-2019 EdgeVerve Systems Limited (a fully owned Infosys subsidiary),
 * Bangalore, India. All Rights Reserved.
 */
import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-bind';
import '@polymer/iron-demo-helpers/demo-pages-shared-styles';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/paper-toast/paper-toast.js';
import '@polymer/gold-phone-input/gold-phone-input.js';
import 'oe-app-route/oe-app-route.js';
import './custom-demo-snippet';
import '../oe-data-table';
import './templates/demo-accordian.js';
var OEUtils = window.OEUtils || {};

var DemoMixin = function (base) {
  return class extends base {
    constructor() {
      super();
      this.addEventListener('oe-route-change', this._onPageVisible.bind(this));
    }

    fire(type, detail, options) {
      options = options || {};
      detail = (detail === null || detail === undefined) ? {} : detail;
      let event = new Event(type, {
        bubbles: options.bubbles === undefined ? true : options.bubbles,
        cancelable: Boolean(options.cancelable),
        composed: options.composed === undefined ? true : options.composed
      });
      event.detail = detail;
      let node = options.node || this;
      node.dispatchEvent(event);
      return event;
    }
  }
}


window.customElements.define("overview-detail", class extends DemoMixin(PolymerElement) {
  static get template() {
    return html`
        <style include="demo-pages-shared-styles">
        
        </style>
        <div>
        <h1> Overview </h1>
        <p> The oe-data-table is a tabular component written in Polymer with the Material Design data table standards.
        </p>
        <p> The items property specifies an array of list item data and the columns property specifies an array of column
          definitions to show. </p>
        <custom-demo-snippet>
					<div>
              <oe-data-table id="simple-table" label="Simple Table"></oe-data-table>
              <script>
              var dataTable = this.shadowRoot.querySelector('#simple-table');
              dataTable.set('columns', [{
                key: 'id',
                label: 'Id',
                type: 'number',
                readOnly: true,
                tooltip:"Id"
              }, {
                key: 'name',
                label: 'Name',
                type: 'string',
                alignment:'center'
              }, {
                key: 'details.location',
                label: 'Location',
                type: 'string'
              }, {
                key: 'details',
                label: 'Details',
                type: 'object',
                tooltip:"Details of the user",
                valueAsTooltip:true
              }]);

              dataTable.set('items', [{
                id: 1,
                name: 'Admin',
                details: {
                  gender: 'male',
                  location: 'Bangalore',
                  country: 'India'
                }
              }, {
                id: 2,
                name: 'Developer',
                details: {
                  gender: 'female',
                  location: 'Bangalore',
                  country: 'India'
                }
              }, {
                id: 3,
                name: 'Designer',
                details: {
                  gender: 'male',
                  location: 'Chennai',
                  country: 'India'
                }
              }, {
                id: 4,
                name: 'Tester',
                details: {
                  gender: 'male',
                  location: 'Chennai',
                  country: 'India'
                }
              }]);

            </script>
            </div>
        </custom-demo-snippet>
      </div>      
        `;
  }

  _onPageVisible() {
    var dataTable = this.shadowRoot.querySelector('#simple-table');

    dataTable.set('columns', [{
      key: 'id',
      label: 'Id',
      type: 'number',
      readOnly: true,
      tooltip: "Id"
    }, {
      key: 'name',
      label: 'Name',
      type: 'string',
      alignment: 'center'
    }, {
      key: 'details.location',
      label: 'Location',
      type: 'string'
    }, {
      key: 'details',
      label: 'Details',
      type: 'object',
      tooltip: "Details of the user",
      valueAsTooltip: true
    }]);

    dataTable.set('items', [{
      id: 1,
      name: 'Admin',
      details: {
        gender: 'male',
        location: 'Bangalore',
        country: 'India'
      }
    }, {
      id: 2,
      name: 'Developer',
      details: {
        gender: 'female',
        location: 'Bangalore',
        country: 'India'
      }
    }, {
      id: 3,
      name: 'Designer',
      details: {
        gender: 'male',
        location: 'Chennai',
        country: 'India'
      }
    }, {
      id: 4,
      name: 'Tester',
      details: {
        gender: 'male',
        location: 'Chennai',
        country: 'India'
      }
    }]);
  }

});

window.customElements.define("declaring-column", class extends DemoMixin(PolymerElement) {
  static get template() {
    return html`
        <style include="demo-pages-shared-styles">
        
        </style>
        <div>
        <h1> Declaring Columns </h1>
        <p> The columns to show in the grid are specified in the columns property. The list of properties that a column object
          can take is avalilable in the component page </p>
        <p> The columns can also be specified in declarative way. Check the below example. </p>
        <custom-demo-snippet>
					<div>
            <oe-data-table id="columns-table" label="Columns Table">
              <oe-data-table-column key='id' read-only label='Id' type='number'></oe-data-table-column>
              <oe-data-table-column key='name' label='Name' type='string'></oe-data-table-column>
            </oe-data-table>
            <script>
              var columnsTable = this.shadowRoot.querySelector('#columns-table');

              columnsTable.set('items', [{
                id: 1,
                name: 'Admin'
              }, {
                id: 2,
                name: 'Developer'
              }, {
                id: 3,
                name: 'Designer'
              }, {
                id: 4,
                name: 'Tester'
              }]);

            </script>
          </div>
				</custom-demo-snippet>
      </div>      
        `;
  }

  _onPageVisible() {
    var columnsTable = this.shadowRoot.querySelector('#columns-table');

    columnsTable.set('items', [{
      id: 1,
      name: 'Admin'
    }, {
      id: 2,
      name: 'Developer'
    }, {
      id: 3,
      name: 'Designer'
    }, {
      id: 4,
      name: 'Tester'
    }]);

  }

});

window.customElements.define("column-resize", class extends DemoMixin(PolymerElement) {
  static get template() {
    return html`
        <style include="demo-pages-shared-styles">
        
        </style>
        <div>
        <h1> Column Sizing and resizing </h1>
        <p>
          The oe-data-table component supports specifying width and minimum width for the columns to accomodate. In column object,
          the width and minimum width of the column can be specified in the width and minWidth property respectively.
        </p>
        <p>
          The columns can be resized by dragging the top right portion of the column. The column cannot be resized below the specified
          minWidth of the column or the minColumnWidth of the oe-data-table. Resizing columns is enabled by deafult.
        </p>
        <custom-demo-snippet>
					<div>
            <oe-data-table id="sizing-table" label="Columns Table"> </oe-data-table>
            <script>
              var sortFilterTable = this.shadowRoot.querySelector('#sizing-table');

              sortFilterTable.set('columns', [{
                key: 'id',
                label: 'Id',
                type: 'number',
                width: 100
              }, {
                key: 'name',
                label: 'Name',
                type: 'string',
                minWidth: 200,
                sort: 'desc'
              }]);

              sortFilterTable.set('items', [{
                id: 1,
                name: 'Admin'
              }, {
                id: 2,
                name: 'Developer'
              }, {
                id: 3,
                name: 'Designer'
              }, {
                id: 4,
                name: 'Tester'
              }]);

            </script>
          </div>
				</custom-demo-snippet>

      </div>      
        `;
  }

  _onPageVisible() {
    var sortFilterTable = this.shadowRoot.querySelector('#sizing-table');

    sortFilterTable.set('columns', [{
      key: 'id',
      label: 'Id',
      type: 'number',
      width: 100
    }, {
      key: 'name',
      label: 'Name',
      type: 'string',
      minWidth: 200,
      sort: 'desc'
    }]);

    sortFilterTable.set('items', [{
      id: 1,
      name: 'Admin'
    }, {
      id: 2,
      name: 'Developer'
    }, {
      id: 3,
      name: 'Designer'
    }, {
      id: 4,
      name: 'Tester'
    }]);

  }

});

window.customElements.define("sorting-filtering", class extends DemoMixin(PolymerElement) {
  static get template() {
    return html`
        <style include="demo-pages-shared-styles">
        
        </style>
        <div>
        <h1> Sorting and Filtering </h1>
        <p>
          The oe-data-table component supports sorting and filtering of data that is displayed in it. Sorting and filtering will be
          applied to the items passed to the component
        </p>
        <h3> Sorting </h3>
        <p>
          The data in a column can be sorted by clicking on the column header. An icon will appear to indicate that the column is sorted.
          Also the oe-data-table can be configured to show the data sorted based on specific columns. In order make oe-data-table
          to sort data by a column, set sort property to that column object asc or desc.
        </p>
        <p>
          Note : Sort option can be applied to multiple columns, but the order of sort depends upon the order of the column.
        </p>
        <h3> Filtering </h3>
        <p>
          The data in a column can be filtered from the filter menu. The filter menu can be opened by clicking on filter icon present
          in the column header. Select the items from filter menu and click apply to filter the rows in oe-data-table
          with the selected entries.
        </p>
        <p>
          Check the below example for exploring sort and filter features.
        </p>
        <custom-demo-snippet>
					<div>
            <oe-data-table id="sort-filter-table" label="Columns Table"> </oe-data-table>
            <script>
              var sortFilterTable = this.shadowRoot.querySelector('#sort-filter-table'); // eslint-disable-line no-redeclare

              sortFilterTable.set('columns', [{
                key: 'id',
                label: 'Id',
                type: 'number'
              }, {
                key: 'name',
                label: 'Name',
                type: 'string'
              }]);

              sortFilterTable.set('items', [{
                id: 1,
                name: 'Admin'
              }, {
                id: 2,
                name: 'Developer'
              }, {
                id: 3,
                name: 'Designer'
              }, {
                id: 4,
                name: 'Tester'
              }]);

            </script>
          </div>
				</custom-demo-snippet>

      </div>      
        `;
  }

  _onPageVisible() {
    var sortFilterTable = this.shadowRoot.querySelector('#sort-filter-table'); // eslint-disable-line no-redeclare

    sortFilterTable.set('columns', [{
      key: 'id',
      label: 'Id',
      type: 'number'
    }, {
      key: 'name',
      label: 'Name',
      type: 'string'
    }]);

    sortFilterTable.set('items', [{
      id: 1,
      name: 'Admin'
    }, {
      id: 2,
      name: 'Developer'
    }, {
      id: 3,
      name: 'Designer'
    }, {
      id: 4,
      name: 'Tester'
    }]);

  }

});

window.customElements.define("row-selection", class extends DemoMixin(PolymerElement) {
  static get template() {
    return html`
        <style include="demo-pages-shared-styles">
        
        </style>
        <div>
        <h1> Row selection </h1>
        <p>
          The oe-data-table component enables the user to select the list of items shown in it. A row can be selected / deselected
          by clicking checkbox in each row. The selected list of array items is available in the selectedItems property.
        </p>
        <h3> Multiple selection </h3>
        <p> Setting multiSelection property of oe-data-table to true, enables selection of multiple items. By default only
          one row can be selected at once. </p>
        <p>
          The columns can be resized by dragging the top right portion of the column. The column cannot be resized below the specified
          minWidth of the column or the minColumnWidth of the oe-data-table. Resizing columns is enabled by deafult.
        </p>
        <h3> Disable selection </h3>
        <p>
          By default selection is enabled in oe-data-table. The selection can be disabled by setting disableSelection property to true.
        </p>
        <p> Check out the below examples for single selection, multiple selection and disabling selection </p>
        <custom-demo-snippet>
          <div>
            <dom-bind  id="selection-table">
              <template>
                <h3> Single Selection - [[selectedItems1.length]] item(s) selected </h3>
                <oe-data-table label="Single Selection" columns=[[columns]] items=[[items]] selected-items={{selectedItems1}}> </oe-data-table>
                <h3> Multi Selection - [[selectedItems2.length]] item(s) selected </h3>
                <oe-data-table label="Multi Selection" multi-selection columns=[[columns]] items=[[items]] selected-items={{selectedItems2}}>
                </oe-data-table>
                <h3> Disabled Selection </h3>
                <oe-data-table label="Disabled Selection" disable-selection columns=[[columns]] items=[[items]]> </oe-data-table>
              </template>
            </dom-bind>
            <script>
              var selectionTable = this.shadowRoot.querySelector('#selection-table');

              selectionTable.set('columns', [{
                key: 'id',
                label: 'Id',
                type: 'number',
                width: 100
              }, {
                key: 'name',
                label: 'Name',
                type: 'string',
                minWidth: 200
              }]);
              selectionTable.set('items', [{
                id: 1,
                name: 'Admin'
              }, {
                id: 2,
                name: 'Developer'
              }, {
                id: 3,
                name: 'Designer'
              }, {
                id: 4,
                name: 'Tester'
              }]);

            </script>
          </div>
				</custom-demo-snippet>

      </div>      
        `;
  }

  _onPageVisible() {
    var selectionTable = this.shadowRoot.querySelector('#selection-table');

    selectionTable.set('columns', [{
      key: 'id',
      label: 'Id',
      type: 'number',
      width: 100
    }, {
      key: 'name',
      label: 'Name',
      type: 'string',
      minWidth: 200
    }]);
    selectionTable.set('items', [{
      id: 1,
      name: 'Admin'
    }, {
      id: 2,
      name: 'Developer'
    }, {
      id: 3,
      name: 'Designer'
    }, {
      id: 4,
      name: 'Tester'
    }]);

  }

});

window.customElements.define("value-formatting", class extends DemoMixin(PolymerElement) {
  static get template() {
    return html`
        <style include="demo-pages-shared-styles">
        
        </style>
        <div>
        <h1> Value formatting </h1>
        <p>
          The value displayed in each cell can be modified using column formatters. A column formatter can be set by assigining a function
          to the formatter property of the column. The value returned by the column formatter will be displayed in the
          cell.
        </p>
        <p>
          Note that, the formatter wouldn't affect the actual value, and the value returned by the formatter is used only for display
          purpose. The formatter function will have two parameters in the following order
        </p>
        <ul>
          <li> <b>  value </b> - The actual value of the cell </li>
          <li> <b>  options </b> - Object contains various info about the cell like column object </li>
        </ul>
        <p>
          The below example shows the list of credit cards / debit cards of a user, where the card information is masked.
        </p>
        <custom-demo-snippet>
					<div>
            <oe-data-table id="formatter-table" label="Saved Cards"></oe-data-table>
            <script>
              var formatterTable = this.shadowRoot.querySelector('#formatter-table');

              var cardNumberFormatter = function (value, options) { // eslint-disable-line no-unused-vars
                return value.replace(/[\d]+-/g, function (match) { // eslint-disable-line no-unused-vars
                  return 'XXXX-';
                });
              };

              formatterTable.set('columns', [{
                key: 'cardType',
                label: 'Card Type',
                type: 'string',
                formatter: function (value, options) { // eslint-disable-line no-unused-vars
                  return value + ' card'
                }
              }, {
                key: 'cardNumber',
                label: 'Card Number',
                type: 'string',
                formatter: cardNumberFormatter
              }]);

              formatterTable.set('items', [{
                cardType: 'credit',
                cardNumber: '1234-5678-9012-3456'
              }, {
                cardType: 'debit',
                cardNumber: '9012-3456-7890-1234'
              }]);

            </script>
          </div>
				</custom-demo-snippet>

      </div>      
        `;
  }

  _onPageVisible() {
    var formatterTable = this.shadowRoot.querySelector('#formatter-table');

    var cardNumberFormatter = function (value, options) { // eslint-disable-line no-unused-vars
      return value.replace(/[\d]+-/g, function (match) { // eslint-disable-line no-unused-vars
        return 'XXXX-';
      });
    };

    formatterTable.set('columns', [{
      key: 'cardType',
      label: 'Card Type',
      type: 'string',
      formatter: function (value, options) { // eslint-disable-line no-unused-vars
        return value + ' card';
      }
    }, {
      key: 'cardNumber',
      label: 'Card Number',
      type: 'string',
      formatter: cardNumberFormatter
    }]);

    formatterTable.set('items', [{
      cardType: 'credit',
      cardNumber: '1234-5678-9012-3456'
    }, {
      cardType: 'debit',
      cardNumber: '9012-3456-7890-1234'
    }]);

  }

});

window.customElements.define("row-editing", class extends DemoMixin(PolymerElement) {
  static get template() {
    return html`
        <style include="demo-pages-shared-styles">
        
        </style>
        <div>
        <h1> Row Editing </h1>
        <p>
          One can edit the whole row of the grid by giving "editor-form-url" property pointing to the url of the ui-component. On clicking
          the "+" icon on top , or the "edit" icon after selecting a row, one can see the ui-component displayed with
          the selection.
        </p>
        <p>
          When editing the row, it is important to have the correct "record-handling" attribute.
        </p>
        <p>When using datatable to have list of models that are saved directly to backend, this record-handling needs to
          be set to "remote", this is the default value.</p>
        <p>When using datatable to have list of "embedded relation models" (which has to be saved along with main model)
          this record-handling needs to be set to "local".</p>
        <p>When using datatable to have list of "hasMany relation models" (which has to be saved along with main model)
          this record-handling needs to be set to "localex".</p>
        <custom-demo-snippet>
					<div>
            <oe-data-table id="rowedit" label="Simple Table" record-handling="local" editor-form-url="../oe-data-table/demo/templates/literal-default.js"></oe-data-table>
            <script>
              var rowedit = this.shadowRoot.querySelector('#rowedit');

              rowedit.set('columns', [{
                key: 'key',
                label: 'Key',
                type: 'string'
              }, {
                key: 'value',
                label: 'Value',
                type: 'string'
              }]);

              rowedit.set('editorFormUrl',OEUtils.getUrl('../template'))

              rowedit.set('items', [{
                key: 'ADM',
                value: 'Admin'
              }, {
                key: 'DEV',
                value: 'Developer'
              }, {
                key: 'DES',
                value: 'Designer'
              }, {
                key: 'TES',
                value: 'Tester'
              }]);

            </script>
          </div>
				</custom-demo-snippet>

      </div>      
        `;
  }

  _onPageVisible() {
    var rowedit = this.shadowRoot.querySelector('#rowedit');

    rowedit.set('columns', [{
      key: 'key',
      label: 'Key',
      type: 'string'
    }, {
      key: 'value',
      label: 'Value',
      type: 'string'
    }]);

    rowedit.set('items', [{
      key: 'ADM',
      value: 'Admin'
    }, {
      key: 'DEV',
      value: 'Developer'
    }, {
      key: 'DES',
      value: 'Designer'
    }, {
      key: 'TES',
      value: 'Tester'
    }]);

  }

});

window.customElements.define("cell-rendering", class extends DemoMixin(PolymerElement) {
  static get template() {
    return html`
        <style include="demo-pages-shared-styles">
        
        </style>
        <div>
        <h1> Cell Rendering </h1>
        <p>
          The oe-data-table supports rendering of custiom elements in a cell. A custom element can be rendered by setting a fuction
          to renderer property of the column, which returns the element / DOM string to show in that cell. 
        </p>
        <p>
          The renderer can be also be a string that specifies the DOM string to be placed or a function name. In case the renderer is a function name , 
          The actual function should be present in the Global path "window.OEUtils.renderFunctions". The function will be called with current column and row value.
        </p>
        <p>
          The renderer function can return a polymer styled template string for displaying data in the cell. The data of the current
          row can be accessed using the <b> row </b> object in the template string. A computed function
          for showing data can be defined inside the renderer function and it is attached to this._customElement.
        </p>
        <p>
          Note that the renderer function will be called only once. The data change in the generated element has to be done using polymer
          data binding.
        </p>
        <p>
          Also oe-data-table supports adding a circular overlay on top of selection column. This can be enabled by specifying an object
          to 'selectionCellContent' property. The overlay will be hidden when that cell is hovered. This object can have
          the following properties.
        </p>
        <ul>
          <li> 'content' - The property of the row object whose first character that has to be displayed </li>
          <li> 'image' The property of the row object which contains the URL of the image to be displayed </li>
        </ul>
        <p>
          The object can be provided with either 'content' or 'image'. If both the properties are provided, image will take precedence
          if image URL exists.
        </p>
        <p>
          Checkout the below example for defining the renderer with a computed function in it.
        </p>
        <custom-demo-snippet>
          <div>
            <dom-bind id="flags-table">
              <template>
                <h3> Table with custom cell renderer </h3>
                <oe-data-table columns=[[currencyColumns]] items=[[items]] label="Country"></oe-data-table>
                <h3> Table with selection cell content </h3>
                <oe-data-table columns=[[columns]] selection-cell-content=[[selectionCellContent]] items=[[items]] label="Country"></oe-data-table>
              </template>
            </dom-bind>
            <script>
              var flagsTable = this.shadowRoot.querySelector('#flags-table');
              window.OEUtils = window.OEUtils || {}
              window.OEUtils.renderFunctions = window.OEUtils.renderFunctions || {}


              var flagRenderer = function (column, row) { // eslint-disable-line no-unused-vars
                var elementToReturn =
                  '<div class="flex layout horizontal center">  <img style="height:30px;width:40px;" src="https://cdn.rawgit.com/hjnilsson/country-flags/5f6e1339/svg/[[countryCodeToLowerCase(row.code)]].svg" /> &nbsp; &nbsp; &nbsp; <span> [[row.name]] </span> </div>';

                this._customElement.countryCodeToLowerCase = function (code) {
                  return code ? code.toLowerCase() : null;
                };

                return elementToReturn;

              }

              window.OEUtils.renderFunctions['flagFn'] = flagRenderer;

              var amountRenderer = function (column, row) { // eslint-disable-line no-unused-vars
                var elementToReturn =
                  '<div class="flex layout horizontal center"> <img height="16" width="16" src="https://rawgit.com/changecoin/currency-font/master/svg/200/[[currencyCodeToLowerCase(row.currency)]].svg" /> &nbsp; <oe-info class="amount-info" precision=[[row.precision]] type="decimal" value=[[row.amount]]></oe-info></div>';

                this._customElement.currencyCodeToLowerCase = function (code) {
                  return code ? code.toLowerCase() : null;
                };

                return elementToReturn;
              }

              flagsTable.set('currencyColumns', [{
                key: 'code',
                label: 'Country',
                type: 'string',
                renderer: 'flagFn'
              }, {
                key: 'amount',
                label: 'Amount',
                type: 'decimal',
                renderer: amountRenderer,
                width: 100
              }, {
                key: 'capital',
                label: 'Capital',
                type: 'string'
              }]);

              flagsTable.set('items', [{
                code: 'IN',
                name: 'India',
                currency: 'INR',
                amount: 1960,
                precision: 2,
                capital: 'New Delhi',
                flag: 'https://cdn.rawgit.com/hjnilsson/country-flags/5f6e1339/svg/in.svg'
              }, {
                code: 'US',
                name: 'United States Of America',
                currency: 'USD',
                amount: 1555.34,
                precision: 2,
                capital: 'Washington DC'
              }, {
                code: 'GB',
                name: 'United Kingdom',
                currency: 'GBP',
                amount: 1360,
                precision: 2,
                capital: 'London'
              }, {
                code: 'JP',
                name: 'Japan',
                currency: 'JPY',
                amount: 2360.23,
                precision: 0,
                capital: 'Tokyo'
              }]);

              flagsTable.set('columns', [{
                key: 'code',
                label: 'Country',
                type: 'string'
              }, {
                key: 'capital',
                label: 'Capital',
                type: 'string'
              }]);

              flagsTable.set('selectionCellContent', {
                content: 'name',
                image: 'flag'
              });

            </script>
          </div>
				</custom-demo-snippet>
        <p>
          In addition to providing the cell rendering as a function or a string , the cell template for a particular column can be provided in 
          the light dom of the oe-data-table.
          The template should contain a <strong>column-key</strong> attribute to specify the column for which the template should be used.
          The following properties will be avialable inside the template.
          <ul>
            <li>'row' - The current row data in the list</li>
            <li>'column' - The column value provided for this column key</li>
          </ul>
        </p>
        <p>
          The above example with render function can also be achieved via the light dom as shown below.
        </p>
        <custom-demo-snippet>
          <div>
            <dom-bind id="flags-table2">
              <template>
                <h3> Table with light DOM column templates</h3>
                <oe-data-table columns=[[currencyColumns]] items=[[items]] label="Country">
                  <template column-key="amount" preserve-content>
                    <div class="flex layout horizontal center">
                      <img height="16" width="16" src="https://rawgit.com/changecoin/currency-font/master/svg/200/[[_toLowerCase(row.currency)]].svg" />&nbsp;
                      <oe-info class="amount-info" precision=[[row.precision]] type="decimal" value=[[row.amount]]></oe-info>
                    </div>
                  </template>
                  <template column-key="code" preserve-content>
                      <div class="flex layout horizontal center">  
                        <img style="height:30px;width:40px;" src="https://cdn.rawgit.com/hjnilsson/country-flags/5f6e1339/svg/[[_toLowerCase(row.code)]].svg" /> &nbsp; &nbsp; &nbsp;
                        <span>[[row.name]]</span> 
                      </div>
                  </template>
                </oe-data-table>
              </template>
            </dom-bind>
            <script>
              var flagsTable2 = this.shadowRoot.querySelector('#flags-table2');
              flagsTable2.set('currencyColumns', [{
                key: 'code',
                label: 'Country',
                type: 'string'
              }, {
                key: 'amount',
                label: 'Amount',
                type: 'decimal',
                width: 150
              }, {
                key: 'capital',
                label: 'Capital',
                type: 'string'
              }]);

              flagsTable2.set('items',  [{
                code: 'IN',
                name: 'India',
                currency: 'INR',
                amount: 1960,
                precision: 2,
                capital: 'New Delhi',
                flag: 'https://cdn.rawgit.com/hjnilsson/country-flags/5f6e1339/svg/in.svg'
              }, {
                code: 'US',
                name: 'United States Of America',
                currency: 'USD',
                amount: 1555.34,
                precision: 2,
                capital: 'Washington DC'
              }, {
                code: 'GB',
                name: 'United Kingdom',
                currency: 'GBP',
                amount: 1360,
                precision: 2,
                capital: 'London'
              }, {
                code: 'JP',
                name: 'Japan',
                currency: 'JPY',
                amount: 2360.23,
                precision: 0,
                capital: 'Tokyo'
              }]);
            </script>
          </div>
				</custom-demo-snippet>

      </div>      
        `;
  }

  _onPageVisible() {
    var flagsTable = this.shadowRoot.querySelector('#flags-table');
    window.OEUtils = window.OEUtils || {};
    window.OEUtils.renderFunctions = window.OEUtils.renderFunctions || {};


    var flagRenderer = function (column, row) { // eslint-disable-line no-unused-vars
      var elementToReturn =
        '<div class="flex layout horizontal center">  <img style="height:30px;width:40px;" src="https://cdn.rawgit.com/hjnilsson/country-flags/5f6e1339/svg/[[countryCodeToLowerCase(row.code)]].svg" /> &nbsp; &nbsp; &nbsp; <span> [[row.name]] </span> </div>';

      this._customElement.countryCodeToLowerCase = function (code) {
        return code ? code.toLowerCase() : null;
      };

      return elementToReturn;

    };

    window.OEUtils.renderFunctions['flagFn'] = flagRenderer;

    var amountRenderer = function (column, row) { // eslint-disable-line no-unused-vars
      var elementToReturn =
        '<div class="flex layout horizontal center"> <img height="16" width="16" src="https://rawgit.com/changecoin/currency-font/master/svg/200/[[currencyCodeToLowerCase(row.currency)]].svg" /> &nbsp; <oe-info class="amount-info" precision=[[row.precision]] type="decimal" value=[[row.amount]]></oe-info></div>';

      this._customElement.currencyCodeToLowerCase = function (code) {
        return code ? code.toLowerCase() : null;
      };

      return elementToReturn;
    };

    flagsTable.set('currencyColumns', [{
      key: 'code',
      label: 'Country',
      type: 'string',
      renderer: 'flagFn'
    }, {
      key: 'amount',
      label: 'Amount',
      type: 'decimal',
      renderer: amountRenderer,
      width: 100
    }, {
      key: 'capital',
      label: 'Capital',
      type: 'string'
    }]);

    flagsTable.set('items', [{
      code: 'IN',
      name: 'India',
      currency: 'INR',
      amount: 1960,
      precision: 2,
      capital: 'New Delhi',
      flag: 'https://cdn.rawgit.com/hjnilsson/country-flags/5f6e1339/svg/in.svg'
    }, {
      code: 'US',
      name: 'United States Of America',
      currency: 'USD',
      amount: 1555.34,
      precision: 2,
      capital: 'Washington DC'
    }, {
      code: 'GB',
      name: 'United Kingdom',
      currency: 'GBP',
      amount: 1360,
      precision: 2,
      capital: 'London'
    }, {
      code: 'JP',
      name: 'Japan',
      currency: 'JPY',
      amount: 2360.23,
      precision: 0,
      capital: 'Tokyo'
    }]);

    flagsTable.set('columns', [{
      key: 'code',
      label: 'Country',
      type: 'string'
    }, {
      key: 'capital',
      label: 'Capital',
      type: 'string'
    }]);

    flagsTable.set('selectionCellContent', {
      content: 'name',
      image: 'flag'
    });

    var flagsTable2 = this.shadowRoot.querySelector('#flags-table2');
    
    flagsTable2.set('currencyColumns', [{
      key: 'code',
      label: 'Country',
      type: 'string'
    }, {
      key: 'amount',
      label: 'Amount',
      type: 'decimal',
      width: 150
    }, {
      key: 'capital',
      label: 'Capital',
      type: 'string'
    }]);

    flagsTable2.set('items', [{
      code: 'IN',
      name: 'India',
      currency: 'INR',
      amount: 1960,
      precision: 2,
      capital: 'New Delhi',
      flag: 'https://cdn.rawgit.com/hjnilsson/country-flags/5f6e1339/svg/in.svg'
    }, {
      code: 'US',
      name: 'United States Of America',
      currency: 'USD',
      amount: 1555.34,
      precision: 2,
      capital: 'Washington DC'
    }, {
      code: 'GB',
      name: 'United Kingdom',
      currency: 'GBP',
      amount: 1360,
      precision: 2,
      capital: 'London'
    }, {
      code: 'JP',
      name: 'Japan',
      currency: 'JPY',
      amount: 2360.23,
      precision: 0,
      capital: 'Tokyo'
    }]);
  }

  _toLowerCase(str) {
    return str.toLowerCase();
  }
});

window.customElements.define("inline-editing", class extends DemoMixin(PolymerElement) {
  static get template() {
    return html`
        <style include="demo-pages-shared-styles">
        
        </style>
        <div>
        <h1>Inline Editing</h1>
        <p>One can do inline editing by default by clicking on a cell. The element that will be rendered on clicking can
          be changed by giving ui<b>T</b>ype property of the column. Also for columns that should not be editable, readOnly
          property can be set at column level.</p>
        <custom-demo-snippet>
					<div>
            <oe-data-table id="inlineedit" label="Inline Table"></oe-data-table>
            <script>
              var inlineedit = this.shadowRoot.querySelector('#inlineedit');

              inlineedit.set('columns', [{
                key: 'key',
                label: 'Key',
                type: 'string',
                uiType: 'oe-input',
                readOnly: true
              }, {
                key: 'value',
                label: 'Value',
                type: 'string',
                uiType: 'oe-input'
              }]);

              inlineedit.set('items', [{
                key: 'ADM',
                value: 'Admin'
              }, {
                key: 'DEV',
                value: 'Developer'
              }, {
                key: 'DES',
                value: 'Designer'
              }, {
                key: 'TES',
                value: 'Tester'
              }]);

            </script>
          </div>
				</custom-demo-snippet>
        <h2>Inline editing a combo or typeahead control</h2>
        <p>
          If you want to have a column with control type as combo or typeahead then along with uiType in column definition, you need
          to pass editor<b>A</b>ttributes which are required by the combo or typeahead, like listurl or
          listdata for combo. Check the example below -
        </p>
        <strong>Inline editing with oe-combo</strong>
        <custom-demo-snippet>
					<div>
            <oe-data-table label="Inline Edit" id="inlineEditCombo"></oe-data-table>
            <script>
              var dataTable = this.shadowRoot.querySelector('#inlineEditCombo'); // eslint-disable-line no-redeclare
              dataTable.set('columns', [{
                key: 'name',
                label: 'Name',
                uiType: 'oe-input',
                type: 'string'
              }, {
                key: 'rating',
                label: 'Rating',
                uiType: 'oe-combo',
                type: 'combo',
                editorAttributes: {
                  listdata: [1, 2, 3, 4, 5]
                }
              }]);

              dataTable.set('items', [{
                'name': 'John',
                'rating': 3
              }, {
                'name': 'Harry',
                'rating': 4
              }, {
                'name': 'Sieraa',
                'rating': 3
              }, {
                'name': 'Tom',
                'rating': 2
              }])

            </script>
          </div>
				</custom-demo-snippet>
        <strong>Inline editing with oe-typeahead</strong>
        <custom-demo-snippet>
					<div>
            <oe-data-table label="Inline Edit" id="inlineEditTypeahead"></oe-data-table>
            <script>
              var dataTable = this.shadowRoot.querySelector('#inlineEditTypeahead'); // eslint-disable-line no-redeclare
              dataTable.set('columns', [{
                key: 'person',
                label: 'Person',
                type: 'string'
              }, {
                key: 'favMovie',
                label: 'Favourite Movie',
                uiType: 'oe-typeahead',
                type: 'typeahead',
                editorAttributes: {
                  displayproperty: 'value',
                  valueproperty: 'key',
                  searchurl: '/api/Movies?filter[where][value][regexp]=/^SEARCH_STRING/i&filter[limit]=10',
                  dataurl: '/api/Movies/findOne?filter[where][key][regexp]=/^VALUE_STRING/i'
                }
              }]);

              dataTable.set('items', [{
                person: 'Sourav',
                favMovie: 1003
              }, {
                person: 'Harry',
                favMovie: 1004
              }, {
                person: 'Sieraa',
                favMovie: 1005
              }, {
                person: 'Tom',
                favMovie: 1002
              }])

            </script>
          </div>
				</custom-demo-snippet>

      </div>      
        `;
  }

  _onPageVisible() {
    var inlineedit = this.shadowRoot.querySelector('#inlineedit');

    inlineedit.set('columns', [{
      key: 'key',
      label: 'Key',
      type: 'string',
      uiType: 'oe-input',
      readOnly: true
    }, {
      key: 'value',
      label: 'Value',
      type: 'string',
      uiType: 'oe-input'
    }]);

    inlineedit.set('items', [{
      key: 'ADM',
      value: 'Admin'
    }, {
      key: 'DEV',
      value: 'Developer'
    }, {
      key: 'DES',
      value: 'Designer'
    }, {
      key: 'TES',
      value: 'Tester'
    }]);

    var dataTable = this.shadowRoot.querySelector('#inlineEditCombo'); // eslint-disable-line no-redeclare
    dataTable.set('columns', [{
      key: 'name',
      label: 'Name',
      uiType: 'oe-input',
      type: 'string'
    }, {
      key: 'rating',
      label: 'Rating',
      uiType: 'oe-combo',
      type: 'combo',
      editorAttributes: {
        listdata: [1, 2, 3, 4, 5]
      }
    }]);

    dataTable.set('items', [{
      'name': 'John',
      'rating': 3
    }, {
      'name': 'Harry',
      'rating': 4
    }, {
      'name': 'Sieraa',
      'rating': 3
    }, {
      'name': 'Tom',
      'rating': 2
    }]);

    dataTable = this.shadowRoot.querySelector('#inlineEditTypeahead'); // eslint-disable-line no-redeclare
    dataTable.set('columns', [{
      key: 'person',
      label: 'Person',
      type: 'string'
    }, {
      key: 'favMovie',
      label: 'Favourite Movie',
      uiType: 'oe-typeahead',
      type: 'typeahead',
      editorAttributes: {
        displayproperty: 'value',
        valueproperty: 'key',
        searchurl: '/api/Movies?filter[where][value][regexp]=/^SEARCH_STRING/i&filter[limit]=10',
        dataurl: '/api/Movies/findOne?filter[where][key][regexp]=/^VALUE_STRING/i'
      }
    }]);

    dataTable.set('items', [{
      person: 'Sourav',
      favMovie: 1003
    }, {
      person: 'Harry',
      favMovie: 1004
    }, {
      person: 'Sieraa',
      favMovie: 1005
    }, {
      person: 'Tom',
      favMovie: 1002
    }]);

  }

});

window.customElements.define("cell-types", class extends DemoMixin(PolymerElement) {
  static get template() {
    return html`
        <style include="demo-pages-shared-styles">
        
        </style>
        <div>
        <h1> Custom Cell Type </h1>
        <p>
          The UI framework supports defining a custom data type and setting an element for it. The oe-data-table can use that type
          and show that element for editing that cell content.
        </p>
        <p>
          The custom cell type can be defined by setting a the type name as a property in "OEUtils.TypeMappings" and assign a object
          to it and set the element name to the uiType property of that object.
        </p>
        <p>
          Check out the below example where we defined a custom phone number type and using it in the oe-data-table.
        </p>
        <custom-demo-snippet>
					<div>
            <oe-data-table id="phone-table" label="Phone Numebers"></oe-data-table>
            <script>
            var phoneTable = this.shadowRoot.querySelector('#phone-table');

            OEUtils.TypeMappings.phone = {
              uiType: 'gold-phone-input'
            }

            phoneTable.set('columns', [{
              key: 'user',
              label: 'User',
              type: 'string'
            }, {
              key: 'phone',
              label: 'Phone Number',
              type: 'phone'
            }]);

            phoneTable.set('items', [{
              user: 'Mike',
              phone: 1242109098
            }, {
              user: 'John',
              phone: 7812901028
            }, {
              user: 'Stella',
              phone: 1234522221
            }, {
              user: 'Francis',
              phone: 1232323121
            }]);

            </script>
          </div>
				</custom-demo-snippet>

      </div>      
        `;
  }

  _onPageVisible() {
    var phoneTable = this.shadowRoot.querySelector('#phone-table');

    OEUtils.TypeMappings.phone = {
      uiType: 'gold-phone-input'
    };

    phoneTable.set('columns', [{
      key: 'user',
      label: 'User',
      type: 'string'
    }, {
      key: 'phone',
      label: 'Phone Number',
      type: 'phone'
    }]);

    phoneTable.set('items', [{
      user: 'Mike',
      phone: 1242109098
    }, {
      user: 'John',
      phone: 7812901028
    }, {
      user: 'Stella',
      phone: 1234522221
    }, {
      user: 'Francis',
      phone: 1232323121
    }]);
  }

});

window.customElements.define("row-action", class extends DemoMixin(PolymerElement) {
  static get template() {
    return html`
        <style include="demo-pages-shared-styles">
        
        </style>
        <div>
        <h1> Row Action </h1>
        <p>
          The oe-data-table component supports adding icon buttons on each row, which can be used to perform some action actions on
          that row. This can be achieved by setting "rowActions" property with an array of row action objects. A row
          action object contains icon property which is the icon to be displayed and title property which is the name
          of the action.
        </p>
        <p>
          On clicking the row action button, it will fire "oe-data-table-row-action" event contatins that row action object and the
          current row.
        </p>
        <p>
          If the row action object has a formUrl property, that form will be loaded inside the data-table and the current row's data 
          will be set on the form element.The data will be set on 'vm' property or based on the modelAlias property of the Element.The user can then come back to the listing view by clicking the back arrow key above the form or by firing 'show-grid-view' from inside the form element.
        </p>
        <p>
          Check out the below example, where we display the details of an user, on click of the info icon.
        </p>
        <custom-demo-snippet>
          <div>
            <dom-bind id="myapp">
              <template>
                <oe-data-table label="User" disable-selection id="table" items=[[items]] columns=[[columns]] row-actions=[[rowActions]] on-oe-data-table-row-action="handleRowActions">
                </oe-data-table>
                <template is="dom-if" if=[[eventString]]>
                  <h3>Event Data</h3>
                  <pre style="padding:8px;">
                      [[eventString]]
                  </pre>                   
                </template>
              </template>
            </dom-bind>
            <script>
              var myapp = this.shadowRoot.querySelector('#myapp');
              
              myapp.set('columns', [{
                key: 'key',
                label: 'Key',
                type: 'string'
              }, {
                key: 'value',
                label: 'Value',
                type: 'string'
              }]);

              myapp.set('items', [{
                id: 1,
                key: 'Mike',
                value: 'mike@ev.com'
              }, {
                id: 2,
                key: 'John',
                value: 'john@ev.com'
              }, {
                id: 3,
                key: 'Stella',
                value: 'stella@ev.com'
              }, {
                id: 4,
                key: 'Francis',
                value: 'francis@ev.com'
              }]);

              myapp.set('rowActions', [{
                icon: 'info',
                action: 'info',
                title: 'details',
                formUrl:'../oe-data-table/demo/templates/literal-view.js'
              }, {
                icon: 'editor:mode-edit',
                title: 'edit',
                action: 'edit',
                formUrl:'../oe-data-table/demo/templates/literal-default.js'
              },{
                icon: 'star',
                action: 'bookmark',
                title: 'bookmark'
              }]);

              myapp.handleRowActions = function (event) {
                myapp.set('eventString',JSON.stringify(event.detail,null,2));
              }

              myapp.rowUpdated = function (event) {
                event.stopPropagation();
                if (myapp.userEdit) {
                  var index = myapp.items.indexOf(myapp.userEdit);
                  var newRecord = event.detail;
                  (index >= 0) && myapp.splice('items', index, 1, newRecord);
                  myapp.set('userEdit', null);
                }
              }</script>
          </div>
				</custom-demo-snippet>
        <p>
        Check out the below example, where we row-action icon will be displayed based on some condition for each record.
      </p>
      <custom-demo-snippet>
      <div>
          <dom-bind id="myappRowActionCompute">
          <template>
            <oe-data-table label="User" disable-selection id="table" items=[[items]] columns=[[columns]] row-actions=[[rowActions]] on-oe-data-table-row-action="handleRowActions">
            </oe-data-table>
            <template is="dom-if" if=[[eventString]]>
              <h3>Event Data</h3>
              <pre style="padding:8px;">
                  [[eventString]]
              </pre>                   
            </template>
            </template>
          </dom-bind>
          <script>
          var myapp = this.shadowRoot.querySelector('#myappRowActionCompute');
            
            myapp.set('columns', [{
              key: 'key',
              label: 'Key',
              type: 'string'
            }, {
              key: 'value',
              label: 'Value',
              type: 'string'
            }]);

            myapp.set('items', [{
              id: 1,
              key: 'Mike',
              value: 'mike@ev.com',
              isHiddenView: true
            }, {
              id: 2,
              key: 'John',
              value: 'john@ev.com',
              isHiddenEdit: true
            }, {
              id: 3,
              key: 'Stella',
              value: 'stella@ev.com',
              isHiddenBookMark: true,
              isHiddenEdit: true

            }, {
              id: 4,
              key: 'Francis',
              value: 'francis@ev.com',
              isHiddenView: true,
              isHiddenEdit: true
            }]);

            var isHiddenEdit = function (row) {
                return row.isHiddenEdit;
            }

            var isHiddenView = function (row) {
                return row.isHiddenView;
            }

            var isHiddenBookMark = function (row) {
                return row.isHiddenBookMark;
            }

            myapp.set('rowActions', [{
              icon: 'info',
              action: 'info',
              title: 'details',
              formUrl:'templates/literal-view.js',
              isHiddenFunction: isHiddenView
            }, {
              icon: 'editor:mode-edit',
              title: 'edit',
              action: 'edit',
              formUrl:'templates/literal-default.js',
              isHiddenFunction: isHiddenEdit
            },{
              icon: 'star',
              action: 'bookmark',
              title: 'bookmark',
              isHiddenFunction: isHiddenBookMark
            }]);

            myapp.handleRowActions = function (event) {
              myapp.set('eventString',JSON.stringify(event.detail,null,2));
            }

            myapp.rowUpdated = function (event) {
              event.stopPropagation();
              if (myapp.userEdit) {
                var index = myapp.items.indexOf(myapp.userEdit);
                var newRecord = event.detail;
                (index >= 0) && myapp.splice('items', index, 1, newRecord);
                myapp.set('userEdit', null);
              }
            }</script>
        </div>
        </custom-demo-snippet>

      </div>      
        `;
  }

  _onPageVisible() {
    var myapp = this.shadowRoot.querySelector('#myapp');
    myapp.set('columns', [{
      key: 'key',
      label: 'Key',
      type: 'string'
    }, {
      key: 'value',
      label: 'Value',
      type: 'string'
    }]);

    myapp.set('items', [{
      id: 1,
      key: 'Mike',
      value: 'mike@ev.com'
    }, {
      id: 2,
      key: 'John',
      value: 'john@ev.com'
    }, {
      id: 3,
      key: 'Stella',
      value: 'stella@ev.com'
    }, {
      id: 4,
      key: 'Francis',
      value: 'francis@ev.com'
    }]);

    myapp.set('rowActions', [{
      icon: 'info',
      action: 'info',
      title: 'details',
      formUrl: '../oe-data-table/demo/templates/literal-view.js'
    }, {
      icon: 'editor:mode-edit',
      title: 'edit',
      action: 'edit',
      formUrl: '../oe-data-table/demo/templates/literal-default.js'
    }, {
      icon: 'star',
      action: 'bookmark',
      title: 'bookmark'
    }]);

    myapp.handleRowActions = function (event) {
      myapp.set('eventString', JSON.stringify(event.detail, null, 2));
    };

    myapp.rowUpdated = function (event) {
      event.stopPropagation();
      if (myapp.userEdit) {
        var index = myapp.items.indexOf(myapp.userEdit);
        var newRecord = event.detail;
        (index >= 0) && myapp.splice('items', index, 1, newRecord);
        myapp.set('userEdit', null);
      }
    };
    var myapp = this.shadowRoot.querySelector('#myappRowActionCompute');
            
            myapp.set('columns', [{
              key: 'key',
              label: 'Key',
              type: 'string'
            }, {
              key: 'value',
              label: 'Value',
              type: 'string'
            }]);

            myapp.set('items', [{
              id: 1,
              key: 'Mike',
              value: 'mike@ev.com',
              isHiddenView: true
            }, {
              id: 2,
              key: 'John',
              value: 'john@ev.com',
              isHiddenEdit: true
            }, {
              id: 3,
              key: 'Stella',
              value: 'stella@ev.com',
              isHiddenBookMark: true,
              isHiddenEdit: true

            }, {
              id: 4,
              key: 'Francis',
              value: 'francis@ev.com',
              isHiddenView: true,
              isHiddenEdit: true
            }]);

            var isHiddenEdit = function (row) {
                return row.isHiddenEdit;
            }

            var isHiddenView = function (row) {
                return row.isHiddenView;
            }

            var isHiddenBookMark = function (row) {
                return row.isHiddenBookMark;
            }

            myapp.set('rowActions', [{
              icon: 'info',
              action: 'info',
              title: 'details',
              formUrl:'../oe-data-table/demo/templates/literal-view.js',
              isHiddenFunction: isHiddenView
            }, {
              icon: 'editor:mode-edit',
              title: 'edit',
              action: 'edit',
              formUrl:'../oe-data-table/demo/templates/literal-default.js',
              isHiddenFunction: isHiddenEdit
            },{
              icon: 'star',
              action: 'bookmark',
              title: 'bookmark',
              isHiddenFunction: isHiddenBookMark
            }]);

            myapp.handleRowActions = function (event) {
              myapp.set('eventString',JSON.stringify(event.detail,null,2));
            }

            myapp.rowUpdated = function (event) {
              event.stopPropagation();
              if (myapp.userEdit) {
                var index = myapp.items.indexOf(myapp.userEdit);
                var newRecord = event.detail;
                (index >= 0) && myapp.splice('items', index, 1, newRecord);
                myapp.set('userEdit', null);
              }
            }
  }

});

window.customElements.define("pagination-setting", class extends DemoMixin(PolymerElement) {
  static get template() {
    return html`
        <style include="demo-pages-shared-styles">
        
        </style>
        <div>
        <h1> Pagination </h1>
        <p>
          The oe-data-table component supports virtual pagination by default. If the number of "items" is too high, only limited rows
          will be in the DOM and the data will be attached to the DOM dynamically while scrolling. The rows per page
          section can be customized by setting an array of page numbers to "rowsPerPageItems" property.
        </p>
        <p>
          In addition the users can use pagination panel instead of infinite scroll by setting the 'pagination-type="page"' property. This allows the user to 
          see the limited number of items at the current page.The default value of 'pagination-type' is "scroll".
        </p>
        <p>
          The oe-data-table component also supports server side pagination. In order to enable server side pagination, we need to set
          an object to 'dataController' property. The dataController object contains 'restUrl' as a property which is
          used to fetch data from remoteServer while paginating and 'filter' property which takes a Loopback styled filter
          object, passed as filter for the data that is being fetched. A pagination panel is displayed in the bottom
          of the component has options to change page size, goto a desired page.
        </p>
        <p>
          Check the below example for the usage of virtual pagination , client side pagination and server side pagination using the "dataController" property.
        </p>
        <custom-demo-snippet>
          <div>
            <dom-bind id="pagination-table">
              <template>
                <h3> Default Virtual Pagination </h3>
                <oe-data-table id="table" label="Phone" columns=[[columns]] items=[[defaultItems]]></oe-data-table>
                <h3> Client Pagination </h3>
                <oe-data-table id="table" label="Phone Pagination" columns=[[columns]] items=[[defaultItems2]] pagination-type="page"></oe-data-table>
                <h3> Server side pagination </h3>
                <oe-data-table label="Literal" columns=[[literalColumns]] rest-url='/api/Literals'></oe-data-table>
              </template>
            </dom-bind>
            <script>
              var paginationTable = this.shadowRoot.querySelector('#pagination-table');

              var defaultItems = [{
                user: 'Mike',
                phone: 1242109098
              }, {
                user: 'John',
                phone: 7812901028
              }, {
                user: 'Stella',
                phone: 1234522221
              }, {
                user: 'Francis',
                phone: 1232323121
              }, {
                user: 'Kevin',
                phone: 21209921001
              }, {
                user: 'Andrew',
                phone: 12372819212
              }, {
                user: 'Catherine',
                phone: 8762731212
              }, {
                user: 'David',
                phone: 12989978012
              }, {
                user: 'Henry',
                phone: 123412123322
              }, {
                user: 'Ivan',
                phone: 9867823231
              }, {
                user: 'Oliver',
                phone: 8776767666
              },{
                user: 'Bruce',
                phone: 8772367666
              },{
                user: 'Clark',
                phone: 8773467666
              },{
                user: 'Diana',
                phone: 8246767666
              },{
                user: 'Barry',
                phone: 8776767876
              },{
                user: 'Hal',
                phone: 8776760366
              },{
                user: 'Carter',
                phone: 8776517666
              },{
                user: 'Victor',
                phone: 9076767666
              }];

              paginationTable.set('columns', [{
                key: 'user',
                label: 'User',
                type: 'string'
              }, {
                key: 'phone',
                label: 'Phone Number',
                type: 'phone'
              }]);

              paginationTable.set('literalColumns', [{
                key: 'key',
                label: 'Key',
                type: 'string'
              }, {
                key: 'value',
                label: 'Value',
                type: 'string'
              }]);

              paginationTable.set('defaultItems', defaultItems);
              paginationTable.set('defaultItems2', defaultItems.slice());
            </script>
          </div>
				</custom-demo-snippet>
      </div>      
        `;
  }

  _onPageVisible() {
    var paginationTable = this.shadowRoot.querySelector('#pagination-table');

    var defaultItems = [{
      user: 'Mike',
      phone: 1242109098
    }, {
      user: 'John',
      phone: 7812901028
    }, {
      user: 'Stella',
      phone: 1234522221
    }, {
      user: 'Francis',
      phone: 1232323121
    }, {
      user: 'Kevin',
      phone: 21209921001
    }, {
      user: 'Andrew',
      phone: 12372819212
    }, {
      user: 'Catherine',
      phone: 8762731212
    }, {
      user: 'David',
      phone: 12989978012
    }, {
      user: 'Henry',
      phone: 123412123322
    }, {
      user: 'Ivan',
      phone: 9867823231
    }, {
      user: 'Oliver',
      phone: 8776767666
    }, {
      user: 'Bruce',
      phone: 8772367666
    }, {
      user: 'Clark',
      phone: 8773467666
    }, {
      user: 'Diana',
      phone: 8246767666
    }, {
      user: 'Barry',
      phone: 8776767876
    }, {
      user: 'Hal',
      phone: 8776760366
    }, {
      user: 'Carter',
      phone: 8776517666
    }, {
      user: 'Victor',
      phone: 9076767666
    }];

    paginationTable.set('columns', [{
      key: 'user',
      label: 'User',
      type: 'string'
    }, {
      key: 'phone',
      label: 'Phone Number',
      type: 'phone'
    }]);

    paginationTable.set('literalColumns', [{
      key: 'key',
      label: 'Key',
      type: 'string'
    }, {
      key: 'value',
      label: 'Value',
      type: 'string'
    }]);


    paginationTable.set('defaultItems', defaultItems);
    paginationTable.set('defaultItems2', defaultItems.slice());

  }

});

window.customElements.define("cell-styling", class extends DemoMixin(PolymerElement) {
  static get template() {
    return html`
        <style include="demo-pages-shared-styles">
          .align-right {
            text-align: right;
          }
        
          .fail {
            font-weight: bold;
            color: #f44336;
          }
        
          .centum {
            font-weight: bold;
            color: #cddc39;
          }
        
          .total-cell {
            padding-left: 50px;
          }
        </style>
        <div>
        <h1> Cell Styling </h1>
        <p>
          The oe-data-table component supports adding user defined class to the cells of a particular column. The class to be added
          to a oe-data-table cell can be passed to the "cellClass" property of the particular column. Multiple classes
          can be added by setting space seperated class names.
        </p>
        <p>
          Also CSS classes can be addded to the cells based on values present in the cell. This can be achieved by setting the "cellClassRules"
          property of a column with an Object having class name to be applied as key and an expression to evaluate as
          value.
        </p>
        <p>
          Check the below example where we set class to a cell based on some conditions.
        </p>
        <custom-demo-snippet>
					<div>
            <style>
              .align-right {
                text-align: right;
              }

              .fail {
                font-weight: bold;
                color: #f44336;
              }

              .centum {
                font-weight: bold;
                color: #cddc39;
              }

              .total-cell {
                padding-left: 50px;
              }

            </style>

            <oe-data-table id="styling-table" label="Scores" min-col-width=50></oe-data-table>
            <script>
              var stylingTable = this.shadowRoot.querySelector('#styling-table');

              var criteria = {
                'fail': 'value < 40',
                'centum': 'value == 100'
              }

              stylingTable.set('columns', [{
                key: 'id',
                label: 'Id',
                type: 'number',
                cellClass: 'align-right',
                width: 70
              }, {
                key: 'name',
                label: 'Name',
                type: 'string'
              }, {
                key: 'score1',
                label: 'Score 1',
                type: 'number',
                cellClass: 'align-right',
                cellClassRules: criteria,
                width: 100
              }, {
                key: 'score2',
                label: 'Score 2',
                type: 'number',
                cellClass: 'align-right',
                cellClassRules: criteria,
                width: 100
              }, {
                label: 'Total',
                type: 'number',
                cellClass: 'total-cell',
                width: 100,
                renderer: function (column, row) { // eslint-disable-line no-unused-vars
                  this._customElement._computeTotal = function (score1, score2) {
                    return score1 + score2;
                  }
                  return '<span> [[_computeTotal(row.score1,row.score2)]] </span>';
                }
              }]);

              stylingTable.set('items', [{
                id: 1,
                score1: 89,
                score2: 88,
                name: 'John'
              }, {
                id: 2,
                score1: 76,
                score2: 78,
                name: 'Alex'
              }, {
                id: 3,
                score1: 65,
                score2: 39,
                name: 'David'
              }, {
                id: 4,
                score1: 98,
                score2: 100,
                name: 'Bob'
              }]);

            </script>
          </div>
				</custom-demo-snippet>

      </div>      
        `;
  }

  _onPageVisible() {
    var stylingTable = this.shadowRoot.querySelector('#styling-table');

    var criteria = {
      'fail': 'value < 40',
      'centum': 'value == 100'
    };

    stylingTable.set('columns', [{
      key: 'id',
      label: 'Id',
      type: 'number',
      cellClass: 'align-right',
      width: 70
    }, {
      key: 'name',
      label: 'Name',
      type: 'string'
    }, {
      key: 'score1',
      label: 'Score 1',
      type: 'number',
      cellClass: 'align-right',
      cellClassRules: criteria,
      width: 100
    }, {
      key: 'score2',
      label: 'Score 2',
      type: 'number',
      cellClass: 'align-right',
      cellClassRules: criteria,
      width: 100
    }, {
      label: 'Total',
      type: 'number',
      cellClass: 'total-cell',
      width: 100,
      renderer: function (column, row) { // eslint-disable-line no-unused-vars
        this._customElement._computeTotal = function (score1, score2) {
          return score1 + score2;
        };
        return '<span> [[_computeTotal(row.score1,row.score2)]] </span>';
      }
    }]);

    stylingTable.set('items', [{
      id: 1,
      score1: 89,
      score2: 88,
      name: 'John'
    }, {
      id: 2,
      score1: 76,
      score2: 78,
      name: 'Alex'
    }, {
      id: 3,
      score1: 65,
      score2: 39,
      name: 'David'
    }, {
      id: 4,
      score1: 98,
      score2: 100,
      name: 'Bob'
    }]);

  }

});

window.customElements.define("table-action", class extends DemoMixin(PolymerElement) {
  static get template() {
    return html`
        <style include="demo-pages-shared-styles">
        
        </style>
        <div>
        <h1> Table Action </h1>
        <p> It is possible to add custom icons on the top bar which will fire an event when tapped. </p>
        <p> This can be achieved by setting "toolbarActions" property with an array of table action objects. A table action
          object contains icon property which is the icon to be displayed , title property which is used to show tooltip
          and action property which is used to form event name. </p>
        <p> The oe-data-table fire oe-data-table-action-<i>actionName</i>. </p>
        <p><strong>Note : </strong><i>actionName</i> must be provided using "action" property in action object.</p>
        <custom-demo-snippet>
					<div>
            <oe-data-table id="table-action" label="Table action"></oe-data-table>
            <paper-toast id="toast-message"> </paper-toast>
            <script>
              var dataTable = this.shadowRoot.querySelector('#table-action'); // eslint-disable-line no-redeclare

              dataTable.set('columns', [{
                key: 'id',
                label: 'Id',
                type: 'number'
              }, {
                key: 'name',
                label: 'Name',
                type: 'string'
              }]);

              dataTable.set('toolbarActions', [{
                icon: 'icons:archive',
                title: 'Archive Users',
                action: 'archive'
              }, {
                icon: 'icons:alarm',
                title: 'Notify Users',
                action: 'alarm'
              }]);

              dataTable.set('items', [{
                id: 1,
                name: 'Admin'
              }, {
                id: 2,
                name: 'Developer'
              }, {
                id: 3,
                name: 'Designer'
              }, {
                id: 4,
                name: 'Tester'
              }]);
              var toast = this.shadowRoot.querySelector('#toast-message');
              dataTable.addEventListener('oe-data-table-action-archive', function (event) { // eslint-disable-line no-unused-vars
                toast.innerHTML = 'Archive icon pressed';
                toast.show();
              });

              dataTable.addEventListener('oe-data-table-action-alarm', function (event) { // eslint-disable-line no-unused-vars
                toast.innerHTML = 'Alarm icon pressed';
                toast.show();
              });

            </script>
          </div>
				</custom-demo-snippet>
        <h1>Exporting table data using table action icon</h1>
        <p>Using table action icon hook, a functionality for exporting table data can be written. Refer below code to export
          data as a json file.</p>
        <custom-demo-snippet>
					<div>
            <oe-data-table id="table-action-export-json" label="Table action"></oe-data-table>
            <script>
              var dataTable = this.shadowRoot.querySelector('#table-action-export-json'); // eslint-disable-line no-redeclare

              dataTable.set('columns', [{
                key: 'serialNumber',
                label: 'Sr. Number',
                uitype: 'number'
              }, {
                key: 'userType',
                label: 'User Type',
                uitype: 'string'
              }, {
                key: 'userName',
                label: 'User',
                uitype: 'string'
              }]);

              dataTable.set('toolbarActions', [{
                icon: 'icons:file-download',
                title: 'JSON Export',
                action: 'export'
              }]);

              dataTable.set('items', [{
                serialNumber: 1,
                userType: 'Admin',
                userName: 'John'
              }, {
                serialNumber: 2,
                userType: 'Developer',
                userName: 'Matthews'
              }, {
                serialNumber: 3,
                userType: 'Designer',
                userName: 'Sarah'
              }, {
                serialNumber: 4,
                userType: 'Tester',
                userName: 'Tom'
              }]);

              dataTable.addEventListener('oe-data-table-action-export', function (event) {
                var data = event.currentTarget.items;
                data = 'text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data));
                var hyperlink = document.createElement('a');
                hyperlink.href = 'data:' + data;
                hyperlink.download = 'data.json';
                hyperlink.click();
              });

            </script>
          </div>
				</custom-demo-snippet>

      </div>      
        `;
  }

  _onPageVisible() {
    var dataTable = this.shadowRoot.querySelector('#table-action'); // eslint-disable-line no-redeclare

    dataTable.set('columns', [{
      key: 'id',
      label: 'Id',
      type: 'number'
    }, {
      key: 'name',
      label: 'Name',
      type: 'string'
    }]);

    dataTable.set('toolbarActions', [{
      icon: 'icons:archive',
      title: 'Archive Users',
      action: 'archive'
    }, {
      icon: 'icons:alarm',
      title: 'Notify Users',
      action: 'alarm'
    }]);

    dataTable.set('items', [{
      id: 1,
      name: 'Admin'
    }, {
      id: 2,
      name: 'Developer'
    }, {
      id: 3,
      name: 'Designer'
    }, {
      id: 4,
      name: 'Tester'
    }]);

    var toast = this.shadowRoot.querySelector('#toast-message');
    dataTable.addEventListener('oe-data-table-action-archive', function (event) { // eslint-disable-line no-unused-vars
      toast.innerHTML = 'Archive icon pressed';
      toast.show();
    });

    dataTable.addEventListener('oe-data-table-action-alarm', function (event) { // eslint-disable-line no-unused-vars
      toast.innerHTML = 'Alarm icon pressed';
      toast.show();
    });

    dataTable = this.shadowRoot.querySelector('#table-action-export-json'); // eslint-disable-line no-redeclare

    dataTable.set('columns', [{
      key: 'serialNumber',
      label: 'Sr. Number',
      uitype: 'number'
    }, {
      key: 'userType',
      label: 'User Type',
      uitype: 'string'
    }, {
      key: 'userName',
      label: 'User',
      uitype: 'string'
    }]);

    dataTable.set('toolbarActions', [{
      icon: 'icons:file-download',
      title: 'JSON Export',
      action: 'export'
    }]);

    dataTable.set('items', [{
      serialNumber: 1,
      userType: 'Admin',
      userName: 'John'
    }, {
      serialNumber: 2,
      userType: 'Developer',
      userName: 'Matthews'
    }, {
      serialNumber: 3,
      userType: 'Designer',
      userName: 'Sarah'
    }, {
      serialNumber: 4,
      userType: 'Tester',
      userName: 'Tom'
    }]);

    dataTable.addEventListener('oe-data-table-action-export', function (event) {
      var data = event.currentTarget.items;
      data = 'text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data));
      var hyperlink = document.createElement('a');
      hyperlink.href = 'data:' + data;
      hyperlink.download = 'data.json';
      hyperlink.click();
    });

  }

});

window.customElements.define("derived-column", class extends DemoMixin(PolymerElement) {
  static get template() {
    return html`
        <style include="demo-pages-shared-styles">
        
        </style>
        <div>
        <h1> Derived Columns </h1>
        <p> It is possible to create columns which shows a value based on the values of other columns of a particular row.
          The derived column values will reside in client side only. </p>
        <p> Similar to normal columns, the value in derived columns can be sorted and filtered. Values for the derived column
          is provided by valueGetter property. </p>
        <p> The valueGetter can take function with the current row as a arguemnt and returns a value that has to be shown
          in that column or take a expression as string which will be evaluated and set that field. The valueGetter can
          also take a function as a string. </p>
        <p> <strong> Note : </strong> The derived columns won't be available when the object is converted into to String.
        </p>
        <custom-demo-snippet>
					<div>
            <oe-data-table id="derived-table" label="Score Table"></oe-data-table>
            <script>
              var dataTable = this.shadowRoot.querySelector('#derived-table'); // eslint-disable-line no-redeclare

              dataTable.set('columns', [{
                key: 's1',
                label: 'S1',
                type: 'number'
              }, {
                key: 's2',
                label: 'S2',
                type: 'number'
              }, {
                key: 'total',
                label: 'Total',
                type: 'number',
                valueGetter: 'row.s1 + row.s2'
              }, {
                key: 'averageA',
                label: 'Average A',
                type: 'number',
                valueGetter: function (row) {
                  return (row.s1 + row.s2) / 2;
                }
              }, {
                key: 'averageB',
                label: 'average B',
                type: 'number',
                valueGetter: 'function(row){ return Math.floor((row.s1 + row.s2)/2); }'
              }]);

              dataTable.set('items', [{
                s1: 94,
                s2: 75
              }, {
                s1: 88,
                s2: 88
              }, {
                s1: 75,
                s2: 94
              }]);

            </script>
          </div>
				</custom-demo-snippet>
        <custom-demo-snippet>
					<div>
            <oe-data-table id="laptop-table" label="Laptop Prices"></oe-data-table>
            <script>
              var dataTable = this.shadowRoot.querySelector('#laptop-table'); // eslint-disable-line no-redeclare

              dataTable.set('columns', [{
                key: 'name',
                label: 'Name',
                type: 'string'
              }, {
                key: 'price',
                label: 'Unit Price(Rs.)',
                type: 'number'
              }, {
                key: 'quantity',
                label: 'Quantity(Nos)',
                type: 'number'
              }, {
                key: 'total',
                label: 'Total',
                type: 'number',
                valueGetter: 'row.price * row.quantity'
              }, {
                key: 'discount',
                label: 'Discount(%)',
                type: 'number'
              }, {
                key: 'calculatedDiscount',
                label: 'Discount(Rs.)',
                type: 'number',
                valueGetter: 'function(row) { return (row.total * row.discount) / 100}'
              }, {
                key: 'netPrice',
                label: 'Net Price',
                type: 'number',
                valueGetter: function (row) {
                  return (row.total - row.calculatedDiscount);
                }
              }]);

              dataTable.set('items', [{
                name: 'HP Elitebook',
                quantity: 40,
                price: 80000,
                discount: 20
              }, {
                name: 'Dell Lattitude',
                quantity: 15,
                price: 45000,
                discount: 15
              }, {
                name: 'Macbook Air',
                quantity: 5,
                price: 65000,
                discount: 5
              }, {
                name: 'Macbook Pro',
                quantity: 20,
                price: 120000,
                discount: 8
              }]);

            </script>
          </div>
				</custom-demo-snippet>

      </div>      
        `;
  }

  _onPageVisible() {
    var dataTable = this.shadowRoot.querySelector('#derived-table'); // eslint-disable-line no-redeclare

    dataTable.set('columns', [{
      key: 's1',
      label: 'S1',
      type: 'number'
    }, {
      key: 's2',
      label: 'S2',
      type: 'number'
    }, {
      key: 'total',
      label: 'Total',
      type: 'number',
      valueGetter: 'row.s1 + row.s2'
    }, {
      key: 'averageA',
      label: 'Average A',
      type: 'number',
      valueGetter: function (row) {
        return (row.s1 + row.s2) / 2;
      }
    }, {
      key: 'averageB',
      label: 'average B',
      type: 'number',
      valueGetter: 'function(row){ return Math.floor((row.s1 + row.s2)/2); }'
    }]);

    dataTable.set('items', [{
      s1: 94,
      s2: 75
    }, {
      s1: 88,
      s2: 88
    }, {
      s1: 75,
      s2: 94
    }]);

    var dataTable = this.shadowRoot.querySelector('#laptop-table'); // eslint-disable-line no-redeclare

    dataTable.set('columns', [{
      key: 'name',
      label: 'Name',
      type: 'string'
    }, {
      key: 'price',
      label: 'Unit Price(Rs.)',
      type: 'number'
    }, {
      key: 'quantity',
      label: 'Quantity(Nos)',
      type: 'number'
    }, {
      key: 'total',
      label: 'Total',
      type: 'number',
      valueGetter: 'row.price * row.quantity'
    }, {
      key: 'discount',
      label: 'Discount(%)',
      type: 'number'
    }, {
      key: 'calculatedDiscount',
      label: 'Discount(Rs.)',
      type: 'number',
      valueGetter: 'function(row) { return (row.total * row.discount) / 100}'
    }, {
      key: 'netPrice',
      label: 'Net Price',
      type: 'number',
      valueGetter: function (row) {
        return (row.total - row.calculatedDiscount);
      }
    }]);

    dataTable.set('items', [{
      name: 'HP Elitebook',
      quantity: 40,
      price: 80000,
      discount: 20
    }, {
      name: 'Dell Lattitude',
      quantity: 15,
      price: 45000,
      discount: 15
    }, {
      name: 'Macbook Air',
      quantity: 5,
      price: 65000,
      discount: 5
    }, {
      name: 'Macbook Pro',
      quantity: 20,
      price: 120000,
      discount: 8
    }]);
  }

});

window.customElements.define("customize-view", class extends DemoMixin(PolymerElement) {
  static get template() {
    return html`
        <style include="demo-pages-shared-styles">
        
        </style>
        <div>
        <h1> Customizing the view </h1>
        <p>
          The oe-data-table component supports customizing the view. On clicking the "Customize View" icon in the header , one can
          rearrange and show/hide the columns
        </p>
        <h3> Rearranging the columns </h3>
        <p>
          Drag the column that needs to be rearranged and drop it before/after a column where it needs to be shown
        </p>
        <h3> Show/hide Columns </h3>
        <p>
          The column can be shown/hidden by selecting or deselecting the checkbox of the column respectively.
        </p>
        <strong> Note : </strong> Multiple columns can be hidden/shown.
        <p>
          It is also possible to save the grid config in localStorage or in the server and can be used for later use. To save the grid
          config, we have to set configCode which takes a unique string to which the config is mapped. The component
          will try to fetch gridConfig from server or localStorage based on configCode.
        </p>
        <p>
          Check the below example for customizing the columns using the Customize view.
        </p>
        <custom-demo-snippet>
					<div>
            <oe-data-table id="customize-view-table" label="Customize View"> </oe-data-table>
            <script>
              var customGrid = this.shadowRoot.querySelector('#customize-view-table');
              var columns = [];
              var items = []; // eslint-disable-line no-redeclare
              for (var i = 0; i < 15; i++) {
                columns.push({
                  key: 'column' + i,
                  label: 'Column' + i,
                  type: 'string'
                });

              }
              for (i = 0; i < 5; i++) {
                var obj = {};
                for (var j = 0; j < 15; j++) {
                  obj['column' + j] = 'test' + j;
                }
                items.push(obj);
              }
              customGrid.set('columns', columns);

              customGrid.set('items', items);

              customGrid.set('configCode', 'TableConfig');

            </script>
          </div>
				</custom-demo-snippet>

      </div>      
        `;
  }

  _onPageVisible() {
    var customGrid = this.shadowRoot.querySelector('#customize-view-table');
    var columns = [];
    var items = []; // eslint-disable-line no-redeclare
    for (var i = 0; i < 15; i++) {
      columns.push({
        key: 'column' + i,
        label: 'Column' + i,
        type: 'string'
      });

    }
    for (i = 0; i < 5; i++) {
      var obj = {};
      for (var j = 0; j < 15; j++) {
        obj['column' + j] = 'test' + j;
      }
      items.push(obj);
    }
    customGrid.set('columns', columns);

    customGrid.set('items', items);

    customGrid.set('configCode', 'TableConfig');
  }

});

window.customElements.define("menu-actions", class extends DemoMixin(PolymerElement) {
  static get template() {
    return html`
        <style include="demo-pages-shared-styles">
        
        </style>
        <div>
        <h1> Menu Action </h1>
        <p> Menu can be added in the menu section of top bar, which will fire an event when clicked. </p>
        <p> This can be achieved by setting "menuActions" property with an array of table action objects, similar to toolbarActions.
          A table action object contains icon property which is the icon to be displayed , title property which is used
          to show tooltip and action property which is used to create event name. </p>
        <p> The oe-data-table fire oe-data-table-action-<i>actionName</i>. </p>
        <p><strong>Note : </strong><i>actionName</i> must be provided using "action" property in action object.</p>
        <custom-demo-snippet>
					<div>
            <oe-data-table id="menu-action" label="Table action"></oe-data-table>
            <paper-toast id="menu-action-toast"> </paper-toast>
            <script>
              var dataTable = this.shadowRoot.querySelector('#menu-action'); // eslint-disable-line no-redeclare

              dataTable.set('columns', [{
                key: 'id',
                label: 'Id',
                type: 'number'
              }, {
                key: 'name',
                label: 'Name',
                type: 'string'
              }]);

              dataTable.set('menuActions', [{
                icon: 'icons:archive',
                title: 'Archive Users',
                action: 'archive'
              }, {
                icon: 'icons:alarm',
                title: 'Notify Users',
                action: 'alarm'
              }]);

              dataTable.set('items', [{
                id: 1,
                name: 'Admin'
              }, {
                id: 2,
                name: 'Developer'
              }, {
                id: 3,
                name: 'Designer'
              }, {
                id: 4,
                name: 'Tester'
              }]);
              var toast = this.shadowRoot.querySelector('#menu-action-toast');
              dataTable.addEventListener('oe-data-table-action-archive', function (event) { // eslint-disable-line no-unused-vars
                toast.innerHTML = 'Archive icon pressed ';
                toast.show();
              });

              dataTable.addEventListener('oe-data-table-action-alarm', function (event) { // eslint-disable-line no-unused-vars
                toast.innerHTML = 'Alarm icon pressed';
                toast.show();
              });

            </script>
          </div>
				</custom-demo-snippet>

      </div>      
        `;
  }

  _onPageVisible() {
    var dataTable = this.shadowRoot.querySelector('#menu-action'); // eslint-disable-line no-redeclare

    dataTable.set('columns', [{
      key: 'id',
      label: 'Id',
      type: 'number'
    }, {
      key: 'name',
      label: 'Name',
      type: 'string'
    }]);

    dataTable.set('menuActions', [{
      icon: 'icons:archive',
      title: 'Archive Users',
      action: 'archive'
    }, {
      icon: 'icons:alarm',
      title: 'Notify Users',
      action: 'alarm'
    }]);

    dataTable.set('items', [{
      id: 1,
      name: 'Admin'
    }, {
      id: 2,
      name: 'Developer'
    }, {
      id: 3,
      name: 'Designer'
    }, {
      id: 4,
      name: 'Tester'
    }]);
    var toast = this.shadowRoot.querySelector('#menu-action-toast');
    dataTable.addEventListener('oe-data-table-action-archive', function (event) { // eslint-disable-line no-unused-vars
      toast.innerHTML = 'Archive icon pressed ';
      toast.show();
    });

    dataTable.addEventListener('oe-data-table-action-alarm', function (event) { // eslint-disable-line no-unused-vars
      toast.innerHTML = 'Alarm icon pressed';
      toast.show();
    });

  }

});

window.customElements.define("column-aggregation", class extends DemoMixin(PolymerElement) {
  static get template() {
    return html`
        <style include="demo-pages-shared-styles">
        
        </style>
        <div>
        <h1>Column Aggregation</h1>
        <p>Aggregating all the row values for a column and creating a new value out of it. This can be achieved by providing
          a 'aggregator' property in the column definition. The aggregator property can take 'sum' , 'average' or 'count'
          as a value which will sum all the row's value,average of all the row's value or count of number of rows. Along
          with this, a function with an argument can be passed. The argument of this function will have all the row's
          value of the specified column. Check the below example - </p>
        <h3>Aggregator row in bottom -</h3>
        <custom-demo-snippet>
					<div>
            <oe-data-table label="Column Aggregation" id="columnAggregation"></oe-data-table>
            <script>
              var dataTable = this.shadowRoot.querySelector('#columnAggregation'); // eslint-disable-line no-redeclare
              dataTable.set('columns', [{
                key: 'product',
                label: 'Product',
                type: 'string'
              }, {
                key: 'unit',
                label: 'Unit',
                type: 'number',
                aggregator: function (items) {
                  return items.reduce(function (a, b) {
                    return {
                      unit: a.unit + b.unit
                    };
                  }).unit;
                }
              }, {
                key: 'price',
                label: 'Price / Unit',
                type: 'number'
              }, {
                key: 'discount',
                label: 'Discount (%)',
                type: 'number',
                aggregator: 'average'
              }, {
                key: 'total',
                label: 'Net Amount',
                type: 'number',
                valueGetter: function (row) {
                  return ((row.price * row.unit) - (row.discount / 100));
                },
                aggregator: 'sum'
              }]);

              dataTable.set('items', [{
                product: 'Wireless Mouse',
                unit: 10,
                price: 500,
                discount: 5
              }, {
                product: 'Wireless Keyboard',
                unit: 10,
                price: 700,
                discount: 10
              }, {
                product: 'Monitor',
                unit: 5,
                price: 6000,
                discount: 20
              }, {
                product: 'Cabinet',
                unit: 15,
                price: 8000,
                discount: 15
              }]);

            </script>
          </div>
				</custom-demo-snippet>
        <h3>Aggregator row on top -</h3>
        <p>The aggregated row can be configured either to the top or bottom section of the grid. The default position is
          in the bottom, however by passing a property 'aggregator-align-top' to the oe-data-table, the aggregated row
          can be positioned to the top as shown in below example - </p>
        <custom-demo-snippet>
					<div>
            <oe-data-table label="Column Aggregation" aggregator-align-top id="columnAggregationTop"></oe-data-table>
            <script>
              var dataTable = this.shadowRoot.querySelector('#columnAggregationTop'); // eslint-disable-line no-redeclare
              dataTable.set('columns', [{
                key: 'product',
                label: 'Product',
                type: 'string'
              }, {
                key: 'unit',
                label: 'Unit',
                type: 'number',
                aggregator: function (items) {
                  return items.reduce(function (a, b) {
                    return {
                      unit: a.unit + b.unit
                    };
                  }).unit;
                }
              }, {
                key: 'price',
                label: 'Price / Unit',
                type: 'number'
              }, {
                key: 'discount',
                label: 'Discount (%)',
                type: 'number',
                aggregator: 'average'
              }, {
                key: 'total',
                label: 'Net Amount',
                type: 'number',
                valueGetter: function (row) {
                  return ((row.price * row.unit) - (row.discount / 100));
                },
                aggregator: 'sum'
              }]);

              dataTable.set('items', [{
                product: 'Wireless Mouse',
                unit: 10,
                price: 500,
                discount: 5
              }, {
                product: 'Wireless Keyboard',
                unit: 10,
                price: 700,
                discount: 10
              }, {
                product: 'Monitor',
                unit: 5,
                price: 6000,
                discount: 20
              }, {
                product: 'Cabinet',
                unit: 15,
                price: 8000,
                discount: 15
              }]);

            </script>
          </div>
				</custom-demo-snippet>

      </div>      
        `;
  }

  _onPageVisible() {
    var dataTable = this.shadowRoot.querySelector('#columnAggregation'); // eslint-disable-line no-redeclare
    dataTable.set('columns', [{
      key: 'product',
      label: 'Product',
      type: 'string'
    }, {
      key: 'unit',
      label: 'Unit',
      type: 'number',
      aggregator: function (items) {
        return items.reduce(function (a, b) {
          return {
            unit: a.unit + b.unit
          };
        }).unit;
      }
    }, {
      key: 'price',
      label: 'Price / Unit',
      type: 'number'
    }, {
      key: 'discount',
      label: 'Discount (%)',
      type: 'number',
      aggregator: 'average'
    }, {
      key: 'total',
      label: 'Net Amount',
      type: 'number',
      valueGetter: function (row) {
        return ((row.price * row.unit) - (row.discount / 100));
      },
      aggregator: 'sum'
    }]);

    dataTable.set('items', [{
      product: 'Wireless Mouse',
      unit: 10,
      price: 500,
      discount: 5
    }, {
      product: 'Wireless Keyboard',
      unit: 10,
      price: 700,
      discount: 10
    }, {
      product: 'Monitor',
      unit: 5,
      price: 6000,
      discount: 20
    }, {
      product: 'Cabinet',
      unit: 15,
      price: 8000,
      discount: 15
    }]);

    dataTable = this.shadowRoot.querySelector('#columnAggregationTop'); // eslint-disable-line no-redeclare
    dataTable.set('columns', [{
      key: 'product',
      label: 'Product',
      type: 'string'
    }, {
      key: 'unit',
      label: 'Unit',
      type: 'number',
      aggregator: function (items) {
        return items.reduce(function (a, b) {
          return {
            unit: a.unit + b.unit
          };
        }).unit;
      }
    }, {
      key: 'price',
      label: 'Price / Unit',
      type: 'number'
    }, {
      key: 'discount',
      label: 'Discount (%)',
      type: 'number',
      aggregator: 'average'
    }, {
      key: 'total',
      label: 'Net Amount',
      type: 'number',
      valueGetter: function (row) {
        return ((row.price * row.unit) - (row.discount / 100));
      },
      aggregator: 'sum'
    }]);

    dataTable.set('items', [{
      product: 'Wireless Mouse',
      unit: 10,
      price: 500,
      discount: 5
    }, {
      product: 'Wireless Keyboard',
      unit: 10,
      price: 700,
      discount: 10
    }, {
      product: 'Monitor',
      unit: 5,
      price: 6000,
      discount: 20
    }, {
      product: 'Cabinet',
      unit: 15,
      price: 8000,
      discount: 15
    }]);


  }

});

window.customElements.define("other-options", class extends DemoMixin(PolymerElement) {
  static get template() {
    return html`
        <style include="demo-pages-shared-styles">
        
        </style>
        <div>
        <h1> Other Options </h1>
        <p> 
          When disabled attribute is set the editing/adding a record is prevented but selection is allowed.</p>
          <p>
            In addition the row can be selected by clicking anywhere on the row and the selected row can be changed via UP/DOWN arrow keys.
          </p>
        <p>
          The arrow key navigation only works when a single row is selected.
        </p>
        <p> </p>
        <custom-demo-snippet>
					<div>
            <oe-data-table disabled disable-config-editor disable-edit disable-delete disable-add id="options-table" label="Simple Table"></oe-data-table>
            <script>
              var dataTable = this.shadowRoot.querySelector('#options-table');

              dataTable.set('columns', [{
                key: 'id',
                label: 'Id',
                type: 'number'
              }, {
                key: 'name',
                label: 'Name',
                type: 'string',
                alignment:'center'
              }, {
                key: 'details.location',
                label: 'Location',
                type: 'string'
              }, {
                key: 'details',
                label: 'Details',
                type: 'object'
              }]);

              dataTable.set('items', [{
                id: 1,
                name: 'Admin',
                details: {
                  gender: 'male',
                  location: 'Bangalore',
                  country: 'India'
                }
              }, {
                id: 2,
                name: 'Developer',
                details: {
                  gender: 'female',
                  location: 'Bangalore',
                  country: 'India'
                }
              }, {
                id: 3,
                name: 'Designer',
                details: {
                  gender: 'male',
                  location: 'Chennai',
                  country: 'India'
                }
              }, {
                id: 4,
                name: 'Tester',
                details: {
                  gender: 'male',
                  location: 'Chennai',
                  country: 'India'
                }
              }]);

            </script>
          </div>
				</custom-demo-snippet>

      </div>      
        `;
  }

  _onPageVisible() {
    var dataTable = this.shadowRoot.querySelector('#options-table');
    dataTable.set('columns', [{
      key: 'id',
      label: 'Id',
      type: 'number'
    }, {
      key: 'name',
      label: 'Name',
      type: 'string',
      alignment: 'center'
    }, {
      key: 'details.location',
      label: 'Location',
      type: 'string'
    }, {
      key: 'details',
      label: 'Details',
      type: 'object'
    }]);

    dataTable.set('items', [{
      id: 1,
      name: 'Admin',
      details: {
        gender: 'male',
        location: 'Bangalore',
        country: 'India'
      }
    }, {
      id: 2,
      name: 'Developer',
      details: {
        gender: 'female',
        location: 'Bangalore',
        country: 'India'
      }
    }, {
      id: 3,
      name: 'Designer',
      details: {
        gender: 'male',
        location: 'Chennai',
        country: 'India'
      }
    }, {
      id: 4,
      name: 'Tester',
      details: {
        gender: 'male',
        location: 'Chennai',
        country: 'India'
      }
    }]);
  }

});
window.customElements.define('accordian-view',class extends DemoMixin(PolymerElement) {
  static get template(){
    return html` 
    <style include="demo-pages-shared-styles">
        
    </style>
    <div>
    <h1> Accordion View </h1>
    <p> Accordion View is supported by the oe-data-table. Any external component can be imported into the accordion.
    </p>
    <p> Three data level properties need to be defined. </p>
    <p> 1. <strong>accordianUrls:</strong> List of html pages which need to be imported by the oe-data-table </p>
    <p> 2. <strong>accordianElement:</strong> Name of the element to be shown inside accodion view. </p>
    <p> 3. <strong>showAccordian:</strong> true/false to show/hide the accordion </p>
    
    <custom-demo-snippet>
    <div>
        <oe-data-table disabled disable-config-editor disable-edit disable-delete disable-add id="accordian-table" label="Simple Table"></oe-data-table>
        <script>
          var dataTable = this.shadowRoot.querySelector('#accordian-table');


        var dropDownRenderer= function (column, row) { // eslint-disable-line no-unused-vars
        

        // var elementToReturn =
        // '<paper-dropdown-menu label="Dinosaurs"><paper-listbox slot="dropdown-content" selected="1"><paper-item>allosaurus</paper-item><paper-item>brontosaurus</paper-item><paper-item>carcharodontosaurus</paper-item><paper-item>diplodocus</paper-item></paper-listbox></paper-dropdown-menu>';
        
        var elementToReturn = "";
        if(row.status === 'Pending Decision'){
             elementToReturn = 
        '<select style=" background-color: transparent; border: 1px solid #d1d2d3;"><option value="" disabled selected>Select</option><option value="accept">Accept</option><option value="reject">Reject</option></select>';
        }
        else{
            elementToReturn = 
        '<select style="display: none; background-color: transparent; border: 1px solid #d1d2d3;"><option value="volvo">Volvo</option><option value="saab">Saab</option><option value="mercedes">Mercedes</option><option value="audi">Audi</option></select>';
        }
       
        return elementToReturn;
    };

    var amountRenderer= function (column, row) { // eslint-disable-line no-unused-vars
        var elementToReturn =
            '<div style="text-align: right;display: flex;justify-content: flex-end;"> <div style="margin-top: 8px;">$&nbsp;</div> <oe-info class="amount-info" precision=[[row.precision]] type="decimal" value=[[row.amount]]></oe-info> </span> </div>';


        return elementToReturn;
    };
          dataTable.set('columns', [{
            key: 'account',
            label: 'Account',
            type: 'number'
          }, {
            key: 'checknumber',
            label: 'Check Number',
            type: 'number',
            cellClass: 'blue-color'
          }, {
            key: 'amount',
            label: 'Amount',
            type: 'number',
            renderer: amountRenderer
          }, {
            key: 'exception_reason',
            label: 'Exception Reason',
            type: 'string'
          },
          {
            key: 'status',
            label: 'Status',
            type: 'string'
          },
          {
            key: 'action',
            label: 'Action',


            type: 'string',
            renderer: dropDownRenderer

          }]);

          var data = [{
            account: 861363459,
            checknumber: 223457,
            amount: 470631.71,
            status: 'Approved',
            exception_reason: 'Paid No Issue',
            action: 'Select'
          },
          {
            account: 794659139,
            checknumber: 23456,
            amount: 4763.28,
            status: 'Pending Decision',
            exception_reason: 'Paid Fraud',
            action: 'Select'
          },
          {
            account: 479677228,
            checknumber: 223431,
            amount: 41170631.11,
            status: 'Pending Decision',
            exception_reason: 'Payee Missmatch',
            action: 'Select'
          },
          {
            account: 334547856,
            checknumber: 2234567,
            amount: 731.71,
            status: 'Rejected',
            exception_reason: 'Paid Fraud',
            action: 'Select'
          },
          {
            account: 452135542,
            checknumber: 123564,
            amount: 520631.51,
            status: 'Pending Decision',
            exception_reason: 'Paid Fraud',
            action: 'Select'
          },
          {
            account: 542412943,
            checknumber: 342352,
            amount: 41170631.71,
            status: 'Pending Decision',
            exception_reason: 'Paid No Issue',
            action: 'Select'
          },
          {
            account: 135322523,
            checknumber: 3341234,
            amount: 420631.16,
            status: 'Pending Decision',
            exception_reason: 'Payee Missmatch',
            action: 'Select'
          },
          {
            account: 432356742,
            checknumber: 223456,
            amount: 631.71,
            status: 'Pending Decision',
            exception_reason: 'Paid Fraud',
            action: 'Select'
          }

          ];
          dataTable.set('items', data);
          

          dataTable.set('accordianUrls', ["/demo/templates/demo-accordian.js"]);
          dataTable.set('accordianElement', "demo-accordian");
          dataTable.set('showAccordian', true);

        </script>
     </div>
    	</custom-demo-snippet>
  </div>
  `
  }
  _onPageVisible() {
    var dataTable = this.shadowRoot.querySelector('#accordian-table');


        var dropDownRenderer= function (column, row) { // eslint-disable-line no-unused-vars
        

        // var elementToReturn =
        // '<paper-dropdown-menu label="Dinosaurs"><paper-listbox slot="dropdown-content" selected="1"><paper-item>allosaurus</paper-item><paper-item>brontosaurus</paper-item><paper-item>carcharodontosaurus</paper-item><paper-item>diplodocus</paper-item></paper-listbox></paper-dropdown-menu>';
        
        var elementToReturn = "";
        if(row.status === 'Pending Decision'){
             elementToReturn = 
        '<select style=" background-color: transparent; border: 1px solid #d1d2d3;"><option value="" disabled selected>Select</option><option value="accept">Accept</option><option value="reject">Reject</option></select>';
        }
        else{
            elementToReturn = 
        '<select style="display: none; background-color: transparent; border: 1px solid #d1d2d3;"><option value="volvo">Volvo</option><option value="saab">Saab</option><option value="mercedes">Mercedes</option><option value="audi">Audi</option></select>';
        }
       
        return elementToReturn;
    };

    var amountRenderer= function (column, row) { // eslint-disable-line no-unused-vars
        var elementToReturn =
            '<div style="text-align: right;display: flex;justify-content: flex-end;"> <div style="margin-top: 8px;">$&nbsp;</div> <oe-info class="amount-info" precision=[[row.precision]] type="decimal" value=[[row.amount]]></oe-info> </span> </div>';


        return elementToReturn;
    };
          dataTable.set('columns', [{
            key: 'account',
            label: 'Account',
            type: 'number'
          }, {
            key: 'checknumber',
            label: 'Check Number',
            type: 'number',
            cellClass: 'blue-color'
          }, {
            key: 'amount',
            label: 'Amount',
            type: 'number',
            renderer: amountRenderer
          }, {
            key: 'exception_reason',
            label: 'Exception Reason',
            type: 'string'
          },
          {
            key: 'status',
            label: 'Status',
            type: 'string'
          },
          {
            key: 'action',
            label: 'Action',


            type: 'string',
            renderer: dropDownRenderer

          }]);

          var data = [{
            account: 861363459,
            checknumber: 223457,
            amount: 470631.71,
            status: 'Approved',
            exception_reason: 'Paid No Issue',
            action: 'Select'
          },
          {
            account: 794659139,
            checknumber: 23456,
            amount: 4763.28,
            status: 'Pending Decision',
            exception_reason: 'Paid Fraud',
            action: 'Select'
          },
          {
            account: 479677228,
            checknumber: 223431,
            amount: 41170631.11,
            status: 'Pending Decision',
            exception_reason: 'Payee Missmatch',
            action: 'Select'
          },
          {
            account: 334547856,
            checknumber: 2234567,
            amount: 731.71,
            status: 'Rejected',
            exception_reason: 'Paid Fraud',
            action: 'Select'
          },
          {
            account: 452135542,
            checknumber: 123564,
            amount: 520631.51,
            status: 'Pending Decision',
            exception_reason: 'Paid Fraud',
            action: 'Select'
          },
          {
            account: 542412943,
            checknumber: 342352,
            amount: 41170631.71,
            status: 'Pending Decision',
            exception_reason: 'Paid No Issue',
            action: 'Select'
          },
          {
            account: 135322523,
            checknumber: 3341234,
            amount: 420631.16,
            status: 'Pending Decision',
            exception_reason: 'Payee Missmatch',
            action: 'Select'
          },
          {
            account: 432356742,
            checknumber: 223456,
            amount: 631.71,
            status: 'Pending Decision',
            exception_reason: 'Paid Fraud',
            action: 'Select'
          }

          ];
          dataTable.set('items', data);
          

         // dataTable.set('accordianUrls', ["/demo/templates/demo-accordian.js"]);
          dataTable.set('accordianElement', "demo-accordian");
          dataTable.set('showAccordian', true);
        }
});

window.customElements.define('table-demo-pages', class extends PolymerElement {
  static get template() {
    return html`
    <style is="custom-style">
      .app-toolbar-panel {
        height: 64px;
        background: #FF9800;
        color: #FFF;
        padding:0px 16px;
      }
      .demo-content-panel{
        background:#FFF;
        padding:0px 16px;
      }
    </style>
    <div class="app-toolbar-panel">
      <paper-dropdown-menu label="Demo Section" id="demo-selector" on-value-changed="_updateRoute" no-animations>
        <paper-listbox slot="dropdown-content">
          <dom-repeat items="[[dropDownList]]">
            <template>
              <paper-item>[[item]]</paper-item>
            </template>
          </dom-repeat>
        </paper-listbox>
      </paper-dropdown-menu>
    </div>
    <div class="demo-content-panel">
      <oe-app-route routes-list="[[RouteList]]" route="[[_selectedRoute]]">
        <iron-pages id="content-pages" route-target>
        </iron-pages>
      </oe-app-route>
    </div>
    `;
  }
  constructor() {
    super();
    var demoList = [{
      "title": "Overview",
      "type": "elem",
      "path": "overview-detail",
      "name": "overview-detail"
    },
    {
      "title": "Declaring columns",
      "type": "elem",
      "path": "declaring-column",
      "name": "declaring-column"
    },
    {
      "title": "Column sizing & resizing",
      "type": "elem",
      "path": "column-resize",
      "name": "column-resize"
    },
    {
      "title": "Sorting and filtering",
      "type": "elem",
      "path": "sorting-filtering",
      "name": "sorting-filtering"
    },
    {
      "title": "Row selection",
      "type": "elem",
      "path": "row-selection",
      "name": "row-selection"
    },
    {
      "title": "Value Formatting",
      "type": "elem",
      "path": "value-formatting",
      "name": "value-formatting"
    },
    {
      "title": "Row Editing",
      "type": "elem",
      "path": "row-editing",
      "name": "row-editing"
    },
    {
      "title": "Cell Rendering (WIP)",
      "type": "elem",
      "path": "cell-rendering",
      "name": "cell-rendering"
    },
    {
      "title": "Inline Editing",
      "type": "elem",
      "path": "inline-editing",
      "name": "inline-editing"
    },
    {
      "title": "Custom Cell Type",
      "type": "elem",
      "path": "cell-types",
      "name": "cell-types"
    },
    {
      "title": "Row Action",
      "type": "elem",
      "path": "row-action",
      "name": "row-action"
    },
    {
      "title": "Pagination",
      "type": "elem",
      "path": "pagination-setting",
      "name": "pagination-setting"
    },
    {
      "title": "Cell Styling (WIP)",
      "type": "elem",
      "path": "cell-styling",
      "name": "cell-styling"
    },
    {
      "title": "Table Action",
      "type": "elem",
      "path": "table-action",
      "name": "table-action"
    },
    {
      "title": "Derived columns",
      "type": "elem",
      "path": "derived-column",
      "name": "derived-column"
    },
    {
      "title": "Customize View",
      "type": "elem",
      "path": "customize-view",
      "name": "customize-view"
    },
    {
      "title": "Menu Actions",
      "type": "elem",
      "path": "menu-actions",
      "name": "menu-actions"
    },
    {
      "title": "Column Aggregation",
      "type": "elem",
      "path": "column-aggregation",
      "name": "column-aggregation"
    },
    {
      "title": "Other Options",
      "type": "elem",
      "path": "other-options",
      "name": "other-options"
    },
    {
      "title": "Accordian-view",
      "type": "elem",
      "path": "accordian-view",
      "name": "accordian-view"
    }];
    this.set('RouteList', demoList);
    this.set('dropDownList', demoList.map(function (d) {
      return d.title;
    }));
  }

  connectedCallback() {
    super.connectedCallback();
    var demoSelector = this.$['demo-selector'];
    demoSelector.set('value', 'Overview');
  }

  _updateRoute(event) {
    var demoSelector = this.$['demo-selector'];
    var selectedRoute = this.RouteList.find(function (r) {
      return r.title == demoSelector.value;
    });
    this.set('_selectedRoute', selectedRoute);
  }
});