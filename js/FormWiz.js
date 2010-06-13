Ext.ns('App');

App.FormWiz = Ext.extend(Ext.form.FormPanel, {
    border: false,
    bodyStyle: 'padding:25px 10px 0px 10px',
    id: 'formCard',
    layout: 'card',
    activeItem: 0,
    defaults: {
        autoHeight: true,
        bodyStyle: 'padding:12px 0px 10px 30px'
    },
    defaultType: 'fieldset',
   	initComponent: function() {
        this.items = [
            this.buildCity(),
            this.buildDed(),
            this.buildCov(),
            this.buildStruct(),
            this.buildDist(),
            this.buildYear()
        ];
        App.FormWiz.superclass.initComponent.call(this);
    },
    buildCity: function() {
        return {
            defaultType: 'radiogroup',
            //id: 'card-0',
            defaults: {
                hideLabel: true
            },
            title: 'Location/City',
            items: [{
                columns: 2,
                items: [{
                    boxLabel: "Albuquerque",
                    name: "city",
                    checked: true,
                    inputValue: "Albuquerque"
                }, {
                    boxLabel: "Rio Rancho",
                    name: "city",
                    inputValue: "Rio Rancho"
                }, {
                    boxLabel: "Clovis",
                    name: "city",
                    inputValue: "Clovis"
                }, {
                    boxLabel: "Farmington",
                    name: "city",
                    inputValue: "Farmington"
                }, {
                    boxLabel: "Gallup",
                    name: "city",
                    inputValue: "Gallup"
                }, {
                    boxLabel: "Santa Fe",
                    name: "city",
                    inputValue: "Santa Fe"
                }, {
                    boxLabel: "Taos",
                    name: "city",
                    inputValue: "Taos"
                }, {
                    boxLabel: "Las Cruces",
                    name: "city",
                    inputValue: "Las Cruces"
                }, {
                    boxLabel: "Roswell",
                    name: "city",
                    inputValue: "Roswell"
                }, {
                    boxLabel: "Socorro",
                    name: "city",
                    inputValue: "Socorro"
                }]
            }]
        };
    },
    buildDed: function() {
        return {
            defaultType: 'radiogroup',
            //id: 'card-1',
            defaults: {
                hideLabel: true
            },
            title: 'Deductible Amount',
            items: [{
                columns: 1,
                items: [{
                    boxLabel: "$500 Deductible",
                    name: "ded",
                    checked: true,
                    inputValue: "500"
                }, {
                    boxLabel: "$1,000 Deductible",
                    name: "ded",
                    inputValue: "1000"
                }, {
                    boxLabel: "$2,500 Deductible",
                    name: "ded",
                    inputValue: "2500"
                }]
            }]
        };
    },
    buildCov: function() {
        return {
            defaultType: 'radiogroup',
            //id: 'card-2',
            defaults: {
                hideLabel: true
            },
            title: 'Coverage Amount',
            items: [{
                columns: 2,
                items: [{
                    boxLabel: "$100,000",
                    name: "cov",
                    checked: true,
                    inputValue: "100000"
                }, {
                    boxLabel: "$150,000",
                    name: "cov",
                    inputValue: "150000"
                }, {
                    boxLabel: "$200,000",
                    name: "cov",
                    inputValue: "200000"
                }, {
                    boxLabel: "$250,000",
                    name: "cov",
                    inputValue: "250000"
                }, {
                    boxLabel: "$300,000",
                    name: "cov",
                    inputValue: "300000"
                }, {
                    boxLabel: "$400,000",
                    name: "cov",
                    inputValue: "400000"
                }, {
                    boxLabel: "$500,000",
                    name: "cov",
                    inputValue: "500000"
                }, {
                    boxLabel: "$750,000",
                    name: "cov",
                    inputValue: "750000"
                }]
            }]
        };
    },
    buildStruct: function() {
        return {
            defaultType: 'radiogroup',
            //id: 'card-3',
            defaults: {
                hideLabel: true
            },
            title: 'Structure Type',
            items: [{
                columns: 1,
                items: [{
                    boxLabel: "Frame House - Including exterior walls of metal, stucco, and plaster.",
                    name: "struct",
                    checked: true,
                    inputValue: 'Frame House'
                }, {
                    boxLabel: "Masonry/Brick House - Including exterior walls of concrete, adobe and tile.",
                    name: "struct",
                    inputValue: "Masonry/Brick House"
                }]
            }]
        };
    },
    buildDist: function() {
        return {
            defaultType: 'radiogroup',
            //id: 'card-4',
            defaults: {
                hideLabel: true
            },
            title: 'Distance From Fire Station and Fire Hydrant',
            items: [{
                columns: 1,
                items: [{
                    boxLabel: "Fire Station: Within 5 Miles/Fire Hydrant: Within 1000 Feet",
                    name: "dist",
                    checked: true,
                    inputValue: 'Within 1000 Feet'
                }, {
                    boxLabel: "Fire Station: Within 5 Miles/Fire Hydrant: More Than 1000 Feet",
                    name: "dist",
                    inputValue: "More Than 1000 Feet"
                }, {
                    boxLabel: "Fire Station: More Than 5 Miles/Fire Hydrant: Not Applicable",
                    name: "dist",
                    inputValue: "Not Applicable"
                }]
            }]
        };
    },
    buildYear: function() {
        return {
            defaultType: 'radiogroup',
            defaults: {
                hideLabel: true
            },
            title: 'Year Home Built',
            items: [{
                columns: 2,
                items: [{
                    boxLabel: "Before 1950",
                    name: "year",
                    checked: true,
                    inputValue: "Before 1950"
                }, {
                    boxLabel: "1950 - 1959",
                    name: "year",
                    inputValue: "1950 - 1959"
                }, {
                    boxLabel: "1960 - 1969",
                    name: "year",
                    inputValue: "1960 - 1969"
                }, {
                    boxLabel: "1970 - 1979",
                    name: "year",
                    inputValue: "1970 - 1979"
                }, {
                    boxLabel: "1980 - 1989",
                    name: "year",
                    inputValue: "1980 - 1989"
                }, {
                    boxLabel: "1990 - 1995",
                    name: "year",
                    inputValue: "1990 - 1995"
                }, {
                    boxLabel: "1996",
                    name: "year",
                    inputValue: "1996"
                }, {
                    boxLabel: "1997",
                    name: "year",
                    inputValue: "1997"
                }, {
                    boxLabel: "1998",
                    name: "year",
                    inputValue: "1998"
                }, {
                    boxLabel: "1999",
                    name: "year",
                    inputValue: "1999"
                }, {
                    boxLabel: "2000",
                    name: "year",
                    inputValue: "2000"
                }, {
                    boxLabel: "2001",
                    name: "year",
                    inputValue: "2001"
                }, {
                    boxLabel: "2002",
                    name: "year",
                    inputValue: "2002"
                }, {
                    boxLabel: "2003",
                    name: "year",
                    inputValue: "2003"
                }, {
                    boxLabel: "2004",
                    name: "year",
                    inputValue: "2004"
                }, {
                    boxLabel: "2005",
                    name: "year",
                    inputValue: "2005"
                }, {
                    boxLabel: "2006",
                    name: "year",
                    inputValue: "2006"
                }, {
                    boxLabel: "2007",
                    name: "year",
                    inputValue: "2007"
                }]
            }]
        };
    }
});

Ext.reg('formwiz', App.FormWiz);

App.FormWiz.prototype.getRadioValues = function() {
    var wizObj = {};
    wizObj['city'] = Ext.DomQuery.selectNode('input[name=city]:checked ~ label').innerHTML;
    wizObj['ded'] = Ext.DomQuery.selectNode('input[name=ded]:checked ~ label').innerHTML;
    wizObj['cov'] = Ext.DomQuery.selectNode('input[name=cov]:checked ~ label').innerHTML;
    wizObj['struct'] = Ext.DomQuery.selectNode('input[name=struct]:checked ~ label').innerHTML;
    wizObj['dist'] = Ext.DomQuery.selectNode('input[name=dist]:checked ~ label').innerHTML;
    return wizObj;
};
