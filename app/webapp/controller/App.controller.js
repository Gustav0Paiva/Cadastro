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
                var employees = this.getView().getModel("Employees").getData()
                // pegando o id do grupo do radioButton, por padrão ele vem
                // assim: container-project1---View1--gotCOVID / container-nome_do_projeto---Nome_da_View-id
                var grupo = oEvent.getParameters().id

                // pega o texto do botão
                var button = oEvent.getSource().getSelectedButton().mProperties.text

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
                this.getView().setModel(new JSONModel(employees), "Employees")

            },

            onConfirmar: async function () {
                


                var Employees = this.getView().getModel("Employees").getData()
                console.log(Employees)
                
                if (!Employees.gotCOVID || !Employees.activeCase) {
                    delete Employees.contaminationDate                   
                }

                Employees.department_ID = parseInt(Employees.department_ID)
                await $.ajax({
                    "url": "/api/Employees",
                    "method": "POST",
                    headers: {
                            "Content-Type": "application/json"
                        },
                    "data": JSON.stringify(Employees),
                    success() {
                        MessageBox.success("Operação realizada com sucesso");
                    },
                    error() {
                        MessageBox.error("Um erro ocorreu, tente novamente")
                    }
                })

            }


        });
    });
