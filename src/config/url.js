var END_POINT_2 = 'http://vspace.in.th/apis/';
// var END_POINT_2 = './apis/';
var END_POINT_2 = 'http://localhost/Backup/apis/';
export var END_POINT_PDF = './pdf/';

const mode = '';//'dev';
export var END_POINT_SOCKET = 'http://'+mode+'socket.vspace.in.th';
// var END_POINT_WEBSERVICE = 'http://'+mode+'webservice.vspace.in.th';

var Url = {
  'info':END_POINT_2+"v1/user/header",
  'projectDetail':END_POINT_2+"v1/projectplan/projectdetail",
  'listCaseAll':END_POINT_2+"v1/casetype/listCaseAll",
  'project':END_POINT_2+"v1/projectplan/projectlist",
  'login':END_POINT_2+'v1/user/login',
  'editOwnerCase':END_POINT_2+'v1/casemodify/owner',
  'casemodifySubject':END_POINT_2+'v1/casemodify/subject',
  'caseCreate':END_POINT_2+'v1/casemanagement/createCasesProjectPlan',
  'caseRemove':END_POINT_2+'v1/casemodify/removeCase',
  'findContractInfo': END_POINT_2+'v1/contract/find_contract_info',
  'projectCreate': END_POINT_2+'v1/project/ProjectCreate',
  'addProjectContact': END_POINT_2+'v1/projectmodify/addProjectContact',
  'serviceReportCreate': END_POINT_2+'v1/incident/createServiceReportReact',
  'signup':END_POINT_2+'v1/user/signupReact',
  'signupConfirm':END_POINT_2+'v1/user/comfirmOtpReact',
  'forgotPassword':END_POINT_2+'v1/user/forgotPasswordReact',
  'confirmForgotPassword':END_POINT_2+'v1/user/confirmForgotPasswordReact',
  'projectAddStaff':END_POINT_2+'v1/projectmodify/addStaff',
  'projectDeleteStaff':END_POINT_2+'v1/projectmodify/deleteStaff',
  'changeMandaysCase':END_POINT_2+'v1/casemodify/mandays',
  'inviteEmail':END_POINT_2+'v1/sendmail/inviteMember',
  'ticket':END_POINT_2+'v1/incident/lists',
  'addChecklist':END_POINT_2+"v1/projectplan/addChecklist",
  'removeChecklist':END_POINT_2+"v1/projectplan/removeChecklist",
  'doChecklist':END_POINT_2+"v1/projectplan/doChecklist",
  'updateChecklist':END_POINT_2+"v1/projectplan/updateChecklist",
  'appointment':END_POINT_2+"v1/servicereport/appointment",
  'checkpoint':END_POINT_2+"v1/servicereport/timestampSr",
  'changeEndUserJson':END_POINT_2+"v1/enduser/ChangeEndUserJson",
  'changeAppointment':END_POINT_2+"v1/servicereport/EditTimeAppointmentMobile1",
  'update_spare_part':END_POINT_2+"v1/ticket/update_spare_part",
  'taxiService': END_POINT_2+"v1/moresystem/templateRequestTaxi",
  'input_action':END_POINT_2+"v1/servicereport/input_action",
  'delete_spare_part': END_POINT_2+"v1/ticket/deleteSparePart",
  'updateProfile': END_POINT_2+"v1/user/updateProfile",
  'savesignature_member':END_POINT_2+"v1/moresystem/savesignature",
  'ticketDetail':END_POINT_2+"v1/projectplan/ticketDetail",
  'approveServiceDetail' : END_POINT_2+"v1/moresystem/templateRequestTaxiDetail",
  'standby7x24':END_POINT_2+"v1/planning/sheduleStandbyForCallcenter",
  'historyAppointment': END_POINT_2+"v1/projectplan/historyAppointment",
  'changeStatusTicket':END_POINT_2+"v1/incident/updateSLA",
  'do_serial_pm':END_POINT_2+"v1/pm/insert/do_serial_pm",
  'closeProject':END_POINT_2+"v1/projectmodify/closeProject",
  'tasks':END_POINT_2+"v1/projectplan/tasks",
  'resendEmail': END_POINT_2+"v1/sendmail/resendEmail",
  'ws_projects': END_POINT_2+"v1/project/",
  'ws_projects_detail': END_POINT_2+"v1/project/detail",
  'ws_ticket': END_POINT_2+"v1/ticket/",
  'cManHours':END_POINT_2+'v1/ticket/cManHours',
  'cEndUser':END_POINT_2+'v1/ticket/cEndUser',
  'ws_ticketDetail': END_POINT_2+"v1/ticket/detail",
  'ws_appointment': END_POINT_2+"v1/servicereport/",
  'ws_service_report_detail':END_POINT_2+"v1/servicereport/detail",
  "ws_calendar": END_POINT_2+"v1/calendar/",
  "schedule": END_POINT_2+"v1/schedule/",
  "ws_map": END_POINT_2+"v1/location/",
  "oraclePart": END_POINT_2+"v1/oraclePart/oraclePart",
  "addOracleBackline": END_POINT_2+"v1/oraclePart/addOracleBackline",
  "editOracleBackline": END_POINT_2+"v1/oraclePart/editOracleBackline",
  "deleteOracleBackline": END_POINT_2+"v1/oraclePart/deleteOracleBackline",
  "sendToDHL": END_POINT_2+"v1/sendmail/sendToDHL",
  "inventory": END_POINT_2+"v1/inventory/",
  "ws_canCreateProjectForCompany":END_POINT_2+"v1/project/checkPermissionCompany",
  "checkSale":END_POINT_2+"v1/project/checkSale",
  "editServiceReport": END_POINT_2+"v1/servicereport/edit",
  "editContactAfterClose": END_POINT_2+"v1/servicereport/editContactAfterClose",
  "addInventory":END_POINT_2+"v1/inventory/addInventory",
  "inventoryCTI":END_POINT_2+"v1/inventory/CTI",
  "sosUpdateStatus":END_POINT_2+"v1/ticket/sosUpdateStatus",
  "sosCiInformation": END_POINT_2+"v1/inventory/ciInformation",
  "findItemLikeThis":END_POINT_2+"v1/inventory/findItemLikeThis",
  "changeContract":END_POINT_2+"v1/project/changeContract",
  "notification":END_POINT_2+"v1/servicereport/notification"
  // 'ws_my_appointment': END_POINT_2+"v1/servicereport/appointment"
}

export default Url;
