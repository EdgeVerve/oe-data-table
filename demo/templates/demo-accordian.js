/**
 * @license
 * ©2018-2019 EdgeVerve Systems Limited (a fully owned Infosys subsidiary),
 * Bangalore, India. All Rights Reserved.
 */
import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-bind';
import '@polymer/iron-demo-helpers/demo-pages-shared-styles';

  
class DemoAccordian extends PolymerElement {
    static get template() {
        return html`
        <style is="custom-style">
            .background-color {
                background-color: #dadada;
            }

            .magnified {
                position: relative;
                height: 1000px;
            }

        </style>
        <div id="demo-accordian" class=" background-color" style="height: 100%;">

            <div>

                <img id="cheque_image" src="https://www.oecloud.io/images/logo.png" style="display: inline-block; width: 30%; margin: 20px;"
                />

            </div>

            <iron-icon icon="icons:zoom-in" item-icon on-tap="clickMe" style=" margin-left: 40px;"></iron-icon>
            <iron-icon icon="icons:refresh" item-icon on-tap="rotate" style=" margin-left: 10px;"></iron-icon>
            <div>Account : {{data.account}}</div>

        </div>
        `;
    }

    static get properties() {
        return {
            data: {
                type: Object,
                notify: true,
                observer: 'dataChanged'

            },
            degrees: {
                type: Number,
                value: 0,
                notify: true
            }
        }
    }

    static get is() {
        return "demo-accordian";
    }

    connectedCallback() {
        super.connectedCallback();

    }
    dataChanged(e) {

        console.log("pulkit");
        console.log(this.data);
    }




    rotate(e) {

        var degrees = this.degrees;
        var $cboxphoto = $('#cheque_image');
        degrees += 90;
        $cboxphoto.css('-ms-transform', 'rotate(' + degrees + 'deg)');
        $cboxphoto.css('-webkit-transform', 'rotate(' + degrees + 'deg)');
        $cboxphoto.css('transform', 'rotate(' + degrees + 'deg)');

        this.degrees = degrees;


    }
}

window.customElements.define(DemoAccordian.is, DemoAccordian);

export default DemoAccordian;