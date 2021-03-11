sap.ui.define([
	"./BaseController",
	"sap/ui/core/UIComponent",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel"
], function (BaseController, UIComponent, History, JSONModel) {
	"use strict";

	return BaseController.extend("com.kmpg.Caner5.controller.Item", {
		onInit: function () {
			// debugger;
			var oViewModel = new JSONModel({
				busy: false,
				delay: 0,
				lineItemListTitle: this.getResourceBundle().getText("detailLineItemTableHeading")
			});
			this.getRouter().getRoute("itemsList").attachPatternMatched(this._onObjectMatched, this);
			this.setModel(oViewModel, "itemView");
		},


		_onObjectMatched: function (oEvent) {
			// debugger;
			var sObjectId = oEvent.getParameter("arguments").Vbeln;
			var sObjectId2 = oEvent.getParameter("arguments").Posnr;
			this.getModel("appView").setProperty("/layout", "TwoColumnsMidExpanded");
			this.getModel().metadataLoaded().then(function () {
				var sObjectPath = this.getModel().createKey("ItemsSet", {
					Vbeln: sObjectId,
					Posnr: sObjectId2
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

			var sPath = oElementBinding.getPath(),
				oResourceBundle = this.getResourceBundle(),
				oObject = oView.getModel().getObject(sPath),
				sObjectId = oObject.Vbeln,
				sObjectName = oObject.Ernam,
				oViewModel = this.getModel("itemView");

			this.getOwnerComponent().oListSelector.selectAListItem(sPath);

		},

		_bindView: function (sObjectPath) {
			// Set busy indicator during view binding
			var oViewModel = this.getModel("itemView");

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
		onNavBack: function (oItem) {
			//var bReplace = !Device.system.phone;
			// set the layout property of FCL control to show two columns
			this.getModel("appView").setProperty("/layout", "TwoColumnsMidExpanded");
			this.getRouter().navTo("object", {
				objectId: this.getView().getBindingContext().getPath().split("'")[1]
				// Posnr: oItem.getBindingContext().getProperty("Posnr")
			});

			// this.getRouter().navTo("object", {}, true);

		}

	});
});