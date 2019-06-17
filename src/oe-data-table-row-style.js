/**
 * @license
 * ©2018-2019 EdgeVerve Systems Limited (a fully owned Infosys subsidiary),
 * Bangalore, India. All Rights Reserved.
 */
const styleElement = document.createElement('dom-module');
styleElement.innerHTML = 
`<template>
  <style>
  .table-data {
        min-height: 47px;
        padding-right: 56px;
        overflow: hidden;
        box-sizing: border-box;

        @apply --layout-center;
        @apply --layout-inline;
        @apply --layout-flex;
        @apply --oe-data-table-data;
    }
    .row-action.dense-data {
        @apply --oe-data-table-data-rowaction-dense;
    }
    #table-header.dense-data {
        @apply --oe-data-table-data-header-dense;
    }
    .table-data:first-of-type {
        padding: 0;
        padding-right: 24px;
    }
    .table-data.dense-data {
        min-height: 47px;
        @apply --oe-data-table-data-row-dense;
    }
    
    :host([disable-selection]) .table-data:first-of-type {
        padding-left: 24px;
    }

    .table-data:last-of-type {
        padding-right: 24px;
    }

    .table-data:first-of-type {
        @apply --oe-data-table-column-first;
    }

    .table-data:last-of-type {
        @apply --oe-data-table-column-last;
    }
  </style>
</template>`;
styleElement.register('oe-data-table-row-style'); 