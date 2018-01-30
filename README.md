# \<oe-data-table\>

`<oe-data-table>` is a component for displaying data in tabular format. It is a Polymer component styled with Material Design Data Table Standards.
  It can be used to add, edit and delete data in a model which has a `embedded`/`hasMany` relation.
  Also to display the entries in a model

  The data to be shown is set to `items` and columns to show is set to `columns`.

### Defining Columns

The column(s) to show in the table can be configured using the `columns` property.
The `columns` property takes an array of objects which can have the following properties.

Column property | Description
----------------|-------------
`key` | The key of the row to get data from.
`label` | The string to be shown in column header.
`type` | The type of the content that is shown in the column. For example date, timestamp, number, string.
`uitype` | (Deprecated. use type) The type of the content that is shown in the column. For example date, timestamp.
`uiType` | The input control that has to be used for inline editing.
`readOnly` | Boolean flag denoting whether the column is non editable in inline mode , by default it is false.
`width` | Width of the column in `px`.
`minWidth` | Min Width of the column in `px`, by default grid level min width will be taken.
`alignment` | Alignment of the cell content , can have `left`,`right` or `center` .
`sort` |  Sort order of the current column. Takes either `asc` or `desc`.
`firstToSort` | Whether to sort first by desc or asc, by default it is asc.
`formatter` | A custom formatting function which returns the value to show in the cell.
`renderer` | A custom rendering function which returns the element to show in the cell.
`href` | Takes an express styled path and shows the cell content as a `hyperlink` with the provided path. For example, href="/models/customer/:id".
`cellClass` | Class to apply on data table cell
`cellClassRules` | Object having class name to be applied as key and an expression to evaluate as value
`valueGetter` | A custom getter function which returns a value for the property specified in the `key`.
`hidden` | Column will be hidden if it is set to true.

### Styling

`<oe-data-table>` provides the following custom properties and mixins for styling:

Custom property | Description | Default
----------------|-------------|----------
`--oe-data-table` | Mixin to be applied to whole table | {}
`--oe-data-table-header` | Mixin to be applied to the table header  | {}
`--oe-data-table-header-title` | Mixin to be applied to the table header title  | {}
`--oe-data-table-row` | Mixin to be applied to the table row | {}
`--oe-data-table-row-selected` | Mixiin to be applied to the table row when selected | {}
`--oe-data-table-row-hover` | Mixin to be applied to the table row on hover | {}
`--oe-data-table-row-first` | Mixin to be applied to the first row of the table | {}
`--oe-data-table-row-last` | Mixin to be applied to the last row of the table | {}
`--oe-data-table-data` | Mixin to be applied to the table cell | {}
`--oe-data-table-column-first` | Mixin to be applied to the first column | {}
`--oe-data-table-column-last` | Mixin to be applied to the last column | {}
`--oe-data-table-selection-cell-content` | Mixiin to be applied to the selection cell content if provided | {}
`--oe-data-table-row-action` | Mixin applied to the row action icon buttons | {}
