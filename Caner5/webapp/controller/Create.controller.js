sap.ui.define([
	"./BaseController",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox"
], function (BaseController, History, JSONModel, MessageBox) {
	"use strict";

	return BaseController.extend("com.kmpg.Caner5.controller.Create", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.kmpg.Caner5.view.Create
		 */
		onInit: function () {
			var jsData = {
				"Vbeln":""

			};

			var jsModel = new JSONModel(jsData);
			this.getView().setModel(jsModel, "createView");

		},
		oCancel: function () {
			this.getRouter().navTo("master", {}, true);
		},
		oSave: function () {
			var oModel = this.getView().getModel();
			var model = this.getView().getModel("createView");
			var entry = {};
			entry.Vbeln = model.getData().Vbeln;
			oModel.create('/HeadersSet', entry, {
				method: "POST",
				
				success: function (oData, oResponse) {
					sap.m.MessageBox.show("Created successfully!", {
						icon: sap.m.MessageBox.Icon.SUCCESS,
						title: "Information!"
					});

				},
				error: function (oError, oResponse) {
					sap.m.MessageBox.show("Error. Failed to create the Product! Please try again later,", {
						icon: sap.m.MessageBox.Icon.ERROR,
						title: "Info!"
					});
				}
			});
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.kmpg.Caner5.view.Create
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.kmpg.Caner5.view.Create
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.kmpg.Caner5.view.Create
		 */
		//	onExit: function() {
		//
		//	}

	});

});