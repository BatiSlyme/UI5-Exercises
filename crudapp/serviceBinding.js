function initModel() {
	var sUrl = "/sap/opu/odata/sap/ZUSERDATA_SRV_01/";
	var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
	sap.ui.getCore().setModel(oModel);
}