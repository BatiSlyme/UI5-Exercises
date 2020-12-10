/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"kpmg/com/exercise4/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});