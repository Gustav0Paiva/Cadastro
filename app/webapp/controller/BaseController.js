sap.ui.define([
	"sap/ui/core/mvc/Controller"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller) {
		"use strict";

		return Controller.extend("Cadastro.app.controller.BaseController", {
			
            getModel : function (sName) {
                return this.getView().getModel(sName);
            },
            setModel : function (oModel, sName) {
                return this.getView().setModel(oModel, sName);
            }
		});
	});