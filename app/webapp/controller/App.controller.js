sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
    function (BaseController, JSONModel, MessageBox) {
        "use strict";

        return BaseController.extend("Cadastro.app.controller.App", {
            onInit: function () {

                var employee = {
                     name: "",
                    birthDate: "",
                    email: "",
                    groupRisk: false,
                    livesRiskGroup: false,
                    publicTransport: false,
                    hourPublicTransport:false,
                    environmentEquipment:false,
                    vaccinated: false,
                    gotCOVID: false,
                    activeCase: false,
                    contaminationDate: "",
                    department_ID: "",
                }

                this.getView().setModel(new JSONModel(employee), "Employees");
            },

            onSelect: function (oEvent) {
                var employees = this.getView().getModel("Employees").getData();
                var grupo = oEvent.getParameters().id;
                var button = oEvent.getSource().getSelectedButton().mProperties.text;

                switch (grupo) {
                    case 'container-app---App--vaccinated':
                        employees.vaccinated = button == 'Sim' ? true : false;
                        break;
                    case 'container-app---App--groupRisk':
                        employees.groupRisk = button == 'Sim' ? true : false;
                        break;
                    case 'container-app---App--livesRiskGroup':
                        employees.livesRiskGroup = button == 'Sim' ? true : false;
                        break;
                    case 'container-app---App--publicTransport':
                        employees.publicTransport = button == 'Sim' ? true : false;
                        break;
                    case 'container-app---App--hourPublicTransport':
                        employees.hourPublicTransport = button == 'Sim' ? true : false;
                        break;
                    case 'container-app---App--environmentEquipment':
                        employees.environmentEquipment = button == 'Sim' ? true : false;
                        break;
                    case 'container-app---App--gotCOVID':
                        employees.gotCOVID = button == 'Sim' ? true : false;
                        break;
                    case 'container-app---App--activeCase':
                        employees.activeCase = button == 'Sim' ? true : false;
                        break;
                }
                this.getView().setModel(new JSONModel(employees), "Employees");
            },

            onConfirmar: async function () {
                var Employees = this.getView().getModel("Employees").getData();
                console.log(Employees);
                
                if(!Employees.gotCOVID || !Employees.activeCase) {
                    delete Employees.contaminationDate                   
                }
                else if(Employees.activeCase && Employees.contaminationDate == ""){
                    let data = new Date()
                    let dia = String(data.getDate()).padStart(2, '0');
                    let mes = String(data.getMonth() + 1).padStart(2, '0');
                    let ano = data.getFullYear();
                    let dataAtual = `${ano}-${mes}-${dia}`;

                    Employees.contaminationDate = dataAtual;
                }
                Employees.department_ID = parseInt(Employees.department_ID)
                
                await $.ajax({
                    "url": "/api/main/Employees",
                    "method": "POST",
                    headers: {
                            "Content-Type": "application/json"
                        },
                    "data": JSON.stringify(Employees),
                    success() {
                        MessageBox.success("Cadastro concluído com sucesso! Redirecionando para a Home - Funcionários.");
                        setTimeout(function(){
                            window.location.href = "https://b95a3780trial-dev-employees-approuter.cfapps.us10.hana.ondemand.com/app/index.html#/buscaInformacao"
                        },3000);
                    },
                    error() {
                        MessageBox.error("Não foi possível concluir seu cadastro. Tente novamente mais tarde.");
                    }
                })
            }
        });
    });
