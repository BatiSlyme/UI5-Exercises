sap.ui.define([
	"./BaseController",
	"sap/ui/core/UIComponent",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (BaseController, UIComponent, History, JSONModel, MessageBox, Filter, FilterOperator) {
	"use strict";

	return BaseController.extend("com.kmpg.Caner5.controller.editHeader", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.kmpg.Caner5.view.editHeader
		 */
		onInit: function () {
			var oViewModel = new JSONModel({
				busy: false,
				delay: 0,
				lineItemListTitle: this.getResourceBundle().getText("detailLineItemTableHeading")
			});
			this.getRouter().getRoute("editHeader").attachPatternMatched(this._onObjectMatched, this);
			this.setModel(oViewModel, "headerData");

			var jsData = {
				"Vbeln": "123"

			};

			var jsModel = new JSONModel(jsData);
			this.getView().setModel(jsModel, "editView");

			this.ODataServiceUrl = "/sap/opu/odata/sap/ZSDDOCUMENT_ODATA_MV_SRV/";
			this.oDataModel = new sap.ui.model.odata.ODataModel(
				this.ODataServiceUrl, true
			);
			sap.ui.getCore().setModel(this.oDataModel);
		},

		_onObjectMatched: function (oEvent) {
			var view = this.getView();
			var context = new sap.ui.model.Context(view.getModel(), "/" + oEvent.getParameter("arguments").contextPath);
			this.oContext = context;
			var sObjectId = oEvent.getParameter("arguments").Vbeln;
			this.getModel("appView").setProperty("/layout", "TwoColumnsMidExpanded");
			this.getModel().metadataLoaded().then(function () {
				var sObjectPath = this.getModel().createKey("HeadersSet", {
					Vbeln: sObjectId
				});

				this._bindView("/" + sObjectPath);
			}.bind(this));
		},
		_onBindingChange: function () {
			var oView = this.getView(),
				oElementBinding = oView.getElementBinding();

			// No data for the binding
			if (!oElementBinding.getBoundContext()) {
				this.getRouter().getTargets().display("detailObjectNotFound");
				// if object could not be found, the selection in the master list
				// does not make sense anymore.
				this.getOwnerComponent().oListSelector.clearMasterListSelection();
				return;
			}

			var sPath = oElementBinding.getPath();

			this.getOwnerComponent().oListSelector.selectAListItem(sPath);

		},

		_bindView: function (sObjectPath) {
			// Set busy indicator during view binding
			var oViewModel = this.getModel("headerData");

			// If the view was not bound yet its not busy, only if the binding requests data it is set to busy again

			this.getView().bindElement({
				path: sObjectPath,
				events: {
					change: this._onBindingChange.bind(this),
					dataRequested: function () {
						oViewModel.setProperty("/busy", true);
					},
					dataReceived: function () {
						oViewModel.setProperty("/busy", false);
					}
				},

			});
		},
		oSave: function () {
			this.userModel = this.getView().getModel();
			this.userModel.setRefreshAfterChange(true);

			var obj2 = {};
			obj2.Vbeln = this.getView().byId("Vbeln").getValue();
			obj2.Ernam = this.getView().byId("Ernam").getValue();
			obj2.Vkorg = this.getView().byId("Vkorg").getValue();
			obj2.Lfart = this.getView().byId("Lfart").getValue();
			obj2.Lifsk = this.getView().byId("Lifsk").getValue();
			obj2.Kunnr = this.getView().byId("Kunnr").getValue();
			obj2.KunnrName = this.getView().byId("KunnrName").getValue();
			obj2.Kunag = this.getView().byId("Kunag").getValue();
			obj2.KunagName = this.getView().byId("KunagName").getValue();
			// obj2.WadatIst = this.getView().byId("WadatIst").getValue();
			obj2.Btgew = this.getView().byId("Btgew").getValue();
			obj2.Ntgew = this.getView().byId("Ntgew").getValue();
			obj2.Gewei = this.getView().byId("Gewei").getValue();

			var WadatIst = this.getView().byId("WadatIst").getValue();
			// var Lifsk = this.getView().byId("Lifsk").getValue();
			obj2.WadatIst = new Date(WadatIst);
			// obj2.Lifsk = new Date(Lifsk);

			var updateurl = "/HeadersSet(Vbeln='" + this.getView().byId("Vbeln").getValue() + "')";

			this.userModel.update(updateurl, obj2, {
				method: "PUT",
				success: function (oData, oResponse) {
					sap.m.MessageBox.show("Created successfully!", {
						icon: sap.m.MessageBox.Icon.SUCCESS,
						title: "Information!"
					});
					this.userModel.read('/HeadersSet');
					this.userModel.refresh();
				}.bind(this),
				error: function (oError, oResponse) {
					sap.m.MessageBox.show("Error. Failed to edit the Product! Please try again later,", {
						icon: sap.m.MessageBox.Icon.ERROR,
						title: "Info!"
					});
				}
			});

		},

		oCancel: function (oItem) {
			this.getModel("appView").setProperty("/layout", "TwoColumnsMidExpanded");
			this.getRouter().navTo("object", {
				objectId: this.getView().getBindingContext().getPath().split("'")[1]
			});

		},
		onSearch: function (oEvent) {
			var sInputValue = oEvent.getSource().getValue();
			this.inputId = oEvent.getSource().getId();
			var path;
			var oTableStdListTemplate;
			// var oFilterTableNo;
			this.oDialog = sap.ui.xmlfragment("com.kmpg.Caner5.view.editHeader", this);
			path = "/ZkunnrSet";
			oTableStdListTemplate = new sap.m.StandardListItem({
				title: "{Kunnr}",
				description: "{Name1}"
			}); // //create a filter for the binding
			// oFilterTableNo = new sap.ui.model.Filter("Kunnr", sap.ui.model.FilterOperator.EQ, sInputValue);
			// this.oDialog.unbindAggregation("items");
			this.oDialog.bindAggregation("items", {
				path: path,
				template: oTableStdListTemplate
			}); // }// open value help dialog filtered by the input value
			this.oDialog.open(sInputValue);
		},
		handleTableValueHelpConfirm: function (e) {
			var s = e.getParameter("selectedItem");
			if (s) {
				this.byId(this.inputId).setValue(s.getBindingContext().getObject().Kunnr);
				this.readRefresh(e);
			}
			this.oDialog.destroy();

		},
		onFilterKunnr: function (oEvent) {
			var aFilter = [];
			var sQuery = oEvent.getParameter("value");
			if (sQuery) {
				aFilter.push(new Filter("Kunnr", FilterOperator.Contains, sQuery));
			}
			// filter binding
			var oList = oEvent.getSource()._oList;
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		}

	});

});