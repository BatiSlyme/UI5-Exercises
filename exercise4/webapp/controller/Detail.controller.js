sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent"
], function (Controller, UIComponent) {
	"use strict";

	return Controller.extend("kpmg.com.exercise4.controller.Detail", {
	onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
		},
		_onObjectMatched: function (oEvent) {
			this.itemPath = "/" + window.decodeURIComponent(oEvent.getParameter("arguments").itemPath);
			this.getView().bindElement({
				path:  this.itemPath,
				model: "gamesModel"
			});
		}
/*		onSave: function () {
		
			var model = this.getView().getModel("gamesModel");
			// var data = model.
			model.update(this.itemPath, oData, {
				success: this.success,
				error: this.error
			});

		},
		success: function () {},
		error: function () {}*/
	});
});