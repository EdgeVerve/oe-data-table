import { PolymerElement,html } from "@polymer/polymer/polymer-element";
import { OEFormMessagesMixin } from "oe-mixins/form-mixins/oe-form-messages-mixin";
import { OEFormValidationMixin } from "oe-mixins/form-mixins/oe-form-validation-mixin";
import { OEModelHandler } from "oe-mixins/form-mixins/oe-model-handler";
import "@polymer/iron-flex-layout/iron-flex-layout-classes";
import "@polymer/iron-flex-layout/iron-flex-layout";
import "oe-ui-forms/meta-polymer";


var OEUtils = window.OEUtils || {};
  OEUtils.metadataCache = OEUtils.metadataCache || {};
  OEUtils.metadataCache['literal-custom-form'] = {
    'componentName': 'literal-custom-form',
    'elements': {},
    'modelName': 'Literal',
    'modelAlias': 'literal',
    'metadata': {
      'models': {
        'Literal': {
          'resturl': '/api/Literals',
          'properties': {
            'key': {
              'type': 'string',
              'unique': true,
              'max': 80
            },
            'value': {
              'type': 'string',
              'max': 250
            },
            'placeholders': {
              'type': 'tags',
              'itemtype': 'string'
            }
          }
        }
      },
      'resturl': '/api/Literals',
      'properties': {
        'key': {
          'type': 'string',
          'unique': true,
          'max': 80
        },
        'value': {
          'type': 'string',
          'max': 250
        },
        'placeholders': {
          'type': 'tags',
          'itemtype': 'string'
        }
      }
    },
    'autoInjectFields': true
  };


class LiteralCustomForm extends OEFormValidationMixin(OEModelHandler(PolymerElement)){
    static get template(){
        return html`
        <style include="iron-flex iron-flex-alignment">
            :host {
            margin: 10px;
            }
    
            .form-header {
            padding: 16px;
            }
    
            #fields > * {
            padding: 0 16px;
            }
    
        </style>
        <div class="content layout vertical">
            <div class="evform layout vertical">
            <div class="form-header layout horizontal center">
                <h2 class="flex">Literal Form</h2>
                <div>
                <template is="toolbar"></template>
                <paper-button raised primary on-tap="doSave" oe-action-model="literal">
                    <oe-i18n-msg msgid="Save">Save</oe-i18n-msg>
                </paper-button>
                <paper-menu-button horizontal-align="right">
                    <paper-icon-button icon="more-vert" slot="dropdown-trigger"></paper-icon-button>
                    <paper-listbox slot="dropdown-content" oe-action-model="literal">
                    <paper-item on-tap="doClear">
                        <iron-icon icon="description" item-icon></iron-icon>
                        <oe-i18n-msg msgid="New">New</oe-i18n-msg>
                    </paper-item>
                    <paper-item on-tap="doCopy" disabled$="{{!literal.id}}">
                        <iron-icon icon="content-copy" item-icon></iron-icon>
                        <oe-i18n-msg msgid="Copy">Copy</oe-i18n-msg>
                    </paper-item>
                    <paper-item on-tap="doFetch" disabled$="{{!literal.id}}">
                        <iron-icon icon="refresh" item-icon></iron-icon>
                        <oe-i18n-msg msgid="Refresh">Refresh</oe-i18n-msg>
                    </paper-item>
                    <paper-item on-tap="doDelete" oe-action-model="literal" disabled$="{{!literal.id}}">
                        <iron-icon icon="delete" item-icon></iron-icon>
                        <oe-i18n-msg msgid="Delete">Delete</oe-i18n-msg>
                    </paper-item>
                    </paper-listbox>
                </paper-menu-button>
                </div>
            </div>
    
            <div id="fields" class="layout horizontal wrap">
            </div>
            <div id="grids" class="layout vertical">
            </div>
            </div>
        </div>
        `;
    }

    static get properties(){
        return {
            literal: {
                type: 'object',
                notify: true,
                value: function () {
                  return {}
                }
              }
        }
    }

    static get is(){
      return "literal-custom-form";
    }
}

window.customElements.metadefine("literal-custom-form",OEFormMessagesMixin(LiteralCustomForm));