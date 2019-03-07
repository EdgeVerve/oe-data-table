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
import "@polymer/paper-icon-button/paper-icon-button.js";
import "@polymer/paper-item/paper-icon-item.js";
import "@polymer/paper-menu-button/paper-menu-button.js";
import "@polymer/iron-icons/image-icons.js";

/**
 * `oe-data-table-header`
 *  Header panel of oe-data-table displaying table-label and table-actions like add,edit,etc.
 * 
 * ### Styling
 * 
 * The following custom properties and mixins are available for styling:
 * 
 * CSS Variable | Description | Default
 * ----------------|-------------|----------
 * `--oe-data-table-header` | Mixin applied on the entire header panel | {}
 * `--oe-data-table-header-title` | Mixin applied on the header title | {}
 * 
 * 
 * @customElement
 * @polymer
 * @appliesMixin OECommonMixin
 */
class OeDataTableHeader extends OECommonMixin(PolymerElement) {

    static get is() { return 'oe-data-table-header'; }

    static get template() {
        return html`
    <style include="iron-flex">
        
        .grid-header {
            height: 64px;
            padding: 0 14px 0 24px;
            box-sizing: border-box;
            background: #FFFFFF;
            box-shadow: 1px 1px 2px 0 rgba(0,0,0,0.16);
            border-radius: 4px 4px 0 0;
            margin-bottom: 4px;
            @apply --layout-horizontal;
            @apply --layout-center;
            @apply --layout-justified;
            @apply --oe-data-table-header;
        }
    
        .icon-group {
            color: rgba(0, 0, 0, 0.54);
            @apply --layout-horizontal;
            @apply --layout-center;
        }
    
        .header-title {
            font-size: 20px;
            color: rgba(0, 0, 0, 0.87);
            font-weight: 400;
            font-style: normal;
    
            @apply --oe-data-table-header-title;
        }
    
        
        .multi-select-true{
            background:var(--primary-light-color,#d1e9fd);
            border: 1px solid #b9cfe2;
        }
        .multi-select-true .header-title{
            margin:0px 16px;
        }
    
        .selected-items-count{
            font-size: 14px;
            color: rgba(0,0,0,0.87)
        }
        .grid-info > iron-icon{
            cursor: pointer;
            --iron-icon-width:16px;
            --iron-icon-height:16px;
        }
        .grid-info{
            @apply --layout-horizontal;
            @apply --layout-center;
        }
        paper-menu-button{
            padding:0px;
        }
   
    </style>
    <div id="grid-header" class$="multi-select-[[_isMultiSelected(selectedLength)]] grid-header">
        
        <div class="grid-info">
            <iron-icon icon="arrow-back" on-tap="_toggleSelectAll" hidden=[[!_isMultiSelected(selectedLength)]]></iron-icon>
            <div class="header-title">
                [[label]]
                <slot name="header-title"></content>
            </div>
            <div class="selected-items-count" hidden=[[!_isMultiSelected(selectedLength)]]>
                [[selectedLength]] items selected
            </div>
        </div>

        <div class="icon-group">
            <template is="dom-if" if="[[!disabled]]">
                <template is="dom-if" if="[[dataController]]">
                    <paper-icon-button id="refresh-icon" icon="icons:refresh" on-tap="refreshRender"></paper-icon-button>
                    <paper-tooltip for="refresh-icon"> Refresh </paper-tooltip>
                </template>
                <template is="dom-if" if="[[!selectedLength]]">
                    <template is="dom-if" if="[[!disableAdd]]">
                        <div class="header-icon">
                            <paper-icon-button icon="icons:add-circle-outline" on-tap="_showAddForm"></paper-icon-button>
                            <paper-tooltip> New </paper-tooltip>
                        </div>
                    </template>
                    <template is="dom-if" if="[[!disableConfigEditor]]">
                        <div class="header-icon">
                            <paper-icon-button icon="image:tune" on-tap="_openColumnCustomizer"></paper-icon-button>
                            <paper-tooltip> Customize View </paper-tooltip>
                        </div>
                    </template>
                </template>
                <template is="dom-if" if="[[selectedLength]]">
                    <template is="dom-if" if="[[!disableEdit]]">
                        <div class="header-icon" hidden$=[[_hideEditIcon(selectedLength)]]>
                            <paper-icon-button icon="editor:mode-edit" on-tap="_showEditForm"></paper-icon-button>
                            <paper-tooltip> Edit </paper-tooltip>
                        </div>
                    </template>
                    <template is="dom-if" if="[[!disableDelete]]">
                        <div class="header-icon">
                            <paper-icon-button id="delete-icon" icon="delete" on-tap="_deleteSelectedRows"></paper-icon-button>
                            <paper-tooltip> Delete </paper-tooltip>
                        </div>
                    </template>
                </template>
                <template is="dom-repeat" items=[[toolbarActions]] as="action">
                    <div class="header-icon">
                        <paper-icon-button icon="[[action.icon]]" on-tap="_tableActionTapped"></paper-icon-button>
                        <paper-tooltip>
                            <oe-i18n-msg msgid=[[action.title]]>[[action.title]]</oe-i18n-msg>
                        </paper-tooltip>
                    </div>
                </template>
                <template is="dom-if" if="{{_showMenuIcon(configCode,menuActions)}}">
                    <paper-menu-button horizontal-align="right" no-animations>
                        <paper-icon-button icon="more-vert" slot="dropdown-trigger" class="dropdown-trigger"></paper-icon-button>
                        <paper-listbox slot="dropdown-content" class="dropdown-content">
                            <template is="dom-repeat" items=[[menuActions]] as="action">
                                <paper-icon-item on-tap="_tableActionTapped">
                                    <iron-icon icon="[[action.icon]]" slot="item-icon"></iron-icon>
                                    <oe-i18n-msg msgid=[[action.title]]>[[action.title]]</oe-i18n-msg>
                                </paper-icon-item>
                            </template>
                            <template is="dom-if" if=[[configCode]]>
                                <paper-icon-item on-tap="_saveGridConfig">
                                    <iron-icon icon="save" slot="item-icon"></iron-icon>
                                    <oe-i18n-msg msgid="Save Grid Config">Save Grid Config</oe-i18n-msg>
                                </paper-icon-item>
                            </template>
                        </paper-listbox>
                    </paper-menu-button>
                </template>
            </template>
        </div>
    </div>
    `;
    }

