sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel, UIComponent) {
	"use strict";

	return Controller.extend("com.kpmg.crudapp.controller.MainView", {
			onInit: function () {

			},
			oDataCall: function (oEvent) {
				this.userModel = this.getView().getModel("userModel");
				this.userModel.setRefreshAfterChange(true);

				// CREATE******************
				if ('Create' == oEvent.oSource.mProperties.text) {
					var obj = {};
					obj.Id = this.getView().byId("uniqueid").getValue();
					obj.Name = this.getView().byId("nameid").getValue();
					obj.Email = this.getView().byId("emailid").getValue();
					obj.Mobile = this.getView().byId("mobid").getValue();
					this.userModel.create('/userdataSet', obj, {
						success: function (oData, oResponse) {
							this.userModel.read('/userdataSet');
						}.bind(this),
						error: function (err, oResponse) {
							alert('Error while creating record - '
								.concat(err.response.statusText));
						}
					});
				}
				// READ******************	
				else if ('Update' == oEvent.oSource.mProperties.text) {

					var obj2 = {};
					obj2.Id = this.getView().byId("uniqueid").getValue();
					obj2.Name = this.getView().byId("nameid").getValue();
					obj2.Email = this.getView().byId("emailid").getValue();
					obj2.Mobile = this.getView().byId("mobid").getValue();

					var updateurl = "/userdataSet(Id='" + this.getView().byId("uniqueid").getValue() + "')";

					this.userModel.update(updateurl, obj2, {
						success: function (oData, oResponse) {
							this.userModel.read('/userdataSet');
							this.userModel.refresh();
						}.bind(this),
						error: function (err, oResponse) {
							debugger;
							alert('Error while updating record - '
								.concat(err.response.statusText));
						}
					});
				}
				// DELETE******************
				else if ('Delete' == oEvent.oSource.mProperties.text) {
					var delurl = "/userdataSet(Id='" + this.getView().byId("uniqueid").getValue() + "')";
					this.userModel.remove(delurl, {
							success: function (oData, oResponse) {
								this.userModel.read('/userdataSet');
								//	this.userModel.refresh();s
							}.bind(this),
						error: function (err, oResponse) {
							alert('Error while removing record - '
								.concat(err.response.statusText));
						}
					});
			}
		}
	});
});