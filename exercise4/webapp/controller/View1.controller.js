sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("kpmg.com.exercise4.controller.View1", {
		onInit: function () {

		},
		onListItemPress: function (oEvent) {

			var oItem = oEvent.getSource();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("detail", {
				gamesPath: window.encodeURIComponent(oItem.getBindingContext("gamesModel").getPath().substr(1))
			});
		}
	});
});