    static get properties() {
        return {
            /**
             * Length of items selected in the table
             */
            selectedLength: {
                type: Number,
                value:0
            },

            /**
             * Title for the data-table header
             */
            label: {
                type: String
            },

            /**
             * Flag to disable all opertaions
             */
            disabled: {
                type: Boolean,
                value:false
            },

            /**
             * Flag to disable add icon
             */
            disableAdd: {
                type: Boolean,
                value:false
            },

            /**
             * Flag to disable edit icon
             */
            disableEdit: {
                type: Boolean,
                value:false
            },

            /**
             * Flag to disable config editor
             */
            disableConfigEditor: {
                type: Boolean,
                value:false
            },

            /**
             * Flag to disabled delete icon
             */
            disableDelete: {
                type: Boolean,
                value:false
            },

            /**
             * Config code passed to oe-data-table
             */
            configCode: {
                type: String
            },

            /**
             * Array of actions to be displayed as icons on the header
             * Actions should be of format
             * {
             *    icon: 'icons:alarm',
             *    title: 'Notify Users',
             *    action: 'alarm'
             * }
             * These will appear as icons on the header with a tooltip specified by 'title'
             * On clicking on the icon an event will be raised with 'oe-data-table-action-' + the action provided.
             * In the case of example 'oe-data-table-action-alarm'
             * 
             */
            toolbarActions: {
                type: Array,
                value: function () {
                    return [];
                }
            },

            /**
             * Array of actions to be displayed on menu of the header
             * The format and working is similar to toolbarActions , The difference being that these will appear
             * When the Menu icons is clicked and displays with icon and title.
             */
            menuActions: {
                type: Array,
                value: function () {
                    return [];
                }
            }
        };
        /**
         * Fired when the back arrow icon is pressed after multiple selections are made.
         * 
         * @event toggle-select-all
         */
        /**
         * Fired when the refresh icon is pressed.
         * 
         * @event refresh-render
         */
        /**
         * Fired when the add icon is clicked on the grid view.
         * 
         * @event show-add-form
         */
        /**
         * Fired when the edit icon is clicked after selecting a record.
         * 
         * @event show-edit-form
         */
        /**
         * Fired when the config icon is clicked on the grid view
         * 
         * @event show-column-customizer
         */
        /**
         * Fired when the delete icon is clicked after selecting records.
         * 
         * @event delete-selected-rows
         */
        /**
         * Fired when save grid config option is selected from menu.
         * 
         * @event save-grid-config
         */
    }

    static get observers() {
        return ['_computeRowIndex(currentPage,pageSize,itemsLength)'];
    }

    /**
     * Checks if multiple items are selected.
     * @param {number} selectedItemsLength length of selected items
     * @return {boolean} flag denoting if multiple items are selected.
     */
    _isMultiSelected(selectedItemsLength) {
        return selectedItemsLength > 1;
    }
    _toggleSelectAll() {
        this.fire('toggle-select-all');
    }
    refreshRender() {
        this.fire('refresh-render');
    }
    _showAddForm() {
        this.fire('show-add-form');
    }
    _openColumnCustomizer() {
        this.fire('show-column-customizer');
    }
    _showEditForm() {
        this.fire('show-edit-form');
    }
    _deleteSelectedRows() {
        this.fire('delete-selected-rows');
    }
    _tableActionTapped(event) {
        var actionObj = event.model.action;
        var eventName = 'oe-data-table-action-' + actionObj.action;
        this.fire(eventName, {
            action: actionObj
        });
    }
    _saveGridConfig() {
        this.fire('save-grid-config');
    }

    _showMenuIcon(configCode, menuActions) {
        return configCode || (menuActions && menuActions.length > 0);
    }

    _hideEditIcon(selectedItemsLength) {
        return selectedItemsLength !== 1;
    }
}

window.customElements.define(OeDataTableHeader.is, OeDataTableHeader);